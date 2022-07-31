const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    membershipStatus: { type: String, required: true },
    regDate: { type: Date, required: true },
  },
  { collection: "users" }
);

//Export model
module.exports = mongoose.model("user", userSchema);
