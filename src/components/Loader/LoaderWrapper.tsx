import React from "react";
import styles from "./Loader.module.css";

type Props = {
  children: React.ReactNode;
};

const LoaderWrapper = ({ children }: Props) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default LoaderWrapper;
