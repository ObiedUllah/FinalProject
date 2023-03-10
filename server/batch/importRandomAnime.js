"use strict";

const fetch = require("node-fetch");

//mongo client and database name
const { client, DBNAME } = require("../utils/mongo.js");

/**
 * Helper function that fetches from jikan api
 * @param {*} url
 * @param {*} type name of the category to add in object ad value
 * @returns
 */
const getRandomGenreAnimes = async (url, type) => {
	const response = await fetch(url);

	//if failure then refresh
	if (response.status === 429) throw new Error("Too many requests. Please try again later.");

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
	try {
		//connect to db
		await client.connect();
		const db = client.db(DBNAME);

		//fetch anime list
		const animeList = await getRandomGenreAnimes(url, type);

		//add new list including previous anime list to db
		const result = await db.collection("anime").updateOne({ [type]: animeList }, { $set: { [type]: animeList } }, { upsert: true });

		console.log(result);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { importRandomAnime };
