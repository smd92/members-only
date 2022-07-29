const express = require("express");
const router = express.Router();

//Require controller modules
const userController = require("./controllers/userController");

router.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

//create user
router.post("/users", userController.user_create_post);

module.exports = router;
