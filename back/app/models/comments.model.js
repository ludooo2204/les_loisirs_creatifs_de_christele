module.exports = (sequelize, Sequelize) => {
	const Comments = sequelize.define("comments", {
		comId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		text: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		userId: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		creationId: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	
	});
	return Comments;
};
