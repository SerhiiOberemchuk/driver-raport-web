import type { Metadata } from "next";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import "./globals.css";
import styles from "./page.module.css";
import { inter } from "../ui/fonts";
import { StoreProvider } from "./StoreProvider";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "My deily repert",
  description: "Allow to seve your work",
};

interface RootLayoutProps {
  children: React.ReactNode;
  userdata: React.ReactNode;
}
export default async function RootLayout({
  children,
  userdata,
}: RootLayoutProps) {
  return (
    <StoreProvider>
      <ClerkProvider>
        <html lang="en">
          <body className={inter.className}>
            <Header>{userdata}</Header>
            <main className={styles.mainLayout}>
              <SignedIn>{children}</SignedIn>
              <SignedOut>
                <div>
                  <h1>You must login!!!</h1>
                </div>
              </SignedOut>
            </main>
          </body>
        </html>
      </ClerkProvider>
    </StoreProvider>
  );
}
