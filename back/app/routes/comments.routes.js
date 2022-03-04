let express = require("express");
let router = express.Router();
const controller = require("../controllers/comments.controller");

router.post("/",controller.postNewComment );
router.get("/:id",controller.getComments )
	

module.exports = router;