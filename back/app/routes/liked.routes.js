let express = require("express");
let router = express.Router();
const db = require("../models");
const userLike_creation = db.sequelize.models.userLike_creation;

router.post("/", (req, res) => {

});
router.get("/:id", (req, res) => {
		userLike_creation.findAll({
			where: {
				userId: req.params.id,
			},
		}).then((result) => {
			res.status(200).json(result);
		});
	})
	

module.exports = router;
