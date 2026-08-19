"use client";

import { useEffect, useState, useCallback } from "react";
import { ScrollText, Loader2, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";

interface AuditEntry {
  id: string; timestamp: string; username: string;
  action: string; details: string; ip: string;
}

const ACTION_COLORS: Record<string, string> = {
  login_success: "bg-green-100 text-green-700",
  login_failed: "bg-red-100 text-red-700",
  logout: "bg-gray-100 text-gray-600",
  faculty_add: "bg-blue-100 text-blue-700",
  faculty_edit: "bg-amber-100 text-amber-700",
  faculty_delete: "bg-red-100 text-red-700",
  gallery_add: "bg-purple-100 text-purple-700",
  gallery_edit: "bg-amber-100 text-amber-700",
  gallery_delete: "bg-red-100 text-red-700",
  content_update: "bg-indigo-100 text-indigo-700",
  submission_update: "bg-cyan-100 text-cyan-700",
};

export default function AdminAuditPage() {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const loadAudit = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/audit?page=${page}&limit=30`, { cache: "no-store" });
      const data = await res.json();
      setEntries(data.entries ?? []);
      setTotal(data.pagination?.total ?? 0);
      setTotalPages(data.pagination?.totalPages ?? 1);
    } catch { /* empty */ }
    finally { setLoading(false); }
  }, [page]);

  useEffect(() => { loadAudit(); }, [loadAudit]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <ScrollText className="h-6 w-6 text-[#1d70b8]" /> Audit Log
        </h1>
        <p className="text-sm text-gray-500 mt-1">{total} total entries</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><Loader2 className="h-8 w-8 text-[#1d70b8] animate-spin" /></div>
        ) : entries.length === 0 ? (
          <div className="py-16 text-center"><AlertCircle className="h-8 w-8 text-gray-300 mx-auto mb-3" /><p className="text-gray-500 text-sm">No audit entries yet.</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs">Timestamp</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs">User</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs">Action</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs hidden md:table-cell">Details</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs hidden lg:table-cell">IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(entry.timestamp).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-700 text-xs">{entry.username}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${ACTION_COLORS[entry.action] ?? "bg-gray-100 text-gray-600"}`}>
                        {entry.action.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 max-w-xs truncate hidden md:table-cell">{entry.details}</td>
                    <td className="px-4 py-3 text-[10px] text-gray-400 font-mono hidden lg:table-cell">{entry.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">Page {page} of {totalPages}</p>
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
