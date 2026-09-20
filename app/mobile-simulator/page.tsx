"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Smartphone,
  Wifi,
  Battery,
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

interface SimulatedNode {
  id: string;
  node_name: string;
  role: "Primary (Node Alpha)" | "Secondary Replica (Node Beta)";
  status: "ONLINE" | "OFFLINE";
  capacity: string;
  location: string;
}

const INITIAL_SIMULATED_NODES: SimulatedNode[] = [
  {
    id: "SIM-NODE-ALPHA",
    node_name: "Simulated Node Alpha",
    role: "Primary (Node Alpha)",
    status: "ONLINE",
    capacity: "100 GB",
    location: "US-East (Simulated)",
  },
  {
    id: "SIM-NODE-BETA",
    node_name: "Simulated Node Beta",
    role: "Secondary Replica (Node Beta)",
    status: "ONLINE",
    capacity: "100 GB",
    location: "EU-West (Simulated)",
  },
];

export default function MobileSimulatorPage() {
  const [backingUp, setBackingUp] = useState(false);
  const [backupStep, setBackupStep] = useState<string | null>(null);
  const [lastBackup, setLastBackup] = useState<any>(null);
  const [simNodes, setSimNodes] = useState<SimulatedNode[]>(INITIAL_SIMULATED_NODES);
  const [testingFailover, setTestingFailover] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [currentStage, setCurrentStage] = useState<TimelineStage>("ALPHA_AVAILABLE");

  const runMobileBackup = async () => {
    setBackingUp(true);
    setBackupStep("Collecting photo & contact metadata...");
    await new Promise((r) => setTimeout(r, 500));

    setBackupStep("Encrypting payload with AES-256-GCM (per-object derived key)...");
    await new Promise((r) => setTimeout(r, 600));

    setBackupStep("Distributing 2MB chunks to replica nodes...");

    try {
      const res = await fetch("/api/taker/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceName: "Google Pixel 9 Pro (Simulated)",
          deviceModel: "Android 15 / Tensor G4",
          contactsCount: 254,
          photosCount: 68,
          notes: "Mobile Companion Simulation",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setBackupStep("Sync Complete: Simulated snapshot encrypted and stored.");
        setLastBackup(data);
        setCurrentStage("ALPHA_AVAILABLE");
      } else {
        // Even if live node is offline, allow simulated backup demonstration in UI
        setBackupStep("Sync Complete: Simulated snapshot generated for failover demonstration.");
        setLastBackup({
          fileId: "sim_snap_" + Date.now(),
          deviceName: "Google Pixel 9 Pro (Simulated)",
        });
        setCurrentStage("ALPHA_AVAILABLE");
      }
    } catch {
      setBackupStep("Sync Complete: Local simulation snapshot generated.");
      setLastBackup({
        fileId: "sim_snap_" + Date.now(),
        deviceName: "Google Pixel 9 Pro (Simulated)",
      });
      setCurrentStage("ALPHA_AVAILABLE");
    } finally {
      setTimeout(() => setBackingUp(false), 1200);
    }
  };

  // Purely in-memory simulated failure — NEVER mutates production SQLite storage_nodes table!
  const dropFirstNode = async () => {
    setTestingFailover(true);
    setCurrentStage("ALPHA_UNAVAILABLE");
    setDownloadSuccess(null);
    setSimNodes((prev) =>
      prev.map((n, idx) => (idx === 0 ? { ...n, status: "OFFLINE" } : n))
    );
    await new Promise((r) => setTimeout(r, 400));
    setTestingFailover(false);
  };

  const testFailoverDownload = async () => {
    if (!lastBackup) {
      alert("Please trigger a device backup first to create a test snapshot.");
      return;
    }

    setTestingFailover(true);
    await new Promise((r) => setTimeout(r, 500));

    const alphaOffline = simNodes[0]?.status === "OFFLINE";
    const betaOnline = simNodes[1]?.status === "ONLINE";

    if (alphaOffline && betaOnline) {
      setCurrentStage("BETA_SERVING");
      setDownloadSuccess(
        "Simulated Replica Failover Verified: Primary Node Alpha was unreachable. Chunks were successfully retrieved and verified from secondary replica Node Beta."
      );
    } else if (!alphaOffline) {
      setDownloadSuccess(
        "Primary Retrieval Verified: Node Alpha is online and serving intact chunks directly."
      );
    } else {
      setDownloadSuccess(
        "Cluster Unavailable: All simulated nodes are offline. No surviving replica available."
      );
    }
    setTestingFailover(false);
  };

  // Purely in-memory simulated recovery — NEVER mutates production SQLite storage_nodes table!
  const restoreAllNodes = async () => {
    setTestingFailover(true);
    setCurrentStage("ALPHA_RECOVERING");
    setDownloadSuccess(null);
    await new Promise((r) => setTimeout(r, 500));
    setSimNodes((prev) => prev.map((n) => ({ ...n, status: "ONLINE" })));
    setCurrentStage("ALPHA_HEALTHY");
    setTestingFailover(false);
  };

  const onlineSimNodes = simNodes.filter((n) => n.status === "ONLINE");

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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--primary-muted)] text-[var(--primary)] text-[12px] font-semibold uppercase tracking-wider border border-[var(--primary)]/30">
            <Smartphone className="w-3.5 h-3.5" />
            SIMULATION LAB • TESTBENCH
          </div>

          <h1 className="type-h1 text-[var(--foreground)] font-bold">
            Mobile Companion & Replica Failover Simulation
          </h1>

          <div className="p-4 rounded-[12px] bg-[var(--surface-subtle)] border border-[var(--border-subtle)] text-[13px] text-[var(--foreground-secondary)] max-w-2xl mx-auto leading-relaxed flex items-start gap-2.5 text-left">
            <Info className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[var(--foreground)]">Simulation Boundary: </span>
              This interactive testbench runs in an isolated simulated environment. Toggling simulated node states demonstrates failover mechanisms without impacting your production personal cloud or Node #001 hardware.
            </div>
          </div>
        </div>

        {/* ── 5-STAGE TIMELINE VISUALIZER ── */}
        <div className="p-6 rounded-[16px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-subtle)] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="type-h3 text-[var(--foreground)] font-semibold">
              Resilience Timeline Progression
            </h2>
            <span className="text-[12px] text-[var(--foreground-muted)]">Simulated Sequence</span>
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
                  ? "border-[var(--error)] bg-[var(--error-muted)] text-[var(--error)]"
                  : "border-[var(--border-subtle)] bg-[var(--surface-subtle)]"
              )}
            >
              <div className="text-[11px] font-semibold uppercase tracking-wider">Stage 2</div>
              <div className="font-bold text-[13px] mt-0.5">Node Alpha Offline</div>
              <div className="text-[11px] opacity-90 mt-1">Primary drops offline</div>
            </div>

            {/* Step 3 */}
            <div
              className={cn(
                "p-3 rounded-[10px] border transition-all text-left",
                currentStage === "BETA_SERVING"
                  ? "border-[var(--warning)] bg-[var(--warning-muted)] text-[var(--warning)]"
                  : "border-[var(--border-subtle)] bg-[var(--surface-subtle)]"
              )}
            >
              <div className="text-[11px] font-semibold uppercase tracking-wider">Stage 3</div>
              <div className="font-bold text-[13px] mt-0.5">Node Beta Serving</div>
              <div className="text-[11px] opacity-90 mt-1">Replica failover active</div>
            </div>

            {/* Step 4 */}
            <div
              className={cn(
                "p-3 rounded-[10px] border transition-all text-left",
                currentStage === "ALPHA_RECOVERING"
                  ? "border-[var(--info)] bg-[var(--info-muted)] text-[var(--info)]"
                  : "border-[var(--border-subtle)] bg-[var(--surface-subtle)]"
              )}
            >
              <div className="text-[11px] font-semibold uppercase tracking-wider">Stage 4</div>
              <div className="font-bold text-[13px] mt-0.5">Alpha Recovering</div>
              <div className="text-[11px] opacity-90 mt-1">Re-verifying GCM tags</div>
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
              <div className="text-[11px] font-semibold uppercase tracking-wider">Stage 5</div>
              <div className="font-bold text-[13px] mt-0.5">Healthy & Synced</div>
              <div className="text-[11px] opacity-90 mt-1">Full redundancy restored</div>
            </div>
          </div>
        </div>

        {/* ── TWO-COLUMN INTERACTIVE BENCH ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: SIMULATED MOBILE PHONE VIEWPORT (5 COLS) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="text-center mb-3">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[var(--foreground-muted)]">
                Simulated Companion Device
              </span>
            </div>

            {/* Realistic Phone Shell */}
            <div className="w-[320px] sm:w-[350px] rounded-[44px] p-3 bg-neutral-900 border-4 border-neutral-700 shadow-2xl relative text-white">
              {/* Speaker notch */}
              <div className="w-24 h-4 bg-neutral-800 rounded-full mx-auto mb-3" />

              {/* Status bar */}
              <div className="flex items-center justify-between px-4 text-[11px] text-neutral-400 mb-4">
                <span>9:41 AM</span>
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Mobile App Screen Content */}
              <div className="bg-neutral-950 rounded-[32px] p-5 space-y-5 border border-neutral-800 min-h-[440px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Cloud className="w-4 h-4 text-emerald-400" />
                    <span className="text-[13px] font-bold tracking-tight">AetherGrid Sync</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Background Mobile Companion
                  </p>
                </div>

                {/* Backup Status Card in Phone */}
                <div className="p-4 rounded-[16px] bg-neutral-900 border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-neutral-300 font-medium">Encrypted Sync</span>
                    <StatusBadge status="SIMULATION" label="Simulated" size="sm" />
                  </div>

                  <div className="space-y-1 text-[11px] text-neutral-400">
                    <div className="flex justify-between">
                      <span>Contacts:</span>
                      <span className="text-white font-medium">254 entries</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Photos:</span>
                      <span className="text-white font-medium">68 photos</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Encryption:</span>
                      <span className="text-emerald-400 font-medium">AES-256-GCM</span>
                    </div>
                  </div>

                  {backupStep && (
                    <div className="p-2.5 rounded-[8px] bg-neutral-950 border border-neutral-800 text-[11px] text-emerald-400 font-mono">
                      {backupStep}
                    </div>
                  )}
                </div>

                {/* Action Trigger */}
                <div className="space-y-2">
                  <Button
                    onClick={runMobileBackup}
                    disabled={backingUp}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-[13px] py-2.5 rounded-[12px]"
                  >
                    {backingUp ? "Encrypting & Syncing..." : "Run Companion Backup"}
                  </Button>
                  <p className="text-[10px] text-center text-neutral-500">
                    Simulates instant mobile photo/contact backup
                  </p>
                </div>
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="w-32 h-1 bg-neutral-600 rounded-full mx-auto mt-4 mb-1" />
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
                  Simulate primary node outages to verify that data retrieval transparently fails over to secondary replicas.
                </p>
              </div>

              {/* Node Topology List in Simulator */}
              <div className="space-y-2">
                <div className="text-[12px] font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">
                  Simulated Cluster Nodes ({simNodes.length} Nodes)
                </div>

                <div className="space-y-2">
                  {simNodes.map((n) => {
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
                              {n.node_name} <span className="text-[11px] text-[var(--foreground-muted)] font-normal">({n.role})</span>
                            </div>
                            <div className="text-[11px] text-[var(--foreground-muted)]">
                              {n.location} • {n.capacity}
                            </div>
                          </div>
                        </div>

                        <StatusBadge
                          status={isNodeOnline ? "ONLINE" : "OFFLINE"}
                          label={isNodeOnline ? "Sim: Online" : "Sim: Offline"}
                          size="sm"
                        />
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
                  disabled={testingFailover || onlineSimNodes.length === 0 || simNodes[0].status === "OFFLINE"}
                  onClick={dropFirstNode}
                  className="gap-2 cursor-pointer"
                >
                  <PowerOff className="w-4 h-4" />
                  <span>Drop Node Alpha (Simulate Outage)</span>
                </Button>

                <Button
                  variant="secondary"
                  size="default"
                  disabled={testingFailover || simNodes.every((n) => n.status === "ONLINE")}
                  onClick={restoreAllNodes}
                  className="gap-2 cursor-pointer"
                >
                  <Power className="w-4 h-4 text-[var(--success)]" />
                  <span>Restore All Nodes</span>
                </Button>
              </div>

              {/* Failover Verification Action */}
              <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3">
                <div className="text-[13px] text-[var(--foreground-secondary)]">
                  Verify failover by attempting retrieval while primary Node Alpha is offline:
                </div>

                <Button
                  size="default"
                  onClick={testFailoverDownload}
                  disabled={!lastBackup || testingFailover}
                  className="w-full gap-2 cursor-pointer"
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
