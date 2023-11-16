const { DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("../dbConnect").Sequelize;
const User = require('./user');

class Post extends Model { }

Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        // required: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        // required: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: sequelizeInstance,
    modelName: 'post',
    timestamps: true,
    freezeTableName: true
});


module.exports = Post;
