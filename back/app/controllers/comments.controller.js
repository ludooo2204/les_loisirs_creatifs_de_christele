let express = require("express");
let router = express.Router();
const db = require("../models");
const Comments = db.Comments
exports.postNewComment = (req,res)=>{
console.log("req.body")
console.log(req.body)
    Comments.create({ userId:req.body.currentUser.userId,text:req.body.text, creationId :req.body.creationId})
		.then(res.status(200).send())
        .catch(err=>console.log("err",err))

}
// exports.getLikes = (req,res)=>{
//     userLike_creation.findAll({
//         where: {
//             id_creation: req.params.id,
//         },
//     }).then((result) => {
//         res.status(200).json(result);
//     });
// }