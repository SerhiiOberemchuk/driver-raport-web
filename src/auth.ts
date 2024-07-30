import NextAuth from "next-auth";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import * as bcrypt from "bcrypt";
import client from "./lib/mongodb";
import Credentials from "next-auth/providers/credentials";
import { Provider } from "next-auth/providers";
import { MONGODB_COLLECTIONS, MONGODB_NAME } from "./types/types";
import { signInSchema } from "./lib/zod";
import { ZodError } from "zod";

interface User {
  email: string;
  password: string;
}

const providers: Provider[] = [
  GitHub,
  Google,
  Credentials({
    credentials: {
      email: { label: "email", type: "text" },
      password: { label: "password", type: "password" },
    },
    authorize: async (credential) => {
      console.log("start authorized");

      const { email, password } = await signInSchema.parseAsync(credential);

      const db = await client.db(MONGODB_NAME.DbName);

      const collectionUsers = await db.collection(MONGODB_COLLECTIONS.Users);

      const hsPwd = await bcrypt.hash(password, 10);

      const existUser = await collectionUsers.findOne({ email });

      if (!existUser) {
        throw new Error("Email or password is wrong");
      }

      const matchPassword = await bcrypt.compare(password, existUser.password);

      if (!matchPassword) {
        throw new Error("Email or password is wrong");
      }

      console.log("autoriz is successfull");

      return {
        id: existUser._id.toString(),
        name: existUser.name || "User",
        email: existUser.email,
      };
    },
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers,
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
  },
});
