"use strict";

const fetch = require("node-fetch");

//mongo client and database name
const { DBNAME, MONGO_URI, options, MongoClient } = require("../utils/mongo.js");

/**
 * Helper function that fetches from jikan api a list of genres/themes/demos depending on the url
 * @param {*} url
 * @returns
 */
const getGenres = async (url) => {
	const response = await fetch(url);
	//if failure then throw an error
	if (response.status === 429) throw new Error("Too many fetches");

	//if success then set data
	if (response.status === 200) {
		const data = await response.json();
		return data.data.slice(0, 24);
	}
};

/**
 * Updates the db and adds the new genres list
 * @param {*} url
 * @param {*} type
 */
const importGenres = async (url, type) => {
	console.log(type);

	//creates client
	const client = new MongoClient(MONGO_URI, options);
	try {
		//connects to db
		await client.connect();
		const db = client.db(DBNAME);

		//fetches genres list
		const genresList = await getGenres(url);

		//adds or updates new list into db.
		//upsert will add if not found
		const result = await db.collection("genres").updateOne({}, { $set: { [type]: genresList } }, { upsert: true });

		console.log(result);
	} catch (error) {
		console.log(error);
	}
	//closes the connection to the database server
	client.close();
};

module.exports = { importGenres };
