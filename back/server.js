const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const path = require("path");

// enable files upload
app.use(
	fileUpload({
		createParentPath: true,
	})
);
var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine","pug")
app.set("views",path.join(__dirname,"app/views"))

// app.use(cors());
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});




// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);






// set port, listen for requests
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 

 
  Role.create({
    id: 2,
    name: "admin"
  });
}









// const express = require("express");
// const path = require("path");
// const cors = require("cors");

// // require('./routes/auth.routes')
// require("./app/routes/user.routes");
// // let image = require("./routes/image");
// // let products = require("./routes/products");
// // let tag = require("./routes/tag");
// // let initBDD = require("./initBDD");

// const app = express();


// //add other middleware
// app.use(cors());

// // var corsOptions = {
// // 	origin: "http://localhost:3000"
// //   };

// //   app.use(cors(corsOptions));

// // app.use(morgan("dev"));
// // app.use(morgan('combined'))
// app.use(morgan("tiny"));
// app.use(express.json());
// app.use(express.static("client/build"));

// const db = require("./models");
// // const { DB } = require("./config/db.config");
// const Role = db.role;
// //A GARDEER EN DEV
// db.sequelize.sync({ force: true }).then(() => {
// 	console.log("Drop and resync db");
// 	initial();
// });
// const initial = () => {
// 	Role.create({
// 		id: 1,
// 		name: "user",
// 	});
// 	Role.create({
// 		id: 2,
// 		name: "moderator",
// 	});
// 	Role.create({
// 		id: 3,
// 		name: "admin",
// 	});
// };

// //A GARDEER EN PROD
// // db.sequelize.sync()

// // app.use("/image", image);
// // app.use("/image", image);
// // app.use("/image", image);
// // app.use("/tag", tag);
// // app.use("/addProduct", addProduct);
// // app.use("/products", products);
// app.get("/test", (requete, reponse) => {
// 	console.log("ya kk1?");
// 	reponse.send({ msg: "hello ludo" });
// });

// // app.get("/*", (_, reponse) => {
// // 	reponse.sendFile(path.join(__dirname, "../client/build/index.html"));
// // });

// module.exports = app;
