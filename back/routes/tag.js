let express = require("express");
let router = express.Router();
let con = require("../initBDD");

router.get("/", (req, res) => {
	try {
		con.query("SELECT * FROM tags", function (err, result) {
			if (err) throw err;
			res.status(200).send(result);
		});
	} catch (err) {
		console.log("tiens ca bug");
		console.log(err);
		res.status(500).send(err);
	}
});
router.post("/", (req, res) => {
		let data = req.body;
		console.log("data")
		console.log(data)
	try {
		let sqlTag = `INSERT INTO tags (tag) VALUES ("${data.tag}")`;
			con.query(sqlTag, function (err, result) {
				if (err) throw err;
				res.status(200).json(result);
			});
	} catch (err) {
		console.log("tiens ca bug");
		console.log(err);
		res.status(500).send(err);
	}
});
module.exports = router;
