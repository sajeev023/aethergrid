"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Search, Download, Loader2, GraduationCap,
  ChevronLeft, ChevronRight, AlertCircle,
} from "lucide-react";

interface Submission {
  id: string; timestamp: string; type: string; name: string;
  studentName?: string; parentName?: string; email: string;
  phone: string; stream?: string; board?: string;
  percentage?: string; message: string; status: string; notes: string;
}

const STATUS_OPTIONS = [
  { value: "new", label: "New", color: "bg-blue-100 text-blue-700" },
  { value: "contacted", label: "Contacted", color: "bg-amber-100 text-amber-700" },
  { value: "under_review", label: "Under Review", color: "bg-purple-100 text-purple-700" },
  { value: "completed", label: "Completed", color: "bg-green-100 text-green-700" },
];

export default function AdminAdmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [expanded, setExpanded] = useState<string | null>(null);

  const loadSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter) params.set("status", statusFilter);
      if (typeFilter) params.set("type", typeFilter);
      params.set("page", String(page));
      params.set("limit", "15");

      const res = await fetch(`/api/admin/admissions?${params}`, { cache: "no-store" });
      const data = await res.json();
      setSubmissions(data.submissions ?? []);
      setTotal(data.pagination?.total ?? 0);
      setTotalPages(data.pagination?.totalPages ?? 1);
    } catch { /* empty */ }
    finally { setLoading(false); }
  }, [search, statusFilter, typeFilter, page]);

  useEffect(() => { loadSubmissions(); }, [loadSubmissions]);

  async function updateStatus(id: string, status: string) {
    try {
      await fetch("/api/admin/admissions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      loadSubmissions();
    } catch { /* empty */ }
  }

  function handleExport() {
    window.open("/api/admin/admissions/export", "_blank");
  }

  const statusColor = (s: string) => STATUS_OPTIONS.find((o) => o.value === s)?.color ?? "bg-gray-100 text-gray-600";

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-[#1d70b8]" /> Admissions & Inquiries
          </h1>
          <p className="text-sm text-gray-500 mt-1">{total} total submissions</p>
        </div>
        <button onClick={handleExport} className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 bg-white text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input type="text" placeholder="Search by name, phone, stream..." value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1d70b8]" />
        </div>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none cursor-pointer">
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none cursor-pointer">
          <option value="">All Types</option>
          <option value="inquiry">Inquiry</option>
          <option value="contact">Contact</option>
          <option value="admissions">Admissions</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><Loader2 className="h-8 w-8 text-[#1d70b8] animate-spin" /></div>
        ) : submissions.length === 0 ? (
          <div className="py-16 text-center"><AlertCircle className="h-8 w-8 text-gray-300 mx-auto mb-3" /><p className="text-gray-500 text-sm">No submissions found.</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs">Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs hidden md:table-cell">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs hidden lg:table-cell">Contact</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs hidden lg:table-cell">Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {submissions.map((sub) => (
                  <>
                    <tr key={sub.id} onClick={() => setExpanded(expanded === sub.id ? null : sub.id)}
                      className="hover:bg-gray-50/50 cursor-pointer">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{sub.name}</p>
                        {sub.stream && <p className="text-[10px] text-gray-400 mt-0.5">{sub.stream}</p>}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-semibold rounded uppercase">{sub.type}</span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell text-gray-500 text-xs">{sub.phone || sub.email}</td>
                      <td className="px-4 py-3 hidden lg:table-cell text-gray-400 text-xs">{new Date(sub.timestamp).toLocaleDateString("en-IN")}</td>
                      <td className="px-4 py-3">
                        <select value={sub.status} onChange={(e) => { e.stopPropagation(); updateStatus(sub.id, e.target.value); }}
                          onClick={(e) => e.stopPropagation()}
                          className={`px-2 py-1 rounded text-[10px] font-bold uppercase border-0 outline-none cursor-pointer ${statusColor(sub.status)}`}>
                          {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                      </td>
                    </tr>
                    {expanded === sub.id && (
                      <tr key={`${sub.id}-detail`}>
                        <td colSpan={5} className="px-4 py-4 bg-gray-50/70">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                            {sub.studentName && <div><span className="font-semibold text-gray-500">Student:</span> {sub.studentName}</div>}
                            {sub.parentName && <div><span className="font-semibold text-gray-500">Parent:</span> {sub.parentName}</div>}
                            {sub.email && <div><span className="font-semibold text-gray-500">Email:</span> {sub.email}</div>}
                            {sub.phone && <div><span className="font-semibold text-gray-500">Phone:</span> {sub.phone}</div>}
                            {sub.board && <div><span className="font-semibold text-gray-500">Board:</span> {sub.board}</div>}
                            {sub.percentage && <div><span className="font-semibold text-gray-500">Marks:</span> {sub.percentage}</div>}
                          </div>
                          {sub.message && <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200 text-xs text-gray-600">{sub.message}</div>}
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">Page {page} of {totalPages} ({total} total)</p>
            <div className="flex gap-1">
              <button disabled={page <= 1} onClick={() => setPage(page - 1)}
                className="p-1.5 rounded-md border border-gray-200 disabled:opacity-40 hover:bg-gray-50 cursor-pointer">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}
                className="p-1.5 rounded-md border border-gray-200 disabled:opacity-40 hover:bg-gray-50 cursor-pointer">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
