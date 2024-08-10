"use client";
import React from "react";
import { VehicleType } from "@/types/types";
import { useUser } from "@clerk/nextjs";
import styles from "./SelectUserVehicle.module.css";
import { useAppDispatch } from "@/lib/hook";
import {
  pickupVehicleAsync,
  putVehicleAsync,
} from "@/lib/feauters/tracks/trackSlice";
import { toast } from "react-toastify";

type Props = {
  type: VehicleType;
  selectedVehicleId: string;
};

const ButtonsTakePut = ({ type, selectedVehicleId }: Props) => {
  const { user } = useUser();
  const dispatch = useAppDispatch();

  const handleTakeVehicle = async () => {
    if (!selectedVehicleId) {
      toast.info("Devi scegliere veicolo");
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
    await dispatch(pickupVehicleAsync({ id: selectedVehicleId, data }));
  };

  const handlePutVehicle = async () => {
    if (!selectedVehicleId) {
      toast.info("Devi scegliere veicolo");
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
    await dispatch(putVehicleAsync({ id: selectedVehicleId, data }));
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
