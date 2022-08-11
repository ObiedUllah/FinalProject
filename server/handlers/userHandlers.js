"use strict";

//mongo setup
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};
const DBNAME = "AnimeEnmaDB";

//get helper functions
const { sendResponse } = require("./helperFunctions.js");

/**
 * get every user in the db
 * @param {*} req
 * @param {*} res
 */
const getUsers = async (req, res) => {
	//create client
	const client = new MongoClient(MONGO_URI, options);

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
	//create client
	const client = new MongoClient(MONGO_URI, options);

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
	//create client
	const client = new MongoClient(MONGO_URI, options);

	try {
		//connect to db
		await client.connect();
		const db = client.db(DBNAME);

		//get email
		const email = req.body.email;

		//get user
		const user = await db.collection("users").findOne({ email: email });

		//list to send to db
		const favorites = [];

		//add first favorite anime if none added
		if (user.favorites.length === 0) {
			favorites.push(req.body.data);
		}
		// add previous anime favorited
		else {
			let exist = false;
			// do not add anime to favorites if id matches
			// add anime to favorites if id does not match
			for (const anime of user.favorites) {
				anime.mal_id === req.body.data.mal_id ? (exist = true) : favorites.push(anime);
			}
			//if anime did not exist previously, add it
			if (!exist) {
				favorites.push(req.body.data);
			}
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
	//create client
	const client = new MongoClient(MONGO_URI, options);

	try {
		//connect to db
		await client.connect();
		const db = client.db(DBNAME);

		//get email
		const email = req.body.email;

		//get user
		const user = await db.collection("users").findOne({ email: email });

		const animeList = [];

		//add first favorite anime if none added
		if (user.list.length === 0) {
			animeList.push(req.body.data);
		} else {
			let exist = false;
			for (const anime of user.list) {
				//if exist then update the data
				if (anime.mal_id === req.body.data.mal_id) {
					animeList.push(req.body.data);
					exist = true;
				}
				// push other item
				else {
					animeList.push(anime);
				}
			}

			//add item if it doesnt exist
			if (!exist) animeList.push(req.body.data);
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
	//create client
	const client = new MongoClient(MONGO_URI, options);

	try {
		//connect to db
		await client.connect();
		const db = client.db(DBNAME);

		//get email
		const email = req.body.email;

		//get user
		const user = await db.collection("users").findOne({ email: email });

		const animeList = [];

		//add anime to list if the id do not match
		for (const anime of user.list) {
			if (anime.mal_id !== req.body.data.mal_id) animeList.push(anime);
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

module.exports = {
	getUsers,
	getUser,
	toggleFavorites,
	changeStatus,
	removeStatus,
};
