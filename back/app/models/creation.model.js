module.exports =(sequelize,Sequelize)=>{
    const Creation = sequelize.define("creations",{
        id_creation:{
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey : true,
            autoIncrement: true

        },
        nom:{
            type: Sequelize.STRING,
            allowNull: false,

        },
        prix:{
            type: Sequelize.INTEGER,
            allowNull: false,

        },
        description:{
            type: Sequelize.STRING,
            allowNull: false,

        },
        likes:{
            type: Sequelize.INTEGER,
            defaultValue : 0
        },
    });
    return Creation
}