import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";
import { AetherNav } from "@/components/aether-nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AetherGrid | Distributed Peer Storage Marketplace & Mobile Backup",
  description:
    "Your phone. Your files. Always recoverable. A decentralized zero-trust personal cloud backed by redundant peer storage nodes.",
  keywords: [
    "Distributed Cloud Storage",
    "Peer-to-peer storage",
    "Phone backup",
    "AES-256 encrypted storage",
    "Spare storage earnings",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-slate-950 text-slate-100 min-h-screen flex flex-col`}>
        <AetherNav />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
