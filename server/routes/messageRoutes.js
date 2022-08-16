const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

//create new message
router.post("/newMessage", messageController.message_create_post);

module.exports = router;
