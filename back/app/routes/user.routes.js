const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
let tag_route = require("./tag.routes");
let creations_route = require("./creations.routes");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
		next();
	});

	// partie visiteur
	app.get("/api/creations", creations_route);

	// partie utilisateur connecté
	app.get("/api/user", [authJwt.verifyToken], controller.userBoard);

	// partie Admin
	app.use("/api/admin/tags", [authJwt.verifyToken, authJwt.isAdmin], tag_route);
	app.get("/api/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
};
