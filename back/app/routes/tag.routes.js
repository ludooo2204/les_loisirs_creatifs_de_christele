let express = require("express");
let router = express.Router();
const db = require("../models");
const Tag = db.tag;

router.get("/", (req, res) => {
	console.log("get tag?");
	Tag.findAll()
		.then((tag) => {
			console.log(JSON.stringify(tag));
			res.status(200).send(JSON.stringify(tag));
		})

		.catch((err) => console.log("EEEERRRROOOORrrr"));
});
router.post("/", (req, res) => {
	console.log("POST TAG !!");
	Tag.create(req.body).then(res.status(200).send(test + " creeé"));
});
module.exports = router;
