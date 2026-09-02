import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";
import { institution } from "@/lib/site-data";
import { PublicLayout } from "@/components/public-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? institution.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${institution.name} | Intermediate Education in Uppal, Hyderabad`,
    template: `%s | ${institution.shortName}`,
  },
  description:
    "Little Flower Junior College, Uppal, Hyderabad. Intermediate streams: MPC, BiPC, MEC, CEC.",
  applicationName: institution.name,
  authors: [{ name: institution.name }],
  // NOTE: No root-level canonical is set here. A root `canonical: "/"` would
  // be inherited by every sub-page and tell Google they are all duplicates of
  // the homepage — silently deindexing the richest pages. Each page sets its
  // own self-canonical via its `metadata.alternates.canonical`; pages that
  // omit it simply emit none (Google self-canonicalizes by URL — correct).
  keywords: [
    "Little Flower Junior College",
    "LFJC",
    "Uppal Hyderabad",
    "Intermediate college Hyderabad",
    "MPC BiPC MEC CEC",
    "Montfort Brothers",
  ],
  icons: {
    icon: [
      { url: "/images/lfjc-logo.jpg?v=1", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/images/lfjc-logo.jpg?v=1",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: `${institution.name} | Knowledge is Truth`,
    description:
      "Little Flower Junior College, Uppal, Hyderabad — intermediate education since 1974.",
    url: siteUrl,
    siteName: institution.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/campus-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Little Flower Junior College campus in Uppal, Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${institution.name} | Knowledge is Truth`,
    description:
      "Little Flower Junior College, Uppal, Hyderabad — intermediate education since 1974.",
    images: ["/images/campus-hero.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f4c81",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body
        className={`${inter.variable} ${playfair.variable} ${cormorant.variable} font-sans antialiased`}
      >
        <div className="noise-overlay" />
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}

