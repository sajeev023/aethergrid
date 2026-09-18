import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";
import { AetherNav } from "@/components/aether-nav";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AetherGrid — A Distributed Private Cloud",
  description:
    "Your files. Your storage. Your network. A private cloud powered by a distributed storage network with end-to-end encryption and automatic replica failover.",
  keywords: [
    "Distributed Cloud Storage",
    "Private cloud",
    "Encrypted cloud drive",
    "AES-256-GCM storage",
    "Peer storage provider",
    "Spare capacity earnings",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3157D5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <AetherNav />
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
