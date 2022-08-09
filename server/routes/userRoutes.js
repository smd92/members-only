const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");
require("../authentication/localStrategy");

router.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

//create user
router.post("/signup", userController.user_create_post);

//login user
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/loginSuccess",
    failureRedirect: "/",
  })
);

//logout user
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send("user logged out");
  });
});

//get user by email
router.get("/email/:email", userController.user_byEmail_get);

//get user by id
router.get("/:id", userController.user_byID_get);

//update user membershipStatus
router.put("/:id/membershipStatus", userController.user_updateMembership_put);

//get user session

module.exports = router;
