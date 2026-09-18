"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Server,
  HardDrive,
  Users,
  RefreshCw,
  Database,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";

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
      <div className="min-h-[85vh] bg-[var(--background)] flex items-center justify-center text-[var(--foreground-secondary)]">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
          <span className="text-[14px]">Loading Grid Telemetry...</span>
        </div>
      </div>
    );
  }

  const metrics = data?.metrics || {};
  const nodes = data?.nodes || [];
  const heartbeats = data?.recentHeartbeats || [];

  const capGb = (metrics.totalCapacityBytes || 0) / (1024 * 1024 * 1024);
  const allocGb = (metrics.allocatedBytes || 0) / (1024 * 1024 * 1024);
  const usedMb = ((metrics.usedBytes || 0) / (1024 * 1024)).toFixed(1);

  return (
    <div className="min-h-[85vh] bg-[var(--background)] text-[var(--foreground)] py-10 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-[16px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-subtle)]">
          <div>
            <div className="flex items-center gap-2 text-[12px] font-mono uppercase text-[var(--primary)] mb-1">
              <Activity className="w-4 h-4" /> Global Grid Telemetry
            </div>
            <h1 className="type-h1 text-[var(--foreground)] font-bold">
              Marketplace Telemetry & Node Cluster
            </h1>
            <p className="text-[14px] text-[var(--foreground-secondary)] mt-1">
              Real-time two-sided distributed storage marketplace health and heartbeat diagnostics.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchMetrics}
            className="p-2.5 rounded-[8px] border border-[var(--border)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)] transition-colors cursor-pointer self-start sm:self-auto"
            title="Refresh Telemetry"
            aria-label="Refresh Telemetry"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-subtle)]">
            <div className="text-[12px] font-semibold text-[var(--foreground-muted)] uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <HardDrive className="w-3.5 h-3.5 text-[var(--primary)]" /> Total Capacity
            </div>
            <div className="type-metric text-[var(--foreground)] tabular-nums">{capGb.toFixed(0)} GB</div>
            <div className="text-[12px] text-[var(--foreground-muted)] mt-1">{allocGb.toFixed(0)} GB allocated</div>
          </div>

          <div className="p-5 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-subtle)]">
            <div className="text-[12px] font-semibold text-[var(--foreground-muted)] uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Server className="w-3.5 h-3.5 text-[var(--success)]" /> Node Health
            </div>
            <div className="type-metric text-[var(--success)] tabular-nums">
              {metrics.onlineNodes}{" "}
              <span className="text-[14px] font-normal text-[var(--foreground-muted)]">
                / {nodes.length} Online
              </span>
            </div>
            <div className="text-[12px] text-[var(--foreground-muted)] mt-1">10s heartbeat cadence</div>
          </div>

          <div className="p-5 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-subtle)]">
            <div className="text-[12px] font-semibold text-[var(--foreground-muted)] uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Database className="w-3.5 h-3.5 text-[var(--secondary-accent)]" /> Stored Chunks
            </div>
            <div className="type-metric text-[var(--foreground)] tabular-nums">{metrics.totalChunks || 0}</div>
            <div className="text-[12px] text-[var(--foreground-muted)] mt-1">{usedMb} MB chunk data</div>
          </div>

          <div className="p-5 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-subtle)]">
            <div className="text-[12px] font-semibold text-[var(--foreground-muted)] uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Users className="w-3.5 h-3.5 text-[var(--info)]" /> Total Users
            </div>
            <div className="type-metric text-[var(--foreground)] tabular-nums">{metrics.totalUsers || 0}</div>
            <div className="text-[12px] text-[var(--foreground-muted)] mt-1">
              {metrics.activeGivers || 0} Givers • {metrics.activeTakers || 0} Takers
            </div>
          </div>
        </div>

        {/* Node Cluster Health Table */}
        <div className="rounded-[14px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-subtle)] overflow-hidden">
          <div className="p-5 border-b border-[var(--border-subtle)]">
            <h2 className="type-h3 font-bold text-[var(--foreground)]">Registered Storage Node Cluster</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[var(--surface-subtle)] border-b border-[var(--border-subtle)] text-[11px] font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">
                <tr>
                  <th className="p-3.5 pl-5">Node</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Capacity</th>
                  <th className="p-3.5">Allocated</th>
                  <th className="p-3.5">Used</th>
                  <th className="p-3.5 pr-5">Last Heartbeat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {nodes.map((node: any) => {
                  const nodeCapGb = Math.round(node.capacity_bytes / (1024 * 1024 * 1024));
                  const nodeAllocGb = Math.round((node.allocated_bytes || 0) / (1024 * 1024 * 1024));
                  const nodeUsedMb = ((node.used_bytes || 0) / (1024 * 1024)).toFixed(1);

                  return (
                    <tr key={node.id} className="hover:bg-[var(--surface-subtle)] transition-colors">
                      <td className="p-3.5 pl-5 font-semibold text-[var(--foreground)]">
                        <div>{node.node_name}</div>
                        <div className="text-[11px] font-mono text-[var(--foreground-muted)] font-normal">{node.id}</div>
                      </td>
                      <td className="p-3.5">
                        <StatusBadge status={node.status} size="sm" />
                      </td>
                      <td className="p-3.5 tabular-nums">{nodeCapGb} GB</td>
                      <td className="p-3.5 tabular-nums">{nodeAllocGb} GB</td>
                      <td className="p-3.5 tabular-nums">{nodeUsedMb} MB</td>
                      <td className="p-3.5 pr-5 text-[12px] text-[var(--foreground-muted)]">
                        {node.last_heartbeat_at ? new Date(node.last_heartbeat_at).toLocaleTimeString() : "N/A"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Heartbeat Event Stream */}
        <div className="rounded-[14px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-subtle)] p-5">
          <h2 className="type-h3 font-bold text-[var(--foreground)] mb-3">Live Heartbeat Cadence Feed</h2>
          {heartbeats.length === 0 ? (
            <div className="text-[13px] text-[var(--foreground-muted)] py-4 text-center">
              Awaiting node heartbeat signals...
            </div>
          ) : (
            <div className="space-y-2">
              {heartbeats.slice(0, 5).map((hb: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-[8px] bg-[var(--surface-subtle)] text-[12px] font-mono"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--success)]" />
                    <span className="font-semibold text-[var(--foreground)]">{hb.node_id}</span>
                    <span className="text-[var(--foreground-muted)]">latency: {hb.latency_ms}ms</span>
                  </div>
                  <div className="text-[var(--foreground-muted)]">
                    {new Date(hb.recorded_at).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
