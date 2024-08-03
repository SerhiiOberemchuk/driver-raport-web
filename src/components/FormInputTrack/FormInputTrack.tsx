import React from "react";
import { useForm } from "react-hook-form";
import style from "./Form.module.css";
import { optionSelectType, Vehicle } from "@/types/types";
import { useAppDispatch } from "@/lib/hook";
import { addNewVehicleAsync } from "@/lib/feauters/tracks/trackSlice";

type Props = {};

const FormInputTrack = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Vehicle>();
  const dispatch = useAppDispatch();
  return (
    <div>
      <h3 className={style.title}>Agiungi mezzo</h3>
      <form
        className={style.form}
        onSubmit={handleSubmit((data) => dispatch(addNewVehicleAsync(data)))}
      >
        <label htmlFor="licensePlateNumber">Targa</label>
        <input
          {...register("licensePlateNumber", {
            required: true,
            minLength: 7,
            maxLength: 7,
          })}
        />
        {errors.licensePlateNumber && "Per esempio AA111AA"}

        <select {...register("type")}>
          {optionSelectType.map((option, index) => (
            <option key={index} value={option.type}>
              {option.typeName}
            </option>
          ))}
        </select>

        <button type="submit">Ok</button>
      </form>
    </div>
  );
};

export default FormInputTrack;
