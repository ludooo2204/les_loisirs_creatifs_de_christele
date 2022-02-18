module.exports = (sequelize, Sequelize) => {
	const Tag = sequelize.define("tags", {
		id_tagTest: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		tag: {
			type: Sequelize.STRING,
		},
	});
	return Tag;
};
