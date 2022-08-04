const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//TUT
const passportLocalMongoose = require("passport-local-mongoose");

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});
//TUT END

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    membershipStatus: { type: Boolean, required: true },
    regDate: { type: Date, required: true },
    //TUT
    authStrategy: {
      type: String,
      default: "local",
    },
    points: {
      type: Number,
      default: 50,
    },
    refreshToken: {
      type: [Session],
    },
    //TUT END
  },
  { collection: "users" }
);

//TUT
//Remove refreshToken from the response
userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken;
    return ret;
  },
});

userSchema.plugin(passportLocalMongoose);
//TUT END

//Export model
module.exports = mongoose.model("user", userSchema);
