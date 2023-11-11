const Models = require("../models");

const addComment = (req, res) => {
    const { postId, content } = req.body;

    Models.Comment.create({
        content: content,
        userId: req.userId,
        postId: postId
    }).then(data => {
        res.send({ result: 200, data });
    }).catch(err => {
        res.send({ result: 500, message: err.message });
    });
};


module.exports = {
    addComment
}