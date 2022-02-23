let express = require("express");
const db = require("../models");
const Tag = db.tag;

exports.getTags = (req, res) => {
	console.log("get tag?");
	Tag.findAll()
		.then((tag) => {
			console.log(JSON.stringify(tag));
			res.status(200).send(JSON.stringify(tag));
		})

		.catch((err) => console.log("EEEERRRROOOORrrr"));
};

exports.postTag = (req, res) => {
	console.log("POST TAG !!");
	console.log("req.body");
	console.log(req.body);
	Tag.create(req.body).then(res.status(200).send("tag creeé"));
};
