/**
 * Creates a reusable mongo client
 */
require("dotenv").config();
const { MONGO_URI } = process.env;
const { MongoClient } = require("mongodb");
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

//Database name
const DBNAME = "AnimeEnmaDB";

module.exports = { DBNAME, MONGO_URI, options, MongoClient };
