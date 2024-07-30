import React from "react";

type Props = { children: React.ReactNode };

const layout = async ({ children }: Props) => {
  return <>{children}</>;
};

export default layout;
