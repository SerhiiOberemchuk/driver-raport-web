"use client";
import React from "react";
import { useForm } from "react-hook-form";
import style from "./Form.module.css";
import { optionSelectType, VEHICLE_TYPE } from "@/types/types";
import { useAppDispatch } from "@/lib/hook";
import { addNewVehicleAsync } from "@/lib/feauters/tracks/trackSlice";
import { Vehicle } from "@/models/VehicleModel";

type Props = {};

const FormInputTrack = (props: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Vehicle>();

  const dispatch = useAppDispatch();

  const onSubmit = (data: Vehicle) => {
    dispatch(addNewVehicleAsync(data));
    reset();
  };

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
          <span className={style.errors}>Scegli tipo di mezoo</span>
        )}
        <button type="submit">
          <span>Ok</span>
        </button>
      </form>
    </>
  );
};

export default FormInputTrack;
