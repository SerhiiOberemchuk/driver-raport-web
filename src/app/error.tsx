"use client";

import React from "react";
import styles from "./page.module.css";

type Props = { error: Error; reset: () => void };

function Error({ error, reset }: Props) {
  return (
    <div className={styles.error}>
      <p>
        {" "}
        Error:<span>{error.message}</span>{" "}
      </p>
      <button type="button" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}

export default Error;
