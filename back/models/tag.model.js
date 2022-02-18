module.exports = (sequelize, Sequelize) => {
	const Tag = sequelize.define("tags", {
		id_tagTest: {
			type: Sequelize.STRING,
			primaryKey: true,
		},
		tag: {
			type: Sequelize.STRING,
		},
	});
	return Tag;
};
