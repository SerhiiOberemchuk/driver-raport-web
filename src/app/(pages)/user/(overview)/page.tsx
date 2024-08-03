"use client";
import React from "react";
import Container from "@/components/container";
import FormInputTrack from "@/components/FormInputTrack/FormInputTrack";
import SelectUserVehicle from "@/components/SelectUserVehicle/SelectUserVehicle";

type Props = {};

export default function RepotPage({}: Props) {
  return (
    <Container>
      <div>
        <SelectUserVehicle />
        <FormInputTrack />
      </div>
    </Container>
  );
}
