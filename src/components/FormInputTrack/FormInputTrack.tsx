"use client";
import React from "react";
import { useForm } from "react-hook-form";
import style from "./Form.module.css";
import { optionSelectType, Vehicle, VEHICLE_TYPE } from "@/types/types";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { addNewVehicleAsync } from "@/lib/feauters/tracks/trackSlice";
import Loader from "../Loader/Loader";
import { openModal } from "@/lib/feauters/modal/modalSlice";

type Props = {};

const FormInputTrack = (props: Props) => {
  const { status, error } = useAppSelector((state) => state.tracks);
  const tracksState = useAppSelector((state) => state.tracks);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Vehicle>();

  const dispatch = useAppDispatch();

  const onSubmit = (data: Vehicle) => {
    dispatch(addNewVehicleAsync(data));
    if (!error) {
      dispatch(
        openModal({
          titleModalWindow: tracksState.error ? "Error" : "Con successo!",
          typeModal: tracksState.error ? "error" : "success",
          description: tracksState.error
            ? "Error"
            : "Veicolo aggiunto con successo!",
        })
      );
    }
    reset();
  };

  const isLoader = status === "loading";

  return (
    <>
      <form
        title="Agiungi mezzo"
        className={style.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className={style.title}>Agiungi mezzo</h3>
        <label htmlFor="licensePlateNumber">Targa</label>
        <input
          id="licensePlateNumber"
          {...register("licensePlateNumber", {
            required: true,
            minLength: 7,
            maxLength: 7,
          })}
        />
        {errors.licensePlateNumber && (
          <span className={style.errors}>Per esempio: AB123CD</span>
        )}
        <select
          {...register("type", {
            required: true,
            validate: (value) => value in VEHICLE_TYPE,
          })}
        >
          <option value="">Scegli tipo</option>
          {optionSelectType.map((option, index) => (
            <option key={index} value={option.type}>
              {option.typeName}
            </option>
          ))}
        </select>
        {errors.type && (
          <span className={style.errors}>"Scegli tipo di mezoo"</span>
        )}
        <button type="submit">
          {isLoader ? <Loader width={20} height={20} /> : <span>Ok</span>}
        </button>
      </form>
    </>
  );
};

export default FormInputTrack;
