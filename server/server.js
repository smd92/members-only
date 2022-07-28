const express = require("express");
const db = require("./db");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;

const app = express();

app.use((req, res, next) => {
  db.connectToMongo();
  next();
});

//use routes from routes.js
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
