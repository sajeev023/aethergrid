"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Image,
  FileText,
  GraduationCap,
  ScrollText,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  Network,
} from "lucide-react";

import type { AdminRole } from "@/lib/admin/types";
import { hasPermission } from "@/lib/admin/types";

interface AdminSession {
  userId: string;
  username: string;
  displayName: string;
  role: AdminRole;
}

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, permission: "dashboard" },
  { label: "Faculty", href: "/admin/faculty", icon: Users, permission: "faculty" },
  { label: "Gallery", href: "/admin/gallery", icon: Image, permission: "gallery" },
  { label: "Admissions", href: "/admin/admissions", icon: GraduationCap, permission: "admissions" },
  { label: "Alumni", href: "/admin/alumni", icon: Network, permission: "alumni" },
  { label: "Content", href: "/admin/content", icon: FileText, permission: "content" },
  { label: "Audit Log", href: "/admin/audit", icon: ScrollText, permission: "audit" },
];

const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  administrator: "Administrator",
  content_manager: "Content Manager",
};

export function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<AdminSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setSession(data.user);
        } else {
          router.push("/admin");
        }
      })
      .catch(() => router.push("/admin"))
      .finally(() => setLoading(false));
  }, [router]);

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1419] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-2 border-[#1d70b8] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const visibleNav = NAV_ITEMS.filter((item) =>
    hasPermission(session.role, item.permission)
  );

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0f1419] border-r border-gray-800 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#1d70b8]/20">
              <ShieldCheck className="h-5 w-5 text-[#1d70b8]" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">LFJC Admin</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">CMS Portal</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {visibleNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-[#1d70b8] text-white shadow-md shadow-[#1d70b8]/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/60"
                }`}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight className="h-3.5 w-3.5 opacity-60" />}
              </a>
            );
          })}
        </nav>

        {/* User Info + Logout */}
        <div className="border-t border-gray-800 p-4">
          <div className="mb-3">
            <p className="text-sm font-semibold text-white truncate">{session.displayName}</p>
            <p className="text-[10px] uppercase tracking-wider text-[#1d70b8] font-bold mt-0.5">
              {ROLE_LABELS[session.role]}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 lg:px-8 py-3 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1" />

          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
            <span className="font-medium text-gray-700">{session.displayName}</span>
            <span className="px-1.5 py-0.5 bg-[#1d70b8]/10 text-[#1d70b8] rounded text-[10px] font-bold uppercase">
              {ROLE_LABELS[session.role]}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
