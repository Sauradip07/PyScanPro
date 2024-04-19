import express from "express";
const router = express.Router();

// mongodb user model
import User from "../models/User.js";
import bcrypt from "bcrypt";
//signup route
router.post("/signup", (req, res) => {
   let { name, email, password } = req.body;
   name = name.trim();
   email = email.trim();
   password = password.trim();

   if (name == "" || email == "" || password == "") {
      res.json({
         status: "Failed",
         message: "Empty input fields!",
      });
   } else if (!/^[a-zA-Z ]*$/g.test(name)) {
      res.json({
         status: "Failed",
         message: "Invalid name!",
      });
   } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      res.json({
         status: "Failed",
         message: "Invalid email!",
      });
   } else if (password.length < 8) {
      res.json({
         status: "Failed",
         message: "Password is too short!",
      });
   } else {
      //if the user already exists
      User.find({ email })
         .then((result) => {
            if (result.length) {
               res.json({
                  status: "Failed",
                  message: "Email already exists!",
               });
            } else {
               // try to create new user

               //password handeling using bcryptcon
               const saltRounds = 10;
               bcrypt
                  .hash(password, saltRounds)
                  .then((hashedPassword) => {
                     const newUser = new User({
                        name,
                        email,
                        password: hashedPassword,
                     });
                     newUser
                        .save()
                        .then((result) => {
                           res.json({
                              status: "Success",
                              message: "User has been registered successfully!",
                           });
                        })
                        .catch((err) => {
                           res.json({
                              status: "Failed",
                              message: "An error occurred while saving user!",
                           });
                        });
                  })
                  .catch((err) => {
                     res.json({
                        status: "Failed",
                        message: "An error occurred while hashing password!",
                     });
                  });
            }
         })
         .catch((err) => {
            console.log(err);
            res.json({
               status: "Failed",
               message: "An error occurred while checking for exsiting users !",
            });
         });
   }
});

//signin route

router.post("/signin", (req, res) => {
   res.send("Signin");
});

export default router;
