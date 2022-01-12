const express =require('express')
const path = require('path');
require("dotenv").config;


// const passport = require('passport');

// let mysql = require("mysql");
// let con = mysql.createConnection({
// 	host: "localhost",
// 	user: "root",
// 	password: "",
//   database:"api"
// });
// con.connect(function (err) {
// 	if (err) throw err;
// 	console.log("connected!!");
// 	con.query("SELECT * FROM etalonnages", function (err, result) {
// 		if (err) throw err;
// result.forEach(element => {
//   console.log(element)
  
// });
// 	});
// });


const PORT= process.env.PORT || 7000
const app = express()
app.use(express.json())
app.use(express.static('client/build'))
app.get("/test",(requete,reponse)=>{
    console.log("ya kk1?")
    reponse.send({msg:"hello ludo"})
})
app.get('/*',(_,reponse)=>{
    reponse.sendFile(path.join(__dirname, './client/build/index.html'))
})

app.listen(PORT,err=>console.log(`le serveur tourne sur le port : ${PORT}`))


