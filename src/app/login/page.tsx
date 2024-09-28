"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./Login.module.css";
import Section from "@/components/common/section/Section";
import Container from "@/components/common/container/Container";
export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (res?.error) {
      setError(res.error as string);
    }
    if (res?.ok) {
      return router.push("/");
    }
  };

  return (
    <Section>
      <Container>
        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className="">{error}</div>}
          <h1 className={styles.hero}>Sign In</h1>
          <div className={styles.inputBox}>
            <label className="">Email</label>
            <input type="email" placeholder="Email" className="" name="email" />
          </div>

          <div className={styles.inputBox}>
            <label className="w-full text-sm">Password</label>{" "}
            <input
              type="password"
              placeholder="Password"
              className=""
              name="password"
            />
          </div>
          <button className={styles.buttonSubmit}>Sign In</button>

          <Link href="/register" className="">
            Don't have an account?
          </Link>
        </form>
      </Container>
    </Section>
  );
}
