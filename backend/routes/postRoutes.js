const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.post('/create', (req, res) => {
    Controllers.postController.createPost(req, res);
});



module.exports = router;