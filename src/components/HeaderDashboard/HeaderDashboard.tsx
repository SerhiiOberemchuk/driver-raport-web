import React from "react";
import styles from "./HeaderDashboard.module.css";
import Link from "next/link";

function HeaderDashboard() {
  return (
    <header className={styles.header}>
      <Link href={"/"}>Home</Link>
    </header>
  );
}

export default HeaderDashboard;
