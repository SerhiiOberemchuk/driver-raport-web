"use client";
import React from "react";
import Container from "@/components/container";
import FormInputTrack from "@/components/FormInputTrack/FormInputTrack";
import SelectUserVehicle from "@/components/SelectUserVehicle/SelectUserVehicle";
import { useAppSelector } from "@/lib/hook";
import { selectStatusTrack } from "@/lib/feauters/tracks/trackSlice";
import Loader from "@/components/Loader/Loader";

type Props = {};

export default function RepotPage({}: Props) {
  const status = useAppSelector(selectStatusTrack);
  if (status === "loading") {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        <Loader width={100} height={100} />;
      </div>
    );
  }
  return (
    <Container>
      <SelectUserVehicle />
      <FormInputTrack />
    </Container>
  );
}
