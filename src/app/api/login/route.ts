import { NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/UsersModel";
import { User } from "@/types/userTypes";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password }: Partial<User> = body;

    if (!email || !password)
      return NextResponse.json("Email and password required!", {
        status: 422,
      });

    await connectDB();
    const user = await UserModel.findOne({ email });

    if (!user)
      return NextResponse.json("User not found", {
        status: 409,
      });

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return NextResponse.json("Invalid email or password", { status: 400 });
    }

    return NextResponse.json({
      id: user._id,
      email: user.email,
      name: user.name,
      surname: user.surname,
    });
  } catch (error) {
    return NextResponse.json(`${(error as Error).message}`);
  }
}
