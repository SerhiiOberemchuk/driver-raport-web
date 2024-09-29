import React from "react";
import styles from "./HeaderDashboard.module.css";
import Link from "next/link";
type Props = {};

function HeaderDashboard({}: Props) {
  return (
    <header className={styles.header}>
      <Link href={"/"}>Home</Link>
    </header>
  );
}

export default HeaderDashboard;
