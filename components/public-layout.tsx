"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { NoticesTicker } from "@/components/sections/notices-ticker";

/**
 * Conditionally renders Navbar, NoticesTicker, and Footer.
 * Hidden on all /admin routes.
 */
export function PublicLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar activeInst="lfjc" />
      <NoticesTicker />
      <main id="main-content">{children}</main>
      <Footer activeInst="lfjc" />
      <WhatsAppButton />
    </>
  );
}
