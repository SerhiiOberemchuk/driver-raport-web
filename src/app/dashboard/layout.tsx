import HeaderDashboard from "@/components/HeaderDashboard/HeaderDashboard";
import React from "react";

type Props = { children: React.ReactNode };

function Layout({ children }: Props) {
  return (
    <>
      <HeaderDashboard />
      <main> {children}</main>
    </>
  );
}

export default Layout;
