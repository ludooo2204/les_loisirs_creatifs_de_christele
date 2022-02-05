

const express =require('express')
const path = require('path');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');


// const passport = require('passport');

// let mysql = require("mysql");
// let con = mysql.createConnection({
// 	host: "localhost",
// 	user: "root",
// 	password: "",
//   database:"api"
// });
// con.connect(function (err) {
// 	if (err) throw err;
// 	console.log("connected!!");
// 	con.query("SELECT * FROM etalonnages", function (err, result) {
// 		if (err) throw err;
// result.forEach(element => {
//   console.log(element)
  
// });
// 	});
// });


 const app = express()


// enable files upload
app.use(fileUpload({
    createParentPath: true
}));
//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(express.json())
app.use(express.static('client/build'))

app.post('/addProduct', (req, res) => {
    console.log("coucou");
    try {
        // console.log("ffreq");
        // console.log(req);
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            console.log("req");
            console.log(req.files);
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.file;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            avatar.mv('./uploads/' + avatar.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});
app.get("/test",(requete,reponse)=>{
    console.log("ya kk1?")
    reponse.send({msg:"hello ludo"})
})
app.post("/addProducts",(requete,reponse)=>{
    console.log("post")
    console.log(reponse)
    console.log(requete)
    console.log("ya kk1?")
    reponse.send({msg:"hello ludo"})
})
app.get('/*',(_,reponse)=>{
    reponse.sendFile(path.join(__dirname, './client/build/index.html'))
})

module.exports = app;