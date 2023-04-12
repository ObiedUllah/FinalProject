"use strict";

//mongo client and database name
const { DBNAME, MONGO_URI, options, MongoClient } = require("../utils/mongo.js");

// necessary helper functions
const { sendResponse } = require("./helperFunctions.js");

//id generator
const { v4: uuidv4 } = require("uuid");

/**
 * Adds a new user to the database with the necessary information
 * will not add a user if they already exists
 * @param {*} req
 * @param {*} res
 * @returns
 */
const createUser = async (req, res) => {
	//creates client
	const client = new MongoClient(MONGO_URI, options);
	console.log(req.body);

	try {
		//connects to db
		await client.connect();
		const db = client.db(DBNAME);

		//gets email
		const email = req.body.email;

		//get picture
		const image = req.body.picture || null;

		//checks if user exists
		const user = await db.collection("users").findOne({ email: email });

		console.log("user", user);
		// does not add a new user if the user already exists
		if (user) {
			return sendResponse(res, 200, user, "User already exists");
		}

		//adds new user
		const newUser = { email, favorites: [], list: [], songList: [], image };
		const added = await db.collection("users").insertOne(newUser);

		console.log("added", added);
		added ? sendResponse(res, 201, added, "user added") : sendResponse(res, 404, null, "user not added");
	} catch (error) {
		sendResponse(res, 500, null, "Server Error");
	}
};

/**
 * GET all users
 * gets every user in the db
 * adding for possible functionality (friends list)
 * @param {*} req
 * @param {*} res
 */
const getUsers = async (req, res) => {
	//creates client
	const client = new MongoClient(MONGO_URI, options);
	try {
		//connects to db
		await client.connect();
		const db = client.db(DBNAME);

		//gets all users
		const users = await db.collection("users").find().toArray();

		users ? sendResponse(res, 200, users, "users Retrieved") : sendResponse(res, 404, null, "users not found");
	} catch (error) {
		sendResponse(res, 500, null, "Server Error");
	}
	//closess the connection to the database server
	client.close();
};

/**
 * GET single user
 * gets a single user from the db using the email
 * @param {*} req
 * @param {*} res
 */
const getUser = async (req, res) => {
	//creates client
	const client = new MongoClient(MONGO_URI, options);
	try {
		//connects to db
		await client.connect();
		const db = client.db(DBNAME);

		//gets email
		const email = req.params.email;

		//finds user
		const user = await db.collection("users").findOne({ email: email });

		user ? sendResponse(res, 200, user, "user Retrieved") : sendResponse(res, 404, null, "user not found");
	} catch (error) {
		sendResponse(res, 500, null, "Server Error");
	}
	//closess the connection to the database server
	client.close();
};

/**
 * PUT anime to favorites list
 * Adds or Removes an anime from the users favorites list
 * @param {*} req
 * @param {*} res
 */
const toggleFavorites = async (req, res) => {
	//creates client
	const client = new MongoClient(MONGO_URI, options);
	try {
		//connects to db
		await client.connect();
		const db = client.db(DBNAME);

		//gets email
		const email = req.body.email;

		//gets anime
		const anime = req.body.data;

		//gets user
		const user = await db.collection("users").findOne({ email: email });

		//list to send to db
		//gets all the favorites amd remove the current favorite if found
		const favorites = user.favorites.filter((fav) => fav.mal_id !== anime.mal_id);

		//adds new favorite if it sees it doesnt exist in the current list
		if (favorites.length === user.favorites.length) {
			favorites.push(anime);
		}

		//updates user
		const updated = await db.collection("users").findOneAndUpdate({ email: email }, { $set: { favorites: favorites } });
		updated ? sendResponse(res, 200, updated, "user updated") : sendResponse(res, 404, null, "user not updated");
	} catch (error) {
		sendResponse(res, 500, null, "Server Error");
	}
	//closes the connection to the database server
	client.close();
};

/**
 * PUT anime to completed/plan to watch list
 * adds or updates the status and rating of an anime
 * @param {*} req
 * @param {*} res
 */
const changeStatus = async (req, res) => {
	//creates client
	const client = new MongoClient(MONGO_URI, options);
	try {
		//connects to db
		await client.connect();
		const db = client.db(DBNAME);

		//gets email
		const email = req.body.email;

		//gets anime
		const anime = req.body.data;

		//gets user
		const user = await db.collection("users").findOne({ email: email });

		//list to send to db
		//gets all the existing anime and replace the existing anime changed by user
		const animeList = user.list.map((selected) => (selected.mal_id === anime.mal_id ? anime : selected));

		//adds the new anime if the anime does not exist in the first place
		if (!animeList.find((selected) => selected.mal_id === anime.mal_id)) {
			animeList.push(anime);
		}

		//updates user
		const updated = await db.collection("users").findOneAndUpdate({ email: email }, { $set: { list: animeList } });
		updated ? sendResponse(res, 200, updated, "user updated") : sendResponse(res, 404, null, "user not updated");
	} catch (error) {
		sendResponse(res, 500, null, "Server Error");
	}

	//closes the connection to the database server
	client.close();
};

/**
 * PATCH remove anime from list
 * removes an anime from the list of the user
 * @param {*} req
 * @param {*} res
 */
const removeStatus = async (req, res) => {
	//creates client
	const client = new MongoClient(MONGO_URI, options);
	try {
		//connects to db
		await client.connect();
		const db = client.db(DBNAME);

		//gets email
		const email = req.body.email;

		//gets anime
		const anime = req.body.data;

		//gets user
		const user = await db.collection("users").findOne({ email: email });

		//removes the anime in question by checking the id and keep all the other values
		const animeList = user.list.filter((anime) => anime.mal_id !== req.body.data.mal_id);

		//updates user
		const updated = await db.collection("users").findOneAndUpdate({ email: email }, { $set: { list: animeList } });
		updated ? sendResponse(res, 200, updated, "user updated") : sendResponse(res, 404, null, "user not updated");
	} catch (error) {
		sendResponse(res, 500, null, "Server Error");
	}

	//closes the connection to the database server
	client.close();
};

/**
 * PUT add song to liked songs list
 * Adds a song to the users list of songs liked
 * @param {*} req
 * @param {*} res
 */
const addSongToList = async (req, res) => {
	//creates client
	const client = new MongoClient(MONGO_URI, options);
	try {
		//connects to db
		await client.connect();
		const db = client.db(DBNAME);

		//gets email
		const email = req.body.email;

		//gets song and its info
		const song = req.body.data;

		//give a random id
		song.id = uuidv4();

		//gets user
		const user = await db.collection("users").findOne({ email: email });

		//list to send to db
		//gets all the existing songs
		const songList = Array.from(user.songList);

		//check if song is already added
		const isAdded = songList.some((songItem) => songItem.mal_id === song.mal_id && songItem.type === song.type && songItem.index === song.index);

		//if the song already exists then send an error response
		//else add song to songList
		if (isAdded) {
			sendResponse(res, 401, null, "is in list already");
			return;
		} else {
			songList.push(song);
		}

		//updates user
		const updated = await db.collection("users").findOneAndUpdate({ email: email }, { $set: { songList: songList } });
		updated ? sendResponse(res, 200, updated, "user updated") : sendResponse(res, 404, null, "user not updated");
	} catch (error) {
		sendResponse(res, 500, null, "Server Error");
	}
	//closes the connection to the database server
	client.close();
};

/**
 * PATCH remove song from liked songs list
 * Removes a song to the users list of songs favorited
 * @param {*} req
 * @param {*} res
 */
const removeSongFromList = async (req, res) => {
	//creates client
	const client = new MongoClient(MONGO_URI, options);
	try {
		//connects to db
		await client.connect();
		const db = client.db(DBNAME);

		//gets id
		const songId = req.params.id;

		//gets email
		const email = req.body.email;

		//gets user
		const user = await db.collection("users").findOne({ email: email });

		//list to send to db
		//filters and removes the song depending on the id
		const songList = user.songList.filter((songItem) => songItem.id !== songId);

		//updates user
		const updated = await db.collection("users").findOneAndUpdate({ email: email }, { $set: { songList: songList } });
		updated ? sendResponse(res, 200, { updated, songList }, "user updated") : sendResponse(res, 404, null, "user not updated");
	} catch (error) {
		sendResponse(res, 500, null, "Server Error");
	}
	//closes the connection to the database server
	client.close();
};

module.exports = {
	createUser,
	getUsers,
	getUser,
	toggleFavorites,
	changeStatus,
	removeStatus,
	addSongToList,
	removeSongFromList,
};
