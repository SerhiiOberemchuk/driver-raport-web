// import { NextRequest } from "next/server";
// import authConfig from "./auth.config";
// import NextAuth from "next-auth";

// const { auth } = NextAuth(authConfig);
// export default auth(async function middleware(req: NextRequest) {
//   // Your custom middleware logic goes here
// });

export { auth as middleware } from "./auth";

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
