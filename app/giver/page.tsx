"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  HardDrive,
  Server,
  Plus,
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  Power,
  RefreshCw,
  Coins,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { NodeCardSkeleton } from "@/components/ui/skeleton";
import { StorageMeter } from "@/components/ui/storage-meter";
import { cn } from "@/lib/utils";

export default function GiverPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState<Record<string, boolean>>({});
  const [utilizationModel, setUtilizationModel] = useState<"projected" | "maximum">("projected");
  const [serviceInfo, setServiceInfo] = useState<{ running: boolean; pid?: number; logs?: string[] } | null>(null);
  const [serviceToggling, setServiceToggling] = useState(false);

  const fetchServiceStatus = async () => {
    try {
      const res = await fetch("/api/nodes/service");
      if (res.ok) {
        const json = await res.json();
        setServiceInfo(json);
      }
    } catch {}
  };

  const toggleNodeService = async () => {
    setServiceToggling(true);
    try {
      if (serviceInfo?.running) {
        await fetch("/api/nodes/service", { method: "DELETE" });
      } else {
        await fetch("/api/nodes/service", { method: "POST" });
      }
      await fetchServiceStatus();
      await fetchDashboard();
    } catch {} finally {
      setServiceToggling(false);
    }
  };

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
    fetchServiceStatus();
    const interval = setInterval(() => {
      fetchDashboard();
      fetchServiceStatus();
    }, 5000);
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

  const toggleAdvanced = (nodeId: string) => {
    setShowAdvanced((prev) => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const nodes = data?.nodes || [];
  const summary = data?.summary || {};
  const earnings = data?.earnings || {};

  const totalCapGb = Math.round((summary.totalCapacityBytes || 0) / (1024 * 1024 * 1024));
  const totalAllocGb = Math.round((summary.totalAllocatedBytes || 0) / (1024 * 1024 * 1024));

  return (
    <div className="min-h-[85vh] bg-[var(--background)] text-[var(--foreground)] py-8 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto space-y-8">
        {/* ── HEADER ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-[16px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-subtle)]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[var(--secondary-accent)] flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5" /> Storage Provider Workspace
              </span>
              <StatusBadge status="ACTIVE" size="sm" />
            </div>
            <h1 className="type-h1 text-[var(--foreground)] font-bold">My Storage</h1>
            <p className="text-[14px] text-[var(--foreground-secondary)]">
              Manage your connected disk space, track health, and review estimated earnings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild size="default" className="gap-2 bg-[var(--secondary-accent)] text-slate-950 hover:opacity-90">
              <Link href="/giver/setup">
                <Plus className="w-4 h-4" />
                <span>Connect Storage</span>
              </Link>
            </Button>

            <button
              type="button"
              onClick={fetchDashboard}
              className="p-2.5 rounded-[8px] border border-[var(--border)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)] transition-colors cursor-pointer"
              title="Refresh provider workspace"
              aria-label="Refresh provider workspace"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── EMPTY STATE (WHEN NO NODES REGISTERED) ── */}
        {loading ? (
          <div className="space-y-4">
            <NodeCardSkeleton />
            <NodeCardSkeleton />
          </div>
        ) : nodes.length === 0 ? (
          <EmptyState
            icon={HardDrive}
            title="Connect your storage"
            description="Turn unused hard drive capacity into a useful resource for the network. Allocate spare space and start receiving monthly payouts."
            checklist={[
              "Choose capacity (starting at 20 GB)",
              "Connect your computer",
              "Verify storage connection",
              "Start contributing to the network",
            ]}
            estimatedTime="about 2 minutes"
            actionLabel="Connect Storage"
            actionHref="/giver/setup"
          />
        ) : (
          <>
            {/* ── METRICS SUMMARY (PRIMARY INFORMATION: STORAGE, EARNINGS, HEALTH, NEXT ACTION) ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 1. YOUR STORAGE */}
              <div className="p-5 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-subtle)]">
                <div className="text-[12px] font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">
                  Your Storage
                </div>
                <div className="type-metric text-[var(--foreground)] mt-1">
                  {totalCapGb} <span className="text-[14px] font-normal text-[var(--foreground-secondary)]">GB total</span>
                </div>
                <div className="text-[12px] text-[var(--foreground-muted)] mt-1">
                  {totalAllocGb} GB allocated by network
                </div>
              </div>

              {/* 2. YOUR EARNINGS */}
              <div className="p-5 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-subtle)]">
                <div className="text-[12px] font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">
                  Estimated Earnings
                </div>
                <div className="type-metric text-[var(--foreground)] mt-1">
                  ₹{Math.round(earnings.projectedMonthlyInr || totalCapGb * 1.5)}{" "}
                  <span className="text-[14px] font-normal text-[var(--foreground-secondary)]">/ month</span>
                </div>
                <div className="text-[12px] text-[var(--foreground-muted)] mt-1">
                  ₹{Math.round(earnings.pendingPayoutInr || 0)} pending payout
                </div>
              </div>

              {/* 3. NODE HEALTH */}
              <div className="p-5 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-subtle)]">
                <div className="text-[12px] font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">
                  Node Health
                </div>
                <div className="type-metric text-[var(--success)] mt-1">
                  {summary.onlineCount || nodes.filter((n: any) => n.status === "ONLINE").length}{" "}
                  <span className="text-[14px] font-normal text-[var(--foreground-secondary)]">/ {nodes.length} online</span>
                </div>
                <div className="text-[12px] text-[var(--foreground-muted)] mt-1">
                  Continuous 10s heartbeat cadence
                </div>
              </div>

              {/* 4. NEXT ACTION */}
              <div className="p-5 rounded-[12px] border border-[var(--border)] bg-[var(--surface-subtle)]">
                <div className="text-[12px] font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">
                  Next Action
                </div>
                <div className="text-[13px] font-semibold text-[var(--foreground)] mt-1">
                  Keep computer online
                </div>
                <div className="text-[12px] text-[var(--foreground-secondary)] mt-1">
                  Maintains high uptime and maximizes your monthly allocation score.
                </div>
              </div>
            </div>

            {/* ── PROVIDER ECONOMICS & PAYOUT MODEL (PHASE 5 REQUIREMENT) ── */}
            <div className="p-6 rounded-[16px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-subtle)] space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="type-h3 font-bold text-[var(--foreground)] flex items-center gap-2">
                    <Coins className="w-5 h-5 text-[var(--secondary-accent)]" />
                    <span>Provider Economics & Realized Payout Model</span>
                  </h3>
                  <p className="text-[13px] text-[var(--foreground-secondary)] mt-0.5">
                    Transparent cost and earnings breakdown based on network storage allocation and hardware operating costs.
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-[var(--surface-subtle)] p-1 rounded-[8px] text-[12px]">
                  <button
                    type="button"
                    onClick={() => setUtilizationModel("projected")}
                    className={cn(
                      "px-3 py-1 rounded-[6px] font-medium transition-colors cursor-pointer",
                      utilizationModel === "projected"
                        ? "bg-[var(--surface)] text-[var(--foreground)] shadow-xs font-semibold"
                        : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                    )}
                  >
                    Projected (60% Allocation)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUtilizationModel("maximum")}
                    className={cn(
                      "px-3 py-1 rounded-[6px] font-medium transition-colors cursor-pointer",
                      utilizationModel === "maximum"
                        ? "bg-[var(--surface)] text-[var(--foreground)] shadow-xs font-semibold"
                        : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                    )}
                  >
                    Maximum Theoretical (100%)
                  </button>
                </div>
              </div>

              {/* Distinguish Payout States */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-[10px] bg-[var(--surface-subtle)] border border-[var(--border-subtle)]">
                  <div className="text-[11px] font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">
                    Estimated Monthly
                  </div>
                  <div className="type-metric text-[var(--foreground)] text-[22px] mt-0.5">
                    ₹{utilizationModel === "projected" ? Math.round(totalCapGb * 0.6 * 1.62) : Math.round(totalCapGb * 1.62)}
                  </div>
                  <div className="text-[11px] text-[var(--foreground-muted)]">
                    Net after operational costs
                  </div>
                </div>

                <div className="p-3.5 rounded-[10px] bg-[var(--surface-subtle)] border border-[var(--border-subtle)]">
                  <div className="text-[11px] font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">
                    Maximum Potential
                  </div>
                  <div className="type-metric text-[var(--secondary-accent)] text-[22px] mt-0.5">
                    ₹{Math.round(totalCapGb * 2.12)}
                  </div>
                  <div className="text-[11px] text-[var(--foreground-muted)]">
                    At 100% capacity 24/7
                  </div>
                </div>

                <div className="p-3.5 rounded-[10px] bg-[var(--surface-subtle)] border border-[var(--border-subtle)]">
                  <div className="text-[11px] font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">
                    Pending Cycle Payout
                  </div>
                  <div className="type-metric text-[var(--foreground)] text-[22px] mt-0.5">
                    ₹{Math.round(earnings.pendingPayoutInr || 0)}
                  </div>
                  <div className="text-[11px] text-[var(--foreground-muted)]">
                    Accrued chunk holding
                  </div>
                </div>

                <div className="p-3.5 rounded-[10px] bg-[var(--surface-subtle)] border border-[var(--border-subtle)]">
                  <div className="text-[11px] font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">
                    Lifetime Paid
                  </div>
                  <div className="type-metric text-[var(--success)] text-[22px] mt-0.5">
                    ₹{Math.round(earnings.totalPaidOutInr || 0)}
                  </div>
                  <div className="text-[11px] text-[var(--foreground-muted)]">
                    Direct bank ledger
                  </div>
                </div>
              </div>

              {/* Detailed Economics Table */}
              <div className="rounded-[12px] border border-[var(--border-subtle)] overflow-hidden text-[13px]">
                <div className="grid grid-cols-12 bg-[var(--surface-subtle)] px-4 py-2.5 font-semibold text-[11px] text-[var(--foreground-muted)] uppercase tracking-wider border-b border-[var(--border-subtle)]">
                  <div className="col-span-6">Component / Factor</div>
                  <div className="col-span-3 text-right">Unit Rate</div>
                  <div className="col-span-3 text-right">Monthly Impact</div>
                </div>

                <div className="divide-y divide-[var(--border-subtle)] px-4">
                  <div className="grid grid-cols-12 py-2.5 items-center">
                    <div className="col-span-6 text-[var(--foreground)]">
                      Gross Storage Contribution (₹2.50 / GB allocated)
                    </div>
                    <div className="col-span-3 text-right tabular-nums text-[var(--foreground-secondary)]">
                      +₹2.50 / GB
                    </div>
                    <div className="col-span-3 text-right tabular-nums font-semibold text-[var(--success)]">
                      +₹{Math.round(totalCapGb * (utilizationModel === "projected" ? 0.6 : 1.0) * 2.50)}
                    </div>
                  </div>

                  <div className="grid grid-cols-12 py-2.5 items-center">
                    <div className="col-span-6 text-[var(--foreground)]">
                      Estimated Electricity (~18W incremental PC idle)
                    </div>
                    <div className="col-span-3 text-right tabular-nums text-[var(--foreground-secondary)]">
                      -₹0.20 / GB
                    </div>
                    <div className="col-span-3 text-right tabular-nums text-[var(--error)]">
                      -₹{Math.round(totalCapGb * (utilizationModel === "projected" ? 0.6 : 1.0) * 0.20)}
                    </div>
                  </div>

                  <div className="grid grid-cols-12 py-2.5 items-center">
                    <div className="col-span-6 text-[var(--foreground)]">
                      Hardware Depreciation & Drive Wear (~5-year life)
                    </div>
                    <div className="col-span-3 text-right tabular-nums text-[var(--foreground-secondary)]">
                      -₹0.30 / GB
                    </div>
                    <div className="col-span-3 text-right tabular-nums text-[var(--error)]">
                      -₹{Math.round(totalCapGb * (utilizationModel === "projected" ? 0.6 : 1.0) * 0.30)}
                    </div>
                  </div>

                  <div className="grid grid-cols-12 py-2.5 items-center">
                    <div className="col-span-6 text-[var(--foreground)]">
                      AetherGrid Platform Coordination & Insurance Fee (15%)
                    </div>
                    <div className="col-span-3 text-right tabular-nums text-[var(--foreground-secondary)]">
                      -15% gross
                    </div>
                    <div className="col-span-3 text-right tabular-nums text-[var(--error)]">
                      -₹{Math.round(totalCapGb * (utilizationModel === "projected" ? 0.6 : 1.0) * 2.50 * 0.15)}
                    </div>
                  </div>

                  <div className="grid grid-cols-12 py-3 items-center font-bold bg-[var(--surface-subtle)] -mx-4 px-4 border-t border-[var(--border)]">
                    <div className="col-span-6 text-[var(--foreground)]">
                      Net Estimated Provider Payout
                    </div>
                    <div className="col-span-3 text-right tabular-nums text-[var(--secondary-accent)]">
                      ~₹1.62 / GB net
                    </div>
                    <div className="col-span-3 text-right tabular-nums text-[15px] text-[var(--foreground)]">
                      ₹{utilizationModel === "projected" ? Math.round(totalCapGb * 0.6 * 1.62) : Math.round(totalCapGb * 1.62)} / mo
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 text-[12px] text-[var(--foreground-muted)] pt-1">
                <Info className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                <span>
                  <strong>Assumptions:</strong> Calculations assume continuous 99.5% network availability and unmetered broadband connection. Actual payouts are calculated hourly based on cryptographically verified chunk retention audits.
                </span>
              </div>
            </div>

            {/* ── NATIVE NODE SERVICE CONTROL (NODE #001) ── */}
            <div className="p-5 rounded-[14px] border border-[var(--primary)]/30 bg-[var(--surface)] shadow-[var(--shadow-subtle)] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded">
                      Host PC Physical Node #001
                    </span>
                    <span className={cn(
                      "text-[12px] font-semibold flex items-center gap-1.5",
                      serviceInfo?.running ? "text-[var(--success)]" : "text-[var(--foreground-muted)]"
                    )}>
                      <span className={cn(
                        "w-2 h-2 rounded-full",
                        serviceInfo?.running ? "bg-[var(--success)] animate-pulse" : "bg-[var(--border)]"
                      )} />
                      {serviceInfo?.running ? `Service Online (PID: ${serviceInfo.pid})` : "Service Stopped"}
                    </span>
                  </div>
                  <h3 className="text-[16px] font-bold text-[var(--foreground)]">
                    Local Node Runtime Service
                  </h3>
                  <p className="text-[13px] text-[var(--foreground-secondary)]">
                    Operates inside dedicated sandbox <code className="text-[12px] font-mono bg-[var(--surface-subtle)] px-1.5 py-0.5 rounded">D:\AetherGridStorage</code> (100 GB allocation with drive safety buffer).
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant={serviceInfo?.running ? "outline" : "primary"}
                    size="sm"
                    disabled={serviceToggling}
                    onClick={toggleNodeService}
                    className="gap-2 min-h-[44px] px-4 font-semibold"
                  >
                    <Power className={cn("w-4 h-4", serviceInfo?.running ? "text-[var(--error)]" : "text-[var(--success)]")} />
                    <span>{serviceToggling ? "Processing..." : serviceInfo?.running ? "Stop Node Service" : "1-Click Start Node #001"}</span>
                  </Button>
                </div>
              </div>

              {serviceInfo?.logs && serviceInfo.logs.length > 0 && (
                <div className="mt-2 p-3 rounded-[8px] bg-slate-950 text-slate-300 font-mono text-[11px] max-h-28 overflow-y-auto space-y-1 border border-slate-800">
                  <div className="text-[10px] uppercase font-semibold text-slate-500 mb-1">Live Service Telemetry:</div>
                  {serviceInfo.logs.slice(-4).map((log, i) => (
                    <div key={i} className="truncate">{log}</div>
                  ))}
                </div>
              )}
            </div>

            {/* ── CONNECTED NODES LIST ── */}
            <div className="space-y-4">
              <h2 className="type-h3 text-[var(--foreground)] font-bold">Registered Nodes</h2>

              <div className="space-y-4">
                {nodes.map((node: any) => {
                  const capGb = Math.round(node.capacity_bytes / (1024 * 1024 * 1024));
                  const isOnline = node.status === "ONLINE";
                  const isPendingAction = actionLoading === node.id;
                  const isAdvOpen = showAdvanced[node.id];

                  return (
                    <div
                      key={node.id}
                      className="rounded-[14px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-subtle)] p-6 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-[10px] bg-[var(--surface-subtle)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--secondary-accent)] shrink-0">
                            <Server className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold text-[15px] text-[var(--foreground)] flex items-center gap-2">
                              <span>{node.node_name}</span>
                              <span className="text-[11px] font-mono text-[var(--foreground-muted)] bg-[var(--surface-subtle)] px-2 py-0.5 rounded">
                                {node.id}
                              </span>
                            </div>
                            <div className="text-[12px] text-[var(--foreground-muted)] mt-0.5">
                              Heartbeat: {node.last_heartbeat_at ? new Date(node.last_heartbeat_at).toLocaleTimeString() : "Just now"}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <StatusBadge status={isOnline ? "HEALTHY" : "OFFLINE"} />
                          <Button
                            variant={isOnline ? "outline" : "primary"}
                            size="sm"
                            disabled={isPendingAction}
                            onClick={() => toggleNodeStatus(node.id, node.status)}
                            className="gap-1.5"
                          >
                            <Power className="w-3.5 h-3.5" />
                            <span>{isOnline ? "Pause Node" : "Resume Node"}</span>
                          </Button>
                        </div>
                      </div>

                      {/* Capacity Meter */}
                      <StorageMeter
                        usedBytes={node.used_bytes || 0}
                        totalBytes={node.capacity_bytes}
                        label="Node Space Used"
                      />

                      {/* Collapsible Advanced Connection Details (Audit requirement 13: hide daemon implementation details) */}
                      <div className="pt-2 border-t border-[var(--border-subtle)]">
                        <button
                          type="button"
                          onClick={() => toggleAdvanced(node.id)}
                          className="flex items-center gap-1.5 text-[12px] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] font-medium cursor-pointer"
                        >
                          {isAdvOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                          <span>Advanced connection details</span>
                        </button>

                        {isAdvOpen && (
                          <div className="mt-3 p-4 rounded-[10px] bg-[var(--surface-subtle)] border border-[var(--border-subtle)] space-y-3 animate-in fade-in-50 duration-150">
                            <div>
                              <div className="text-[11px] font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-1">
                                Background Daemon Command
                              </div>
                              <div className="flex items-center gap-2">
                                <code className="flex-1 text-[12px] font-mono bg-[var(--surface)] p-2.5 rounded-[6px] border border-[var(--border)] text-[var(--foreground)] overflow-x-auto">
                                  node node-client/node-daemon.mjs --capacity {capGb}
                                </code>
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => copyCommand(node.id, node.node_token_hash, capGb)}
                                  className="gap-1 shrink-0"
                                >
                                  {copiedId === node.id ? <Check className="w-3.5 h-3.5 text-[var(--success)]" /> : <Copy className="w-3.5 h-3.5" />}
                                  <span>{copiedId === node.id ? "Copied" : "Copy"}</span>
                                </Button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px] text-[var(--foreground-secondary)] pt-1">
                              <div>
                                <span className="font-semibold text-[var(--foreground)]">Storage Root: </span>
                                <span className="font-mono text-[11px] truncate block mt-0.5">
                                  {node.storage_directory || "Default Data Directory"}
                                </span>
                              </div>
                              <div>
                                <span className="font-semibold text-[var(--foreground)]">Encryption Guarantee: </span>
                                <span className="block mt-0.5">Provider stores encrypted 2MB chunk blobs only.</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
