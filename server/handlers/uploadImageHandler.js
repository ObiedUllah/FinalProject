"use strict";

require("dotenv").config();

//cloudinary setup
const { cloudinary, UPLOAD_PRESET_NAME, FOLDER_NAME } = require("../utils/cloudinary");

//get mongo client database name
const { client, DBNAME } = require("../utils/mongo.js");

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
			upload_preset: UPLOAD_PRESET_NAME,
			folder: FOLDER_NAME,
		});

		//upload url to MongoDB
		uploadUrlToDB(res, email, uploadResponse.url);
	} catch (error) {
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
	try {
		//connect to db
		await client.connect();
		const db = client.db(DBNAME);

		//find user
		const updated = await db.collection("users").findOneAndUpdate({ email: email }, { $set: { image: url } });
		updated ? sendResponse(res, 200, updated, "user updated") : sendResponse(res, 404, null, "user not updated");
	} catch (error) {
		sendResponse(res, 500, null, "Server Error");
	}

	// close the connection to the database server
	client.close();
};

module.exports = {
	uploadImage,
};
