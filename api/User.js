import express from "express";
const router = express.Router();

// mongodb user model
import User from "../models/User.js";
import bcrypt from "bcrypt";
import passport from "passport";
//signup route

function isLogined(req, res, next) {
   req.user ? next() : res.sendStatus(401);
}

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
   let { email, password } = req.body;
   email = email.trim();
   password = password.trim();

   if (email == "" || password == "") {
      res.json({
         status: "Failed",
         message: "Empty input fields!",
      });
   } else {
      //check if user exists
      User.find({ email })
         .then((data) => {
            if (data) {
               //if the data is exist
               const hashedPassword = data[0].password;
               bcrypt
                  .compare(password, hashedPassword)
                  .then((result) => {
                     if (result) {
                        res.json({
                           status: "Success",
                           message: "User is authenticated Signin Sucessfully!",
                        });
                     } else {
                        res.json({
                           status: "Failed",
                           message: "Invalid Password!",
                        });
                     }
                  })
                  .catch((err) => {
                     res.json({
                        status: "Failed",
                        message: "An error occurred while comparing passwords!",
                     });
                  });
            } else {
               res.json({
                  status: "Failed",
                  message: "Invalid credentials entered!",
               });
            }
         })
         .catch((err) => {
            res.json({
               status: "Failed",
               message: "An error occurred while checking for exsiting users !",
            });
         });
   }
});

// auth with google
router.get("/auth/google", (req, res) => {
   //handle google auth
   passport.authenticate("google", {
      scope: ["profile", "email"],
   });
});

router.get(
   "/auth/google/callback",
   passport.authenticate("google", { failureRedirect: "/login" }),
   (req, res) => {
      // Successful authentication, redirect home.
      successRedirect: "/dashboard";
      failureRedirect: "/auth/google/failure";
      res.redirect("/");
   }
);

router.get("/auth/dashboard", isLogined, (req, res) => {
   let name = req.user.displayName;
   res.send(`Welcome ${name}`);
});

//crete a failure route for google auth
router.get("/auth/google/failure", (req, res) => {
   res.send("Failed to authenticate..");
});

router.get("/logout", (req, res) => {
   req.session.distory();
   res.send("Logged out successfully");
});

export default router;
