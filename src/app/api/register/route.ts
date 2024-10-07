// import bcrypt from "bcryptjs";
// import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // try {
  //   console.log("Starting POST /api/register");

  //   const body = await request.json();
  //   const { email, password, lastName, name } = body;

  //   console.log("Received data:", body);

  //   if (!email || !password) {
  //     console.log("Missing email or password");
  //     return NextResponse.json({ message: "Bad Credentials" }, { status: 422 });
  //   }

  //   const existingUser = await prisma.user.findFirst({
  //     where: { email },
  //   });

  //   console.log("Existing user:", existingUser);

  //   if (existingUser) {
  //     return NextResponse.json(
  //       { message: "User with this email already exists" },
  //       { status: 400 }
  //     );
  //   }

  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   const user = await prisma.user.create({
  //     data: { name, lastName, email, password: hashedPassword },
  //   });

  //   console.log("New user created:", user);

  //   return NextResponse.json(
  //     { user: { id: user.id, email: user.email } },
  //     { status: 201 }
  //   );
  // } catch (error) {
  //   console.error("Error during registration:", error);
  //   return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  // }
  return NextResponse.json("response withiut prisma");
}
