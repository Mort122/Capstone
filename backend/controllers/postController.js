const Models = require("../models");


const createPost = (req, res) => {
    const { title, description, image } = req.body;

    Models.Post.create({
        title,
        description,
        image,
        userId: req.userId
    }).then(data => {
        res.send({ result: 200, data });
    }).catch(err => {
        res.send({ result: 500, message: err.message });
    });
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Models.Post.findAll({
            include: [{
                model: Models.User,
                as: 'user', // Use this 'as' if you've defined it in your association
                attributes: ['id', 'firstName', 'lastName'], // Select only necessary fields of the User
            }],
        });
        res.json(posts);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};


module.exports = {
    createPost,
    getAllPosts
};
