const { DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("../dbConnect").Sequelize;

class Meal extends Model { }



Meal.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        //required: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        //required: true
    },
    cuisine: {
        type: DataTypes.STRING,
        allowNull: true,
        //required: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: sequelizeInstance,
    modelName: 'meal',
    timestamps: true,
    freezeTableName: true
});


module.exports = Meal;