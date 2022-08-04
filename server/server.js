const express = require("express");
const db = require("./db");
//TUT
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
require("./strategies/JwtStrategy");
require("./strategies/LocalStrategy");
require("./authenticate");
const userRouter = require("./routes/userRoutes");
//TUT END

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json()); // to support JSON-encoded request bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded request bodies
//TUT
app.use(cookieParser(process.env.COOKIE_SECRET));
//Add the client URL to the CORS policy

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(passport.initialize());

app.use("/users", userRouter);
//TUT END

app.use((req, res, next) => {
  db.connectToMongo();
  next();
});

//use routes from routes.js
//app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
