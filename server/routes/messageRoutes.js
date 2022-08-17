const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

//create new message
router.post("/newMessage", messageController.message_create_post);

//get all messages
router.get("/", messageController.messages_list_get);

module.exports = router;
