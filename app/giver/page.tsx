"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  HardDrive, 
  Server, 
  TrendingUp, 
  Plus, 
  Activity, 
  Copy, 
  Check, 
  Play, 
  Pause, 
  PowerOff, 
  Power, 
  Clock, 
  Database,
  Coins,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";

export default function GiverPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("/api/giver/dashboard");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 5000); // 5s refresh
    return () => clearInterval(interval);
  }, []);

  const toggleNodeStatus = async (nodeId: string, currentStatus: string) => {
    setActionLoading(nodeId);
    const targetStatus = currentStatus === "ONLINE" ? "OFFLINE" : "ONLINE";
    try {
      await fetch(`/api/nodes/${nodeId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: targetStatus }),
      });
      await fetchDashboard();
    } catch {} finally {
      setActionLoading(null);
    }
  };

  const copyCommand = (nodeId: string, token: string, capacityGb: number) => {
    const cmd = `node node-client/node-daemon.mjs --token "${token || "node_token_" + nodeId}" --capacity ${capacityGb}`;
    navigator.clipboard.writeText(cmd);
    setCopiedId(nodeId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
          <span>Connecting to Provider Grid...</span>
        </div>
      </div>
    );
  }

  const nodes = data?.nodes || [];
  const summary = data?.summary || {};
  const earnings = data?.earnings || {};

  const totalCapGb = (summary.totalCapacityBytes || 0) / (1024 * 1024 * 1024);
  const totalAllocGb = (summary.totalAllocatedBytes || 0) / (1024 * 1024 * 1024);
  const totalUsedMb = (summary.totalUsedBytes || 0) / (1024 * 1024);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              🟢 Storage Provider Command Center
            </div>
            <h1 className="text-3xl font-extrabold text-white">My Storage Nodes</h1>
            <p className="text-sm text-slate-400">
              Manage spare storage capacity, inspect real-time heartbeats, and track live payouts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/giver/setup"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-500/20"
            >
              <Plus className="w-4 h-4" />
              Connect New Node
            </Link>
          </div>
        </div>

        {/* Live Earnings & Metrics Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Earnings Card */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 via-slate-900/60 to-slate-900 border border-emerald-500/30 p-5">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Coins className="w-4 h-4" /> Earnings (This Month)
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Live</span>
            </div>
            <div className="text-3xl font-extrabold text-white">
              ₹{earnings.thisMonth?.toFixed(2) || "0.00"}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Pending: <span className="text-emerald-400 font-medium">₹{earnings.pending?.toFixed(2) || "0.00"}</span>
            </div>
          </div>

          {/* Active Nodes Card */}
          <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Server className="w-4 h-4" /> Online Nodes
              </span>
              <span className="text-xs text-white font-bold font-mono">
                {summary.onlineNodes || 0} / {summary.totalNodes || 0}
              </span>
            </div>
            <div className="text-3xl font-extrabold text-cyan-400">
              {summary.onlineNodes || 0} Online
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {summary.offlineNodes > 0 ? (
                <span className="text-rose-400 font-medium">{summary.offlineNodes} offline node(s)</span>
              ) : (
                <span className="text-emerald-400">All nodes healthy</span>
              )}
            </div>
          </div>

          {/* Capacity Committed Card */}
          <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
              <span className="flex items-center gap-1.5 text-blue-400">
                <HardDrive className="w-4 h-4" /> Committed Space
              </span>
            </div>
            <div className="text-3xl font-extrabold text-white">
              {totalCapGb.toFixed(0)} <span className="text-sm font-normal text-slate-400">GB</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Allocated: <span className="text-blue-400 font-medium">{totalAllocGb.toFixed(1)} GB</span>
            </div>
          </div>

          {/* Stored Chunks / Used Card */}
          <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
              <span className="flex items-center gap-1.5 text-purple-400">
                <Database className="w-4 h-4" /> Chunks Stored
              </span>
            </div>
            <div className="text-3xl font-extrabold text-white">
              {totalUsedMb.toFixed(1)} <span className="text-sm font-normal text-slate-400">MB</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              AES-256 encrypted peer chunks
            </div>
          </div>
        </div>

        {/* Storage Nodes List */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden backdrop-blur-xl mb-8">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-emerald-400" />
              Connected Storage Daemons
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              Auto-refreshes every 5s
            </span>
          </div>

          {nodes.length === 0 ? (
            <div className="p-12 text-center">
              <HardDrive className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">No Storage Nodes Registered Yet</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
                You haven't connected any storage nodes. Connect your computer or server to start earning payouts for your idle space.
              </p>
              <Link
                href="/giver/setup"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-sm hover:bg-emerald-400 transition-all"
              >
                <Plus className="w-4 h-4" />
                Connect Your First Node
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {nodes.map((node: any) => {
                const isOnline = node.status === "ONLINE";
                const capGb = Number(node.capacity_bytes) / (1024 * 1024 * 1024);
                const usedMb = Number(node.used_bytes) / (1024 * 1024);
                const percentUsed = Math.min(100, Math.round((Number(node.used_bytes) / Number(node.capacity_bytes)) * 100));

                const lastHb = new Date(node.last_heartbeat_at).toLocaleTimeString();

                return (
                  <div key={node.id} className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-white/[0.01] transition-colors">
                    {/* Node Info */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <span className={`w-3 h-3 rounded-full shrink-0 ${isOnline ? "bg-emerald-400 shadow-md shadow-emerald-400/50 animate-pulse" : "bg-rose-500"}`} />
                        <span className="font-bold text-white text-base">{node.node_name}</span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                          {node.id}
                        </span>
                        <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold ${
                          isOnline
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                        }`}>
                          {node.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono pt-1">
                        <span className="flex items-center gap-1">
                          <HardDrive className="w-3.5 h-3.5 text-slate-400" />
                          Capacity: {capGb} GB
                        </span>
                        <span>•</span>
                        <span>Used: {usedMb.toFixed(2)} MB ({percentUsed}%)</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          Last Heartbeat: {lastHb}
                        </span>
                        <span>•</span>
                        <span>Uptime: {Math.round(node.uptime_seconds / 60)} mins</span>
                      </div>
                    </div>

                    {/* Progress Bar & Capacity */}
                    <div className="w-full lg:w-64">
                      <div className="flex justify-between text-xs text-slate-400 mb-1 font-mono">
                        <span>Utilization</span>
                        <span>{percentUsed}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(4, percentUsed)}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Controls & Resilience Tester */}
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Failover Simulator Toggle */}
                      <button
                        onClick={() => toggleNodeStatus(node.id, node.status)}
                        disabled={actionLoading === node.id}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                          isOnline
                            ? "bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20"
                            : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                        }`}
                        title="Simulate node drop to test grid failover"
                      >
                        {isOnline ? (
                          <>
                            <PowerOff className="w-3.5 h-3.5" />
                            Simulate Drop (Offline)
                          </>
                        ) : (
                          <>
                            <Power className="w-3.5 h-3.5" />
                            Bring Online
                          </>
                        )}
                      </button>

                      {/* Copy CLI Daemon Command */}
                      <button
                        onClick={() => copyCommand(node.id, node.id, capGb)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Copy launch command for terminal"
                      >
                        {copiedId === node.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Daemon Command
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick CLI Daemon Quickstart Panel */}
        <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-6">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase mb-2">
            <Activity className="w-4 h-4" /> Live Node Daemon Guide
          </div>
          <h3 className="text-base font-bold text-white mb-2">
            How to keep your storage node running
          </h3>
          <p className="text-xs text-slate-400 mb-4 max-w-3xl">
            You can run the storage daemon in any terminal, background service (systemd / PM2), or scheduled task.
            The daemon only accepts encrypted 2MB chunk blobs and sends a lightweight heartbeat ping every 10 seconds.
          </p>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-white/10 font-mono text-xs text-emerald-400 flex items-center justify-between overflow-x-auto">
            <code>node node-client/node-daemon.mjs --token "&lt;YOUR_NODE_TOKEN&gt;" --capacity 20</code>
            <span className="text-[11px] text-slate-500 shrink-0 ml-4">Runs natively in Node.js</span>
          </div>
        </div>
      </div>
    </div>
  );
}
