//server.js
const app = require("./app");
require("dotenv").config;
const PORT= process.env.PORT || 7000


app.listen(PORT,err=>console.log(`le serveur tourne sur le port : ${PORT}`))


