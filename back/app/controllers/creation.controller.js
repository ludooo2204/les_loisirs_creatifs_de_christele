const db = require("../models");
const Creation = db.creation;
const Creation_Tag = db.sequelize.models.creation_tag;

const Image = db.image;
const Tag = db.tag;
const fs = require("fs");
const sharp = require("sharp");
exports.getCreations = (req, res) => {


	
	Creation.findAll({ include: [Tag, Image] })
		.then((e) => {
			// console.log(JSON.stringify(e, null, 2));
			res.status(200).send(e);
			// res.status(200).send(JSON.stringify(e));
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

exports.postCreation = (req, res) => {
	console.log(req.body);
	//pour chaque image uploadé, on crée une copie minifiée en taille puis on renomme les 2 avec une rnd pour eviter les noms de fichiers en doublons
	let data = req.body;
	const rnd = +new Date();
	let dataModified = [];
	// getCurrentFilenames();
	console.log("data.images");
	console.log(data);
	for (let i = 0; i < data.images.length; i++) {
		sharp(__dirname + "/../../../client/src/uploads/" + data.images[i])
			.resize(200, 200)
			.toFile(__dirname + "/../../../client/src/uploads/min_" + data.images[i])
			.then((info) => {
				//rename fichier
				console.log("coucou");
				fs.rename(__dirname + "/../../../client/src/uploads/" + data.images[i], __dirname + "/../../../client/src/uploads/" + rnd + "_" + data.images[i], (err) => {
					if (err) throw err;
					else {
						console.log("REname complete");
					}
				});
				//rename fichier min
				fs.rename(__dirname + "/../../../client/src/uploads/min_" + data.images[i], __dirname + "/../../../client/src/uploads/min_" + rnd + "_" + data.images[i], (err) => {
					if (err) throw err;
					else {
						console.log("rename min complete");
					}
				});
			})
			.catch((err) => console.log(err));
		dataModified[i] = rnd + "_" + data.images[i];
	}
	console.log("dataModified");
	console.log(dataModified);
	// res.status(200).json(dataModified);
	let dataToStore = { ...data };
	dataToStore.images = dataModified.map((image) => {
		return { url: image };
	});
	dataToStore.tagChoisi = dataToStore.tagChoisi.map((tag) => {
		return { tag: tag.tag };
	});
	console.log("dataToStore.tagChoisi");
	console.log("dataToStore.tagChoisi");
	console.log("dataToStore.tagChoisi");
	console.log("dataToStore.tagChoisi");
	console.log("dataToStore.tagChoisi");
	console.log(dataToStore.tagChoisi);
	Creation.create({ nom: dataToStore.title, prix: dataToStore.prix, description: dataToStore.description, images: dataToStore.images, tags: dataToStore.tagChoisi }, { include: [Image, Tag] })
		.then(res.status(200).send("nouvel entrée creeé"))
		.catch((err) => console.log("loupé", err));
};
exports.deleteCreation = (req, res) => {
	console.log("delete products!!");
	Creation.destroy({
		where: {
			id_creation: req.params.id,
		},
	})
		.then((rowDeleted) => {
			console.log("rowDeleted");
			console.log(rowDeleted);
			//// COMMENT RACHRAICHIR LE COMPONENT CREATION APRES ???
			res.json({ refresh: true });
		})
		.catch((err) => console.log(err));
};
exports.patchCreation = (req, res) => {
	console.log("patch products!!");
	const id_creationAPatcher = req.params.id;
	console.log("id_creation à patcher : ", id_creationAPatcher);

	let dataToModify = { ...req.body };

	let imagesModifiés = [];
	let imagesAGarder = [];
	const rnd = +new Date();

	for (const image of dataToModify.images) {
		// condition pour separer les images a garder (celle avec le rnd et _ en debut de nom) et celle a modifier
		if (!isNaN(Number(image.slice(0, 13))) && image.slice(13, 14) == "_") {
			console.log(image + " est a garder!!!!!");
			imagesAGarder.push(image);
		} else {
			sharp(__dirname + "/../../../client/src/uploads/" + image)
				.resize(200, 200)
				.toFile(__dirname + "/../../../client/src/uploads/min_" + image)
				.then((info) => {
					fs.rename(__dirname + "/../../../client/src/uploads/" + image, __dirname + "/../../../client/src/uploads/" + rnd + "_" + image, (err) => {
						if (err) throw err;
						else {
							console.log("REname complete");
						}
					});
					//rename fichier min
					fs.rename(__dirname + "/../../../client/src/uploads/min_" + image, __dirname + "/../../../client/src/uploads/min_" + rnd + "_" + image, (err) => {
						if (err) throw err;
						else {
							console.log("rename min complete");
						}
					});
				})
				.catch((err) => console.log(err));
			imagesModifiés.push(rnd + "_" + image);
		}
	}
	const { prix, description } = req.body;
	const nom = req.body.title;

	// dataToModify.tagChoisi = dataToModify.tagChoisi.map((tag) => {
	// 	return { tag: tag };
	// });
	console.log("dataToModify");
	console.log(dataToModify);
	// console.log("nouvelles images(imagesModifiés)");
	// console.log(imagesModifiés);
	// console.log("imagesAGarder)");
	// console.log(imagesAGarder);

	//MAJ du nom,prix et description
	Creation.update({ nom, prix, description }, { where: { id_creation: id_creationAPatcher } }).then((e) => {
		console.log("ca a marché !!");
		console.log(e);
	});

	//MAJ du tag
	console.log("dataToModify.tagChoisi");
	console.log(dataToModify.tagChoisi);
	const tempp = dataToModify.tagChoisi.map((id) => id.id_tag);

	Creation_Tag.destroy({ where: { id_creation: id_creationAPatcher } })
		.then((e) => {
			console.log("Creation_Tag supprimé");
			console.log("Creation_Tag supprimé");
			console.log("Creation_Tag supprimé");
			console.log("Creation_Tag supprimé");
		})
		.then(() => {
			Creation_Tag.bulkCreate(
				tempp.map((tag) => {
					return { id_creation: id_creationAPatcher, id_tag: tag };
				})
			);
		})
		.then((e) => {
			console.log("Creation_Tag créée");
			console.log("Creation_Tag créée");
			console.log("Creation_Tag créée");
			console.log("Creation_Tag créée");
			console.log(e);
		})

		// Creation_Tag.update({ id_tag },{where:{id_creation:req.params.id}})
		// 	.then((e) => {
		// 		console.log("ca a marché !!");
		// 		console.log(e);

		// 	})

		// Creation_Tag.destroy({
		// 	where: { id_creation: req.params.id },
		// })
		// 	.then(Creation.destroy({where: {id_creation: req.params.id}}))
		// 	.then(Creation_Tag.destroy({where: {id_creation: req.params.id}}))
		// 	.then(Image.destroy({where: {id_creation: req.params.id}}))
		// 	.then(() => {
		// 		console.log("SUPPRESSION DES IMAGES DE LA CREATION REUSSI");
		// 		let nouvelleListeImagesToUpload = [];
		// 		for (const iterator of imagesModifiés) {
		// 			nouvelleListeImagesToUpload.push(iterator);
		// 		}
		// 		for (const iterator of imagesAGarder) {
		// 			nouvelleListeImagesToUpload.push(iterator);
		// 		}
		// 		console.log(nouvelleListeImagesToUpload);
		// 		nouvelleListeImagesToUpload = nouvelleListeImagesToUpload.map((image) => {
		// 			return { url: image };
		// 		});
		// 		Creation.create({ nom: dataToModify.title, prix: dataToModify.prix, description: dataToModify.description, images: nouvelleListeImagesToUpload, tags: dataToModify.tagChoisi }, { include: [Image, Tag] }).then(res.json({ refresh: true }));
		// 	})
		.catch((err) => console.log("loupé", err));
};
