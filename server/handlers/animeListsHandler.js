"use strict";

//mongo client and database name
const { DBNAME, MONGO_URI, options, MongoClient } = require("../utils/mongo.js");

// necessary helper functions
const { sendResponse } = require("./helperFunctions.js");

/**
 * Retrieves all the animes from the database
 * anime list includes
 * top popular recent upcoming seasonal
 * @param {*} req
 * @param {*} res
 */
const getAnimeList = async (req, res) => {
	//creates client
	const client = new MongoClient(MONGO_URI, options);
	try {
		//connects to db
		await client.connect();
		const db = client.db(DBNAME);

		//gets the whole anime list including top popular recent upcoming seasonal
		const list = await db.collection("animes").findOne({});

		list ? sendResponse(res, 200, list, "List Retrieved") : sendResponse(res, 404, null, "List not found");
	} catch (error) {
		sendResponse(res, 500, null, "Server Error");
	}
	//closess the connection to the database server
	client.close();
};

/**
 * Retrieves all the animes and their categories
 * Returns one category and all the animes in said category
 * categories include
 * "action", "adventure", "comedy", "drama", "sports", "shounen"
 * @param {*} req
 * @param {*} res
 */
const getRandomAnimeList = async (req, res) => {
	//creates client
	const client = new MongoClient(MONGO_URI, options);
	try {
		//connectsss to db
		await client.connect();
		const db = client.db(DBNAME);

		//gets a random anime category name
		const animeTypes = ["action", "adventure", "comedy", "drama", "sports", "shounen"];
		const randomIndex = Math.floor(Math.random() * animeTypes.length);

		//gets all anime categories
		const list = await db.collection("animes_random").findOne({});

		//gets random anime category which includes names and list of anime
		const random = list[animeTypes[randomIndex]];

		random ? sendResponse(res, 200, random, "List Retrieved") : sendResponse(res, 404, null, "List not found");
	} catch (error) {
		sendResponse(res, 500, null, "Server Error");
	}
	//closess the connection to the database server
	client.close();
};

/**
 * Retrieves all the promos from the database
 * @param {*} req
 * @param {*} res
 */
const getPromosList = async (req, res) => {
	//creates client
	const client = new MongoClient(MONGO_URI, options);
	try {
		//connects to db
		await client.connect();
		const db = client.db(DBNAME);

		//gets all promos from the database
		const list = await db.collection("promos").findOne({});

		list ? sendResponse(res, 200, list, "List Retrieved") : sendResponse(res, 404, null, "List not found");
	} catch (error) {
		sendResponse(res, 500, null, "Server Error");
	}
	//closes the connection to the database server
	client.close();
};

/**
 * Retrieves all the genre titles
 * the titles include
 * genres, themes, demographics
 * @param {*} req
 * @param {*} res
 */
const getGenresList = async (req, res) => {
	//creates client
	const client = new MongoClient(MONGO_URI, options);
	try {
		//connects to db
		await client.connect();
		const db = client.db(DBNAME);

		//gets all anime depending on the category provided
		const list = await db.collection("genres").findOne({});

		list ? sendResponse(res, 200, list, "List Retrieved") : sendResponse(res, 404, null, "List not found");
	} catch (error) {
		sendResponse(res, 500, null, "Server Error");
	}
	//closess the connection to the database server
	client.close();
};

module.exports = {
	getAnimeList,
	getRandomAnimeList,
	getPromosList,
	getGenresList,
};
