"use client";
import React, { useMemo, useState } from "react";
import styles from "./SelectUserVehicle.module.css";
import { useAppSelector } from "@/lib/hook";
import { selectAllTracks } from "@/lib/feauters/tracks/trackSlice";
import { VEHICLE_TYPE } from "@/types/types";
import { useForm } from "react-hook-form";
import ButtonsTakePut from "./ButtonsTakePut";
import clsx from "clsx";

type Props = {};

function SelectUserVehicle({}: Props) {
  // const [isDisabledTrack, setIsDisabledTrack] = useState(false);
  // const [isDisabledTrailer, setIsDisabledTrailer] = useState(false);
  // const [isDisabledFurgone, setIsDisabledFurgone] = useState(false);

  const [trackId, setTrackId] = useState<string | "">("");
  const [trailerId, setTrailerId] = useState<string | "">("");
  const [furgoneId, setFurgoneId] = useState<string | "">("");

  const tracks = useAppSelector(selectAllTracks);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    setValue,
    formState: { errors, defaultValues },
  } = useForm({
    defaultValues: {
      track: "",
      trailer: "",
      furgone: "",
    },
  });

  // const watchTrack = watch("track");
  // const watchTrailer = watch("trailer");
  // const watchFurgone = watch("furgone");

  // useEffect(() => {
  //   setIsDisabledFurgone(!!watchTrack || !!watchTrailer);
  //   setIsDisabledTrack(!!watchFurgone);
  //   setIsDisabledTrailer(!!watchFurgone);
  // }, [watchTrack, watchTrailer, watchFurgone]);

  const typeTrack = useMemo(
    () => tracks?.filter((item) => item.type === VEHICLE_TYPE.track),
    [tracks] || []
  );
  const typeTrailer = useMemo(
    () => tracks?.filter((item) => item.type === VEHICLE_TYPE.trailer),
    [tracks] || []
  );
  const typeFurgone = useMemo(
    () => tracks?.filter((item) => item.type === VEHICLE_TYPE.furgone),
    [tracks] || []
  );
  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className={styles.form}
    >
      <div>
        <label htmlFor="track">Uso camion:</label>
        <select
          id="track"
          {...register("track")}
          onChange={(e) => setTrackId(e.target.selectedOptions[0].id)}
        >
          <option value="">Non selezionato</option>
          {typeTrack.length > 0 &&
            typeTrack.map((item) => (
              <option
                id={item._id}
                key={item._id}
                value={item.licensePlateNumber}
                className={clsx(
                  item.isUse && styles.red,
                  !item.isUse && styles.green
                )}
              >
                {item.licensePlateNumber}{" "}
                {item.isUse && item.users[0].userFullName}
              </option>
            ))}
        </select>
        <ButtonsTakePut type="track" selectedVehicleId={trackId} />
      </div>
      <div>
        <label htmlFor="trailer">Uso rimorchio:</label>
        <select
          id="trailer"
          {...register("trailer")}
          onChange={(e) => setTrailerId(e.target.selectedOptions[0].id)}
        >
          <option value="">Non selezionato</option>
          {typeTrailer.length > 0 &&
            typeTrailer.map((item) => (
              <option
                key={item._id}
                id={item._id}
                value={item.licensePlateNumber}
                className={clsx(
                  item.isUse && styles.red,
                  !item.isUse && styles.green
                )}
              >
                {item.licensePlateNumber}
              </option>
            ))}
        </select>
        <ButtonsTakePut type="trailer" selectedVehicleId={trailerId} />
      </div>
      <div>
        <label htmlFor="furgone">Uso furgone:</label>
        <select
          defaultValue=""
          id="furgone"
          {...register("furgone")}
          onChange={(e) => setFurgoneId(e.target.selectedOptions[0].id)}
        >
          <option value="">Non selezionato</option>
          {typeFurgone.length > 0 &&
            typeFurgone.map((item) => (
              <option
                key={item._id}
                id={item._id}
                value={item.licensePlateNumber}
                className={clsx(
                  item.isUse && styles.red,
                  !item.isUse && styles.green
                )}
              >
                {item.licensePlateNumber}
              </option>
            ))}
        </select>
        <ButtonsTakePut type="furgone" selectedVehicleId={furgoneId} />
      </div>
    </form>
  );
}

export default SelectUserVehicle;
