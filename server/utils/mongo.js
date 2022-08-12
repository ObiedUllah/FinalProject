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
//create client
const client = new MongoClient(MONGO_URI, options);

//Database name
const DBNAME = "AnimeEnmaDB";

module.exports = { client, DBNAME };
