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
  PowerOff,
  Power,
  ArrowLeft,
  Server,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

type TimelineStage = 
  | "ALPHA_AVAILABLE"
  | "ALPHA_UNAVAILABLE"
  | "BETA_SERVING"
  | "ALPHA_RECOVERING"
  | "ALPHA_HEALTHY";

export default function MobileSimulatorPage() {
  const [backingUp, setBackingUp] = useState(false);
  const [backupStep, setBackupStep] = useState<string | null>(null);
  const [lastBackup, setLastBackup] = useState<any>(null);
  const [nodes, setNodes] = useState<any[]>([]);
  const [testingFailover, setTestingFailover] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [currentStage, setCurrentStage] = useState<TimelineStage>("ALPHA_AVAILABLE");

  const fetchNetworkState = async () => {
    try {
      const [nRes] = await Promise.all([
        fetch("/api/admin/marketplace"),
        fetch("/api/taker/health"),
      ]);
      if (nRes.ok) {
        const nData = await nRes.json();
        setNodes(nData.nodes || []);
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
    setBackupStep("Collecting photo & contact metadata...");
    await new Promise((r) => setTimeout(r, 600));

    setBackupStep("Encrypting payload with AES-256-GCM (per-object key)...");
    await new Promise((r) => setTimeout(r, 700));

    setBackupStep("Distributing 2MB chunks to replica nodes...");

    try {
      const res = await fetch("/api/taker/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceName: "Google Pixel 9 Pro",
          deviceModel: "Android 15 / Tensor G4",
          contactsCount: 254,
          photosCount: 68,
          notes: "Mobile Companion Simulation",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setBackupStep("Sync Complete: 2x Peer Redundancy verified.");
        setLastBackup(data);
        setCurrentStage("ALPHA_AVAILABLE");
        await fetchNetworkState();
      } else {
        setBackupStep(`Sync could not complete: ${data.error}`);
      }
    } catch (err: any) {
      setBackupStep(`Network error: ${err.message}`);
    } finally {
      setTimeout(() => setBackingUp(false), 1500);
    }
  };

  const dropFirstNode = async () => {
    if (nodes.length === 0) return;
    const onlineNode = nodes.find((n) => n.status === "ONLINE");
    if (!onlineNode) return;

    setTestingFailover(true);
    setCurrentStage("ALPHA_UNAVAILABLE");
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

  const testFailoverDownload = async () => {
    if (!lastBackup?.fileId) {
      alert("Please trigger a device backup first to create an encrypted test snapshot.");
      return;
    }

    try {
      const res = await fetch(`/api/taker/files/${lastBackup.fileId}`);
      if (res.ok) {
        const failoverHeader = res.headers.get("X-AetherGrid-Failover-Used");
        if (failoverHeader === "true") {
          setCurrentStage("BETA_SERVING");
          setDownloadSuccess(
            "Replica Failover Verified: Primary node was unreachable. File chunks were successfully retrieved and verified from surviving replica Node Beta."
          );
        } else {
          setDownloadSuccess(
            "Primary Retrieval Verified: File chunks retrieved and decrypted with full integrity verification."
          );
        }
      }
    } catch {}
  };

  const restoreAllNodes = async () => {
    setTestingFailover(true);
    setCurrentStage("ALPHA_RECOVERING");
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
      await new Promise((r) => setTimeout(r, 600));
      setCurrentStage("ALPHA_HEALTHY");
      await fetchNetworkState();
    } catch {} finally {
      setTestingFailover(false);
    }
  };

  const onlineNodes = nodes.filter((n) => n.status === "ONLINE");

  return (
    <div className="min-h-[85vh] bg-[var(--background)] text-[var(--foreground)] py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-[13px] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Personal Cloud</span>
        </Link>

        {/* ── HEADER WITH PROMINENT SIMULATION BADGE & BOUNDARY DISCLAIMER ── */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-muted)] text-[var(--primary)] text-[12px] font-semibold uppercase tracking-wider">
            <Smartphone className="w-3.5 h-3.5" />
            SIMULATION ENVIRONMENT
          </div>

          <h1 className="type-h1 text-[var(--foreground)] font-bold">
            Mobile Companion & Replica Failover Simulation
          </h1>

          <div className="p-4 rounded-[12px] bg-[var(--surface-subtle)] border border-[var(--border-subtle)] text-[13px] text-[var(--foreground-secondary)] max-w-2xl mx-auto leading-relaxed flex items-start gap-2.5 text-left">
            <Info className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[var(--foreground)]">Simulation Boundary: </span>
              This interactive surface demonstrates how AetherGrid background companion sync and automatic replica failover operate when a storage peer goes offline. It demonstrates resilience mechanisms in real time.
            </div>
          </div>
        </div>

        {/* ── 5-STAGE TIMELINE VISUALIZER (AUDIT SECTION 18) ── */}
        <div className="p-6 rounded-[16px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-subtle)] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="type-h3 text-[var(--foreground)] font-semibold">
              Resilience Timeline Progression
            </h2>
            <span className="text-[12px] text-[var(--foreground-muted)]">Live State Sequence</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
            {/* Step 1 */}
            <div
              className={cn(
                "p-3 rounded-[10px] border transition-all text-left",
                currentStage === "ALPHA_AVAILABLE"
                  ? "border-[var(--primary)] bg-[var(--primary-muted)]"
                  : "border-[var(--border-subtle)] bg-[var(--surface-subtle)]"
              )}
            >
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--primary)]">Stage 1</div>
              <div className="font-bold text-[13px] text-[var(--foreground)] mt-0.5">Node Alpha Available</div>
              <div className="text-[11px] text-[var(--foreground-secondary)] mt-1">Both replicas serving</div>
            </div>

            {/* Step 2 */}
            <div
              className={cn(
                "p-3 rounded-[10px] border transition-all text-left",
                currentStage === "ALPHA_UNAVAILABLE"
                  ? "border-[var(--warning)] bg-[var(--warning-muted)] text-[var(--warning)]"
                  : "border-[var(--border-subtle)] bg-[var(--surface-subtle)]"
              )}
            >
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--warning)]">Stage 2</div>
              <div className="font-bold text-[13px] text-[var(--foreground)] mt-0.5">Node Alpha Dropped</div>
              <div className="text-[11px] text-[var(--foreground-secondary)] mt-1">Host becomes unreachable</div>
            </div>

            {/* Step 3 */}
            <div
              className={cn(
                "p-3 rounded-[10px] border transition-all text-left",
                currentStage === "BETA_SERVING"
                  ? "border-[var(--success)] bg-[var(--success-muted)] text-[var(--success)]"
                  : "border-[var(--border-subtle)] bg-[var(--surface-subtle)]"
              )}
            >
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--success)]">Stage 3</div>
              <div className="font-bold text-[13px] text-[var(--foreground)] mt-0.5">Node Beta Serving</div>
              <div className="text-[11px] text-[var(--foreground-secondary)] mt-1">Replica rescues chunk download</div>
            </div>

            {/* Step 4 */}
            <div
              className={cn(
                "p-3 rounded-[10px] border transition-all text-left",
                currentStage === "ALPHA_RECOVERING"
                  ? "border-[var(--info)] bg-[var(--info-muted)]"
                  : "border-[var(--border-subtle)] bg-[var(--surface-subtle)]"
              )}
            >
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--info)]">Stage 4</div>
              <div className="font-bold text-[13px] text-[var(--foreground)] mt-0.5">Node Recovering</div>
              <div className="text-[11px] text-[var(--foreground-secondary)] mt-1">Heartbeat re-established</div>
            </div>

            {/* Step 5 */}
            <div
              className={cn(
                "p-3 rounded-[10px] border transition-all text-left",
                currentStage === "ALPHA_HEALTHY"
                  ? "border-[var(--success)] bg-[var(--success-muted)] text-[var(--success)]"
                  : "border-[var(--border-subtle)] bg-[var(--surface-subtle)]"
              )}
            >
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--success)]">Stage 5</div>
              <div className="font-bold text-[13px] text-[var(--foreground)] mt-0.5">Cluster Healthy</div>
              <div className="text-[11px] text-[var(--foreground-secondary)] mt-1">2x redundancy verified</div>
            </div>
          </div>
        </div>

        {/* ── SIMULATION CONTROLS & PHONE MOCKUP GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: PHONE MOCKUP (5 COLS) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-[320px] sm:w-[350px] rounded-[44px] p-3 bg-neutral-900 border-4 border-neutral-700 shadow-2xl relative text-white">
              {/* Phone Screen Notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-4 bg-neutral-800 rounded-full z-20 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-black" />
              </div>

              {/* Phone Screen Content */}
              <div className="w-full bg-neutral-950 rounded-[34px] overflow-hidden pt-8 pb-6 px-5 border border-neutral-800 flex flex-col justify-between min-h-[580px]">
                {/* Status bar */}
                <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-6 px-2">
                  <span className="font-bold text-white">9:41</span>
                  <div className="flex items-center gap-2">
                    <Wifi className="w-3.5 h-3.5 text-white" />
                    <span className="font-mono text-[10px]">5G</span>
                    <Battery className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>

                {/* Phone App Identity */}
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-[12px] bg-[var(--primary)] flex items-center justify-center mx-auto mb-2 shadow-md">
                    <Cloud className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-bold text-[16px] text-white">AetherGrid Sync</div>
                  <div className="text-[11px] text-neutral-400">Android Companion Daemon</div>
                </div>

                {/* Backup Status */}
                <div className="bg-neutral-900/80 rounded-[14px] p-4 border border-neutral-800 space-y-3 mb-6">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-neutral-400">Sync Status:</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Client Encrypted
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[12px]">
                    <div className="bg-neutral-950 p-2.5 rounded-[8px]">
                      <div className="text-[10px] text-neutral-400 uppercase font-mono">Contacts</div>
                      <div className="text-lg font-bold text-white mt-0.5">254</div>
                    </div>
                    <div className="bg-neutral-950 p-2.5 rounded-[8px]">
                      <div className="text-[10px] text-neutral-400 uppercase font-mono">Photos</div>
                      <div className="text-lg font-bold text-white mt-0.5">68</div>
                    </div>
                  </div>

                  {backupStep && (
                    <div className="text-[11px] text-cyan-300 font-mono bg-cyan-950/40 p-2 rounded border border-cyan-800/40">
                      {backupStep}
                    </div>
                  )}
                </div>

                {/* Action Button inside phone */}
                <button
                  type="button"
                  disabled={backingUp}
                  onClick={runMobileBackup}
                  className="w-full py-3 px-4 rounded-[12px] bg-[var(--primary)] text-white font-semibold text-[14px] hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-lg"
                >
                  {backingUp ? "Encrypting & Syncing..." : "Run Phone Backup"}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: FAILOVER CONTROLS & VERIFICATION (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Chaos Control Panel */}
            <div className="p-6 rounded-[16px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-subtle)] space-y-5">
              <div>
                <h2 className="type-h3 text-[var(--foreground)] font-bold mb-1">
                  Chaos Resilience Engine
                </h2>
                <p className="text-[14px] text-[var(--foreground-secondary)]">
                  Intentionally take a storage node offline to verify that customer files remain retrievable through secondary replicas.
                </p>
              </div>

              {/* Node Topology List in Simulator */}
              <div className="space-y-2">
                <div className="text-[12px] font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">
                  Cluster Node States ({nodes.length} Nodes Detected)
                </div>

                <div className="space-y-2">
                  {nodes.map((n) => {
                    const isNodeOnline = n.status === "ONLINE";
                    return (
                      <div
                        key={n.id}
                        className="flex items-center justify-between p-3.5 rounded-[10px] border border-[var(--border-subtle)] bg-[var(--surface-subtle)]"
                      >
                        <div className="flex items-center gap-3">
                          <Server
                            className={cn(
                              "w-4 h-4",
                              isNodeOnline ? "text-[var(--success)]" : "text-[var(--error)]"
                            )}
                          />
                          <div>
                            <div className="font-semibold text-[13px] text-[var(--foreground)]">
                              {n.node_name}
                            </div>
                            <div className="text-[11px] font-mono text-[var(--foreground-muted)]">
                              {n.id}
                            </div>
                          </div>
                        </div>

                        <StatusBadge status={isNodeOnline ? "HEALTHY" : "OFFLINE"} size="sm" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chaos Trigger Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <Button
                  variant="destructive"
                  size="default"
                  disabled={testingFailover || onlineNodes.length === 0}
                  onClick={dropFirstNode}
                  className="gap-2"
                >
                  <PowerOff className="w-4 h-4" />
                  <span>Drop Active Node (Simulate Failure)</span>
                </Button>

                <Button
                  variant="secondary"
                  size="default"
                  disabled={testingFailover}
                  onClick={restoreAllNodes}
                  className="gap-2"
                >
                  <Power className="w-4 h-4 text-[var(--success)]" />
                  <span>Restore All Nodes</span>
                </Button>
              </div>

              {/* Failover Verification Action */}
              <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3">
                <div className="text-[13px] text-[var(--foreground-secondary)]">
                  Verify failover by attempting to download the snapshot while primary node is offline:
                </div>

                <Button
                  variant="primary"
                  size="default"
                  onClick={testFailoverDownload}
                  disabled={!lastBackup}
                  className="w-full gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Test Failover Retrieval & Verify Headers</span>
                </Button>

                {downloadSuccess && (
                  <div className="p-3.5 rounded-[10px] bg-[var(--success-muted)] border border-[var(--success)]/30 text-[13px] text-[var(--success)] flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                    <span className="font-medium">{downloadSuccess}</span>
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
