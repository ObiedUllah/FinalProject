"use strict";

const fetch = require("node-fetch");

//mongo client and database name
const { client, DBNAME } = require("../utils/mongo.js");

/**
 * Helper function that fetches from jikan api
 * @param {*} url
 * @returns
 */
const getPromos = async (url) => {
	const response = await fetch(url);
	//if failure then refresh
	if (response.status === 429) throw new Error("Too many requests. Please try again later.");

	//if success then set data
	if (response.status === 200) {
		const data = await response.json();
		return data.data;
	}
};

/**
 * Updates the db and adds new list with all the promos
 * @param {*} url
 * @param {*} type
 */
const importPromos = async (url, type) => {
	console.log(type);
	try {
		//connect to db
		await client.connect();
		const db = client.db(DBNAME);

		//fetch promos list
		const animeList = await getPromos(url);

		//add new list including previous anime list to db
		const result = await db.collection("anime").updateOne({ [type]: animeList }, { $set: { [type]: animeList } }, { upsert: true });

		console.log(result);
	} catch (error) {
		console.log(error);
	}
};
module.exports = { importPromos };
