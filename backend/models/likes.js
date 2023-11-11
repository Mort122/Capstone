const { DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("../dbConnect").Sequelize;
const User = require('./user');
const Post = require('./posts');

class Like extends Model { }

Like.init({
    
}, {
    sequelize: sequelizeInstance,
    modelName: 'like',
    timestamps: true,
    freezeTableName: true
});

Like.belongsTo(User);
Like.belongsTo(Post);

module.exports = Like;