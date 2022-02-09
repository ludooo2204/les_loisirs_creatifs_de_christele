    
let express = require('express');
let router = express.Router();
router.post("/", (req, res) => {
	console.log("coucou");
	try {
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
			avatar.mv("./uploads/" + avatar.name);
			// avatar.mv('./uploads/' + rnd+avatar.name);

			//send response
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
	} catch (err) {
		res.status(500).send(err);
	}
});
module.exports = router;