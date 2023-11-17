'use strict'
const User = require('./user');
const Post = require('./posts');
const Comment = require('./comments');
const Like = require('./likes');
const { Meal } = require('./meals');

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { as: 'user' });

async function init() {
    await User.sync();
    await Post.sync();
    await Comment.sync();
    await Like.sync();
    await Meal.sync();
}

init();

module.exports = {
    User,
    Post,
    Comment,
    Like,
    Meal
};