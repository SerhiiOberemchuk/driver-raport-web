"use client";

import { useRouter } from "next/navigation";
import { register } from "@/actions/register";
import LoginRegisterForm from "@/components/LoginRegisterForm/LoginRegisterForm";
import { UserDocument } from "@/models/User";

import { useNotifications } from "@toolpad/core";

export default function Register() {
  const router = useRouter();
  const notifications = useNotifications();
  const handleSubmit = async (data: UserDocument) => {
    const r = await register(data);

    if (r?.error) {
      console.log(r.error);
      notifications.show(r.error, { severity: "error" });
    } else {
      notifications.show("Success!!!", { severity: "success" });
      router.push("/login");
    }
  };

  return (
    <LoginRegisterForm handleSubmitProps={handleSubmit} isRegister={true} />
  );
}
