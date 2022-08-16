const express = require("express");
const session = require("express-session");
require("dotenv").config();
const db = require("./db");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const messageRouter = require("./routes/messageRoutes");
const passport = require("passport");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate("session"));

app.use(express.json()); // to support JSON-encoded request bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded request bodies

app.use((req, res, next) => {
  db.connectToMongo();
  next();
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/messages", messageRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
