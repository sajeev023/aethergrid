"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Image,
  FileText,
  GraduationCap,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";

interface DashboardData {
  stats: {
    totalFaculty: number;
    totalGallery: number;
    totalSubmissions: number;
    statusBreakdown: {
      new: number;
      contacted: number;
      under_review: number;
      completed: number;
    };
  };
  recentSubmissions: {
    id: string;
    timestamp: string;
    type: string;
    name: string;
    status: string;
    phone: string;
  }[];
  recentAudit: {
    id: string;
    timestamp: string;
    username: string;
    action: string;
    details: string;
  }[];
}

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  under_review: "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
};

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  under_review: "Under Review",
  completed: "Completed",
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard", { cache: "no-store" })
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 text-[#1d70b8] animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-gray-500">
        <AlertCircle className="h-5 w-5 mr-2" />
        Failed to load dashboard data.
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Faculty",
      value: data.stats.totalFaculty,
      icon: Users,
      color: "bg-blue-500",
      href: "/admin/faculty",
    },
    {
      label: "Gallery Images",
      value: data.stats.totalGallery,
      icon: Image,
      color: "bg-purple-500",
      href: "/admin/gallery",
    },
    {
      label: "Total Submissions",
      value: data.stats.totalSubmissions,
      icon: FileText,
      color: "bg-amber-500",
      href: "/admin/admissions",
    },
    {
      label: "New Inquiries",
      value: data.stats.statusBreakdown.new,
      icon: GraduationCap,
      color: "bg-green-500",
      href: "/admin/admissions",
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome to the LFJC Administration Panel
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <a
              key={card.label}
              href={card.href}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{card.label}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{card.value}</p>
                </div>
                <div className={`${card.color} p-2.5 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Status Breakdown Bar */}
      {data.stats.totalSubmissions > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-8">
          <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#1d70b8]" />
            Submission Status Breakdown
          </h2>
          <div className="flex gap-6 flex-wrap">
            {Object.entries(data.stats.statusBreakdown).map(([key, val]) => (
              <div key={key} className="flex items-center gap-2">
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${STATUS_COLORS[key]}`}>
                  {STATUS_LABELS[key]}
                </span>
                <span className="text-sm font-bold text-gray-700">{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Submissions */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-[#1d70b8]" />
              Recent Submissions
            </h2>
            <a href="/admin/admissions" className="text-xs font-semibold text-[#1d70b8] hover:underline">
              View All →
            </a>
          </div>
          <div className="divide-y divide-gray-50">
            {data.recentSubmissions.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-400">No submissions yet.</div>
            ) : (
              data.recentSubmissions.slice(0, 5).map((sub) => (
                <div key={sub.id} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50/50">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{sub.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {sub.type} • {new Date(sub.timestamp).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${STATUS_COLORS[sub.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {STATUS_LABELS[sub.status] ?? sub.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#1d70b8]" />
              Recent Activity
            </h2>
            <a href="/admin/audit" className="text-xs font-semibold text-[#1d70b8] hover:underline">
              Full Log →
            </a>
          </div>
          <div className="divide-y divide-gray-50">
            {data.recentAudit.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-400">No activity recorded yet.</div>
            ) : (
              data.recentAudit.slice(0, 5).map((entry) => (
                <div key={entry.id} className="px-5 py-3 hover:bg-gray-50/50">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                    <p className="text-sm text-gray-700 truncate">
                      <span className="font-semibold">{entry.username}</span>{" "}
                      <span className="text-gray-400">—</span> {entry.details}
                    </p>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 pl-5">
                    {new Date(entry.timestamp).toLocaleString("en-IN")}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
