const express = require("express");
const db = require("./db");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json()); // to support JSON-encoded request bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded request bodies

app.use((req, res, next) => {
  db.connectToMongo();
  next();
});

//use routes from routes.js
//app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
