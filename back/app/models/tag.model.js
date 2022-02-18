module.exports = (sequelize, Sequelize) => {
	const Tag = sequelize.define("tag", {
		id_tag: {
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
