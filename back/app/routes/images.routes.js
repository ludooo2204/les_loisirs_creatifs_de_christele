let express = require("express");
const controller = require("../controllers/image.controller");
let router = express.Router();

router.post("/", controller.postImage);

module.exports = router;
