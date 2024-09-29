"use server";
import { connectDB } from "@/lib/mongodb";
import User, { UserDocument } from "@/models/User";
import bcrypt from "bcryptjs";

export const register = async (values: UserDocument) => {
  const { email, password, name, lastName } = values;

  try {
    await connectDB();
    const userFound = await User.findOne({ email });
    if (userFound) {
      return {
        error: "Email already exists!",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      lastName,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    console.log(savedUser);
    return { success: true };
  } catch (e) {
    console.log(e);
    return { error: "Something went wrong!" };
  }
};
