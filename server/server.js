const express = require("express");
const session = require("express-session");
require("dotenv").config();
const db = require("./db");
const userRouter = require("./routes/userRoutes");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(
  session({
    secret: "jaja",
    resave: false,
    cookie: { maxAge: 8 * 60 * 60 * 1000 },
    saveUninitialized: true,
  })
);

app.use(express.json()); // to support JSON-encoded request bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded request bodies

app.use((req, res, next) => {
  db.connectToMongo();
  next();
});

app.get("/sessionPassport", (req, res) => {
  res.send(req.session.passport);
});

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
