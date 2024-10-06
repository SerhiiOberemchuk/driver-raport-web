import { UserDocument } from "@/models/User";
import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";

export const registerUserWithPrisma = async (values: UserDocument) => {
  const { email, password, name, lastName } = values;

  try {
    console.log("try connect");

    const isUser = await prisma.user.findFirst({ where: { email } });
    console.log(isUser);
    if (isUser) {
      return {
        error: "Email already exists!",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserToSave = {
      name,
      email,
      lastName,
      password: hashedPassword,
    };

    const newUser = await prisma.user.create({ data: newUserToSave });

    console.log(newUser);
    return { success: true };
  } catch (e) {
    console.log(e);
    return { error: "Something went wrong!" };
  }
};
