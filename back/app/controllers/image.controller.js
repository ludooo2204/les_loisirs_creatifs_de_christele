let express = require('express');
var path = require('path');
const db = require("../models");
const creation = db.image;
exports.postImage = (req,res)=>{
	console.log("post images")

		if (!req.files) {
			res.send({
				status: false,
				message: "No file uploaded",
			});
		} else {
			console.log("req");
			console.log(req.files);
			//Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
			let avatar = req.files.file;
			// const rnd= Math.random()
			//Use the mv() method to place the file in upload directory (i.e. "uploads")
			// avatar.mv("../client/public/uploads/" + avatar.name);
			avatar.mv("../client/src/uploads/" + avatar.name);
			// avatar.mv('./uploads/' + rnd+avatar.name);

			//send response
			console.log("coucou lolo")
			res.send({
				status: true,
				message: "File is uploaded",
				data: {
					name: avatar.name,
					// name: rnd+avatar.name,
					mimetype: avatar.mimetype,
					size: avatar.size,
				},
			});
		}
}
