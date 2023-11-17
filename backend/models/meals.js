const { DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("../dbConnect").Sequelize;

class Meal extends Model { }

const getApiMealIdByLocalId = async (localId) => {
    try {
        const query = 'SELECT apiMealId FROM meal_mapping WHERE localId = ?';
        const [results, metadata] = await sequelizeInstance.query(query, {
            replacements: [localId],
            type: sequelizeInstance.QueryTypes.SELECT
        });

        if (!results) {
            console.log(`No results found for localId ${localId}`);
            return null;
        }

        console.log("Query results:", results);
        return results.length > 0 ? results[0].apiMealId : null;
    } catch (error) {
        console.error('Error in getApiMealIdByLocalId:', error);
        throw error;
    }
};





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
    modelName: 'Meal',
    timestamps: true,
    freezeTableName: true
});


module.exports = {
    Meal,
    getApiMealIdByLocalId
}