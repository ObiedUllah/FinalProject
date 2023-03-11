"use strict";

const fetch = require("node-fetch");

//mongo client and database name
const { DBNAME, MONGO_URI, options, MongoClient } = require("../utils/mongo.js");

/**
 * Helper function that fetches from jikan api a list of anime depending on the url and the category
 * @param {*} url
 * @param {*} type name of the category to add in object ad value
 * @returns
 */
const getRandomGenreAnimes = async (url, type) => {
	const response = await fetch(url);

	//if failure then refresh
	if (response.status === 429) throw new Error("Too many fetches");

	//if success then set data
	if (response.status === 200) {
		const data = await response.json();
		return { name: type, data: data.data.slice(0, 24) };
	}
};

/**
 * Updates the db and adds the new list with animes of a certain category
 * @param {*} url
 * @param {*} type
 */
const importRandomAnime = async (url, type) => {
	console.log(type);

	//creates client
	const client = new MongoClient(MONGO_URI, options);

	try {
		//connects to db
		await client.connect();
		const db = client.db(DBNAME);

		//fetches random anime list
		const animeList = await getRandomGenreAnimes(url, type);

		//adds or updates new list into db
		//upsert will add if not found
		const result = await db.collection("animes_random").updateOne({ type: "category" }, { $set: { [type]: animeList } }, { upsert: true });

		console.log(result);
	} catch (error) {
		console.log(error);
	}
	//closes the connection to the database server
	client.close();
};

module.exports = { importRandomAnime };
