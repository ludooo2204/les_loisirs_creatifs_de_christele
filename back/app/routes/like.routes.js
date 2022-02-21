let express = require("express");
let router = express.Router();
const db = require("../models");
console.log("db");
console.log(db.sequelize.models.userLike_creation);
const userLike_creation = db.sequelize.models.userLike_creation;

router.post("/", (req, res) => {
	console.log(req.body);
	const { userId, id_creation, operation } = req.body;
	console.log(userId);
	console.log(id_creation);
	console.log(operation);
	if (operation === "like") {
		const nbrLike = 22;
//REVOIR LE SYSTEME DE COMPTAGE DES LIKES
//REVOIR LE SYSTEME DE COMPTAGE DES LIKES
//REVOIR LE SYSTEME DE COMPTAGE DES LIKES
//REVOIR LE SYSTEME DE COMPTAGE DES LIKES
//REVOIR LE SYSTEME DE COMPTAGE DES LIKES
//REVOIR LE SYSTEME DE COMPTAGE DES LIKES
//REVOIR LE SYSTEME DE COMPTAGE DES LIKES
//REVOIR LE SYSTEME DE COMPTAGE DES LIKES
//REVOIR LE SYSTEME DE COMPTAGE DES LIKES
//REVOIR LE SYSTEME DE COMPTAGE DES LIKES
//REVOIR LE SYSTEME DE COMPTAGE DES LIKES
//REVOIR LE SYSTEME DE COMPTAGE DES LIKES
//REVOIR LE SYSTEME DE COMPTAGE DES LIKES
//REVOIR LE SYSTEME DE COMPTAGE DES LIKES
//REVOIR LE SYSTEME DE COMPTAGE DES LIKES
//REVOIR LE SYSTEME DE COMPTAGE DES LIKES
//REVOIR LE SYSTEME DE COMPTAGE DES LIKES
//REVOIR LE SYSTEME DE COMPTAGE DES LIKES
//REVOIR LE SYSTEME DE COMPTAGE DES LIKES
//REVOIR LE SYSTEME DE COMPTAGE DES LIKES
		userLike_creation.create({ userId, id_creation })
        .then(
			userLike_creation.findAll({ where: { id_creation } }).then((like) => {

				console.log(JSON.stringify(like));

				res.json(like);
			})
		);
	} else if (operation === "dislike") {
		userLike_creation
			.destroy({
				where: {
					id_creation,
					userId,
				},
			})
			.then(
				userLike_creation.findAll({ where: { id_creation } }).then((like) => {
			
					console.log(JSON.stringify(like));

					res.json(like);
				})
			);
	}
});
module.exports = router;
