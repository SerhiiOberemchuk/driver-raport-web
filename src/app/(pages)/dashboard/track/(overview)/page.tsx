"use client";
import React from "react";
import FormInputTrack from "@/components/FormInputTrack/FormInputTrack";
import SelectUserVehicle from "@/components/SelectUserVehicle/SelectUserVehicle";
import ContainerPage from "@/components/Containers/ContainerPage";
import { Divider, Stack } from "@mantine/core";
import { useAppSelector } from "@/lib/hook";
import { selectStatusTrack } from "@/lib/feauters/tracks/trackSlice";
import LoaderRequest from "@/components/Loader/LoaderRequest";

type Props = {};

export default function RepotPage({}: Props) {
  const loading = useAppSelector(selectStatusTrack);
  const visible = loading === "loading";
  return (
    <ContainerPage>
      <Stack justify="center" align="center">
        <SelectUserVehicle />
        <Divider c="green" my="md" size="lg" />
        <FormInputTrack />
      </Stack>
      <LoaderRequest visible={visible} />
    </ContainerPage>
  );
}
