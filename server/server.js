const express = require("express");
const session = require("express-session");
require("dotenv").config();
const db = require("./db");
<<<<<<< HEAD
=======
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const passport = require("passport");
>>>>>>> 6157f78c527ccbd47563be32572ceacb7faa274b

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

<<<<<<< HEAD
//use routes from routes.js
//app.use("/", routes);
=======
app.get("/sessionPassport", (req, res) => {
  res.send(req.session.passport);
});

app.get("/pp", (req, res) => {
  console.log(req.session);
  if (req.isAuthenticated()) {
      res.send('<h1>You are authenticated</h1>');
  } else {
      res.send('<h1>You are not authenticated</h1>');
  }
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
>>>>>>> 6157f78c527ccbd47563be32572ceacb7faa274b

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
