import NextAuth from "next-auth";
// import GitHub from 'next-auth/providers/github';
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import { connectDB } from "./lib/mongodb";
import User from "./models/User";
import bcrypt from "bcryptjs";

const providers: Provider[] = [
  //   GitHub({
  //     clientId: process.env.GITHUB_CLIENT_ID,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET,
  //   }),
  Credentials({
    credentials: {
      email: { label: "Email Address", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(c) {
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
];

const missingVars: string[] = [];

// if (!process.env.GITHUB_CLIENT_ID) {
//   missingVars.push("GITHUB_CLIENT_ID");
// }
// if (!process.env.GITHUB_CLIENT_SECRET) {
//   missingVars.push("GITHUB_CLIENT_SECRET");
// }

if (missingVars.length > 0) {
  const baseMessage =
    "Authentication is configured but the following environment variables are missing:";

  if (process.env.NODE_ENV === "production") {
    throw new Error(`error - ${baseMessage} ${missingVars.join(", ")}`);
  } else {
    console.warn(
      `\u001b[33mwarn\u001b[0m - ${baseMessage} \u001b[31m${missingVars.join(", ")}\u001b[0m`
    );
  }
}

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  }
  return { id: provider.id, name: provider.name };
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
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
});
