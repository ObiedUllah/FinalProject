"use strict";

require("dotenv").config();

//cloudinary setup
const { cloudinary } = require("../utils/cloudinary");

//mongo setup
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};
const DBNAME = "AnimeEnmaDB";

//get helper functions
const { sendResponse } = require("./helperFunctions.js");

/**
 * uploads an image onto cloudinary
 * @param {*} req
 * @param {*} res
 */
const uploadImage = async (req, res) => {
	try {
		//get email and fileurl
		const fileStr = req.body.data;
		const email = req.body.email;

		//upload to cloudinary
		const uploadResponse = await cloudinary.uploader.upload(fileStr, {
			upload_preset: "AnimeEnma",
			folder: "AnimeEnma",
		});

		//upload url to MongoDB
		uploadUrlToDB(res, email, uploadResponse.url);
	} catch (error) {
		console.log(error);
		sendResponse(res, 500, null, "Server Error");
	}
};

/**
 * uploads image url to database
 * @param {*} res
 * @param {*} email
 * @param {*} url
 */
const uploadUrlToDB = async (res, email, url) => {
	//create client
	const client = new MongoClient(MONGO_URI, options);

	try {
		//connect to db
		await client.connect();
		const db = client.db(DBNAME);

		//find user
		const updated = await db.collection("users").findOneAndUpdate({ email: email }, { $set: { image: url } });
		updated ? sendResponse(res, 200, updated, "user updated") : sendResponse(res, 404, null, "user not updated");
	} catch (error) {
		console.log(error);
		sendResponse(res, 500, null, "Server Error");
	}

	// close the connection to the database server
	client.close();
};

module.exports = {
	uploadImage,
};
