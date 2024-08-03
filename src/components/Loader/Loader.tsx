import React from "react";
import styles from "./Loader.module.css";

type Props = {
  width?: number;
  height?: number;
};

const Loader = ({ width = 100, height = 100 }: Props) => {
  return <span className={styles.loader} style={{ width, height }}></span>;
};

export default Loader;
