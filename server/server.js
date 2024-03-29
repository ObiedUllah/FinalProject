"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 7200;

const app = express()
	//default
	.use(function (req, res, next) {
		res.header("Access-Control-Allow-Methods", "OPTIONS, HEAD, GET, PUT, POST, DELETE");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	})
	.use(morgan("tiny"))
	.use(express.static(path.join(__dirname, "build")))
	.use(express.json({ limit: "50mb" }))
	.use(express.urlencoded({ limit: "50mb", extended: true }))
	.use(cors())

	//endpoints
	.use(require("./endpoints/userEndpoints"))
	.use(require("./endpoints/videoEndpoints"))
	.use(require("./endpoints/uploadImageEndpoints"))
	.use(require("./endpoints/animeListsEndpoints"))

	.get("/", (req, res) => {
		res.status(200).json({ message: "Access Granted" });
	});

// Node spins up our server and sets it to listen on set port
// .listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;
