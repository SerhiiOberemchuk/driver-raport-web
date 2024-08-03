import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { ImAddressBook } from "react-icons/im";
import { FaCarRear } from "react-icons/fa6";
import { TbReport } from "react-icons/tb";
import NavigationLink from "./NavigationLink";

type Props = {};

const Navigation = (props: Props) => {
  return (
    <div className={styles.grid}>
      <NavigationLink href="user" linkTitle="Miei Dati">
        <ImAddressBook />
      </NavigationLink>
      <NavigationLink href="delivery" linkTitle="Agiungi viaggio">
        <FaCarRear />
      </NavigationLink>
      <NavigationLink href="report" linkTitle="Raporto">
        <TbReport />
      </NavigationLink>
    </div>
  );
};

export default Navigation;
