import { authFirebase } from "@/lib/firebase";
import { UserDocument } from "@/models/User";

import { createUserWithEmailAndPassword } from "firebase/auth";

export async function signUp({ email, password }: UserDocument) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      authFirebase,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User created:", user);
  } catch (error) {
    console.error("Error creating user:");
  }
}
