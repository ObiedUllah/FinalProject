/**
 * Creates a reusable cloudinary object
 */
require("dotenv").config();
const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
const cloudinary = require("cloudinary").v2;
cloudinary.config({
	cloud_name: CLOUDINARY_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
});

//options name
const UPLOAD_PRESET_NAME = "AnimeEnma";
const FOLDER_NAME = "AnimeEnma";

module.exports = { cloudinary, UPLOAD_PRESET_NAME, FOLDER_NAME };
