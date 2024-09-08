import { NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/UsersModel";
import { User } from "@/types/userTypes";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, surname }: User = body;

    if (!email || !password || !name || !surname)
      return NextResponse.json("Email, password, name and surname required!", {
        status: 422,
      });

    await connectDB();
    const existUser = await UserModel.findOne({ email });

    if (existUser)
      return NextResponse.json("User with this email alredy exists", {
        status: 409,
      });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      email,
      password: hashPassword,
      name,
      surname,
    });

    if (!newUser) {
      return NextResponse.json("Something went wrong during user creation", {
        status: 500,
      });
    }

    return NextResponse.json(
      { email: newUser.email, name: newUser.name },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(`${(error as Error).message}`);
  }
}
