module.exports = (sequelize, Sequelize) => {
	const Reply = sequelize.define("reply", {
		replyId: {
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
        // comId:{
        //         type: Sequelize.INTEGER,
        //         allowNull: false,
        //     },
	});
	return Reply;
};
