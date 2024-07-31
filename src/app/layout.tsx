import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import "./globals.css";
import styles from "./page.module.css";
import { inter, lusitana } from "../ui/fonts";
import { FaHome } from "react-icons/fa";

export const metadata: Metadata = {
  title: "My deily repert",
  description: "Allow to seve your work",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <main>
            <header className={styles.description}>
              <div className={styles.descriptionHeader}>
                <p className={lusitana.className}></p>
                <Link href={"/"} className={styles.card}>
                  <FaHome />
                </Link>
                <div>
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
              </div>
            </header>

            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
