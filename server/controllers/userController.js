const User = require("../models/user");
const async = require("async");
const db = require("../db");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// handle user create on POST
exports.user_create_post = async (req, res, next) => {
  //validate and sanitize form data
  await check("firstName").trim().isString().run(req);
  await check("lastName").trim().isString().run(req);
  await check("email")
    .normalizeEmail({ gmail_remove_dots: false })
    .isEmail()
    .run(req);
  await check("password").isLength({ min: 8 }).run(req);
  await check(
    "confirmPassword",
    "passwordConfirmation field must have the same value as the password field"
  )
    .custom((value, { req }) => value === req.body.password)
    .run(req);
  await check("membershipStatus").toBoolean().isBoolean().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  //encrypt user password and save user to db
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      return console.log(err);
    } else {
      db.userCreate({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        membershipStatus: req.body.membershipStatus,
        regDate: new Date(),
      });
    }
  });

  res.redirect("/");
};

//get user by email
exports.user_byEmail_get = async (req, res, next) => {
  await check("email")
    .normalizeEmail({ gmail_remove_dots: false })
    .isEmail()
    .run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  try {
    const user = await User.findOne(
      { userName: req.params.email },
      { _id: 1, membershipStatus: 1 }
    ).orFail();

    res.json(user);
  } catch (err) {
    res.status(400);
    res.statusMessage = `Could not find user ${req.params.email}`;
    res.send();
  }
};

//update user memberShipStatus by ID
exports.user_updateMembership_put = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      membershipStatus: req.body.membershipStatus,
    });
    res.send(`membershipStatus set to ${req.body.membershipStatus}`);
  } catch (err) {
    res.status(400);
    res.send("Could not update membershipStatus");
  }
};
