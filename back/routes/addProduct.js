let express = require("express");
let router = express.Router();
const fs = require("fs");
const sharp = require("sharp");
let con = require("../initBDD");

router.post("/", (req, res) => {
	console.log("coucou");
	try {
		//pour chaque image uploadé, on crée une copie minifiée en taille puis on renomme les 2 avec une rnd pour eviter les noms de fichiers en doublons
		let data = req.body;
		const rnd = +new Date();
		let dataModified = [];
		for (let i = 0; i < data.images.length; i++) {
			console.log(data.images[i]);
			//resize image
			sharp(__dirname + "/../uploads/" + data.images[i])
				.resize(200, 200)
				.toFile(__dirname + "/../uploads/min_" + data.images[i])
				.then((info) => {
					//rename fichier
					fs.rename("uploads/" + data.images[i], "uploads/" + rnd + "_" + data.images[i], (err) => {
						if (err) throw err;
						else {
							console.log("REname complete");
						}
					});
					//rename fichier min
					fs.rename("uploads/min_" + data.images[i], "uploads/min_" + rnd + "_" + data.images[i], (err) => {
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
		console.log("dataToStore")
		console.log("dataToStore")
		console.log("dataToStore")
		console.log(dataToStore)
		let sqlCreation = `INSERT INTO creations (nom,prix,description,likes,categorieID) VALUES ('${dataToStore.title}','${dataToStore.prix}','${dataToStore.description}','${0}','${1}')`;
		con.query(sqlCreation, function (err, result) {
			if (err) throw err;
			console.log("result");
			console.log(result.insertId);
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
module.exports = router;
