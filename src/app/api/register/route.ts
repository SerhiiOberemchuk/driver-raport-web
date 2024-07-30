import client from "@/lib/mongodb";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

export async function POST(request: Request) {
  console.log("register start");

  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password)
      return NextResponse.json(
        { message: "Email and password required!" },
        { status: 422 }
      );
    const db = await client.db("my-deliveries");
    const userColection = await db.collection("Users");

    const existDriver = await userColection.findOne({ email });

    if (existDriver)
      return NextResponse.json(
        { message: "User with this email alredy exists" },
        { status: 400 }
      );

    const hashPassword = await bcrypt.hash(password, 10);

    const insertedObject = await userColection.insertOne({
      email,
      password: hashPassword,
    });

    const newDriver = await userColection.findOne({
      _id: insertedObject.insertedId,
    });

    console.log(newDriver);

    return NextResponse.json({
      message: "Driver registered successfuly",
      newDriver,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error });
  }
}
