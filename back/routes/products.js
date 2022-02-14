let express = require("express");
let router = express.Router();
let con = require("../initBDD");
const fs = require("fs");
const sharp = require("sharp");
function getCurrentFilenames() {
	console.log("Current filenames:");
	fs.readdirSync(__dirname).forEach(file => {
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
		getCurrentFilenames()
		console.log("data.images")
		console.log(data)
		for (let i = 0; i < data.images.length; i++) {
			// console.log(data.images[i]);
			//resize image
			// sharp(__dirname + "/../uploads/" + data.images[i])
			// 	.resize(200, 200)
			// 	.toFile(__dirname + "/../uploads/min_" + data.images[i])
			sharp(__dirname + "/../../client/src/uploads/" + data.images[i])
				.resize(200, 200)
				.toFile(__dirname + "/../../client/src/uploads/min_" + data.images[i])
				.then((info) => {
					//rename fichier
					console.log("coucou")
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

		let dataToStore = { ...data };
		dataToStore.images = dataModified;
		// console.log("dataToStore");
		// console.log(dataToStore);
		let sqlCreation = `INSERT INTO creations (nom,prix,description,likes) VALUES ("${dataToStore.title}","${dataToStore.prix}","${dataToStore.description}","${0}")`;
		con.query(sqlCreation, function (err, result) {
			if (err) throw err;
			// console.log("result");
			// console.log(result.insertId);
			let sqlListeImages = "";
			for (let i = 0; i < dataToStore.images.length; i++) {
				const element = dataToStore.images[i];
				sqlListeImages += `('${element}','${result.insertId}')`;
				if (i < dataToStore.images.length - 1) sqlListeImages += ",";
			}
			let sqlImages = `INSERT INTO images (url,id_creation) VALUES ${sqlListeImages}`;
			con.query(sqlImages, function (err, result) {
				if (err) throw err;
				// console.log("result");
				// console.log(result);
			});
			let sqlListeAssoc = "";
			for (let i = 0; i < dataToStore.tagChoisi.length; i++) {
				const element = dataToStore.tagChoisi[i];
				sqlListeAssoc += `('${element}','${result.insertId}')`;
				if (i < dataToStore.tagChoisi.length - 1) sqlListeAssoc += ",";
			}
			let sqlAssocTagsCreations = `INSERT INTO asso_creations_tags (id_tag,id_creation) VALUES ${sqlListeAssoc}`;
			con.query(sqlAssocTagsCreations, function (err, result) {
				if (err) throw err;
				console.log("result");
				console.log(result);
				res.status(200).json(result);
			});
			// res.status(200).json(result);
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
			// console.log(result)
			let images = [];
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
				// console.log("créations")
				// console.log(créations)
			let urlUnique = [...new Set(créations.map(e=>e.url))];
			let tagUnique = [...new Set(listeIDCreations)];

				let créationTemp = créations[0];
				 créationTemp.url=[...new Set(créations.map((e) => e.url))]
				 créationTemp.tags=[... new Set(créations.map((e) => e.tag))]
				//  console.log(créationTemp)
				 delete(créationTemp.id_image)
				 delete(créationTemp.tag)
				 delete(créationTemp.id_tag)
				 delete(créationTemp.id_creation)
				//  delete(créationTemp.id)
				 listeCreations.push(créationTemp)
			}
			// console.log("listeCreations")
			console.log(listeCreations)
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
	console.log(req.params.id)
	try {
	let sql=`DELETE FROM creations WHERE id_creation= ?`;
		con.query(sql,req.params.id, function (err, result) {

			if (err) throw err;
			console.log("supprimméé")
			console.log(result)
		//// COMMENT RACHRAICHIR LE COMPONENT CREATION APRES ???
			res.json({refresh:true});
		});
	} catch (err) {
		console.log("tiens ca bug");
		console.log(err);
		res.status(500).send(err);
	}
});
router.patch("/:id", (req, res) => {
	console.log("patch products!!");
	// console.log(req.params.id)
	console.log(req.body)
	const {prix,description}=req.body

	try {
	let sql='UPDATE `creations` SET `nom` = ?,`prix` = ?,`description` = ? WHERE `id_creation` = ?';
		con.query(sql,[req.body.title,prix,description,req.params.id], function (err, result) {

			if (err) throw err;
			console.log("modifié")
			console.log(result)
		//// COMMENT RACHRAICHIR LE COMPONENT CREATION APRES ???
			// res.json({refresh:true});
		});
	} catch (err) {
		console.log("tiens ca bug");
		console.log(err);
		res.status(500).send(err);
	}
});
module.exports = router;
