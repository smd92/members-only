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

//get auth status
router.get("/isAuth", (req, res) => {
  console.log(req.session);
  if (req.isAuthenticated()) {
    res.send(
      JSON.stringify({
        isAuth: true,
        userID: req.session.passport.user,
      })
    );
  } else {
    res.send(
      JSON.stringify({
        isAuth: false,
        userID: null,
      })
    );
  }
});

module.exports = router;
