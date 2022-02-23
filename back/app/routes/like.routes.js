let express = require("express");
let router = express.Router();
const controller = require("../controllers/like.controller");

router.post("/", controller.postLike);

router.get("/:id", controller.getLikes);

module.exports = router;
