"use client";
import React from "react";
import styles from "./SelectUserVehicle.module.css";
import { useUser } from "@clerk/nextjs";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { selectAllTracks } from "@/lib/feauters/tracks/trackSlice";
import { VEHICLE_TYPE } from "@/types/types";
import { useForm } from "react-hook-form";

type Props = {};

function SelectUserVehicle({}: Props) {
  const { isSignedIn, user } = useUser();
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectAllTracks);
  const { register, handleSubmit } = useForm();
  //   const onSubmit = (data) => console.log(data);
  const typeTrack = tracks.filter((item) => item.type === VEHICLE_TYPE.track);
  const typeTrailer = tracks.filter(
    (item) => item.type === VEHICLE_TYPE.trailer
  );
  const typeFurgone = tracks.filter(
    (item) => item.type === VEHICLE_TYPE.furgone
  );

  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className={styles.form}
    >
      <label htmlFor="track">Uso camion:</label>
      <select {...register("track")}>
        {typeTrack.length > 0 &&
          typeTrack.map((item, index) => (
            <option key={index} value={item.licensePlateNumber}>
              {item.licensePlateNumber}
            </option>
          ))}
      </select>

      <label htmlFor="trailer">Uso rimorchio:</label>
      <select {...register("trailer")}>
        {typeTrailer.length > 0 &&
          typeTrailer.map((item, index) => (
            <option key={index} value={item.licensePlateNumber}>
              {item.licensePlateNumber}
            </option>
          ))}
      </select>

      <label htmlFor="furgone">Uso furgone:</label>
      <select {...register("furgone")}>
        {typeFurgone.length > 0 &&
          typeFurgone.map((item, index) => (
            <option key={index} value={item.licensePlateNumber}>
              {item.licensePlateNumber}
            </option>
          ))}
      </select>
      <input type="submit" />
    </form>
  );
}

export default SelectUserVehicle;
