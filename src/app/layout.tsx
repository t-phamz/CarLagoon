import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import { Providers } from "./ReduxProvider";
import Provider from "./provider";
import { store } from "@/state/store";
import { Auth0Provider } from "@auth0/auth0-react";
import { Notifications } from "@mantine/notifications";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Car Lagoon",
  description: "Why use a pool when you have a lagoon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <UserProvider>
        <html lang="en">
          <body>
            <MantineProvider
              theme={createTheme({ fontFamily: "Montserrat, sans-serif" })}
            >
              <ColorSchemeScript />
              <Notifications zIndex={1000} />
              {children}
            </MantineProvider>
          </body>
        </html>
      </UserProvider>
    </Provider>
  );
}
