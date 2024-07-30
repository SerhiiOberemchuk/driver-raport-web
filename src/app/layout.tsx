import type { Metadata } from "next";
import "./globals.css";
import styles from "./page.module.css";
import { inter, lusitana } from "../ui/fonts";
import { SignIn } from "../components/signin-button";
import { SignOut } from "../components/signout-button";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "My deily repert",
  description: "Allow to seve your work",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  console.log(session);

  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <header className={styles.description}>
            <div className={styles.description}>
              <div>
                <p className={lusitana.className}>
                  {session ? <SignOut /> : <SignIn />}
                </p>
              </div>
              <h3>Signed in :{JSON.stringify(session?.user?.name, null, 2)}</h3>
            </div>
          </header>

          {children}
        </main>
      </body>
    </html>
  );
}
