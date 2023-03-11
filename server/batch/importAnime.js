"use strict";

const fetch = require("node-fetch");

//mongo client and database name
const { DBNAME, MONGO_URI, options, MongoClient } = require("../utils/mongo.js");

/**
 * Helper function that fetches from jikan api a list of anime depending on the url
 * @param {*} url
 * @returns
 */
const getAnime = async (url) => {
	const response = await fetch(url);
	//if failure then throw an error
	if (response.status === 429) throw new Error(response.error);

	//if success then set data
	if (response.status === 200) {
		const data = await response.json();
		return data.data.slice(0, 24);
	}
};

/**
 * Updates the db and adds the new anime list
 * @param {*} url
 * @param {*} type
 */
const importAnime = async (url, type) => {
	console.log(type);

	//creates client
	const client = new MongoClient(MONGO_URI, options);
	try {
		//connects to db
		await client.connect();
		const db = client.db(DBNAME);

		//fetches anime list
		const animeList = await getAnime(url);

		//adds or updates new list into db
		//upsert will add if not found
		const result = await db.collection("animes").updateOne({ type: "anime" }, { $set: { [type]: animeList } }, { upsert: true });

		console.log(result);
	} catch (error) {
		console.log(error);
	}
	//closes the connection to the database server
	client.close();
};

module.exports = { importAnime };
