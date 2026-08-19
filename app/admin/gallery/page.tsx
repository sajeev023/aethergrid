"use client";

import { useEffect, useState, useRef, type FormEvent } from "react";
import {
  Plus, Pencil, Trash2, Upload, Search, Loader2, X,
  Image as ImageIcon, FolderPlus, AlertCircle,
} from "lucide-react";

interface GalleryItem {
  id: string; title: string; caption: string; category: string;
  album: string; src: string; order: number;
}

interface GalleryAlbum {
  id: string; name: string; description: string;
}

const CATEGORIES = ["campus", "academics", "sports", "life", "events", "jubilee", "other"];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({ title: "", caption: "", category: "campus", album: "", src: "" });
  const [albumForm, setAlbumForm] = useState({ name: "", description: "" });

  useEffect(() => { loadGallery(); }, []);

  async function loadGallery() {
    try {
      const res = await fetch("/api/admin/gallery", { cache: "no-store" });
      const data = await res.json();
      setItems(data.items ?? []);
      setAlbums(data.albums ?? []);
    } catch { /* empty */ }
    finally { setLoading(false); }
  }

  function openAdd() {
    setEditing(null);
    setForm({ title: "", caption: "", category: "campus", album: "", src: "" });
    setShowModal(true);
  }

  function openEdit(item: GalleryItem) {
    setEditing(item);
    setForm({ title: item.title, caption: item.caption, category: item.category, album: item.album, src: item.src });
    setShowModal(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const method = editing ? "PUT" : "POST";
      const body = editing ? { ...form, id: editing.id } : form;
      const res = await fetch("/api/admin/gallery", {
        method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
      });
      if (res.ok) { setShowModal(false); loadGallery(); }
    } catch { /* empty */ }
    finally { setSaving(false); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this gallery image?")) return;
    try { await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" }); loadGallery(); }
    catch { /* empty */ }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData(); fd.append("file", file);
    try {
      const res = await fetch("/api/admin/gallery/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.url) setForm((p) => ({ ...p, src: data.url }));
    } catch { /* empty */ }
    finally { setUploading(false); }
  }

  async function handleCreateAlbum(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create_album", ...albumForm }),
      });
      if (res.ok) { setShowAlbumModal(false); setAlbumForm({ name: "", description: "" }); loadGallery(); }
    } catch { /* empty */ }
    finally { setSaving(false); }
  }

  const filtered = items.filter((i) => {
    if (search && !i.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (catFilter && i.category !== catFilter) return false;
    return true;
  });

  if (loading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 text-[#1d70b8] animate-spin" /></div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ImageIcon className="h-6 w-6 text-[#1d70b8]" /> Gallery Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} images • {albums.length} albums</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowAlbumModal(true)} className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 bg-white text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <FolderPlus className="h-4 w-4" /> New Album
          </button>
          <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1d70b8] text-white text-sm font-semibold rounded-lg hover:bg-[#1a65a5] transition-colors cursor-pointer">
            <Plus className="h-4 w-4" /> Add Image
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input type="text" placeholder="Search images..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1d70b8]" />
        </div>
        <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none cursor-pointer">
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <AlertCircle className="h-8 w-8 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No gallery images found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3] bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button onClick={() => openEdit(item)} className="p-2 rounded-full bg-white/90 text-gray-700 hover:bg-white cursor-pointer"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 rounded-full bg-white/90 text-red-500 hover:bg-white cursor-pointer"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-xs font-semibold text-gray-900 truncate">{item.title}</h3>
                <span className="inline-block mt-1 px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-medium rounded">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{editing ? "Edit Image" : "Add Image"}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Title *</label>
                <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1d70b8]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Caption</label>
                <textarea value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} rows={2}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1d70b8] resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none cursor-pointer">
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Album</label>
                  <select value={form.album} onChange={(e) => setForm({ ...form, album: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none cursor-pointer">
                    <option value="">No Album</option>
                    {albums.map((a) => <option key={a.id} value={a.name}>{a.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Image</label>
                <div className="flex items-center gap-3">
                  {form.src && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={form.src} alt="Preview" className="h-16 w-16 rounded-lg object-cover border" />
                )}
                  <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}
                    className="inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 cursor-pointer disabled:opacity-50">
                    {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    {uploading ? "Uploading..." : "Upload"}
                  </button>
                  <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.webp" onChange={handleUpload} className="hidden" />
                </div>
                {!editing && (
                  <input type="text" placeholder="Or paste image URL" value={form.src} onChange={(e) => setForm({ ...form, src: e.target.value })}
                    className="w-full mt-2 px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-[#1d70b8]" />
                )}
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 cursor-pointer">Cancel</button>
                <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-5 py-2 bg-[#1d70b8] text-white text-sm font-semibold rounded-lg hover:bg-[#1a65a5] disabled:opacity-60 cursor-pointer">
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editing ? "Save" : "Add Image"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Album Modal */}
      {showAlbumModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Create Album</h2>
              <button onClick={() => setShowAlbumModal(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleCreateAlbum} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Album Name *</label>
                <input type="text" required value={albumForm.name} onChange={(e) => setAlbumForm({ ...albumForm, name: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1d70b8]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
                <textarea value={albumForm.description} onChange={(e) => setAlbumForm({ ...albumForm, description: e.target.value })} rows={2}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1d70b8] resize-none" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowAlbumModal(false)} className="px-4 py-2 text-sm text-gray-600 cursor-pointer">Cancel</button>
                <button type="submit" disabled={saving} className="px-5 py-2 bg-[#1d70b8] text-white text-sm font-semibold rounded-lg hover:bg-[#1a65a5] disabled:opacity-60 cursor-pointer">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
