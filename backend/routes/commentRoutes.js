const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.post('/add', Controllers.commentController.addComment);

module.exports = router;

