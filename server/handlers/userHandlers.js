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

// const addUserBookmarks = async (req, res) => {
// 	//create client
// 	const client = new MongoClient(MONGO_URI, options);

// 	try {
// 		//connect to db
// 		await client.connect();
// 		const db = client.db(DBNAME);
// 		console.log(db);

// 		//get email
// 		const email = req.body.email;
// 		console.log(email);

// 		//find user
// 		const userTest = await db.collection("users").findOne({ email: email });
// 		console.log(userTest);

// 		//update user
// 		const user = await db.collection("users").findOneAndUpdate({ email: email }, { $set: { bookmarks: [33, 45, 87] } });
// 		console.log(user);

// 		user ? sendResponse(res, 200, user, "user updated") : sendResponse(res, 404, null, "users not updated");
// 	} catch (error) {
// 		console.log(error);
// 		sendResponse(res, 500, null, "Server Error");
// 	}
// 	// close the connection to the database server
// 	client.close();
// };

module.exports = {
	getUsers,
	getUser,
};
