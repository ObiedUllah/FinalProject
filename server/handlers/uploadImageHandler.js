"use strict";

require("dotenv").config();

// cloudinary setup
const { cloudinary, UPLOAD_PRESET_NAME, FOLDER_NAME } = require("../utils/cloudinary");

// mongo client database name
const { DBNAME, MONGO_URI, options, MongoClient } = require("../utils/mongo.js");

// helper functions
const { sendResponse } = require("./helperFunctions.js");

/**
 * uploads an image onto cloudinary
 * @param {*} req
 * @param {*} res
 */
const uploadImage = async (req, res) => {
	try {
		//gets email and fileurl
		const fileStr = req.body.data;
		const email = req.body.email;

		//uploads to cloudinary
		const uploadResponse = await cloudinary.uploader.upload(fileStr, {
			upload_preset: UPLOAD_PRESET_NAME,
			folder: FOLDER_NAME,
		});

		//uploads url to MongoDB
		uploadUrlToDB(res, email, uploadResponse.url);
	} catch (error) {
		sendResponse(res, 500, null, "Server Error");
	}
};

/**
 * uploads image url to database
 * called by the function uploadImage
 * @param {*} res
 * @param {*} email
 * @param {*} url
 */
const uploadUrlToDB = async (res, email, url) => {
	//creates client
	const client = new MongoClient(MONGO_URI, options);
	try {
		//connects to db
		await client.connect();
		const db = client.db(DBNAME);

		//finds user
		const updated = await db.collection("users").findOneAndUpdate({ email: email }, { $set: { image: url } });
		updated ? sendResponse(res, 200, updated, "user updated") : sendResponse(res, 404, null, "user not updated");
	} catch (error) {
		sendResponse(res, 500, null, "Server Error");
	}

	//closess the connection to the database server
	client.close();
};

module.exports = {
	uploadImage,
};
