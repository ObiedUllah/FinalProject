const express = require("express");
const PORT = 7000;

express()
	.get("/", (req, res) => {
		res.send("Hello World!");
	})

	.listen(PORT, () => {
		console.log(`Final Project listening on port ${PORT}`);
	});
