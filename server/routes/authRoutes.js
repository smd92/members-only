const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../authentication/localStrategy");

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

  module.exports = router;