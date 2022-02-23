let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
// console.log("req.userId")
// console.log(req.userId)
// console.log("req.username")
// console.log("req.username")
// console.log("req.username")
// console.log("req.username")
// console.log("req.username")
// console.log("req.username")
// console.log("req.username")
// console.log("req.username")
// console.log(req.username)
res.status(200).json(req.username)
});
router.post("/", (req, res) => {

});
module.exports = router;
