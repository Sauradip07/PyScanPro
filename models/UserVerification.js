import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserVerificationSchema = new Schema({
   userId: String,
   uniqueString: String,
   createdAt: Date,
   expiresAt: Date,
});

// create a model with userSchema
export default mongoose.model("UserVerification", UserVerificationSchema);
