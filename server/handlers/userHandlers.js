"use strict";

//get mongo client database name
const { client, DBNAME } = require("../utils/mongo.js");

//get helper functions
const { sendResponse } = require("./helperFunctions.js");

/**
 * get every user in the db
 * @param {*} req
 * @param {*} res
 */
const getUsers = async (req, res) => {
	try {
		//connect to db
		await client.connect();
		const db = client.db(DBNAME);

		//get all users
		const users = await db.collection("users").find().toArray();

		users ? sendResponse(res, 200, users, "users Retrieved") : sendResponse(res, 404, null, "users not found");
	} catch (error) {
		sendResponse(res, 500, null, "Server Error");
	}
	// close the connection to the database server
	client.close();
};

/**
 * get a single user from the db using params to get the email
 * @param {*} req
 * @param {*} res
 */
const getUser = async (req, res) => {
	try {
		//connect to db
		await client.connect();
		const db = client.db(DBNAME);

		//get email
		const email = req.params.email;

		//find user
		const user = await db.collection("users").findOne({ email: email });

		user ? sendResponse(res, 200, user, "user Retrieved") : sendResponse(res, 404, null, "user not found");
	} catch (error) {
		sendResponse(res, 500, null, "Server Error");
	}
	// close the connection to the database server
	client.close();
};

/**
 * Adds or Removes an anime from the users favorites list
 *
 * req.body.data contains mal_id title image
 *
 * @param {*} req
 * @param {*} res
 */
const toggleFavorites = async (req, res) => {
	try {
		//connect to db
		await client.connect();
		const db = client.db(DBNAME);

		//get email
		const email = req.body.email;

		//get anime
		const anime = req.body.data;

		//get user
		const user = await db.collection("users").findOne({ email: email });

		//list to send to db
		//will get all the favorites amd remove the current favorite if found
		const favorites = user.favorites.filter((fav) => fav.mal_id !== anime.mal_id);

		// will add new favorite if it sees it doesnt exist in the current list
		if (favorites.length === user.favorites.length) {
			favorites.push(anime);
		}

		//update user
		const updated = await db.collection("users").findOneAndUpdate({ email: email }, { $set: { favorites: favorites } });
		updated ? sendResponse(res, 200, updated, "user updated") : sendResponse(res, 404, null, "user not updated");
	} catch (error) {
		sendResponse(res, 500, null, "Server Error");
	}
	// close the connection to the database server
	client.close();
};

/**
 * adds or updates the status and rating of an anime
 * @param {*} req
 * @param {*} res
 */
const changeStatus = async (req, res) => {
	try {
		//connect to db
		await client.connect();
		const db = client.db(DBNAME);

		//get email
		const email = req.body.email;

		//get anime
		const anime = req.body.data;

		//get user
		const user = await db.collection("users").findOne({ email: email });

		//list to send to db
		//will get all the existing anime and replace the existing anime changed by user
		const animeList = user.list.map((selected) => (selected.mal_id === anime.mal_id ? anime : selected));

		//will add new anime if the anime does not exist in the first place
		if (!animeList.find((selected) => selected.mal_id === anime.mal_id)) {
			animeList.push(anime);
		}

		//update user
		const updated = await db.collection("users").findOneAndUpdate({ email: email }, { $set: { list: animeList } });
		updated ? sendResponse(res, 200, updated, "user updated") : sendResponse(res, 404, null, "user not updated");
	} catch (error) {
		sendResponse(res, 500, null, "Server Error");
	}

	// close the connection to the database server
	client.close();
};

/**
 * removes an anime from the list of the user
 * @param {*} req
 * @param {*} res
 */
const removeStatus = async (req, res) => {
	try {
		//connect to db
		await client.connect();
		const db = client.db(DBNAME);

		//get email
		const email = req.body.email;

		//get anime
		const anime = req.body.data;

		//get user
		const user = await db.collection("users").findOne({ email: email });

		//will remove the anime in question by checking the id and keep all the other values
		const animeList = user.list.filter((anime) => anime.mal_id !== req.body.data.mal_id);

		//update user
		const updated = await db.collection("users").findOneAndUpdate({ email: email }, { $set: { list: animeList } });
		updated ? sendResponse(res, 200, updated, "user updated") : sendResponse(res, 404, null, "user not updated");
	} catch (error) {
		sendResponse(res, 500, null, "Server Error");
	}

	// close the connection to the database server
	client.close();
};

/**
 * Adds a song to the users list of songs favorited
 * @param {*} req
 * @param {*} res
 */
const addSongToList = async (req, res) => {
	try {
		//connect to db
		await client.connect();
		const db = client.db(DBNAME);

		//get email
		const email = req.body.email;

		//get song and its info
		const song = req.body.data;

		//get user
		const user = await db.collection("users").findOne({ email: email });

		//list to send to db
		//will get all the existing songs
		const songList = [...user.songList];
		console.log(songList);
		console.log("seperate");
		console.log(song);

		//will add new song if the anime does not exist in the first place
		if (!songList.find((songItem) => songItem.mal_id === song.mal_id)) {
			console.log("first");
			songList.push(song);
		}
		// will add new song if the index in question is not added for openings
		else if (songList.find((songItem) => songItem.mal_id === song.mal_id && song.type === "opening" && songItem.index !== song.index)) {
			console.log("second");
			songList.push(song);
		}
		// will add new song if the index in question is not added for endings
		else if (songList.find((songItem) => songItem.mal_id === song.mal_id && song.type === "ending" && songItem.index !== song.index)) {
			console.log("third");
			songList.push(song);
		}
		// the user is adding an already existing song
		else {
			console.log("fourth");
			sendResponse(res, 401, null, "is in list already");
			return;
		}

		//update user
		const updated = await db.collection("users").findOneAndUpdate({ email: email }, { $set: { songList: songList } });
		updated ? sendResponse(res, 200, updated, "user updated") : sendResponse(res, 404, null, "user not updated");
	} catch (error) {
		sendResponse(res, 500, null, "Server Error");
	}
	// close the connection to the database server
	client.close();
};

/**
 * Removes a song to the users list of songs favorited
 * @param {*} req
 * @param {*} res
 */
const removeSongFromList = async (req, res) => {
	try {
		//connect to db
		await client.connect();
		const db = client.db(DBNAME);

		//get email
		const email = req.body.email;

		//get anime
		const song = req.body.data;

		//get user
		const user = await db.collection("users").findOne({ email: email });

		//list to send to db
		//will filter and remove the song dpeending on the id
		const songList = user.songList.filter((songItem) => songItem.id !== song.mal_id);

		//update user
		const updated = await db.collection("users").findOneAndUpdate({ email: email }, { $set: { songList: songList } });
		updated ? sendResponse(res, 200, updated, "user updated") : sendResponse(res, 404, null, "user not updated");
	} catch (error) {
		sendResponse(res, 500, null, "Server Error");
	}
	// close the connection to the database server
	client.close();
};

module.exports = {
	getUsers,
	getUser,
	toggleFavorites,
	changeStatus,
	removeStatus,
	addSongToList,
	removeSongFromList,
};
