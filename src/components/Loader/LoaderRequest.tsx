import { Loader, LoadingOverlay } from "@mantine/core";
import React from "react";

type Props = { visible: boolean };

const LoaderRequest = ({ visible }: Props) => {
  return (
    <LoadingOverlay
      visible={visible}
      loaderProps={{ children: <Loader color="blue" type="dots" /> }}
    />
  );
};

export default LoaderRequest;
