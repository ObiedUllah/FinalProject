"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

const PORT = 7000;

express()
	//default
	.use(function (req, res, next) {
		res.header("Access-Control-Allow-Methods", "OPTIONS, HEAD, GET, PUT, POST, DELETE");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	})
	.use(morgan("tiny"))
	.use(express.static("./server/assets"))
	.use(express.json())
	.use(express.urlencoded({ extended: false }))
	.use("/", express.static(__dirname + "/"))

	.get("/", (req, res) => {
		res.send("here");
	})

	//endpoints
	.use(require("./endpoints/userEndpoints"))
	.use(require("./endpoints/videoEndpoints"))

	// Node spins up our server and sets it to listen on set port
	.listen(PORT, () => console.log(`Listening on port ${PORT}`));
