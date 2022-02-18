module.exports =(sequelize,Sequelize)=>{
    const Images = sequelize.define("Images",{
        id_image:{
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey : true,
            autoIncrement: true

        },
        url:{
            type: Sequelize.STRING,
            allowNull: false,

        },
        id_creation:{
            type: Sequelize.INTEGER,
            allowNull: false,

        }
    });
    return Images
}