const { DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("../dbConnect").Sequelize;
const User = require('./user');
const Post = require('./posts');

class Comment extends Model { }

Comment.init({
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        required: true
    }
}, {
    sequelize: sequelizeInstance,
    modelName: 'comment',
    timestamps: true,
    freezeTableName: true
});

Comment.belongsTo(User);
Comment.belongsTo(Post);

module.exports = Comment;