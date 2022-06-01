const express = require("express");
const app = express();

const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");

// enable files upload
app.use(
	fileUpload({
		createParentPath: true,
	})
);
var corsOptions = {
	origin: "http://localhost:3000",
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "app/views"));

// app.use(cors());
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
	//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });



// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});






const Role = db.role;
function initial() {
	Role.create({
		id: 1,
		name: "user",
	});

	Role.create({
		id: 2,
		name: "admin",
	});
}
