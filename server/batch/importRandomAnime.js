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
	if (response.status === 429) console.log("error");

	//if success then set data
	if (response.status === 200) {
		const data = await response.json();
		return { name: type, data: data.data.slice(0, 24) };
	}
};

const importRandomAnime = async (url, type) => {
	try {
		//connect to db
		await client.connect();
		const db = client.db(DBNAME);

		const animeList = await getRandomGenreAnimes(url, type);

		const previousAnimeList = await db.collection("anime").find().toArray();
		const result = await db.collection("anime").updateOne({}, { $set: { ...previousAnimeList, [type]: animeList } });

		console.log(result);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { importRandomAnime };
