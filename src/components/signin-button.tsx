"use client";
import { signIn } from "next-auth/react";

export function SignIn() {
  return (
    <button
      type="button"
      onClick={() => signIn("credential", { redirectTo: "/" })}
    >
      <h2>Sign In</h2>
    </button>
  );
}

// import { signOut } from "@/auth";
// export function SignOut() {
//   return (
//     <form
//       action={async () => {
//         "use server";
//         await signOut();
//       }}
//     >
//       <button type="submit">Sign Out</button>
//     </form>
//   );
// }
