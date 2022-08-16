const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    text: { type: String, required: true },
    timeStamp: { type: Date, required: true },
  },
  { collection: "messages" }
);

//Export model
module.exports = mongoose.model("message", messageSchema);
