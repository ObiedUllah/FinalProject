"use strict";

//mongo client and database name
const { client, DBNAME } = require("../utils/mongo.js");

const fetch = require("node-fetch");

const getAnime = async (url) => {
	const response = await fetch(url);
	//if failure then refresh
	if (response.status === 429) console.log("error");

	//if success then set data
	if (response.status === 200) {
		const data = await response.json();
		return data.data.slice(0, 24);
	}
};

const importAnime = async (url, type) => {
	try {
		//connect to db
		await client.connect();
		const db = client.db(DBNAME);

		const animeList = await getAnime(url);

		const previousAnimeList = await db.collection("anime").find().toArray();
		const result = await db.collection("anime").updateOne({}, { $set: { ...previousAnimeList, [type]: animeList } });

		console.log(result);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { importAnime };
