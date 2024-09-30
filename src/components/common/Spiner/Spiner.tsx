import React from "react";

import styles from "./Spiner.module.css";

function Spiner() {
  return (
    <div className={styles.spiner}>
      <span className={styles.loader}></span>
    </div>
  );
}

export default Spiner;
