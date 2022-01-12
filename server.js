const express =require('express')
const path = require('path');
require("dotenv").config;
// const passport = require('passport');
const PORT= process.env.PORT || 7000
const app = express()
app.use(express.json())
app.use(express.static('client/build'))
app.get("/test",(requete,reponse)=>{
    console.log("ya kk1?")
    reponse.send({msg:"hello ludo"})
})
app.get('/*',(_,reponse)=>{
    reponse.sendFile(path.join(__dirname, './client/build.index.html'))
})

app.listen(PORT,err=>console.log(`le serveur tourne sur le port : ${PORT}`))


