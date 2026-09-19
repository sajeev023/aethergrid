"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Cloud,
  HardDrive,
  Activity,
  LogOut,
  Layers,
  Smartphone,
  Menu,
  X,
  Sun,
  Moon,
  ShieldCheck,
} from "lucide-react";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function AetherNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : { user: null }))
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileMenuOpen(false);
    }
    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/login");
  };

  const isGiver = pathname.startsWith("/giver") || user?.activeRole === "GIVER";
  const isSimulator = pathname.startsWith("/mobile-simulator");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md transition-colors">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Lockup + Workspace Switcher */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-[8px] p-1 -m-1"
            aria-label="AetherGrid Home"
          >
            <div className="w-8 h-8 rounded-[8px] bg-[var(--primary)] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Layers className="w-4.5 h-4.5" />
            </div>
            <span className="type-h3 text-[var(--foreground)] font-bold tracking-tight">
              AetherGrid
            </span>
          </Link>

          {/* Role-Aware Workspace Switcher when authenticated */}
          {user && (
            <div className="hidden sm:block">
              <WorkspaceSwitcher
                currentRole={isGiver ? "GIVER" : "TAKER"}
                userEmail={user.email}
              />
            </div>
          )}
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1 text-[14px]"
          aria-label="Primary Navigation"
        >
          {user ? (
            isGiver ? (
              // ── GIVER WORKSPACE NAVIGATION ──
              <>
                <Link
                  href="/giver"
                  className={cn(
                    "px-3 py-1.5 rounded-[8px] font-medium transition-colors",
                    pathname === "/giver"
                      ? "bg-[var(--surface-subtle)] text-[var(--primary)] font-semibold"
                      : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)]"
                  )}
                >
                  My Nodes
                </Link>
                <Link
                  href="/giver/setup"
                  className={cn(
                    "px-3 py-1.5 rounded-[8px] font-medium transition-colors",
                    pathname.startsWith("/giver/setup")
                      ? "bg-[var(--surface-subtle)] text-[var(--primary)] font-semibold"
                      : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)]"
                  )}
                >
                  Connect Storage
                </Link>
                <Link
                  href="/mobile-simulator"
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] font-medium transition-colors",
                    isSimulator
                      ? "bg-[var(--surface-subtle)] text-[var(--primary)] font-semibold"
                      : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)]"
                  )}
                >
                  <Smartphone className="w-3.5 h-3.5 text-[var(--secondary-accent)]" />
                  Simulator
                </Link>
              </>
            ) : (
              // ── TAKER WORKSPACE NAVIGATION ──
              <>
                <Link
                  href="/dashboard"
                  className={cn(
                    "px-3 py-1.5 rounded-[8px] font-medium transition-colors",
                    pathname === "/dashboard"
                      ? "bg-[var(--surface-subtle)] text-[var(--primary)] font-semibold"
                      : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)]"
                  )}
                >
                  Files
                </Link>
                <Link
                  href="/dashboard?tab=backups"
                  className={cn(
                    "px-3 py-1.5 rounded-[8px] font-medium transition-colors",
                    pathname.includes("tab=backups")
                      ? "bg-[var(--surface-subtle)] text-[var(--primary)] font-semibold"
                      : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)]"
                  )}
                >
                  Backups
                </Link>
                <Link
                  href="/dashboard?tab=health"
                  className={cn(
                    "px-3 py-1.5 rounded-[8px] font-medium transition-colors",
                    pathname.includes("tab=health")
                      ? "bg-[var(--surface-subtle)] text-[var(--primary)] font-semibold"
                      : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)]"
                  )}
                >
                  Storage Health
                </Link>
                <Link
                  href="/mobile-simulator"
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] font-medium transition-colors",
                    isSimulator
                      ? "bg-[var(--surface-subtle)] text-[var(--primary)] font-semibold"
                      : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)]"
                  )}
                >
                  <Smartphone className="w-3.5 h-3.5 text-[var(--secondary-accent)]" />
                  Simulator
                </Link>
              </>
            )
          ) : (
            // ── PUBLIC UNINITIALIZED NAVIGATION ──
            <>
              <Link
                href="/#get-storage"
                className="px-3 py-1.5 rounded-[8px] font-medium text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)] transition-colors"
              >
                Get Storage
              </Link>
              <Link
                href="/#give-storage"
                className="px-3 py-1.5 rounded-[8px] font-medium text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)] transition-colors"
              >
                Give Storage
              </Link>
              <Link
                href="/#waitlist"
                className="px-3 py-1.5 rounded-[8px] font-medium text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)] transition-colors"
              >
                Join Waitlist
              </Link>
            </>
          )}
        </nav>

        {/* Right: Actions, Theme Toggle, Auth */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-[8px] border border-[var(--border)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)] transition-colors cursor-pointer"
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {loading ? (
            <div className="w-20 h-9 rounded-[8px] bg-[var(--surface-subtle)] animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] bg-[var(--surface-subtle)] border border-[var(--border-subtle)] text-[12px] text-[var(--foreground-secondary)]">
                <span className="w-2 h-2 rounded-full bg-[var(--success)]" />
                <span className="font-medium truncate max-w-[120px]">{user.name}</span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="p-2 rounded-[8px] border border-[var(--border)] text-[var(--foreground-secondary)] hover:text-[var(--error)] hover:bg-[var(--error-muted)] transition-colors cursor-pointer"
                title="Log out"
                aria-label="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3 py-1.5 rounded-[8px] text-[13px] font-medium text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)] transition-colors"
              >
                Sign In
              </Link>
              <Button asChild size="sm">
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-[8px] border border-[var(--border)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] cursor-pointer"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--surface)] px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
          {user && (
            <div className="pb-3 border-b border-[var(--border-subtle)]">
              <WorkspaceSwitcher
                currentRole={isGiver ? "GIVER" : "TAKER"}
                userEmail={user.email}
                className="w-full"
              />
            </div>
          )}

          <div className="flex flex-col space-y-1">
            {user ? (
              isGiver ? (
                <>
                  <Link
                    href="/giver"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-[8px] text-[14px] text-[var(--foreground)] hover:bg-[var(--surface-subtle)]"
                  >
                    <HardDrive className="w-4 h-4 text-[var(--secondary-accent)]" />
                    My Nodes
                  </Link>
                  <Link
                    href="/giver/setup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-[8px] text-[14px] text-[var(--foreground)] hover:bg-[var(--surface-subtle)]"
                  >
                    <Activity className="w-4 h-4 text-[var(--primary)]" />
                    Connect Storage
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-[8px] text-[14px] text-[var(--foreground)] hover:bg-[var(--surface-subtle)]"
                  >
                    <Cloud className="w-4 h-4 text-[var(--primary)]" />
                    My Cloud Files
                  </Link>
                  <Link
                    href="/dashboard?tab=backups"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-[8px] text-[14px] text-[var(--foreground)] hover:bg-[var(--surface-subtle)]"
                  >
                    <Smartphone className="w-4 h-4 text-[var(--secondary-accent)]" />
                    Mobile Backups
                  </Link>
                  <Link
                    href="/dashboard?tab=health"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-[8px] text-[14px] text-[var(--foreground)] hover:bg-[var(--surface-subtle)]"
                  >
                    <ShieldCheck className="w-4 h-4 text-[var(--success)]" />
                    Storage Health
                  </Link>
                </>
              )
            ) : (
              <>
                <Link
                  href="/#get-storage"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-[8px] text-[14px] text-[var(--foreground)] hover:bg-[var(--surface-subtle)]"
                >
                  Get Storage
                </Link>
                <Link
                  href="/#waitlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-[8px] text-[14px] text-[var(--foreground)] hover:bg-[var(--surface-subtle)]"
                >
                  Join Waitlist
                </Link>
              </>
            )}
          </div>

          {!user && (
            <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center gap-2">
              <Button asChild variant="outline" className="w-full">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  Sign In
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
