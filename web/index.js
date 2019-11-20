"use strict";

const express = require("express"),
	app = express(),
	cors = require("cors"),
	path = require("path"),
	axios = require("axios");

// Constants
const PORT = 4000;

app.use(cors());
app.use("/", express.static(path.join(__dirname, "public")));

app.get("/fetch", async (req, res) => {
	let message = await axios.get("http://backend:8000");
	res.send(message.data);
});

app.get("/insert", async (req, res) => {
	let message = await axios.get("http://backend:8000/insert");
	res.send(message.data);
});

app.listen(PORT);
console.log(`Running on ${PORT}`);
