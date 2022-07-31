require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user");
const Message = require("./models/message");

//Set up mongoose connection
const connectToMongo = () => {
  let mongoDB = process.env.mongoURI;
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  let db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  console.log(mongoose.connection.readyState);
};

//save user to db
const userCreate = (userData) => {
  const user = new User({
    firstName: userData.firstName,
    lastName: userData.lastName,
    userName: userData.email,
    password: userData.password,
    membershipStatus: userData.membershipStatus,
    regDate: userData.regDate,
  });

  user.save((err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
};

//save message to db
const messageCreate = (messageData) => {
  const message = new Message({
    user: messageData.userID,
    title: messageData.title,
    timeStamp: new Date(),
    text: messageData.text,
  });

  message.save((err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
};

module.exports = {
  connectToMongo,
  userCreate,
  messageCreate,
};
