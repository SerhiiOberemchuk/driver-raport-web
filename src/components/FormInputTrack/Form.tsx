"use client";
import { addNewVehicleAsync } from "@/lib/feauters/tracks/trackSlice";
import { useAppDispatch } from "@/lib/hook";
import { Vehicle } from "@/models/VehicleModel";
import { VehicleType } from "@/types/types";
import { Button, TextInput, Group, Select } from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import React from "react";

type Props = {
  close: () => void;
};

function Form({ close }: Props) {
  const form = useForm<Partial<Vehicle>>({
    clearInputErrorOnChange: true,
    mode: "controlled",
    initialValues: {
      licensePlateNumber: "",
      type: "" as VehicleType,
    },

    validate: {
      licensePlateNumber: hasLength({ min: 7, max: 7 }, 'Esempio "AB123CD"'),
      type: isNotEmpty("Devi scegliere tipo di mezzo"),
    },
  });

  const dispatch = useAppDispatch();
  const handleOnSubmit = async () => {
    const response = await dispatch(addNewVehicleAsync(form.getValues()));
    if (response) {
      close();
    }
  };
  return (
    <form title="Agiungi mezzo" onSubmit={form.onSubmit(handleOnSubmit)}>
      <TextInput
        {...form.getInputProps("licensePlateNumber")}
        label="Targa"
        placeholder="Targa"
        key={form.key("licensePlateNumber")}
      />
      <Select
        {...form.getInputProps("type")}
        label="Tipo mezzo"
        placeholder="Sciegli tipo di mezzo"
        data={["track", "trailer", "furgone"]}
        defaultValue="React"
        clearable
        key={form.key("type")}
      />
      <Group justify="center" mt="xl">
        <Button type="submit">Agiungi</Button>
      </Group>
    </form>
  );
}

export default Form;
