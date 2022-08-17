const Message = require("../models/message");
const db = require("../db");
const { check, validationResult } = require("express-validator");

//add new message
exports.message_create_post = async (req, res, next) => {
  if (req.isAuthenticated()) {
    try {
      //validate and sanitize form data
      await check("userID").trim().isString().run(req);
      await check("messageTitle").trim().isString().run(req);
      await check("messageText").trim().isString().run(req);

      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      db.messageCreate(
        {
          user: req.body.userID,
          title: req.body.messageTitle,
          text: req.body.messageText,
          timeStamp: new Date(),
        },
        req,
        res
      );
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(403).send({
      message: "Log in to access this route",
    });
  }
};

//get all messages
exports.messages_list_get = async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const messageList = await Message.find();
      res.json(messageList);
    } catch (err) {
      res.status(400);
      res.statusMessage = "could not get list of all messages";
      res.send();
    }
  } else {
    res.status(403).send({
      message: "Log in to access this route",
    });
  }
};
