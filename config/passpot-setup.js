import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import dotenv from "dotenv";

passport.use(
   new GoogleStrategy({
      //option for the google strategy
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://localhost:8001/auth/google/callback",
      passReqToCallback: true,
   }),
   authUser = (request, accessToken, refreshToken, profile, done) => {
      //passport callback function
      return done(null, profile);
   }
);

passport.serializeUser((user, done) => {
   done(null, user.id);
});

passport.deserializeUser((user, done) => {
   done(null,user);
});
