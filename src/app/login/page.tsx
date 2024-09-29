"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginRegisterForm from "@/components/LoginRegisterForm/LoginRegisterForm";
import { UserDocument } from "@/models/User";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();

  const handleSubmit = async (data: UserDocument) => {
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.error) {
      console.log(res.error);
      toast.error(res.error);
    } else if (res?.ok) {
      toast.success("Success!!!");
      router.push("/");
    }
  };

  return (
    <LoginRegisterForm handleSubmitProps={handleSubmit} isRegister={false} />
  );
}
