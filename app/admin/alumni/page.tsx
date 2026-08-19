"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Search,
  Loader2,
  Users,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  MapPin,
  Briefcase,
  CheckCircle,
  XCircle,
  FileCheck,
  Check,
  X,
  ExternalLink,
} from "lucide-react";

interface AlumniSubmission {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  batchFrom: string;
  batchTo: string;
  stream: string;
  position: string;
  company: string;
  industry: string;
  qualification: string;
  achievements: string;
  bio: string;
  linkedin: string;
  city: string;
  country: string;
  category?: string;
  photoUrl?: string;
  supportingImages?: string[];
  studentId?: string;
  verificationDetails?: string;
  status: "pending" | "approved" | "rejected";
  notes: string;
  updatedAt: string | null;
}

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending Review", color: "bg-amber-100 text-amber-700" },
  { value: "approved", label: "Approved", color: "bg-green-100 text-green-700" },
  { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-700" },
];

export default function AdminAlumniPage() {
  const [submissions, setSubmissions] = useState<AlumniSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending"); // Default filter is pending
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState<Record<string, string>>({});

  const loadSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter) params.set("status", statusFilter);
      params.set("page", String(page));
      params.set("limit", "15");

      const res = await fetch(`/api/admin/alumni?${params}`, { cache: "no-store" });
      const data = await res.json();
      setSubmissions(data.submissions ?? []);
      setTotal(data.pagination?.total ?? 0);
      setTotalPages(data.pagination?.totalPages ?? 1);

      // Initialize admin notes mapping
      const notesMap: Record<string, string> = {};
      (data.submissions ?? []).forEach((s: AlumniSubmission) => {
        notesMap[s.id] = s.notes;
      });
      setAdminNotes((prev) => ({ ...prev, ...notesMap }));
    } catch (err) {
      console.error("Failed to load alumni submissions", err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, page]);

  useEffect(() => {
    loadSubmissions();
  }, [loadSubmissions]);

  async function updateStatus(id: string, status: "approved" | "rejected" | "pending") {
    setUpdatingId(id);
    try {
      const notes = adminNotes[id] ?? "";
      const res = await fetch("/api/admin/alumni", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, notes }),
      });
      if (res.ok) {
        loadSubmissions();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  }

  async function saveNotes(id: string) {
    setUpdatingId(id);
    try {
      const notes = adminNotes[id] ?? "";
      const res = await fetch("/api/admin/alumni", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, notes }),
      });
      if (res.ok) {
        alert("Internal review notes saved successfully.");
        loadSubmissions();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  }

  const getStatusColor = (s: string) =>
    STATUS_OPTIONS.find((o) => o.value === s)?.color ?? "bg-gray-100 text-gray-600";

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="h-6 w-6 text-[#1d70b8]" /> Alumni Network Applications
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {total} applications found • Review and publish profiles to the Alumni network directory
          </p>
        </div>
      </div>

      {/* Filters Area */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, company, position..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1d70b8] transition-colors"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none cursor-pointer"
        >
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Applications List Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 text-[#1d70b8] animate-spin" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="py-20 text-center">
            <AlertCircle className="h-8 w-8 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No applications found matching the criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-5 py-3.5 font-semibold text-gray-600 text-xs">Alumnus Name</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 text-xs hidden md:table-cell">Batch</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 text-xs hidden lg:table-cell">Current Position</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 text-xs hidden lg:table-cell">Submitted Date</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 text-xs">Status</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 text-xs text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {submissions.map((sub) => (
                  <React.Fragment key={sub.id}>
                    {/* Summary Row */}
                    <tr
                      onClick={() => setExpanded(expanded === sub.id ? null : sub.id)}
                      className={`hover:bg-gray-50/40 cursor-pointer transition-colors ${
                        expanded === sub.id ? "bg-[#1d70b8]/5" : ""
                      }`}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {sub.photoUrl ? (
                            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={sub.photoUrl}
                                alt={sub.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1d70b8] font-bold text-xs flex items-center justify-center flex-shrink-0">
                              {sub.name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-gray-900 leading-snug">{sub.name}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{sub.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell text-gray-600 font-medium">
                        {sub.batchFrom} – {sub.batchTo}
                        <span className="block text-[10px] text-gray-400 font-normal">{sub.stream}</span>
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Briefcase className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                          <div className="truncate max-w-[200px]">
                            <p className="font-medium truncate">{sub.position}</p>
                            <p className="text-[10px] text-gray-400 truncate">{sub.company}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell text-gray-400 text-xs">
                        {new Date(sub.timestamp).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(
                            sub.status
                          )}`}
                        >
                          {sub.status === "pending" ? "Pending Review" : sub.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {sub.status !== "approved" && (
                            <button
                              disabled={updatingId !== null}
                              onClick={() => updateStatus(sub.id, "approved")}
                              title="Approve Submission"
                              className="p-1.5 text-green-600 hover:bg-green-50 border border-green-200 rounded-md transition-colors disabled:opacity-40 cursor-pointer"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                          {sub.status !== "rejected" && (
                            <button
                              disabled={updatingId !== null}
                              onClick={() => updateStatus(sub.id, "rejected")}
                              title="Reject Submission"
                              className="p-1.5 text-red-600 hover:bg-red-50 border border-red-200 rounded-md transition-colors disabled:opacity-40 cursor-pointer"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* Detailed Row Expansion */}
                    {expanded === sub.id && (
                      <tr key={`${sub.id}-detail`}>
                        <td colSpan={6} className="px-6 py-5 bg-gray-50/70 border-t border-b border-gray-100">
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            
                            {/* Profile Details Column (LHS) */}
                            <div className="lg:col-span-8 space-y-4">
                              <h3 className="text-xs font-bold text-[#1d70b8] uppercase tracking-widest border-b border-gray-200 pb-1.5">
                                Professional Biography & Credentials
                              </h3>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                <div>
                                  <span className="font-semibold text-gray-500 block mb-0.5">Highest Qualification</span>
                                  <span className="text-gray-900 font-medium">{sub.qualification}</span>
                                </div>
                                <div>
                                  <span className="font-semibold text-gray-500 block mb-0.5">Industry Segment</span>
                                  <span className="text-gray-900 font-medium">{sub.industry}</span>
                                </div>
                                <div>
                                  <span className="font-semibold text-gray-500 block mb-0.5">Current Location</span>
                                  <span className="text-gray-900 font-medium flex items-center gap-1 mt-0.5">
                                    <MapPin className="h-3.5 w-3.5 text-gray-400" />
                                    {sub.city}, {sub.country}
                                  </span>
                                </div>
                                <div>
                                  <span className="font-semibold text-gray-500 block mb-0.5">Contact Number</span>
                                  <span className="text-gray-900 font-medium">{sub.phone}</span>
                                </div>
                                {sub.linkedin && (
                                  <div className="col-span-1 md:col-span-2">
                                    <span className="font-semibold text-gray-500 block mb-0.5">LinkedIn Profile</span>
                                    <a
                                      href={sub.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 text-[#1d70b8] hover:underline font-medium"
                                    >
                                      <LinkedinIcon className="h-3.5 w-3.5" />
                                      {sub.linkedin}
                                      <ExternalLink className="h-3 w-3" />
                                    </a>
                                  </div>
                                )}
                              </div>

                              <div className="text-xs">
                                <span className="font-semibold text-gray-500 block mb-1">Highlighted Achievements</span>
                                <div className="p-3 bg-amber-50/45 border border-amber-200/50 rounded-lg text-amber-900 font-medium leading-relaxed">
                                  {sub.achievements}
                                </div>
                              </div>

                              <div className="text-xs">
                                <span className="font-semibold text-gray-500 block mb-1">Professional Bio</span>
                                <div className="p-3 bg-white border border-gray-200 rounded-lg text-gray-700 leading-relaxed font-sans">
                                  {sub.bio}
                                </div>
                              </div>

                              {/* Supporting Verification Details */}
                              <div className="p-4 bg-blue-50/20 border border-blue-200/40 rounded-lg space-y-2 text-xs">
                                <h4 className="font-bold text-[#1a5f96] flex items-center gap-1.5">
                                  <FileCheck className="h-4 w-4" /> Batch & Student Verification
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                                  <div>
                                    <span className="text-gray-500 font-medium">Student ID:</span>{" "}
                                    <span className="text-gray-800 font-semibold">{sub.studentId || "Not Provided"}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500 font-medium">Stream/Department:</span>{" "}
                                    <span className="text-gray-800 font-semibold">{sub.stream}</span>
                                  </div>
                                  <div className="sm:col-span-2">
                                    <span className="text-gray-500 font-medium block">Verification Narrative/Notes:</span>{" "}
                                    <p className="text-gray-700 mt-0.5 leading-relaxed">{sub.verificationDetails || "No verification details supplied."}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Supporting Uploads */}
                              {sub.supportingImages && sub.supportingImages.length > 0 && (
                                <div className="space-y-2">
                                  <span className="font-semibold text-gray-500 text-xs block">Additional Supporting Attachments</span>
                                  <div className="flex flex-wrap gap-3">
                                    {sub.supportingImages.map((imgUrl, i) => (
                                      <a
                                        key={i}
                                        href={imgUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-xs rounded hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
                                      >
                                        Attachment {i + 1} <ExternalLink className="h-3 w-3 text-gray-400" />
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Administration Controls Column (RHS) */}
                            <div className="lg:col-span-4 space-y-4">
                              <h3 className="text-xs font-bold text-[#1d70b8] uppercase tracking-widest border-b border-gray-200 pb-1.5">
                                Administration Review Controls
                              </h3>

                              {sub.photoUrl && (
                                <div className="space-y-1">
                                  <span className="font-semibold text-gray-500 text-xs block mb-1">Submitted Profile Photo</span>
                                  <div className="relative aspect-square w-32 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={sub.photoUrl}
                                      alt={sub.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </div>
                              )}

                              {/* Admin Notes */}
                              <div className="space-y-2 text-xs">
                                <span className="font-semibold text-gray-500 block">Internal Review Notes</span>
                                <textarea
                                  value={adminNotes[sub.id] ?? ""}
                                  onChange={(e) =>
                                    setAdminNotes((prev) => ({
                                      ...prev,
                                      [sub.id]: e.target.value,
                                    }))
                                  }
                                  placeholder="Add notes about credentials verification, student status checks, etc."
                                  className="w-full h-24 p-2 bg-white border border-gray-200 rounded-lg outline-none focus:border-[#1d70b8] transition-colors"
                                />
                                <button
                                  disabled={updatingId !== null}
                                  onClick={() => saveNotes(sub.id)}
                                  className="px-3.5 py-2 bg-gray-800 text-white rounded font-semibold hover:bg-gray-900 transition-colors cursor-pointer"
                                >
                                  Save Review Notes
                                </button>
                              </div>

                              {/* Detailed Approval Actions */}
                              <div className="pt-4 border-t border-gray-200 flex flex-col gap-2">
                                <span className="text-xs font-semibold text-gray-500">Transition Status</span>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <button
                                    disabled={updatingId !== null || sub.status === "approved"}
                                    onClick={() => updateStatus(sub.id, "approved")}
                                    className="px-3 py-2.5 rounded font-bold uppercase tracking-wider text-white bg-green-600 hover:bg-green-700 disabled:opacity-40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                                  >
                                    <CheckCircle className="h-4 w-4" /> Approve
                                  </button>
                                  <button
                                    disabled={updatingId !== null || sub.status === "rejected"}
                                    onClick={() => updateStatus(sub.id, "rejected")}
                                    className="px-3 py-2.5 rounded font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 disabled:opacity-40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                                  >
                                    <XCircle className="h-4 w-4" /> Reject
                                  </button>
                                </div>
                              </div>
                            </div>

                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50/50">
            <p className="text-xs text-gray-500">
              Page {page} of {totalPages} ({total} applications)
            </p>
            <div className="flex gap-1.5">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="p-1.5 rounded border border-gray-200 bg-white disabled:opacity-40 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="p-1.5 rounded border border-gray-200 bg-white disabled:opacity-40 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Custom local SVG replacement for Linkedin icon to avoid Lucide resolution issues
function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
