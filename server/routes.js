const express = require("express");
const router = express.Router();

//Require controller modules
const userController = require("./controllers/userController");

router.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

//create user
router.post("/users", userController.user_create_post);

//get user by email
router.get("/users/:email", userController.user_byEmail_get);

//update user membershipStatus
router.put(
  "/users/:id/membershipStatus",
  userController.user_updateMembership_put
);

module.exports = router;
