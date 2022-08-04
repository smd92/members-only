require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user");
const Message = require("./models/message");
//TUT
const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("./authenticate");

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
const userCreate = (userData, req, res) => {
  const user = new User({
    firstName: userData.firstName,
    lastName: userData.lastName,
    userName: userData.email,
    password: userData.password,
    membershipStatus: userData.membershipStatus,
    regDate: userData.regDate,
  });
  //TUT
  const token = getToken({ _id: user._id });
  const refreshToken = getRefreshToken({ _id: user._id });
  user.refreshToken.push({ refreshToken });
  

  user.save((err) => {
    if (err) {
      res.statusCode = 500;
      console.log(err);
      res.send(err);
    } else {
      res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
      res.send({ success: true, token });
    }
  });
  //TUT END
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
