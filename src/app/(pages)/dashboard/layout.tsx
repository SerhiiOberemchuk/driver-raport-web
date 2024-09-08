"use client";

import { Header } from "@/components/Header/Header";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* <p>Welcome {session?.user?.name}</p> */}
    </>
  );
}

export default Layout;
