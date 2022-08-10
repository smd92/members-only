const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//create user
router.post("/signup", userController.user_create_post);

//get user by email
router.get("/email/:email", userController.user_byEmail_get);

//get user by id
router.get("/:id", userController.user_byID_get);

//update user membershipStatus
router.put("/:id/membershipStatus", userController.user_updateMembership_put);

module.exports = router;
