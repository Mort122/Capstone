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
                as: 'user',
                attributes: ['id', 'firstName', 'lastName'],
            }],
        });
        const simplifiedPosts = posts.map(post => post.get({ plain: true }));
        // console.log(posts);
        res.json(simplifiedPosts);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};


module.exports = {
    createPost,
    getAllPosts
};
