const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
let tag_route = require("./tag.routes");
let creations_route = require("./creation.routes");
let images_route = require("./images.routes");
let likes_route = require("./like.routes");
let liked_route = require("./liked.routes");
let sendMail_route = require("./sendMail.routes");
let signinAuto_route = require("./signinAuto.routes");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
		next();
	});

	// partie visiteur
	app.use("/api/creations",  creations_route);
	app.use("/api/tags", tag_route);
	app.use("/api/images", images_route);
	app.use("/api/likes", likes_route);
	app.use("/api/liked", liked_route);
	app.use("/api/sendmail", [authJwt.verifyToken], sendMail_route);

	// partie utilisateur connecté
	app.use("/api/signinAuto", [authJwt.verifyToken, authJwt.isAdmin], signinAuto_route);

	// partie Admin
	// app.use("/api/admin/tags", [authJwt.verifyToken, authJwt.isAdmin], tag_route);
	app.get("/api/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
};
