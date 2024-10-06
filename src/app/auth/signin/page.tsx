import * as React from "react";
import type { AuthProvider } from "@toolpad/core";
import { SignInPage } from "@toolpad/core/SignInPage";
import { AuthError } from "next-auth";

import {
  CustomButton,
  CustomEmailField,
  CustomPasswordField,
  // ForgotPasswordLink,
  SignUpLink,
} from "@/components/customSignInFields";
import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <SignInPage
      // providers={providerMap} + import { providerMap } from "../../../auth";
      providers={[{ id: "credentials", name: "Email and Password" }]}
      signIn={async (
        provider: AuthProvider,
        formData: FormData
        // callbackUrl?: string
      ) => {
        "use server";
        try {
          await signIn(provider.id, {
            ...(formData && {
              email: formData.get("email"),
              password: formData.get("password"),
            }),
            redirectTo: "/",
          });
          return { name: "serhii", email: "dfdfdfd" };
        } catch (error) {
          if (error instanceof Error && error.message === "NEXT_REDIRECT") {
            throw error;
          }

          if (error instanceof AuthError) {
            return {
              error:
                error.type === "CredentialsSignin"
                  ? "Invalid credentials"
                  : "An error with Auth.js occurred.",
              type: error.type,
            };
          }

          return {
            error: "Something went wrong.",
            type: "UnknownError",
          };
        }
      }}
      slots={{
        emailField: CustomEmailField,
        passwordField: CustomPasswordField,
        submitButton: CustomButton,
        signUpLink: SignUpLink,
        // forgotPasswordLink: ForgotPasswordLink,
      }}
    />
  );
}
