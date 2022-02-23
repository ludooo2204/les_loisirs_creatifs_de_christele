let express = require("express");
let router = express.Router();
const controller = require("../controllers/tag.controller");

router.get("/", controller.getTags);

router.post("/", controller.postTag);

module.exports = router;
