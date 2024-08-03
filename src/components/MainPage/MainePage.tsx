import React from "react";
import styles from "./MainePage.module.css";
import Navigation from "../Navigation/Navigation";
type Props = {};

const MainePage = (props: Props) => {
  return (
    <section className={styles.main}>
      <div className={styles.center}>
        <h1>Mio Viaggio</h1>
      </div>

      <Navigation />
    </section>
  );
};

export default MainePage;
