"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  Cloud, 
  HardDrive, 
  Server, 
  Smartphone, 
  Activity, 
  LogOut, 
  LogIn, 
  Layers, 
  ShieldCheck,
  Zap,
  ArrowRightLeft
} from "lucide-react";

export function AetherNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (res.ok) return res.json();
        return { user: null };
      })
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/login");
  };

  const handleSwitchRole = async (targetRole: "GIVER" | "TAKER") => {
    try {
      const res = await fetch("/api/auth/switch-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetRole }),
      });
      if (res.ok) {
        if (targetRole === "GIVER") router.push("/giver");
        else router.push("/dashboard");
      }
    } catch {}
  };

  const isGiver = pathname.startsWith("/giver");
  const isTaker = pathname.startsWith("/dashboard");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-emerald-400 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  AetherGrid
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  P2P Grid
                </span>
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                pathname === "/"
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Marketplace
            </Link>

            <Link
              href="/dashboard"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                isTaker
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Cloud className="w-4 h-4 text-blue-400" />
              My Cloud
            </Link>

            <Link
              href="/giver"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                isGiver
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <HardDrive className="w-4 h-4 text-emerald-400" />
              Giver Hub
            </Link>

            <Link
              href="/mobile-simulator"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                pathname.startsWith("/mobile-simulator")
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Smartphone className="w-4 h-4 text-purple-400" />
              Phone Sync
            </Link>

            <Link
              href="/admin"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                pathname.startsWith("/admin")
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Activity className="w-4 h-4 text-cyan-400" />
              Telemetry
            </Link>
          </nav>
        </div>

        {/* Right CTA / User State */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-20 h-8 rounded-lg bg-white/5 animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              {/* Quick Role Toggle */}
              {isGiver ? (
                <button
                  onClick={() => handleSwitchRole("TAKER")}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 transition-all cursor-pointer"
                  title="Switch to Taker Mode"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  Switch to My Cloud
                </button>
              ) : (
                <button
                  onClick={() => handleSwitchRole("GIVER")}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all cursor-pointer"
                  title="Switch to Giver Mode"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  Switch to Giver Hub
                </button>
              )}

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-white font-medium">{user.name}</span>
                <span className="text-slate-400 text-[10px] uppercase font-mono px-1 py-0.5 rounded bg-white/5">
                  {user.activeRole || "TAKER"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
