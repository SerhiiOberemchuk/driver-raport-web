"use client";

import axios, { AxiosError } from "axios";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {};
interface FormData {
  email: string;
  password: string;
}

const PageRegister = (props: Props) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios.post("/api/register", {
        email: data.email,
        password: data.password,
      });
      console.log(response.data);
    } catch (errors) {
      const axiosErrors = errors as AxiosError;
      const message = axiosErrors?.response?.data || "error";
      console.log(message);
    }
  });
  return (
    <>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input {...register("email")} />
        <label>Password</label>
        <input {...register("password")} />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default PageRegister;
