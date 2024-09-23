import { NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/UsersModel";
import { User } from "@/types/userTypes";

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password }: Partial<User> = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password required!" },
        {
          status: 422,
        }
      );
    }

    await connectDB();
    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json("Invalid email or password", {
        status: 401,
      });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return NextResponse.json("Invalid email or password", {
        status: 401,
      });
    }

    const { _id: id } = user;
    const payload = { id };
    const token = jwt.sign(payload, JWT_SECRET as string, { expiresIn: "23h" });

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        $set: { token },
      },
      { new: true }
    );
    console.log(updatedUser);
    if (!updatedUser) {
      return NextResponse.json(
        { message: "Failed to update token" },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json({
      id: updatedUser._id,
      email: updatedUser.email,
      name: updatedUser.name,
      surname: updatedUser.surname,
      token: updatedUser.token,
    });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      {
        status: 500,
      }
    );
  }
}
