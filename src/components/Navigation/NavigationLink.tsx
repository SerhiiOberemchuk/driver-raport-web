import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";

type Props = {
  linkTitle: string;
  href: "user" | "delivery" | "report";
  children: React.ReactNode;
};

const NavigationLink = (props: Props) => {
  return (
    <Link href={props.href} className={styles.card}>
      <h2>{props.linkTitle}</h2>
      <span>{props.children}</span>
    </Link>
  );
};

export default NavigationLink;
