    
let express = require('express');
var path = require('path');

let router = express.Router();
router.post("/", (req, res) => {
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
			avatar.mv("../client/src/uploads/" + avatar.name);
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
router.get('/', function (req, res) {
	res.sendFile(path.resolve('uploads/_1644440034411bad.jpg'));  
	//   res.sendFile(__dirname+'/../uploads/_1644440034411bad.jpg');
});
module.exports = router;