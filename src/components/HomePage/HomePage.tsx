import Link from "next/link";
import React from "react";
import Section from "../common/section/Section";
import Container from "../common/container/Container";
import styles from "./HomePage.module.css";

interface HomePageProps {
  children: React.ReactNode;
  name: string;
}

function HomePage(props: HomePageProps) {
  return (
    <Section>
      <Container>
        <div className={styles.homePage}>
          <nav className={styles.navigation}>
            {props.children}
            <Link href={"/dashboard"} className={styles.linkWork}>
              Start work
            </Link>
          </nav>
          <h1 className={styles.title}>Welcome {props.name}</h1>
        </div>
      </Container>
    </Section>
  );
}

export default HomePage;
