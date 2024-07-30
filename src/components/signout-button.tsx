"use client";
import { signOut } from "next-auth/react";

export function SignOut() {
  return (
    <button onClick={() => signOut()}>
      <h2>Sign Out</h2>
    </button>
  );
}
