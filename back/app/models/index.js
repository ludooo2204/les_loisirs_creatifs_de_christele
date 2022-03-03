const config = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
	host: config.HOST,
	dialect: config.dialect,
	operatorsAliases: false,
	// pool: {
	//   max: config.pool.max,
	//   min: config.pool.min,
	//   acquire: config.pool.acquire,
	//   idle: config.pool.idle
	// }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.tag = require("../models/tag.model.js")(sequelize, Sequelize);
db.creation = require("../models/creation.model.js")(sequelize, Sequelize);
db.image = require("../models/images.model.js")(sequelize, Sequelize);
db.ResetTokens = require("../models/ResetTokens.model.js")(sequelize, Sequelize);
db.Comments = require("../models/comments.model.js")(sequelize, Sequelize);
db.Reply = require("../models/reply.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
	through: "user_roles",
	foreignKey: "roleId",
	otherKey: "userId",
});
db.user.belongsToMany(db.role, {
	through: "user_roles",
	foreignKey: "userId",
	otherKey: "roleId",
});

db.user.belongsToMany(db.creation, {
	through: "userLike_creation",
	foreignKey: "userId",
	otherKey: "id_creation",
});
db.creation.belongsToMany(db.user, {
	through: "userLike_creation",
	foreignKey: "id_creation",
	otherKey: "userId",
});

db.creation.hasMany(db.image, {
	foreignKey: "id_creation",
});
db.image.belongsTo(db.creation);

db.creation.belongsToMany(db.tag, {
	through: "creation_tag",
	foreignKey: "id_creation",
	otherKey: "id_tag",
});
db.tag.belongsToMany(db.creation, {
	through: "creation_tag",
	foreignKey: "id_tag",
	otherKey: "id_creation",
});

db.user.hasMany(db.Comments, {
	foreignKey: "userId",
});
db.Comments.belongsTo(db.user);

db.creation.hasMany(db.Comments, {
	foreignKey: "creationId",
});
db.Comments.belongsTo(db.creation);

db.Comments.hasMany(db.Reply, {
	foreignKey: "comId",
});
db.Reply.belongsTo(db.Comments);

db.user.hasMany(db.Reply, {
	foreignKey: "userId",
});
db.Reply.belongsTo(db.user);

db.ROLES = ["user", "admin"];

// db.Comments.findAll({
//   //  include: [db.user],
//     attributes: { exclude: ["createdAt", "updatedAt"] } })
// 	.then((e) => {
//     // console.log(e[0])
//     console.log(JSON.stringify(e[0], null, 2));

// 		// e.forEach((element) => {
// 		// 	console.log(element);
// 		// });
// 	})
// 	.catch((err) => console.log("loupé", err));

// db.Comments.create({ text: Math.random().toString(), userId: 11,creationId:1})
// .then(console.log("nouvel entrée creeé"))
// .catch((err) => console.log("loupé", err));

// db.creation.findAll({ model: db.Comments,include:{model:}, attributes: { exclude: ["createdAt", "updatedAt"] } })
// db.creation
// 	.findAll({
// 		where: { id_creation: 7 },
// 		order: [
// 			[{ model: db.Comments }, "comId", "ASC"],
// 			// [ { model:db.Reply }, 'replyId','ASC']
// 			[{ model: db.Comments }, { model: db.Reply }, "replyId", "ASC"],
// 		],

// 		include: [
// 			{
// 				model: db.Comments,
// 				attributes: { exclude: ["userId", "creationId", "creationIdCreation"] },
// 				include: [
// 					{ model: db.Reply, attributes: { exclude: ["commentComId", "creationId", "comId", "userId"] }, include: [{ model: db.user, attributes: { exclude: ["password", "createdAt", "updatedAt"] } }] },
// 					{ model: db.user, attributes: { exclude: ["password", "createdAt", "updatedAt"] } },
// 				],
// 			},
// 		],
// 		attributes: { exclude: ["createdAt", "updatedAt"] },
// 	})
// 	.then((data) => {
// 		// console.log(e[0].dataValues)
// 		// console.log(JSON.stringify(data[0], null, 2));
// 		const Commentaires = JSON.parse(JSON.stringify(data))[0].comments;
// 		console.log("#################################");
// 		// console.log(Commentaires);
// 		for (const commentaire of Commentaires) {
//       commentaire.fullname=commentaire.user.username
//       commentaire.userId=commentaire.user.id
//       commentaire.avatarUrl= "https://ui-avatars.com/api/name="+commentaire.user.username+"&background=random" 
//       delete commentaire.user
//       for (const reponse of commentaire.replies){
//         reponse.fullname=reponse.user.username
//         reponse.userId=reponse.user.id
//         reponse.avatarUrl= "https://ui-avatars.com/api/name="+reponse.user.username+"&background=random" 
//         delete reponse.user
//       }
// 		}
// 		console.log("Commentaires nettoyé");
// 		console.log(Commentaires);
// 		console.log(Commentaires[2]);
// 		// console.log(JSON.stringify(test,null,2))
// 	})
// 	.catch((err) => console.log("loupé", err));

// db.Reply.create({ text: Math.random().toString(), userId: 3, comId: 3 })
// 	.then(console.log("nouvel entrée creeé"))
// 	.catch((err) => console.log("loupé", err));

module.exports = db;
