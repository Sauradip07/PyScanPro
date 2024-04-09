require("dotenv").config(); // environment variable
// require packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// initialise express
const mongoose = require("mongoose");

const app = express();
const port = 8000;

// use cors
app.use(cors());
app.options("*", cors());
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//  mondodb connect
mongoose.connect(process.env.MONGODB_URL)
   .then(() => {
      console.log("connected"); // Success!
   })
   .catch((err) => {
      console.log("err", err);
   });
// create a schema
const studentSchema = new mongoose.Schema({
  roll_no: Number,
  name: String,
  year: Number,
  subjects: [String]
});

// create a model with studentSchema
const Student = mongoose.model("Student", studentSchema);
// create a schema
const stud = new Student({
   roll_no: 1001,
   name: "Madison Hyde",
   year: 3,
   subjects: ["DBMS", "OS", "Graph Theory", "Internet Programming"],
});
stud.save().then(
   () => console.log("One entry added"),
   (err) => console.log(err)
);


app.get("/", async(req, res) => {
  //let result = await Student.find();
  //res.status(200).json(result);

  try{
    let result = await Student.find();
    res.status(200).json(result);
  } catch (error){
    res.status(500).json(error);
  }
});

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
