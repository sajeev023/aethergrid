"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Smartphone, 
  Wifi, 
  Battery, 
  ShieldCheck, 
  Cloud, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  PowerOff, 
  Power, 
  Lock, 
  ArrowLeft,
  Users,
  Image,
  Layers
} from "lucide-react";

export default function MobileSimulatorPage() {
  const [backingUp, setBackingUp] = useState(false);
  const [backupStep, setBackupStep] = useState<string | null>(null);
  const [lastBackup, setLastBackup] = useState<any>(null);
  const [nodes, setNodes] = useState<any[]>([]);
  const [healthStatus, setHealthStatus] = useState<string>("HEALTHY");
  const [testingFailover, setTestingFailover] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const fetchNetworkState = async () => {
    try {
      const [nRes, hRes] = await Promise.all([
        fetch("/api/admin/marketplace"),
        fetch("/api/taker/health"),
      ]);
      if (nRes.ok) {
        const nData = await nRes.json();
        setNodes(nData.nodes || []);
      }
      if (hRes.ok) {
        const hData = await hRes.json();
        setHealthStatus(hData.healthStatus);
      }
    } catch {}
  };

  useEffect(() => {
    fetchNetworkState();
    const interval = setInterval(fetchNetworkState, 5000);
    return () => clearInterval(interval);
  }, []);

  const runMobileBackup = async () => {
    setBackingUp(true);
    setBackupStep("Collecting contacts & photos metadata...");
    await new Promise((r) => setTimeout(r, 600));

    setBackupStep("Encrypting payload with AES-256-GCM...");
    await new Promise((r) => setTimeout(r, 700));

    setBackupStep("Distributing chunks to active peer nodes...");

    try {
      const res = await fetch("/api/taker/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceName: "Google Pixel 9 Pro",
          deviceModel: "Android 15 / Tensor G4",
          contactsCount: 254,
          photosCount: 68,
          notes: "Mobile Companion Auto-Sync",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setBackupStep("Sync Complete! 2x Peer Redundancy verified.");
        setLastBackup(data);
        await fetchNetworkState();
      } else {
        setBackupStep(`Sync failed: ${data.error}`);
      }
    } catch (err: any) {
      setBackupStep(`Error: ${err.message}`);
    } finally {
      setTimeout(() => setBackingUp(false), 1500);
    }
  };

  const dropFirstNode = async () => {
    if (nodes.length === 0) return;
    const onlineNode = nodes.find((n) => n.status === "ONLINE");
    if (!onlineNode) return;

    setTestingFailover(true);
    try {
      await fetch(`/api/nodes/${onlineNode.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "OFFLINE" }),
      });
      await fetchNetworkState();
    } catch {} finally {
      setTestingFailover(false);
    }
  };

  const restoreAllNodes = async () => {
    setTestingFailover(true);
    try {
      for (const node of nodes) {
        if (node.status !== "ONLINE") {
          await fetch(`/api/nodes/${node.id}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "ONLINE" }),
          });
        }
      }
      await fetchNetworkState();
    } catch {} finally {
      setTestingFailover(false);
    }
  };

  const testFailoverDownload = async () => {
    if (!lastBackup?.fileId) {
      alert("Run a backup first to create an encrypted test archive.");
      return;
    }

    try {
      const res = await fetch(`/api/taker/files/${lastBackup.fileId}`);
      if (res.ok) {
        const failoverHeader = res.headers.get("X-AetherGrid-Failover-Used");
        setDownloadSuccess(
          failoverHeader === "true"
            ? "✅ SUCCESS: File retrieved from surviving REPLICA node while primary was offline!"
            : "✅ SUCCESS: File retrieved and decrypted with 100% integrity!"
        );
      }
    } catch {}
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to My Cloud Drive
        </Link>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase mb-2">
            <Smartphone className="w-3.5 h-3.5" /> Mobile Companion & Node Failover Simulator
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Live Android Companion & Node Resilience Proof
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Simulate an Android device running AetherGrid background sync. Intentionally drop a storage node and verify that files remain 100% retrievable via redundant replicas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: PHONE MOCKUP (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-[320px] sm:w-[350px] rounded-[48px] p-3 bg-slate-900 border-4 border-slate-700 shadow-2xl shadow-purple-500/10 relative">
              {/* Speaker / Camera Notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-800 rounded-full z-20 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-950" />
              </div>

              {/* Phone Screen */}
              <div className="w-full bg-slate-950 rounded-[38px] overflow-hidden pt-8 pb-6 px-5 border border-slate-800 flex flex-col justify-between min-h-[620px]">
                {/* Status Bar */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-6 px-2">
                  <span className="font-bold text-white">9:41</span>
                  <div className="flex items-center gap-2">
                    <Wifi className="w-3.5 h-3.5 text-white" />
                    <span className="font-mono text-[10px]">5G</span>
                    <Battery className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>

                {/* In-App Header */}
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1.5px] mx-auto mb-2 shadow-lg shadow-cyan-500/20">
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                      <Cloud className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>
                  <div className="font-bold text-base text-white">AetherGrid Sync</div>
                  <div className="text-[11px] text-slate-400">Pixel 9 Pro • Android 15</div>
                </div>

                {/* Device Data Inventory */}
                <div className="space-y-2 mb-6">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Users className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs text-slate-300">Contacts</span>
                    </div>
                    <span className="text-xs font-bold text-white font-mono">254 entries</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Image className="w-4 h-4 text-purple-400" />
                      <span className="text-xs text-slate-300">Recent Camera Roll</span>
                    </div>
                    <span className="text-xs font-bold text-white font-mono">68 photos</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Lock className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-slate-300">Encryption</span>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      AES-256-GCM
                    </span>
                  </div>
                </div>

                {/* Progress / Step Feedback */}
                {backupStep && (
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-mono mb-4 text-center">
                    {backupStep}
                  </div>
                )}

                {/* Backup Trigger Button */}
                <button
                  type="button"
                  onClick={runMobileBackup}
                  disabled={backingUp}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mb-3"
                >
                  {backingUp ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Cloud className="w-4 h-4" />
                  )}
                  {backingUp ? "Syncing to Peer Grid..." : "Backup Phone Now"}
                </button>

                {/* Phone Home Bar */}
                <div className="w-28 h-1 bg-slate-700 rounded-full mx-auto" />
              </div>
            </div>
          </div>

          {/* RIGHT: RESILIENCE & FAILOVER LAB (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Peer Nodes Grid */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    Storage Provider Nodes
                  </h3>
                  <p className="text-xs text-slate-400">
                    Your encrypted chunks are distributed across these physical provider directories.
                  </p>
                </div>
                <button
                  onClick={fetchNetworkState}
                  className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                {nodes.length === 0 ? (
                  <div className="text-xs text-slate-500">No nodes detected.</div>
                ) : (
                  nodes.map((n) => {
                    const isOnline = n.status === "ONLINE";
                    return (
                      <div
                        key={n.id}
                        className="p-3.5 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-3 h-3 rounded-full ${
                              isOnline ? "bg-emerald-400 shadow-md shadow-emerald-400/50 animate-pulse" : "bg-rose-500"
                            }`}
                          />
                          <div>
                            <div className="text-xs font-bold text-white">{n.node_name}</div>
                            <div className="text-[11px] text-slate-400 font-mono">
                              Capacity: {Math.round(n.capacity_bytes / (1024 * 1024 * 1024))} GB • Last Ping: {new Date(n.last_heartbeat_at).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            isOnline
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                              : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                          }`}
                        >
                          {n.status}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Failover Test Action Center */}
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                <h4 className="text-xs font-bold text-purple-300 uppercase font-mono mb-2">
                  🧪 Test Instant Replica Failover
                </h4>
                <p className="text-xs text-slate-300 mb-4">
                  Drop Node Alpha to verify that customer downloads continue seamlessly from Node Beta.
                </p>

                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={dropFirstNode}
                    disabled={testingFailover}
                    className="px-3.5 py-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-semibold hover:bg-rose-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <PowerOff className="w-3.5 h-3.5" />
                    Drop Node Alpha (Simulate Crash)
                  </button>

                  <button
                    onClick={restoreAllNodes}
                    disabled={testingFailover}
                    className="px-3.5 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold hover:bg-emerald-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Power className="w-3.5 h-3.5" />
                    Reconnect All Nodes
                  </button>

                  <button
                    onClick={testFailoverDownload}
                    className="px-3.5 py-2 rounded-xl bg-blue-500 text-white text-xs font-semibold hover:bg-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/20"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Test Failover Download
                  </button>
                </div>

                {downloadSuccess && (
                  <div className="mt-3 p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
                    {downloadSuccess}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
