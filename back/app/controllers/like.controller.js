let express = require("express");
let router = express.Router();
const db = require("../models");
const userLike_creation = db.sequelize.models.userLike_creation;
exports.postLike = (req, res) => {
	const { userId, id_creation, operation } = req.body;
	console.log(req.body)
	console.log(userId)
	console.log(id_creation)
	console.log(operation)
	if (operation === "like") {
		userLike_creation.create({ userId, id_creation })
			.then(res.status(200).json({ liked: true }));
	} else if (operation === "dislike") {
		userLike_creation
			.destroy({
				where: { id_creation, userId },
			})
			.then(res.status(200).json({ liked: false }));
	}
}
exports.getLikes = (req, res) => {
	userLike_creation.findAll({
		where: {
			id_creation: req.params.id,
		},
	}).then((result) => {
		res.status(200).json(result);
	});
}