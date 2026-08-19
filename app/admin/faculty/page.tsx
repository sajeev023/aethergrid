"use client";

import { useEffect, useState, useRef, type FormEvent } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Upload,
  Search,
  Loader2,
  X,
  Users,
  AlertCircle,
} from "lucide-react";

interface Faculty {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  department: string;
  experience: string;
  photoUrl: string;
  order: number;
}

const DEPARTMENTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Botany & Zoology",
  "English",
  "Telugu",
  "Hindi",
  "Commerce & Economics",
  "Computer Science",
  "Physical Education",
  "Administration",
  "Other",
];

export default function AdminFacultyPage() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [form, setForm] = useState({
    name: "",
    designation: "",
    qualification: "",
    department: "",
    experience: "",
    photoUrl: "",
  });

  useEffect(() => {
    loadFaculty();
  }, []);

  async function loadFaculty() {
    try {
      const res = await fetch("/api/admin/faculty", { cache: "no-store" });
      const data = await res.json();
      setFaculty(data.faculty ?? []);
    } catch {
      console.error("Failed to load faculty");
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setEditingFaculty(null);
    setForm({ name: "", designation: "", qualification: "", department: "", experience: "", photoUrl: "" });
    setShowModal(true);
  }

  function openEditModal(f: Faculty) {
    setEditingFaculty(f);
    setForm({
      name: f.name,
      designation: f.designation,
      qualification: f.qualification,
      department: f.department,
      experience: f.experience,
      photoUrl: f.photoUrl,
    });
    setShowModal(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const method = editingFaculty ? "PUT" : "POST";
      const body = editingFaculty ? { ...form, id: editingFaculty.id } : form;

      const res = await fetch("/api/admin/faculty", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setShowModal(false);
        loadFaculty();
      }
    } catch {
      console.error("Failed to save faculty");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Are you sure you want to remove ${name}? This action cannot be undone.`)) return;

    try {
      await fetch(`/api/admin/faculty?id=${id}`, { method: "DELETE" });
      loadFaculty();
    } catch {
      console.error("Failed to delete faculty");
    }
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/faculty/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setForm((prev) => ({ ...prev, photoUrl: data.url }));
      }
    } catch {
      console.error("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  const filtered = faculty
    .filter((f) => {
      if (search && !f.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (deptFilter && f.department !== deptFilter) return false;
      return true;
    })
    .sort((a, b) => a.order - b.order);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 text-[#1d70b8] animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="h-6 w-6 text-[#1d70b8]" />
            Faculty Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">{faculty.length} faculty members</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1d70b8] text-white text-sm font-semibold rounded-lg hover:bg-[#1a65a5] transition-colors cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add Faculty
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1d70b8] focus:ring-2 focus:ring-[#1d70b8]/10 transition-all"
          />
        </div>
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1d70b8] cursor-pointer"
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Faculty Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <AlertCircle className="h-8 w-8 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            {faculty.length === 0
              ? "No faculty members added yet. Click \"Add Faculty\" to start."
              : "No faculty match your current filters."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((f) => (
            <div
              key={f.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start gap-4 p-5">
                {/* Photo */}
                <div className="h-14 w-14 shrink-0 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                  {f.photoUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={f.photoUrl} alt={f.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400 text-lg font-bold">
                      {f.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 truncate">{f.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{f.designation}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-semibold rounded">
                      {f.department}
                    </span>
                    {f.experience && (
                      <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-semibold rounded">
                        {f.experience}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEditModal(f)}
                    className="p-1.5 rounded-md hover:bg-blue-50 text-gray-400 hover:text-[#1d70b8] transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(f.id, f.name)}
                    className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                {editingFaculty ? "Edit Faculty" : "Add Faculty Member"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1d70b8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Designation</label>
                  <input
                    type="text"
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    placeholder="e.g. Lecturer"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1d70b8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Department *</label>
                  <select
                    required
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1d70b8] cursor-pointer"
                  >
                    <option value="">Select</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Qualification</label>
                <input
                  type="text"
                  value={form.qualification}
                  onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                  placeholder="e.g. M.Sc., B.Ed."
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1d70b8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Experience</label>
                <input
                  type="text"
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  placeholder="e.g. 15+ years"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1d70b8]"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Photo</label>
                <div className="flex items-center gap-3">
                  {form.photoUrl && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={form.photoUrl} alt="Preview" className="h-12 w-12 rounded-lg object-cover border" />
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    {uploading ? "Uploading..." : "Upload Photo"}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
                {form.photoUrl && (
                  <p className="mt-1 text-[10px] text-gray-400 truncate">{form.photoUrl}</p>
                )}
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-[#1d70b8] text-white text-sm font-semibold rounded-lg hover:bg-[#1a65a5] disabled:opacity-60 cursor-pointer"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editingFaculty ? "Save Changes" : "Add Faculty"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
