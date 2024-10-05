import React from "react";
import { StyledEngineProvider } from "@mui/material";
import { AppProvider } from "@toolpad/core/nextjs";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { type Navigation } from "@toolpad/core";
import { SessionProvider, signOut, signIn } from "next-auth/react";
import { auth } from "../auth";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    // segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <DescriptionIcon />,
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "integrations",
    title: "Integrations",
    icon: <LayersIcon />,
  },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const BRANDING = {
    title: "My DRIVER APP",
    logo: (
      <img
        src="https://mui.com/static/logo.svg"
        alt="MUI logo"
        style={{ height: 24 }}
      />
    ),
  };

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <AppProvider
              session={session}
              authentication={{ signIn, signOut }}
              navigation={NAVIGATION}
              // branding={BRANDING}
            >
              <StyledEngineProvider injectFirst>
                {children}
              </StyledEngineProvider>
            </AppProvider>
          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
