const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
let addImage = require("./routes/addImage");
let addProduct = require("./routes/addProduct");
let getProducts = require("./routes/getProducts");
let tag = require("./routes/tag");
let initBDD = require("./initBDD");

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
app.use("/addImage", addImage);
app.use("/tag", tag);
app.use("/addProduct", addProduct);
app.use("/getProducts", getProducts);
app.get("/test", (requete, reponse) => {
	console.log("ya kk1?");
	reponse.send({ msg: "hello ludo" });
});

app.get("/*", (_, reponse) => {
	reponse.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = app;
