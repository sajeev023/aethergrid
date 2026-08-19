"use client";

import { useEffect, useState, type FormEvent } from "react";
import { FileText, Loader2, Save, CheckCircle2, AlertCircle, Plus, Trash2 } from "lucide-react";

interface AnnouncementItem {
  id: string; title: string; description: string; date: string; active: boolean;
}

interface ContentData {
  principalMessage: string;
  aboutText: string;
  mission: string;
  vision: string;
  announcements: AnnouncementItem[];
  updatedAt: string;
}

export default function AdminContentPage() {
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setContent(data.content))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!content) return;
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      console.error("Failed to save content");
    } finally {
      setSaving(false);
    }
  }

  function addAnnouncement() {
    if (!content) return;
    const newAnn: AnnouncementItem = {
      id: Math.random().toString(36).substring(2, 9),
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      active: true,
    };
    setContent({ ...content, announcements: [...content.announcements, newAnn] });
  }

  function removeAnnouncement(id: string) {
    if (!content) return;
    setContent({
      ...content,
      announcements: content.announcements.filter((a) => a.id !== id),
    });
  }

  function updateAnnouncement(id: string, field: string, value: string | boolean) {
    if (!content) return;
    setContent({
      ...content,
      announcements: content.announcements.map((a) =>
        a.id === id ? { ...a, [field]: value } : a
      ),
    });
  }

  if (loading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 text-[#1d70b8] animate-spin" /></div>;
  if (!content) return <div className="flex items-center justify-center min-h-[400px] text-gray-500"><AlertCircle className="h-5 w-5 mr-2" />Failed to load content.</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="h-6 w-6 text-[#1d70b8]" /> Content Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Last updated: {content.updatedAt ? new Date(content.updatedAt).toLocaleString("en-IN") : "Never"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Principal Message */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-bold text-gray-700 mb-3">Principal&apos;s Message</h2>
          <textarea
            value={content.principalMessage}
            onChange={(e) => setContent({ ...content, principalMessage: e.target.value })}
            rows={5}
            placeholder="Enter the principal's message that appears on the website..."
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1d70b8] resize-y"
          />
        </div>

        {/* About */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-bold text-gray-700 mb-3">About LFJC</h2>
          <textarea
            value={content.aboutText}
            onChange={(e) => setContent({ ...content, aboutText: e.target.value })}
            rows={5}
            placeholder="Enter the about section text..."
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1d70b8] resize-y"
          />
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-bold text-gray-700 mb-3">Mission Statement</h2>
            <textarea
              value={content.mission}
              onChange={(e) => setContent({ ...content, mission: e.target.value })}
              rows={4}
              placeholder="Enter the mission statement..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1d70b8] resize-y"
            />
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-bold text-gray-700 mb-3">Vision Statement</h2>
            <textarea
              value={content.vision}
              onChange={(e) => setContent({ ...content, vision: e.target.value })}
              rows={4}
              placeholder="Enter the vision statement..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1d70b8] resize-y"
            />
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-700">Announcements</h2>
            <button
              type="button"
              onClick={addAnnouncement}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1d70b8] border border-[#1d70b8]/20 rounded-lg hover:bg-[#1d70b8]/5 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </button>
          </div>

          {content.announcements.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No announcements. Click &quot;Add&quot; to create one.</p>
          ) : (
            <div className="space-y-4">
              {content.announcements.map((ann) => (
                <div key={ann.id} className="border border-gray-100 rounded-lg p-4 relative">
                  <button
                    type="button"
                    onClick={() => removeAnnouncement(ann.id)}
                    className="absolute top-3 right-3 text-gray-300 hover:text-red-500 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="grid sm:grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="Title"
                      value={ann.title}
                      onChange={(e) => updateAnnouncement(ann.id, "title", e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1d70b8]"
                    />
                    <div className="flex gap-2 items-center">
                      <input
                        type="date"
                        value={ann.date}
                        onChange={(e) => updateAnnouncement(ann.id, "date", e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1d70b8]"
                      />
                      <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={ann.active}
                          onChange={(e) => updateAnnouncement(ann.id, "active", e.target.checked)}
                          className="rounded"
                        />
                        Active
                      </label>
                    </div>
                  </div>
                  <textarea
                    placeholder="Description"
                    value={ann.description}
                    onChange={(e) => updateAnnouncement(ann.id, "description", e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1d70b8] resize-none"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1d70b8] text-white text-sm font-semibold rounded-lg hover:bg-[#1a65a5] disabled:opacity-60 cursor-pointer"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? "Saving..." : "Save All Changes"}
          </button>
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-sm text-green-600 font-medium">
              <CheckCircle2 className="h-4 w-4" /> Changes saved successfully
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
