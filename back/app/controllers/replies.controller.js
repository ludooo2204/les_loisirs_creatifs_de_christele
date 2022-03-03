let express = require("express");
const db = require("../models");
const Reply = db.Reply
exports.postNewReply = (req,res)=>{
console.log("req.body")
console.log(req.body)
Reply.create({ userId:req.body.currentUser.userId,text:req.body.text, comId :req.body.parentId})
		.then(res.status(200).json({reponse:"ca a marché"}))
        .catch(err=>console.log("err",err))

}
