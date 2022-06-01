let express = require("express");
let router = express.Router();
const sendMail = require("../utils/email/sendMail");
const db = require("../models");
const randToken = require('rand-token');
const User = db.user;
const ResetToken = db.ResetTokens;

router.post("/", async function (req, res, next) {
	var email = await User.findOne({ where: { email: req.body.email } });
	if (email == null) {
		// pour ne pas donner d'infos à de potentiels hackers
		return res.json({ status: "ok" });
	}
	/**
	 * Expire les tokens déja créé pour ce user.
	 * Cela permet d'éviter au anciens tokens d'etre utilisé
	 **/
	await ResetToken.update(
		{used: 1},
		{where: {email: req.body.email}}
	);

    let RNDtoken =randToken.generate(20)
	//token expire dans une heure
	var expireDate = new Date(new Date().getTime() + 60 * 60 * 1000);

	//creer le Resetoken dans la DB
	await ResetToken.create({
		email: req.body.email,
		expiration: expireDate,
		token: RNDtoken,
		used: 0,
	});

	//prepare l'email
	const message = {
		from: process.env.EMAIL,
		to: req.body.email,
		subject: "Réinitialisation Mot de Passe",
		text: "Pour réinitialiser votre mot de passe, merci de cliquer sur ce lien avant "
		+new Date(new Date().getTime() + 60 * 60 * 1000).toLocaleTimeString()
		+".\n\nhttp://localhost:3000/reset-password?token=" + encodeURIComponent(RNDtoken)
		 + "&email=" + req.body.email,
	};

	sendMail(message)

	return res.json({ status: "ok"});
});



module.exports = router;
