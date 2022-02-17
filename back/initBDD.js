// let mysql = require("mysql");
// const config = require('./config/db.config');
// let con = mysql.createConnection(config.db);
// con.connect(function (err) {
// 	if (err) throw err;
// 	console.log("connected!!");

// 	// INSERT INTO categories` (`id`, `nom`) VALUES (NULL, 'noel');

// 	con.query(
// 		"CREATE TABLE IF NOT EXISTS creations ( id_creation INT NOT NULL AUTO_INCREMENT , nom VARCHAR(50) NOT NULL , prix INT NOT NULL , description VARCHAR(300) NOT NULL , likes INT DEFAULT 0 , date_publication DATETIME DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (id_creation)) ENGINE = MyISAM;",
// 		function (err, result) {
// 			if (err) throw err;
// 			console.log("base de données  creations CREEE !!");
// 		}
// 	);
// 	con.query(
// 		"CREATE TABLE IF NOT EXISTS asso_creations_tags ( id INT NOT NULL AUTO_INCREMENT , id_creation INT NOT NULL , id_tag INT NOT NULL , PRIMARY KEY (id)) ENGINE = MyISAM;",
// 		function (err, result) {
// 			if (err) throw err;
// 			console.log("base de données  asso_creations_tags CREEE !!");
// 		}
// 	);

// 	con.query("CREATE TABLE IF NOT EXISTS images ( id_image INT NOT NULL AUTO_INCREMENT , url VARCHAR(100) NOT NULL ,CONSTRAINT FK_id_creation FOREIGN KEY (id_creation) REFERENCES creations(id_creation), id_creation INT NOT NULL, PRIMARY KEY (id_image)) ENGINE = MyISAM;", function (err, result) {
// 		if (err) throw err;
// 		console.log("base de données  images CREEE !!");
// 	});
// 	con.query("CREATE TABLE IF NOT EXISTS tags ( id_tag INT NOT NULL AUTO_INCREMENT , tag VARCHAR(100) NOT NULL, PRIMARY KEY (id_tag)) ENGINE = MyISAM;", function (err, result) {
// 		if (err) throw err;
// 		console.log("base de données  tags CREEE !!");
// 	});


// });
// module.exports = con;
