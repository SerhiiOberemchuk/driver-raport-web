// import { NextResponse } from "next/server";
// import * as bcrypt from "bcrypt";
// import { connectDB } from "@/lib/mongodb";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { email, password, name, surname } = body;

//     if (!email || !password)
//       return NextResponse.json(
//         { message: "Email and password required!" },
//         { status: 422 }
//       );
//     // await connectDB();
//     // const userColection = await getCollectionDb("my-deliveries", "Users");

//     // const existDriver = await userColection.findOne({ email });

//     // if (existDriver)
//     //   return NextResponse.json(
//     //     { message: "User with this email alredy exists" },
//     //     { status: 400 }
//     //   );

//     const hashPassword = await bcrypt.hash(password, 10);

//     // const insertedObject = await userColection.insertOne({
//     //   email,
//     //   password: hashPassword,
//     //   name,
//     //   surname,
//     // });

//     // const newDriver = await userColection.findOne({
//     //   _id: insertedObject.insertedId,
//     // });

//     return NextResponse.json({
//       message: "Driver registered successfuly",
//       // newDriver,
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: error });
//   }
// }
