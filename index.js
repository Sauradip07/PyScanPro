import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import connectDB from "./db/index.js";
import session from "express-session";
import passport from "passport";
//import { User } from "./models/usermodel.js";
//const UserRouter = require("./api/User.js");
import router from "./api/User.js";
dotenv.config({
   path: "./.env",
});
const app = express();
const port = 8001;

// use cors
app.use(cors());
app.options("*", cors());

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// use cookie parser
app.use(cookieParser());

try {
   const connectdb = await connectDB();
   console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
} catch (err) {
   console.log("MONGO db connection failed !!! ", err);
}

app.use("/user", router);

app.use(
   session({
      secret: "Sauradip123",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
   })
);
app.use(passport.initialize()) // init passport on every route call
app.use(passport.session())   

// //create a schema
// // values are gets in frontend
// const stud = new User({
//    roll_no: 1001,
//    name: "Madison Hyde",
//    year: 3,
//    subjects: ["DBMS", "OS", "Graph Theory", "Internet Programming"],
// });
// stud.save().then(
//    () => console.log("One entry added"),
//    (err) => console.log(err)
// );

// app.get("/", async (req, res) => {

//    try {
//       let result = await User.find();
//       res.status(200).json(result);
//    } catch (error) {
//       res.status(500).json(error);
//    }

// });

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
