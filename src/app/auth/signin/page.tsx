import { redirect } from "next/navigation";

import { AuthError } from "next-auth";
import { providerMap, auth, signIn } from "../../../auth";
import style from "./style.module.css";
import Container from "@/components/container";
export default async function SignInPage() {
  return (
    <Container>
      <div className={style.container}>
        {Object.values(providerMap).map((provider) => (
          <form
            key={provider.id}
            action={async () => {
              "use server";
              try {
                await signIn(provider.id);
              } catch (error) {
                // Signin can fail for a number of reasons, such as the user
                // not existing, or the user not having the correct role.
                // In some cases, you may want to redirect to a custom error
                if (error instanceof AuthError) {
                  return redirect(`${"/auth/error"}?error=${error.type}`);
                }

                // Otherwise if a redirects happens NextJS can handle it
                // so you can just re-thrown the error and let NextJS handle it.
                // Docs:
                // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                throw error;
              }
            }}
          >
            <button type="submit">
              <span>Sign in with {provider.name}</span>
            </button>
          </form>
        ))}
      </div>
    </Container>
  );
}
