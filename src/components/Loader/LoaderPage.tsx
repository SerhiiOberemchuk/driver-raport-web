import { Loader, LoadingOverlay } from "@mantine/core";
import React from "react";

type Props = { size?: string };

const LoaderPage = ({ size = "lg" }: Props) => {
  return (
    <LoadingOverlay
      visible
      loaderProps={{
        children: <Loader color="blue" type="oval" size={size} />,
      }}
    />
  );
};

export default LoaderPage;
