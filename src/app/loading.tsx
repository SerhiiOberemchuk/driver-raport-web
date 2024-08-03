import Loader from "@/components/Loader/Loader";
import LoaderWrapper from "@/components/Loader/LoaderWrapper";
import React from "react";

type Props = {};

const Loading = (props: Props) => {
  return (
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
  );
};

export default Loading;
