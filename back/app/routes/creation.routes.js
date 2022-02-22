let express = require("express");
let router = express.Router();
// let con = require("../initBDD");
const db = require("../models");
const Creation = db.creation;
const Creation_Tag = db.sequelize.models.creation_tag;

const Image = db.image;
const Tag = db.tag;
const fs = require("fs");
const sharp = require("sharp");
// function getCurrentFilenames() {
// 	console.log("Current filenames:");
// 	fs.readdirSync(__dirname).forEach((file) => {
// 		console.log(file);
// 	});
// }

router.get("/", (req, res) => {
	Creation.findAll({ include: [Tag, Image] })
		.then((e) => {
			// console.log(JSON.stringify(e, null, 2));
			res.status(200).send(e);
			// res.status(200).send(JSON.stringify(e));
		})
		.catch((err) => res.status(500).send("ca bug"));
});
router.post("/", (req, res) => {
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
		return { tag: tag };
	});
	console.log("dataToStore.tagChoisi");
	console.log("dataToStore.tagChoisi");
	console.log("dataToStore.tagChoisi");
	console.log("dataToStore.tagChoisi");
	console.log("dataToStore.tagChoisi");
	console.log(dataToStore.tagChoisi);
	Creation.create({ nom: dataToStore.title, prix: dataToStore.prix, description: dataToStore.description, images: dataToStore.images, tags: dataToStore.tagChoisi }, { include: [Image, Tag] })
		.then(res.status(200).send("nouvel entrée creeé"))
		.catch((err) => console.lof("loupé", err));
});
module.exports = router;

router.delete("/:id", (req, res) => {
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
});
router.patch("/:id", (req, res) => {
	console.log("patch products!!");
	console.log(req.params);
	console.log(req.body);
	console.log(Creation_Tag)
	console.log(Creation_Tag)
	console.log(Creation_Tag)
	console.log(Creation_Tag)
	console.log(Creation_Tag)
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

	dataToModify.tagChoisi = dataToModify.tagChoisi.map((tag) => {
		return { tag: tag };
	});

	console.log("nouvelles images(imagesModifiés)");
	console.log(imagesModifiés);
	console.log("imagesAGarder)");
	console.log(imagesAGarder);
	Creation_Tag.destroy({
		where: {
			id_creation: req.params.id,
		},
	})
		.then(
			Creation.destroy({
				where: {
					id_creation: req.params.id,
				},
			})
		)
		.then(
			Creation_Tag.destroy({
				where: {
					id_creation: req.params.id,
				},
			})
		)
		.then(
			Image.destroy({
				where: {
					id_creation: req.params.id,
				},
			})
		)
		.then(() => {
			console.log("SUPPRESSION DES IMAGES DE LA CREATION REUSSI");
			let nouvelleListeImagesToUpload = [];
			for (const iterator of imagesModifiés) {
				nouvelleListeImagesToUpload.push(iterator);
			}
			for (const iterator of imagesAGarder) {
				nouvelleListeImagesToUpload.push(iterator);
			}
			console.log(nouvelleListeImagesToUpload);
			nouvelleListeImagesToUpload = nouvelleListeImagesToUpload.map((image) => {
				return { url: image };
			});
			Creation.create({ nom: dataToModify.title, prix: dataToModify.prix, description: dataToModify.description, images: nouvelleListeImagesToUpload, tags: dataToModify.tagChoisi }
				, { include: [Image, Tag] })
				.then(res.json({ refresh: true }))
		})
		.catch((err) => console.log("loupé", err));
});

// )
// .then(res.status(200).send("nouvel entrée creeé"))
// .catch((err) => console.log("loupé", err));
// try {
// 	con.query("SELECT * FROM tags", function (err, tags) {
// 		if (err) throw err;
// 		let sql = "UPDATE `creations` SET `nom` = ?,`prix` = ?,`description` = ? WHERE `id_creation` = ?";
// 		con.query(sql, [req.body.title, prix, description, req.params.id], function (err, result) {
// 			if (err) throw err;
// 			console.log("la creation a été modifié");

// 			///PARTIE ASSOC TAG
// 			let sql = `DELETE FROM asso_creations_tags WHERE id_creation= ?`;
// 			con.query(sql, req.params.id, function (err, result) {
// 				if (err) throw err;
// 				console.log("supprimméé");
// 				console.log(result);

// 				let sqlListeAssoc = "";
// 				for (let i = 0; i < dataToModify.tagChoisi.length; i++) {
// 					const element = dataToModify.tagChoisi[i];
// 					const temp = tags.filter((tag) => tag.tag == element)[0].id_tag;
// 					sqlListeAssoc += `('${temp}','${req.params.id}')`;
// 					if (i < dataToModify.tagChoisi.length - 1) sqlListeAssoc += ",";
// 				}
// 				let sqlAssocTagsCreations = `INSERT INTO asso_creations_tags (id_tag,id_creation) VALUES ${sqlListeAssoc}`;
// 				con.query(sqlAssocTagsCreations, function (err, result) {
// 					if (err) throw err;
// 					console.log("TAG mis a jour !!");
// 					console.log(result);
// 					res.status(200).json(result);
// 				});
// 			});
// 			con.query(`SELECT * FROM images WHERE id_creation = '${req.params.id}'`, function (err, result) {
// 				if (err) throw err;
// 				console.log("nouvelles images(imagesModifiés)");
// 				console.log(imagesModifiés);
// 				console.log("imagesAGarder)");
// 				console.log(imagesAGarder);
// 				console.log("result");
// 				console.log(result);
// 				//TODO
// 				// IL FAUT SUPPRIMER TOUTES LES IMAGES DONT ID_CREATION = Req.PARAMS.ID
// 				// PUIS POST imagesModifiés + imagesAGarder

// 				let sql = `DELETE FROM images WHERE id_creation= '${req.params.id}'`;
// 				con.query(sql, function (err, result) {
// 					if (err) throw err;
// 					console.log("SUPPRESSION DES IMAGES DE LA CREATION REUSSI");
// 					let nouvelleListeImagesToUpload = [];
// 					for (const iterator of imagesModifiés) {
// 						nouvelleListeImagesToUpload.push(iterator);
// 					}
// 					for (const iterator of imagesAGarder) {
// 						nouvelleListeImagesToUpload.push(iterator);
// 					}
// 					console.log(nouvelleListeImagesToUpload);
// 					let sqlListeImages = "";
// 					for (let i = 0; i < nouvelleListeImagesToUpload.length; i++) {
// 						const element = nouvelleListeImagesToUpload[i];
// 						sqlListeImages += `('${element}','${req.params.id}')`;
// 						if (i < nouvelleListeImagesToUpload.length - 1) sqlListeImages += ",";
// 					}
// 					let sqlImages = `INSERT INTO images (url,id_creation) VALUES ${sqlListeImages}`;
// 					con.query(sqlImages, function (err, result) {
// 						if (err) throw err;
// 						console.log("YOUYOUYOUYOUYOU");
// 					});
// 				});

// 				// for (let i = 0; i < imagesModifiés.length; i++) {
// 				// const element = imagesModifiés[i];
// 				// console.log("element")
// 				// console.log(element)
// 				// const id_imageAModifier = result.filter((e) => e.url != element)[0].id_image;
// 				// console.log("id_creations to modify " + req.params.id);
// 				// console.log("id_images to modify " + id_imageAModifier);
// 				// let sqlImages = `UPDATE images SET url = '${element}' WHERE id_creation = '${req.params.id}' AND id_image = '${id_imageAModifier}'`;
// 				// con.query(sqlImages, function (err, result) {
// 				// 	if (err) throw err;
// 				// 	console.log("modificiation de l'image a fonctionné!!!");
// 				// });
// 				// }
// 			});
// 		});

// 		// res.status(200).send(result);
// 	});
// } catch (err) {
// 	console.log("tiens ca bug");
// 	console.log(err);
// 	res.status(500).send(err);
// }
module.exports = router;
