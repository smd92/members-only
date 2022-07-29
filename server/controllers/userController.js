const User = require("../models/user");
const async = require("async");
const db = require("../db");

// handle user create on POST
exports.user_create_post = function (req, res, next) {
  //db.userCreate(req.body.portfolioName);
  console.log(req.body);
  res.redirect("/");
};
