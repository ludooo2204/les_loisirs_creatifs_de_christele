let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
    console.log("signin auto")
    console.log("req.userId")
    console.log(req.userId)
    console.log("req.username")
    console.log(req.username)
    console.log(req.roles)
    res.status(200).json({ username: req.username, userId: req.userId, roles: req.roles })
});
router.post("/", (req, res) => {

});
module.exports = router;
