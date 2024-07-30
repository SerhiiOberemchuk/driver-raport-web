import { signOut } from "@/auth";
import Container from "@/components/container";

export default function SignOutPage() {
  return (
    <Container>
      <h5>Are you sure you want to sign out?</h5>
      <form
        action={async (formData) => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </Container>
  );
}
