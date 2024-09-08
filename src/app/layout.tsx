import type { Metadata } from "next";
import "@mantine/core/styles.layer.css";
import "@mantine/dates/styles.layer.css";
// import "@mantinex/shiki/styles.css";
import "@mantine/notifications/styles.layer.css";
import "@mantine/carousel/styles.layer.css";
import "@mantine/dropzone/styles.layer.css";
import "@mantine/spotlight/styles.layer.css";
// import "@mantinex/mantine-header/styles.css";
import "@mantinex/mantine-logo/styles.css";
import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import { inter } from "../ui/fonts";
import { StoreProvider } from "./StoreProvider";
import { Notifications } from "@mantine/notifications";

export const metadata: Metadata = {
  title: "My deily repert",
  description: "Allow to seve your work",
};

const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  primaryColor: "cyan",
  focusRing: "auto",
  cursorType: "pointer",
  autoContrast: true,
});

interface RootLayoutProps {
  children: React.ReactNode;
}
export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <Notifications position="top-right" />
          <StoreProvider>{children}</StoreProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
