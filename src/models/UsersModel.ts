import { User } from "@/types/userTypes";
import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
      uppercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.models?.User || model<User>("User", UserSchema);

export default UserModel;
