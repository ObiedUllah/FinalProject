"use strict";

//mongo client and database name
const { client, DBNAME } = require("../utils/mongo.js");

// necessary helper functions
const { sendResponse } = require("./helperFunctions.js");

const getListFromDb = async (req, res) => {
	console.log("here");
	try {
		//connect to db
		await client.connect();
		const db = client.db(DBNAME);

		//get category from params
		const category = req.params.category;

		//get all anime depending on the category provided
		const list = await db.collection("anime").findOne({ [category]: { $exists: true } });

		list ? sendResponse(res, 200, list, "List Retrieved") : sendResponse(res, 404, null, "List not found");
	} catch (error) {
		sendResponse(res, 500, null, "Server Error");
	}
	// close the connection to the database server
	client.close();
};

module.exports = {
	getListFromDb,
};
