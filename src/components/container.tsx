import React from "react";
import styles from "../app/page.module.css";

type Props = { children: React.ReactNode };

const Container = ({ children }: Props) => {
  return <section className={styles.main}>{children}</section>;
};

export default Container;
