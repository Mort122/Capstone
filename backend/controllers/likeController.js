const Models = require("../models");

const addLike = (req, res) => {
    const postId = req.body.postId;

    Models.Like.create({
        postId: postId,
        userId: req.userId 
    }).then(data => {
        res.send({ result: 200, data });
    }).catch(err => {
        res.send({ result: 500, message: err.message });
    });
};

const removeLike = (req, res) => {
    const postId = req.params.postId;

    Models.Like.destroy({
        where: {
            postId: postId,
            userId: req.userId
        }
    }).then(data => {
        res.send({ result: 200, message: "Like removed" });
    }).catch(err => {
        res.send({ result: 500, message: err.message });
    });
};

module.exports = {
    addLike,
    removeLike
};