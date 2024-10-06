"use client";

import { useRouter } from "next/navigation";
import LoginRegisterForm from "@/components/LoginRegisterForm/LoginRegisterForm";
import { UserDocument } from "@/models/User";
import { useNotifications } from "@toolpad/core";
import axios from "axios";

function PageRegister() {
  const router = useRouter();
  const notifications = useNotifications();

  const handleSubmit = async (data: UserDocument) => {
    try {
      const response = await axios.post("/api/register", {
        email: data.email,
        password: data.password,
        lastName: data.lastName,
        name: data.name,
      });
      console.log(response);

      if (response.status === 201) {
        notifications.show("Success!!!", { severity: "success" });
        router.push("/login");
      } else if (response.data.error) {
        notifications.show(response.data.error, { severity: "error" });
      }
    } catch (error) {
      console.error("Error during registration:", error);

      if (axios.isAxiosError(error) && error.response?.data?.error) {
        notifications.show(error.response.data.error, { severity: "error" });
      } else {
        notifications.show("Something went wrong!", { severity: "error" });
      }
    }
  };

  return (
    <LoginRegisterForm handleSubmitProps={handleSubmit} isRegister={true} />
  );
}
export default PageRegister;
