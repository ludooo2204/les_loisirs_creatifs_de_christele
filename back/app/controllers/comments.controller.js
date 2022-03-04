let express = require("express");
let router = express.Router();
const db = require("../models");
const Comments = db.Comments;
exports.postNewComment = (req, res) => {
	console.log("req.body");
	console.log(req.body);
	Comments.create({ userId: req.body.currentUser.userId, text: req.body.text, creationId: req.body.creationId })
		.then(res.status(200).send())
		.catch((err) => console.log("err", err));
};
exports.getComments = (req, res) => {
	console.log("getComments");
	console.log("getComments");
	console.log("getComments");
	console.log("getComments");
	console.log("getComments");
	console.log("getComments");
	console.log(req.params.id);

	Comments.findAll({
		model: db.Comments,
		attributes: { exclude: ["userId", "creationId", "creationIdCreation"] },
		include: [
			{ model: db.Reply, attributes: { exclude: ["commentComId", "creationId", "comId", "userId"] }, include: [{ model: db.user, attributes: { exclude: ["password", "createdAt", "updatedAt"] } }] },
			{ model: db.user, attributes: { exclude: ["password", "createdAt", "updatedAt"] } },
		],
		where: { creationId: req.params.id },
	})

		.then((data) => {
			// console.log(e[0].dataValues)
			console.log("#################################");
			// console.log(JSON.stringify(data, null, 2));
			let dataCopié = JSON.parse(JSON.stringify(data));


				for (const commentaire of dataCopié) {
					commentaire.fullName = commentaire.user.username;
					commentaire.userId = commentaire.user.id;
					commentaire.avatarUrl = "https://ui-avatars.com/api/name=" + commentaire.user.username + "&background=random";
					delete commentaire.user;
					for (const reponse of commentaire.replies) {
						reponse.fullName = reponse.user.username;
						reponse.userId = reponse.user.id;
						reponse.avatarUrl = "https://ui-avatars.com/api/name=" + reponse.user.username + "&background=random";
						console.log("reponse")
						console.log("reponse")
						console.log("reponse")
						console.log(reponse)
            delete reponse.user;
					}
				}
			// console.log(JSON.stringify(test,null,2))
			// console.log("#################################");
			// console.log("#################################");
			// console.log("#################################");

			console.log("data nettoyées");
			console.log(dataCopié);
			res.status(200).json({comments:dataCopié});

		})
		.catch((err) => res.status(500).send("ca bug"));

	// db.creation
	// 	.findAll({
	// 		order: [
	// 			[{ model: db.Comments }, "comId", "ASC"],
	// 			// [ { model:db.Reply }, 'replyId','ASC']
	// 			[{ model: db.Comments }, { model: db.Reply }, "replyId", "ASC"],
	// 		],

	// 		include: [
	// 			{
	// 				model: db.Comments,
	// 				attributes: { exclude: ["userId", "creationId", "creationIdCreation"] },
	// 				include: [
	// 					{ model: db.Reply, attributes: { exclude: ["commentComId", "creationId", "comId", "userId"] }, include: [{ model: db.user, attributes: { exclude: ["password", "createdAt", "updatedAt"] } }] },
	// 					{ model: db.user, attributes: { exclude: ["password", "createdAt", "updatedAt"] } },
	// 				],
	// 			},
	// 			Tag,
	// 			Image,
	// 		],
	// 		attributes: { exclude: ["createdAt", "updatedAt"] },
	// 	})
	// 	.then((data) => {
	// 		// console.log(e[0].dataValues)
	// 		console.log("#################################");
	// 		// console.log(JSON.stringify(data, null, 2));
	// 		let dataCopié = JSON.parse(JSON.stringify(data));
	// 		for (let i = 0; i < dataCopié.length; i++) {
	// 			const Commentaires = dataCopié[i].comments;

	// 			for (const commentaire of Commentaires) {
	// 				commentaire.fullName = commentaire.user.username;
	// 				commentaire.userId = commentaire.user.id;
	// 				commentaire.avatarUrl = "https://ui-avatars.com/api/name=" + commentaire.user.username + "&background=random";
	// 				delete commentaire.user;
	// 				for (const reponse of commentaire.replies) {
	// 					reponse.fullName = reponse.user.username;
	// 					reponse.userId = reponse.user.id;
	// 					reponse.avatarUrl = "https://ui-avatars.com/api/name=" + reponse.user.username + "&background=random";
	// 					delete reponse.user;
	// 				}
	// 			}
	// 			dataCopié[i].comments = Commentaires;
	// 			console.log("dataCopié[i].comments")
	// 			console.log(dataCopié[i].comments)
	// 		}
	// 		// console.log(JSON.stringify(test,null,2))
	// 		console.log("dataCopié");
	// 		console.log(dataCopié);
	// 		res.status(200).send(dataCopié);
	// 	})
	// 	.catch((err) => res.status(500).send("ca bug"));
};
