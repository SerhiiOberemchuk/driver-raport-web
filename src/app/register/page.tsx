"use client";

import { useRouter } from "next/navigation";
import { register } from "@/actions/register";
import LoginRegisterForm from "@/components/LoginRegisterForm/LoginRegisterForm";
import { UserDocument } from "@/models/User";
import { toast } from "react-toastify";

export default function Register() {
  const router = useRouter();

  const handleSubmit = async (data: UserDocument) => {
    const r = await register(data);

    if (r?.error) {
      console.log(r.error);
      toast.error(r.error);
    } else {
      toast.success("Success!!!");
      router.push("/login");
    }
  };

  return (
    <LoginRegisterForm handleSubmitProps={handleSubmit} isRegister={true} />
  );
}
