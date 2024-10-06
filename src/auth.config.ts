import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "./lib/mongodb";
import User from "./models/User";

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email Address", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(c) {
        console.log("start authorize");

        await connectDB();

        const user = await User.findOne({
          email: c?.email,
        }).select("+password");

        if (!user) throw new Error("Wrong Email or Password");

        const passwordMatch = await bcrypt.compare(
          c.password as string,
          user.password
        );
        if (!passwordMatch) throw new Error("Wrong Email or Password");

        return {
          id: user._id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user;
      const isPublicPage = nextUrl.pathname.startsWith("/auth");

      if (isPublicPage || isLoggedIn) {
        return true;
      }

      return false;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
} satisfies NextAuthConfig;
