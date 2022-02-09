let express = require("express");
let router = express.Router();
let con=require('../initBDD')

router.get("/", (req, res) => {
    console.log("getProducts!");
	try {
      
            console.log("connected!!");
        
            // INSERT INTO categories` (`id`, `nom`) VALUES (NULL, 'noel');
        
        	// con.query("SELECT * FROM creations INNER JOIN categories ON creations.categorieID = categories.id_categorie ", function (err, result) {
        	con.query("SELECT * FROM creations", function (err, result) {
                if (err) throw err;

                result.forEach((element) => {
                    console.log(element);
                });
		res.status(200).json(result);

            });
	} catch (err) {
		console.log("tiens ca bug");
		console.log(err);
		res.status(500).send(err);
	}
});
module.exports = router;
