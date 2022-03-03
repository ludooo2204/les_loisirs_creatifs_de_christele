let express = require("express");
let router = express.Router();
const controller = require("../controllers/comments.controller");

router.post("/",controller.postNewComment );
// router.get("/", )
	

module.exports = router;