"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { 
  Cloud, 
  Upload, 
  Download, 
  Trash2, 
  FileText, 
  Image, 
  Film, 
  FileArchive, 
  Smartphone, 
  ShieldCheck, 
  AlertTriangle, 
  RefreshCw, 
  CheckCircle2, 
  HardDrive,
  Activity,
  Layers,
  Sparkles,
  Plus
} from "lucide-react";

export default function DashboardPage() {
  const [health, setHealth] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [backups, setBackups] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"files" | "backups" | "topology">("files");
  const [uploading, setUploading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const [healthRes, filesRes, backupsRes] = await Promise.all([
        fetch("/api/taker/health"),
        fetch("/api/taker/files"),
        fetch("/api/taker/backup"),
      ]);

      if (healthRes.ok) setHealth(await healthRes.json());
      if (filesRes.ok) {
        const fData = await filesRes.json();
        setFiles(fData.files || []);
      }
      if (backupsRes.ok) {
        const bData = await backupsRes.json();
        setBackups(bData.backups || []);
      }
    } catch {} finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setUploading(true);
    setUploadSuccess(null);

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/taker/files", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Upload failed");
        }
      }

      setUploadSuccess(`Successfully encrypted and distributed ${selectedFiles.length} file(s) across peer nodes!`);
      await fetchData();
    } catch (err: any) {
      alert(`Upload error: ${err.message}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    if (!confirm("Are you sure you want to delete this file across all peer nodes?")) return;
    try {
      const res = await fetch(`/api/taker/files/${fileId}`, { method: "DELETE" });
      if (res.ok) {
        await fetchData();
      }
    } catch {}
  };

  const handleCreateBackup = async () => {
    try {
      const res = await fetch("/api/taker/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceName: "Samsung Galaxy S24 Ultra",
          deviceModel: "Snapdragon 8 Gen 3 / OneUI 6.1",
          contactsCount: 164,
          photosCount: 42,
          notes: "Manual Cloud Sync",
        }),
      });

      if (res.ok) {
        alert("Mobile snapshot encrypted and backed up across peer nodes!");
        await fetchData();
      }
    } catch {}
  };

  const isDegraded = health?.healthStatus === "DEGRADED";
  const quotaGb = (health?.quotaBytes || 20 * 1024 * 1024 * 1024) / (1024 * 1024 * 1024);
  const usedMb = (health?.usedBytes || 0) / (1024 * 1024);
  const percentUsed = health?.percentUsed || 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-xs font-mono uppercase mb-1">
              <Cloud className="w-4 h-4" /> 🔵 Unified Personal Cloud
            </div>
            <h1 className="text-3xl font-extrabold text-white">My Cloud Drive</h1>
            <p className="text-sm text-slate-400">
              One seamless drive. Backed by encrypted peer nodes with automatic failover.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={refreshing}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Refresh status"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-500/20 cursor-pointer disabled:opacity-50"
            >
              {uploading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              Upload Files
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              multiple
              className="hidden"
            />
          </div>
        </div>

        {/* Dynamic Health & Failover Status Banner */}
        <div className={`mb-6 p-4 rounded-2xl border transition-all ${
          isDegraded
            ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
            : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
        }`}>
          <div className="flex items-start sm:items-center gap-3">
            {isDegraded ? (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
            ) : (
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
            )}
            <div className="flex-1">
              <div className="font-bold text-sm flex items-center gap-2">
                <span>{isDegraded ? "REDUNDANCY DEGRADED — FAILOVER ACTIVE" : "PEER STORAGE GRID HEALTHY"}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded uppercase bg-white/10">
                  {isDegraded ? "Surviving Replica Active" : "2x Redundancy"}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {health?.healthMessage || "All storage chunks are fully replicated across active peer nodes."}
              </p>
            </div>
            <Link
              href="/giver"
              className="text-xs font-semibold underline hover:no-underline shrink-0 text-white"
            >
              Inspect Nodes →
            </Link>
          </div>
        </div>

        {/* Upload Success Toast */}
        {uploadSuccess && (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              {uploadSuccess}
            </span>
            <button onClick={() => setUploadSuccess(null)} className="text-slate-400 hover:text-white text-xs">
              ✕
            </button>
          </div>
        )}

        {/* Storage Quota & Breakdown Bar */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 backdrop-blur-xl mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-slate-400">Total Storage Usage:</span>
              <span className="text-sm font-bold text-white font-mono">
                {usedMb.toFixed(2)} MB / {quotaGb} GB
              </span>
            </div>
            <span className="text-xs font-mono text-cyan-400">{percentUsed}% utilized</span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex mb-4">
            <div
              className="h-full bg-cyan-400 transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(2, (health?.breakdown?.photosBytes || 0) / (health?.quotaBytes || 1) * 100))}%` }}
              title="Photos"
            />
            <div
              className="h-full bg-purple-500 transition-all duration-500"
              style={{ width: `${Math.min(100, (health?.breakdown?.documentsBytes || 0) / (health?.quotaBytes || 1) * 100)}%` }}
              title="Documents"
            />
            <div
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${Math.min(100, (health?.breakdown?.otherBytes || 0) / (health?.quotaBytes || 1) * 100)}%` }}
              title="Backups & Other"
            />
          </div>

          {/* Breakdown Pills */}
          <div className="flex flex-wrap gap-4 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              Photos: {((health?.breakdown?.photosBytes || 0) / (1024 * 1024)).toFixed(1)} MB
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              Documents: {((health?.breakdown?.documentsBytes || 0) / (1024 * 1024)).toFixed(1)} MB
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              Other & Backups: {((health?.breakdown?.otherBytes || 0) / (1024 * 1024)).toFixed(1)} MB
            </span>
          </div>
        </div>

        {/* Tabs: Files vs Phone Backups vs Topology */}
        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-2">
          <button
            onClick={() => setActiveTab("files")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "files"
                ? "bg-blue-500 text-white shadow-md shadow-blue-500/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            📁 Files ({files.length})
          </button>

          <button
            onClick={() => setActiveTab("backups")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "backups"
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            📱 Phone Backups ({backups.length})
          </button>

          <button
            onClick={() => setActiveTab("topology")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "topology"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            🛡️ Chunk Topology
          </button>
        </div>

        {/* TAB 1: FILES LIST */}
        {activeTab === "files" && (
          <div className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden backdrop-blur-xl">
            {files.length === 0 ? (
              <div className="p-16 text-center">
                <Cloud className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">Your Personal Cloud is Empty</h3>
                <p className="text-sm text-slate-400 max-w-sm mx-auto mb-6">
                  Upload photos, documents, or videos. They will be encrypted with AES-256 and split across peer nodes.
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500 text-white font-semibold text-sm hover:bg-blue-400 transition-all"
                >
                  <Upload className="w-4 h-4" />
                  Upload First File
                </button>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {files.map((file) => {
                  const sizeKb = (file.size / 1024).toFixed(1);
                  const isDegradedFile = file.status === "DEGRADED";

                  return (
                    <div
                      key={file.id}
                      className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-white/[0.01] transition-colors"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                          {file.mime_type.startsWith("image/") ? (
                            <Image className="w-5 h-5" />
                          ) : file.mime_type.startsWith("video/") ? (
                            <Film className="w-5 h-5" />
                          ) : (
                            <FileText className="w-5 h-5" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="font-bold text-sm text-white truncate">
                            {file.original_name}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono mt-0.5">
                            <span>{sizeKb} KB</span>
                            <span>•</span>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                              isDegradedFile
                                ? "bg-amber-500/10 text-amber-300 border border-amber-500/30"
                                : "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                            }`}>
                              {isDegradedFile ? "🟡 Failover Active" : "🟢 2x Redundant"}
                            </span>
                            <span>•</span>
                            <span>{new Date(file.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={`/api/taker/files/${file.id}`}
                          download={file.original_name}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Download file"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleDeleteFile(file.id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title="Delete file"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PHONE BACKUPS */}
        {activeTab === "backups" && (
          <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-white">Phone & Device Backups</h3>
                <p className="text-xs text-slate-400">
                  Encrypted mobile snapshots containing contacts, app data, and media.
                </p>
              </div>
              <button
                onClick={handleCreateBackup}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-md shadow-purple-600/20"
              >
                <Plus className="w-3.5 h-3.5" />
                Trigger Phone Backup
              </button>
            </div>

            {backups.length === 0 ? (
              <div className="p-10 text-center border border-dashed border-white/10 rounded-xl">
                <Smartphone className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <div className="text-sm font-bold text-white">No Phone Backups Found</div>
                <div className="text-xs text-slate-400 mt-1 mb-4">
                  Use the Mobile Simulator to simulate a real phone backup.
                </div>
                <Link
                  href="/mobile-simulator"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-semibold hover:bg-purple-500/30 transition-all"
                >
                  Launch Mobile Simulator →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {backups.map((b) => (
                  <div key={b.id} className="p-4 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white">{b.device_name}</div>
                        <div className="text-xs text-slate-400 font-mono">
                          {b.device_model} • {b.item_count} items backed up • {new Date(b.started_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      🟢 Backed Up
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: NETWORK TOPOLOGY */}
        {activeTab === "topology" && (
          <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 backdrop-blur-xl">
            <div className="mb-4">
              <h3 className="text-base font-bold text-white">Zero-Trust Peer Chunk Topology</h3>
              <p className="text-xs text-slate-400">
                How your files are encrypted with AES-256-GCM and replicated across peer nodes.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-white/10 font-mono text-xs">
                <div className="text-cyan-400 font-bold mb-2">P2P Encryption Pipeline:</div>
                <div className="text-slate-300 space-y-1">
                  <div>1. Plaintext File → Split into 2MB Segments</div>
                  <div>2. AES-256-GCM Encryption (12-byte IV + 16-byte Auth Tag)</div>
                  <div>3. Primary Chunk Written to Provider Node A</div>
                  <div>4. Redundant Replica Written to Provider Node B</div>
                  <div>5. Providers store only opaque .chunk files (Zero Plaintext Leakage)</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-300">
                <strong>Failover Guarantee:</strong> If Node A loses connectivity or is powered off by a provider,
                the orchestrator automatically serves downloads from Node B without customer disruption.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
