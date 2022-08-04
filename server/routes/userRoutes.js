const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport")

router.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

//create user
router.post("/signup", userController.user_create_post);

//login user
router.post("/login", passport.authenticate("local"), userController.user_authenticate_post);

//get user by email
router.get("/:email", userController.user_byEmail_get);

//update user membershipStatus
router.put(
  "/users/:id/membershipStatus",
  userController.user_updateMembership_put
);

module.exports = router;
