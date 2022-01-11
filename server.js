const express =require('express')
require("dotenv").config;
// const passport = require('passport');
const PORT= process.env.PORT || 7000
const app = express()
app.use(express.json())
app.get("/test",(requete,reponse)=>{
    console.log("ya kk1?")
    reponse.send({msg:"hello ludo"})
})

app.listen(PORT,err=>console.log(`le serveur tourne sur le port : ${PORT}`))


