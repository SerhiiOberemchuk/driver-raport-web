import React from "react";
import styles from "./Section.module.css";

type Props = { children: React.ReactNode };

function Section({ children }: Props) {
  return <section className={styles.section}>{children}</section>;
}

export default Section;
