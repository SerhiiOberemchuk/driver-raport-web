import Link from "next/link";
import styles from "./LoginRegisterForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserDocument } from "@/models/User";
import { object, string, InferType } from "yup";
import React from "react";

interface LoginRegisterFormProps {
  handleSubmitProps: (data: UserDocument) => void;
  isRegister: boolean;
}

const schema = object({
  name: string().min(2, "must be at least 2 characters long").max(20, "long"),

  lastName: string()
    .min(2, "must be at least 2 characters long")
    .max(20, "long"),

  email: string().email().required(),
  password: string().min(6, "min password 6 characters").required(),
}).required();

type FormData = InferType<typeof schema>;

const LoginRegisterForm = ({
  handleSubmitProps,
  isRegister,
}: LoginRegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => handleSubmitProps(data);

  return (
    <section className={styles.section}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.hero}>{isRegister ? "Register" : "Login"}</h1>

        {isRegister && (
          <div>
            <input
              {...register("name")}
              className={styles.input}
              placeholder="Name"
            />

            <p className={styles.errorMessage}>{errors.name?.message}</p>
          </div>
        )}

        {isRegister && (
          <div>
            <input
              {...register("lastName")}
              className={styles.input}
              placeholder="Surname"
            />
            <p className={styles.errorMessage}>{errors.lastName?.message}</p>
          </div>
        )}

        <div>
          <input
            {...register("email")}
            className={styles.input}
            placeholder="Email"
          />
          <p className={styles.errorMessage}>{errors.email?.message}</p>
        </div>

        <div className="">
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className={styles.input}
            name="password"
          />{" "}
          <p className={styles.errorMessage}>{errors.password?.message}</p>
        </div>

        <button className={styles.buttonSubmit}>
          {isRegister ? "Sign up" : "Login"}
        </button>

        {isRegister ? (
          <Link href="/auth/signin" className="">
            Already have an account?
          </Link>
        ) : (
          <Link href="/register" className="">
            Do not have an account?
          </Link>
        )}
      </form>
    </section>
  );
};

export default LoginRegisterForm;
