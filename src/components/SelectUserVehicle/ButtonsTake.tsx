"use client";
import React from "react";
import { useAppDispatch } from "@/lib/hook";
import { pickupVehicleAsync } from "@/lib/feauters/tracks/trackSlice";
import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

type Props = {
  selectedVehicleId: string;
  title: string;
  clear: () => void;
};

const ButtonTake = ({ selectedVehicleId, title, clear }: Props) => {
  const dispatch = useAppDispatch();
  const user = {
    id: "jjjjj",
    fullName: "derrrr",
  };
  const handleTakeVehicle = async () => {
    if (!selectedVehicleId) {
      showNotification({
        title: "Error",
        message: "Devi scegliere veicolo",
        color: "yellow",
        autoClose: 3000,
        withCloseButton: true,
      });

      return;
    }
    const data = {
      isUse: true,
      userData: {
        userId: user?.id || "",
        userFullName: user?.fullName || "",
        dateStart: new Date(),
      },
    };
    const response = await dispatch(
      pickupVehicleAsync({ id: selectedVehicleId, data })
    );
    if (response) clear();
  };

  return (
    <Button type="button" onClick={handleTakeVehicle}>
      {title}
    </Button>
  );
};

export default ButtonTake;
