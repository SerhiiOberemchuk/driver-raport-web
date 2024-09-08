"use client";
import React from "react";
import { useAppDispatch } from "@/lib/hook";
import { putVehicleAsync } from "@/lib/feauters/tracks/trackSlice";
import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

type Props = {
  selectedVehicleId: string;
  title: string;
  clear: () => void;
};

const ButtonPut = ({ selectedVehicleId, title, clear }: Props) => {
  const dispatch = useAppDispatch();
  const user = {
    id: "jjjjj",
    fullName: "derrrr",
  };
  const handlePutVehicle = async () => {
    if (!selectedVehicleId) {
      showNotification({
        title: "Error",
        message: "Devi scegliere veicolo",
        color: "green",
        autoClose: 3000,
        withCloseButton: true,
      });

      return;
    }
    const data = {
      isUse: false,
      userData: {
        userId: user?.id || "",
        userFullName: user?.fullName || "",
        dateFinish: new Date(),
      },
    };
    const response = await dispatch(
      putVehicleAsync({ id: selectedVehicleId, data })
    );
    if (response) clear();
  };

  return (
    <Button type="button" onClick={handlePutVehicle}>
      {title}
    </Button>
  );
};

export default ButtonPut;
