"use client";
import React from "react";
import { addNewDataTrack } from "@/lib/feauters/tracks/trackApi";
import { VehicleType } from "@/types/types";
import { useUser } from "@clerk/nextjs";
import styles from "./SelectUserVehicle.module.css";

type Props = {
  type: VehicleType;
  selectedVehicleId: string;
};

const ButtonsTakePut = ({ type, selectedVehicleId }: Props) => {
  const { user } = useUser();

  const handleTakeVehicle = async () => {
    const data = {
      isUse: true,
      userData: {
        userId: user?.id || "",
        userFullName: user?.fullName || "",
        dateStart: new Date(),
      },
    };
    const updated = await addNewDataTrack({ id: selectedVehicleId, data });
  };

  const handlePutVehicle = async () => {
    const data = {
      isUse: false,
      userData: {
        userId: user?.id || "",
        userFullName: user?.fullName || "",
        dateFinish: new Date(),
      },
    };
    const updated = await addNewDataTrack({ id: selectedVehicleId, data });
  };

  return (
    <div className={styles.buttonsContainer}>
      <button type="button" onClick={handleTakeVehicle}>
        Take vehicle
      </button>
      <button type="button" onClick={handlePutVehicle}>
        Put vehicle
      </button>
    </div>
  );
};

export default ButtonsTakePut;
