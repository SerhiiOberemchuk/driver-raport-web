"use client";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/actions/register";
import styles from "./Register.module.css";

export default function Register() {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const handleSubmit = async (formData: FormData) => {
    const r = await register({
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name"),
    });
    ref.current?.reset();
    if (r?.error) {
      setError(r.error);
      return;
    } else {
      return router.push("/login");
    }
  };
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <form ref={ref} action={handleSubmit} className="">
        {error && <div className="">{error}</div>}
        <h1 className={styles.hero}>Register</h1>

        <label className="">Full Name</label>
        <input type="text" placeholder="Full Name" className="" name="name" />

        <label className="w-full text-sm">Email</label>
        <input type="email" placeholder="Email" className="" name="email" />

        <label className="">Password</label>
        <div className="">
          <input
            type="password"
            placeholder="Password"
            className=""
            name="password"
          />
        </div>

        <button className="">Sign up</button>

        <Link href="/login" className="">
          Already have an account?
        </Link>
      </form>
    </section>
  );
}
