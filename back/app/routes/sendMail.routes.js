let express = require("express");
let router = express.Router();
const sendMail = require('../utils/email/sendMail');

router.get("/", (req, res) => {
    console.log("j'envoi le mail")
    console.log(req.userId)
	// sendMail(
  //       "vachon.ludovic@gmail.com",
  //       "Email subject",
  //       { name: "Eze" },
  //       "./template/requestResetPassword.handlebars"
  //     );
});
module.exports = router;
