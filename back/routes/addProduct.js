let express = require("express");
let router = express.Router();
const fs = require("fs");

router.post("/", (req, res) => {
	console.log("coucou");
	try {
		console.log("la nouvelle creation");
		console.log(req.body);
		let data = req.body;
		const rnd = +new Date();
		for (let i = 0; i < data.images.length; i++) {
			fs.rename("uploads/" + data.images[i], "uploads/" + "_" + rnd + data.images[i], (err) => {
				if (err) throw err;
				console.log("REname complete");
			});
			data.images[i] = "_" + rnd + data.images[i];
		}
		console.log("data");
		console.log(data);
	} catch (err) {
		console.log("tiens ca bug");
		console.log(err);
		res.status(500).send(err);
	}
});
module.exports = router;
