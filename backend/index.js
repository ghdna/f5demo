"use strict";

const express = require("express"),
	app = express(),
	faker = require("faker"),
	cors = require("cors"),
	MongoClient = require("mongodb").MongoClient,
	assert = require("assert");

const url = "mongodb://root:example@mongo:27017",
	dbName = "f5",
	dbCollection = "documents";

let client = null;

app.use(cors());

app.use(async (req, res, next) => {
	client = await MongoClient.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}).catch(err => {
		res.status(500).send(err);
		console.log(err);
	});

	if (!client) {
		return;
	}
	next();
});

app.get("/", async (req, res) => {
	try {
		const db = client.db(dbName);
		const collection = db.collection(dbCollection);
		let data = await collection.find({}).toArray();
		res.send(data);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	} finally {
		client.close();
	}
});

app.get("/insert", async (req, res) => {
	try {
		const db = client.db(dbName);
		const collection = db.collection(dbCollection);
		let data = await collection.insertMany([
			{
				f: faker.name.firstName(),
				l: faker.name.lastName(),
				p: faker.phone.phoneNumber()
			},
			{
				f: faker.name.firstName(),
				l: faker.name.lastName(),
				p: faker.phone.phoneNumber()
			},
			{
				f: faker.name.firstName(),
				l: faker.name.lastName(),
				p: faker.phone.phoneNumber()
			}
		]);
		res.send(data);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	} finally {
		client.close();
	}
});

const PORT = 8000;

app.listen(PORT);
console.log(`Running on ${PORT}`);
