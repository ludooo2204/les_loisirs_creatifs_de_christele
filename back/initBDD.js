let mysql = require("mysql");
const config = require('./config');
let con = mysql.createConnection(config.db);
con.connect(function (err) {
	if (err) throw err;
	console.log("connected!!");

	// INSERT INTO categories` (`id`, `nom`) VALUES (NULL, 'noel');

	con.query(
		"CREATE TABLE IF NOT EXISTS creations ( id_creation INT NOT NULL AUTO_INCREMENT , nom VARCHAR(50) NOT NULL , prix INT NOT NULL , description VARCHAR(300) NOT NULL , likes INT DEFAULT 0 , date_publication DATETIME DEFAULT CURRENT_TIMESTAMP , categorieID INT NOT NULL ,CONSTRAINT FK_categorieID FOREIGN KEY (categorieID) REFERENCES categories(categorieID), PRIMARY KEY (id_creation)) ENGINE = MyISAM;",
		function (err, result) {
			if (err) throw err;
			console.log("base de données  creations CREEE !!");
		}
	);
	con.query("CREATE TABLE IF NOT EXISTS categories ( id_categorie INT NOT NULL AUTO_INCREMENT , categorie VARCHAR(50) NOT NULL , PRIMARY KEY (id_categorie)) ENGINE = MyISAM;", function (err, result) {
		if (err) throw err;
		console.log("base de données  categories CREEE !!");
	});
	con.query("CREATE TABLE IF NOT EXISTS images ( id_image INT NOT NULL AUTO_INCREMENT , url VARCHAR(100) NOT NULL ,CONSTRAINT FK_id_creation FOREIGN KEY (id_creation) REFERENCES creations(id_creation), id_creation INT NOT NULL, PRIMARY KEY (id_image)) ENGINE = MyISAM;", function (err, result) {
		if (err) throw err;
		console.log("base de données  images CREEE !!");
	});


});
module.exports = con;
