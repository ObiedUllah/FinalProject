"use strict";

const fetch = require("node-fetch");

//mongo client and database name
const { client, DBNAME } = require("../utils/mongo.js");

/**
 * Helper function that fetches from jikan api
 * @param {*} url
 * @returns
 */
const getAnime = async (url) => {
	const response = await fetch(url);
	//if failure then refresh
	if (response.status === 429) throw new Error("Too many requests. Please try again later.");

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
	try {
		//connect to db
		await client.connect();
		const db = client.db(DBNAME);

		//fetch anime list
		const animeList = await getAnime(url);

		//fetch previous anime list
		const previousAnimeList = await db.collection("anime").find().toArray();

		//add new list including previous anime list to db
		const result = await db.collection("anime").updateOne({}, { $set: { ...previousAnimeList, [type]: animeList } });

		console.log(result);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { importAnime };
