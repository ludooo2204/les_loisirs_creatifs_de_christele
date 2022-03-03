let express = require("express");
let router = express.Router();
const controller = require("../controllers/replies.controller");

router.post("/",controller.postNewReply );
// router.get("/", )
	

module.exports = router;