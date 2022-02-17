const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
let image = require("./routes/image");
let products = require("./routes/products");
let tag = require("./routes/tag");
// let initBDD = require("./initBDD");

const app = express();

// enable files upload
app.use(
	fileUpload({
		createParentPath: true,
	})
);
//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(morgan("dev"));
// app.use(morgan('combined'))
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("client/build"));
const db = require("./models");
const { DB } = require("./config/db.config");
const Role= db.role;
//A GARDEER EN DEV
db.sequelize.sync({force: true}).then(()=>{
	console.log('Drop and resync db');
	initial()
})
const initial =()=>{
	Role.create({
		id:1,
		name:'user'
	});
	Role.create({
		id:2,
		name:'moderator'
	});
	Role.create({
		id:3,
		name:'admin'
	});
}

//A GARDEER EN PROD
// db.sequelize.sync()
require('./routes/auth.routes')
require('./routes/user.routes')
app.use("/image", image);
app.use("/tag", tag);
// app.use("/addProduct", addProduct);
app.use("/products", products);
app.get("/test", (requete, reponse) => {
	console.log("ya kk1?");
	reponse.send({ msg: "hello ludo" });
});

app.get("/*", (_, reponse) => {
	reponse.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = app;
