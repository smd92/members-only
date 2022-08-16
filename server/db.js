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
const userCreate = (userData, req, res) => {
  const user = new User({
    firstName: userData.firstName,
    lastName: userData.lastName,
    username: userData.email,
    password: userData.password,
    membershipStatus: userData.membershipStatus,
    regDate: userData.regDate,
  });

  user.save((err) => {
    if (err) {
      res.statusCode = 500;
      res.send(err);
    } else {
      res.send({ success: true });
    }
  });
};

//save message to db
const messageCreate = (messageData, req, res) => {
  const message = new Message({
    user: messageData.user,
    title: messageData.title,
    text: messageData.text,
    timeStamp: new Date(),
  });

  message.save((err) => {
    if (err) {
      res.statusCode = 500;
      res.send(err);
    } else {
      res.send({ success: true });
    }
  });
};

module.exports = {
  connectToMongo,
  userCreate,
  messageCreate,
};
