const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.post('/add', Controllers.likeController.addLike);

router.delete('/remove/:postId', Controllers.likeController.removeLike);

module.exports = router;