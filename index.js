const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = 8000;

app.use(cors());
app.options("*", cors());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected"); // Success!
  })
  .catch((err) => {
    console.log("err", err);
  });
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
