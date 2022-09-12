const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
verifyToken = (req, res, next) => {
  // console.log("req")
  // console.log("req")
  // console.log("req")
  // console.log("req")
  // console.log("req")
  // console.log("req")
  // console.log(req.headers)
  let token = req.headers["x-access-token"];
  console.log("token")
  console.log(token)
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    console.log("decoded")
    console.log(decoded)
    console.log('err')
    console.log(err)
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    console.log("token decodé !")
    console.log("token decodé !")
    console.log("token decodé !")
    console.log("token decodé !")
    console.log("token decodé !")
    req.userId = decoded.userId;
    req.username = decoded.username;
    req.roles = decoded.roles;
    next();
  });
};
//TODO A FINIR
//EXEMPLE DE L'ECF
// isAdmin = (req, res, next) => {
// 	let token = req.headers["x-access-token"];
// 	if (!token) {
// 		return res.status(403).send({
// 			message: "No token provided!",
// 		});
// 	}
// 	jwt.verify(token, config.secret, (err, decoded) => {
// 		if (err) {
// 			return res.status(401).send({
// 				message: "Unauthorized!",
// 			});
// 		}
// 		let rolesTemp = [];
// 		User.findAll({ where: { email: decoded.email } }).then((user) => {
// 			user[0].getRoles().then((roles) => {
// 				for (let i = 0; i < roles.length; i++) {
// 					rolesTemp.push(roles[i].name);
// 				}
// 				if (rolesTemp.includes("admin")) {
// 					console.log("ta les droits !!!");
// 					next();
// 				} else {
// 					return res.status(401).send({
// 						message: "ta pas les droits des admins!!!",
// 					});
// 				}
// 			});
// 		});
// 	});
// };

// isAdmin = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//     user.getRoles().then(roles => {
//       for (let i = 0; i < roles.length; i++) {
//         if (roles[i].name === "admin") {
//           // next();
//           res.status(200).send({
//             message: "Require Admin Role!"
//           });
//           return;
//         }
//       }
//       res.status(403).send({
//         message: "Require Admin Role!"
//       });
//       return;
//     });
//   });
// };

const authJwt = {
  verifyToken: verifyToken,
  // isAdmin: isAdmin,
};
module.exports = authJwt;