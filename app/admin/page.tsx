"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Activity, 
  Server, 
  HardDrive, 
  Users, 
  ShieldCheck, 
  Clock, 
  RefreshCw,
  Coins,
  Database,
  ArrowLeft,
  CheckCircle2
} from "lucide-react";

export default function AdminTelemetryPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    try {
      const res = await fetch("/api/admin/marketplace");
      if (res.ok) {
        setData(await res.json());
      }
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span>Loading Grid Telemetry...</span>
        </div>
      </div>
    );
  }

  const metrics = data?.metrics || {};
  const nodes = data?.nodes || [];
  const heartbeats = data?.recentHeartbeats || [];

  const capGb = (metrics.totalCapacityBytes || 0) / (1024 * 1024 * 1024);
  const allocGb = (metrics.allocatedBytes || 0) / (1024 * 1024 * 1024);
  const usedMb = (metrics.usedBytes || 0) / (1024 * 1024);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase mb-1">
              <Activity className="w-4 h-4" /> Global Grid Telemetry
            </div>
            <h1 className="text-3xl font-extrabold text-white">Marketplace Health & Nodes</h1>
            <p className="text-sm text-slate-400">
              Live two-sided distributed storage marketplace analytics and heartbeat logs.
            </p>
          </div>

          <button
            onClick={fetchMetrics}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Big Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-slate-900 border border-white/10">
            <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5 mb-1">
              <HardDrive className="w-3.5 h-3.5 text-cyan-400" /> Total Capacity
            </div>
            <div className="text-3xl font-bold text-white">{capGb.toFixed(0)} GB</div>
            <div className="text-xs text-slate-500 mt-1">Across all provider nodes</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-white/10">
            <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5 mb-1">
              <Server className="w-3.5 h-3.5 text-emerald-400" /> Node Health
            </div>
            <div className="text-3xl font-bold text-emerald-400">
              {metrics.onlineNodes} <span className="text-base font-normal text-slate-400">/ {nodes.length} Online</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">10s heartbeat cadence</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-white/10">
            <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5 mb-1">
              <Users className="w-3.5 h-3.5 text-purple-400" /> Network Participants
            </div>
            <div className="text-3xl font-bold text-white">
              {metrics.totalUsers} <span className="text-base font-normal text-slate-400">Users</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {metrics.activeGivers} Givers • {metrics.activeTakers} Takers
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-white/10">
            <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5 mb-1">
              <Database className="w-3.5 h-3.5 text-blue-400" /> Stored Objects
            </div>
            <div className="text-3xl font-bold text-white">
              {metrics.totalFiles} <span className="text-base font-normal text-slate-400">Files</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">{metrics.totalChunks} AES-256 Chunks</div>
          </div>
        </div>

        {/* Nodes & Recent Heartbeats Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Storage Nodes List */}
          <div className="lg:col-span-8 rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden">
            <div className="p-5 border-b border-white/10">
              <h3 className="font-bold text-white text-base">Registered Storage Nodes</h3>
            </div>
            <div className="divide-y divide-white/5">
              {nodes.map((n: any) => {
                const isOnline = n.status === "ONLINE";
                return (
                  <div key={n.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? "bg-emerald-400 animate-pulse" : "bg-rose-500"}`} />
                      <div>
                        <div className="font-bold text-sm text-white">{n.node_name}</div>
                        <div className="text-xs text-slate-400 font-mono">
                          Owner: {n.owner_name} • Capacity: {Math.round(n.capacity_bytes / (1024 * 1024 * 1024))} GB
                        </div>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      isOnline ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                    }`}>
                      {n.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Heartbeat Pulse Feed */}
          <div className="lg:col-span-4 rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden">
            <div className="p-5 border-b border-white/10">
              <h3 className="font-bold text-white text-base">Recent Heartbeat Pings</h3>
            </div>
            <div className="divide-y divide-white/5 font-mono text-xs">
              {heartbeats.length === 0 ? (
                <div className="p-5 text-slate-500 text-xs">Waiting for node daemon pings...</div>
              ) : (
                heartbeats.map((h: any) => (
                  <div key={h.id} className="p-3.5 flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">{h.node_name}</div>
                      <div className="text-[10px] text-slate-400">{new Date(h.recorded_at).toLocaleTimeString()}</div>
                    </div>
                    <span className="text-[10px] text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10">
                      {h.latency_ms}ms
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
