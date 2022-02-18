module.exports =(sequelize,Sequelize)=>{
    const Assoc_creations_tags = sequelize.define("assoc_creations_tags",{
        id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey : true,
            autoIncrement: true

        },
        id_tag:{
            type: Sequelize.INTEGER,
            allowNull: false,

        },
        id_creation:{
            type: Sequelize.INTEGER,
            allowNull: false,

        }
    });
    return Assoc_creations_tags
}