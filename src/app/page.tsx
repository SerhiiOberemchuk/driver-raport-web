import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { ImAddressBook } from "react-icons/im";
import { FaCarRear } from "react-icons/fa6";
import { TbReport } from "react-icons/tb";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          <p>Created By OBEREMCHUK</p>
        </div>
      </div>

      <div className={styles.center}>
        <h1>Mio Viaggio</h1>
      </div>

      <div className={styles.grid}>
        <Link href={"user"} className={styles.card}>
          <h2>Miei Dati</h2>
          <span>
            <ImAddressBook />
          </span>
        </Link>
        <Link href={"delivery"} className={styles.card}>
          <h2>Agiungi viaggio</h2>
          <span>
            <FaCarRear />
          </span>
        </Link>
        <Link href={"report"} className={styles.card}>
          <h2>Raporto</h2>
          <span>
            <TbReport />
          </span>
        </Link>
      </div>
    </main>
  );
}
