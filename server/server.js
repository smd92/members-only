const express = require("express");
const session = require("express-session");
require("dotenv").config();
const db = require("./db");
const userRouter = require("./routes/userRoutes");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));

app.use(express.json()); // to support JSON-encoded request bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded request bodies

app.use((req, res, next) => {
  db.connectToMongo();
  next();
});

app.get("/loginSuccess", (req, res, next) => {
  console.log(req.session)
  res.send(req.session)
})

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
