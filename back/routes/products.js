let express = require("express");
let router = express.Router();
let con = require("../initBDD");
const fs = require("fs");
const sharp = require("sharp");
function getCurrentFilenames() {
	console.log("Current filenames:");
	fs.readdirSync(__dirname).forEach((file) => {
		console.log(file);
	});
}
router.post("/", (req, res) => {
	console.log("post product!");
	try {
		//pour chaque image uploadé, on crée une copie minifiée en taille puis on renomme les 2 avec une rnd pour eviter les noms de fichiers en doublons
		let data = req.body;
		const rnd = +new Date();
		let dataModified = [];
		getCurrentFilenames();
		console.log("data.images");
		console.log(data);
		for (let i = 0; i < data.images.length; i++) {
			sharp(__dirname + "/../../client/src/uploads/" + data.images[i])
				.resize(200, 200)
				.toFile(__dirname + "/../../client/src/uploads/min_" + data.images[i])
				.then((info) => {
					//rename fichier
					console.log("coucou");
					fs.rename(__dirname + "/../../client/src/uploads/" + data.images[i], __dirname + "/../../client/src/uploads/" + rnd + "_" + data.images[i], (err) => {
						if (err) throw err;
						else {
							console.log("REname complete");
						}
					});
					//rename fichier min
					fs.rename(__dirname + "/../../client/src/uploads/min_" + data.images[i], __dirname + "/../../client/src/uploads/min_" + rnd + "_" + data.images[i], (err) => {
						if (err) throw err;
						else {
							console.log("rename min complete");
						}
					});
				})
				.catch((err) => console.log(err));
			dataModified[i] = rnd + "_" + data.images[i];
		}
		con.query("SELECT * FROM tags", function (err, tags) {
			if (err) throw err;
			console.log("result TAG");
			console.log("result TAG");
			console.log("result TAG");
			console.log(tags);
			let dataToStore = { ...data };
			dataToStore.images = dataModified;
			let sqlCreation = `INSERT INTO creations (nom,prix,description,likes) VALUES ("${dataToStore.title}","${dataToStore.prix}","${dataToStore.description}","${0}")`;
			con.query(sqlCreation, function (err, result) {
				if (err) throw err;
				let sqlListeImages = "";
				for (let i = 0; i < dataToStore.images.length; i++) {
					const element = dataToStore.images[i];
					sqlListeImages += `('${element}','${result.insertId}')`;
					if (i < dataToStore.images.length - 1) sqlListeImages += ",";
				}
				let sqlImages = `INSERT INTO images (url,id_creation) VALUES ${sqlListeImages}`;
				con.query(sqlImages, function (err, result) {
					if (err) throw err;
				});

				let sqlListeAssoc = "";
				for (let i = 0; i < dataToStore.tagChoisi.length; i++) {
					const element = dataToStore.tagChoisi[i];

					const temp = tags.filter((tag) => tag.tag == element)[0].id_tag;

					sqlListeAssoc += `('${temp}','${result.insertId}')`;
					if (i < dataToStore.tagChoisi.length - 1) sqlListeAssoc += ",";
				}
				let sqlAssocTagsCreations = `INSERT INTO asso_creations_tags (id_tag,id_creation) VALUES ${sqlListeAssoc}`;
				con.query(sqlAssocTagsCreations, function (err, result) {
					if (err) throw err;
					console.log("result");
					console.log(result);
					res.status(200).json(result);
				});
			});
		});
	} catch (err) {
		console.log("tiens ca bug");
		console.log(err);
		res.status(500).send(err);
	}
});
router.get("/", (req, res) => {
	console.log("getProducts!");
	try {
		con.query("SELECT * FROM creations JOIN asso_creations_tags ON asso_creations_tags.id_creation = creations.id_creation JOIN tags ON asso_creations_tags.id_tag = tags.id_tag LEFT JOIN images ON creations.id_creation = images.id_creation ", function (err, result) {
			if (err) throw err;
			// console.log("result")
			// console.log("result")
			// console.log("result")
			// console.log("result")
			// console.log("result")
			// console.log(result)

			//traitement peut etre evitable avec une requete SQL adéquate
			let listeIDCreations = [];
			let listeCreations = [];
			for (const iterator of result) {
				listeIDCreations.push(iterator.id_creation);
			}
			let creationsUnique = [...new Set(listeIDCreations)];

			for (const iterator of creationsUnique) {
				// const créations retourne tous les objets pour chaque création unique
				const créations = result.filter((e) => iterator == e.id_creation);
				// console.log(créations)
				let créationTemp = créations[0];
				créationTemp.url = [...new Set(créations.map((e) => e.url))];
				créationTemp.tags = [...new Set(créations.map((e) => e.tag))];
				delete créationTemp.id_image;
				delete créationTemp.tag;
				delete créationTemp.id_tag;
				// delete créationTemp.id_assoc;
				listeCreations.push(créationTemp);
			}
			// console.log(listeCreations);
			res.status(200).json(listeCreations);
		});
	} catch (err) {
		console.log("tiens ca bug");
		console.log(err);
		res.status(500).send(err);
	}
});
router.delete("/:id", (req, res) => {
	console.log("delete products!!");
	console.log(req.params.id);
	try {
		let sql = `DELETE FROM creations WHERE id_creation= ?`;
		con.query(sql, req.params.id, function (err, result) {
			if (err) throw err;
			console.log("supprimméé");
			console.log(result);
			//// COMMENT RACHRAICHIR LE COMPONENT CREATION APRES ???
			res.json({ refresh: true });
		});
	} catch (err) {
		console.log("tiens ca bug");
		console.log(err);
		res.status(500).send(err);
	}
});
router.patch("/:id", (req, res) => {
	console.log("patch products!!");
	console.log("patch products!!");
	console.log("patch products!!");
	console.log(req.params);
	console.log(req.body);
	let dataToModify = { ...req.body };

	const { prix, description } = req.body;

	try {
		con.query("SELECT * FROM tags", function (err, tags) {
			if (err) throw err;
			console.log("result TAG");
			console.log("result TAG");
			console.log("result TAG");
			console.log(tags);
			let sql = "UPDATE `creations` SET `nom` = ?,`prix` = ?,`description` = ? WHERE `id_creation` = ?";
			con.query(sql, [req.body.title, prix, description, req.params.id], function (err, result) {
				if (err) throw err;
				console.log("la creation a été modifié");
				// console.log(result);
				//// COMMENT RACHRAICHIR LE COMPONENT CREATION APRES ???
				// res.json({refresh:true});

				///PARTIE ASSOC TAG
				let sql = `DELETE FROM asso_creations_tags WHERE id_creation= ?`;
				con.query(sql, req.params.id, function (err, result) {
					if (err) throw err;
					console.log("supprimméé");
					console.log(result);

					let sqlListeAssoc = "";
					for (let i = 0; i < dataToModify.tagChoisi.length; i++) {
						const element = dataToModify.tagChoisi[i];
						console.log("element");
						console.log("element");
						console.log("element");
						console.log("element");
						console.log(element);
						const temp = tags.filter((tag) => tag.tag == element)[0].id_tag;
						sqlListeAssoc += `('${temp}','${req.params.id}')`;
						if (i < dataToModify.tagChoisi.length - 1) sqlListeAssoc += ",";
					}
					let sqlAssocTagsCreations = `INSERT INTO asso_creations_tags (id_tag,id_creation) VALUES ${sqlListeAssoc}`;
					con.query(sqlAssocTagsCreations, function (err, result) {
						if (err) throw err;
						console.log("TAG mis a jour !!");
						console.log(result);
						res.status(200).json(result);
					});
				});

				// let sqlAssocTagsCreations = `INSERT INTO asso_creations_tags (id_tag,id_creation) VALUES ${sqlListeAssoc}`;

				// let sqlAssocTagsCreations = "UPDATE `asso_creations_tags` SET `id_tag` = ?,`id_creation` = ? WHERE `id_creation` = ? ";
				// con.query(sqlAssocTagsCreations, function (err, result) {
				// 	if (err) throw err;
				// 	console.log("result");
				// 	console.log(result);
				// 	res.status(200).json(result);
				// });
			});

			// res.status(200).send(result);
		});
	} catch (err) {
		console.log("tiens ca bug");
		console.log(err);
		res.status(500).send(err);
	}
});
module.exports = router;
