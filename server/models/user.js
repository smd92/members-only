const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    membershipStatus: { type: Boolean, required: true },
    isAdmin: { type: Boolean },
    regDate: { type: Date, required: true },
  },
  { collection: "users" }
);

//Export model
module.exports = mongoose.model("user", userSchema);
