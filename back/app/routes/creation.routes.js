let express = require("express");
let router = express.Router();

const controller = require("../controllers/creation.controller");


router.get("/", controller.getCreations);


//TODO REPRENDRE CE SCHEMA POUR SECURITE BACKEND
// router.post("/etablissement", [authJwt.isAdmin], controller.postEtablissement);

router.post("/", controller.postCreation);

router.delete("/:id", controller.deleteCreation);

router.patch("/:id", controller.patchCreation);

module.exports = router;
