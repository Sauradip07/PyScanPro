import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
   {
      roll_no: Number,
      name: String,
      year: Number,
      subjects: [String],
   },
   {
      timestamps: true,
   }
);

// create a model with userSchema
export const User = mongoose.model("User", userSchema);