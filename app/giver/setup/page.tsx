"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  Play,
  ShieldCheck,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";

const CAPACITY_PRESETS = [
  { gb: "20", label: "20 GB (Starter)", monthly: "₹30" },
  { gb: "50", label: "50 GB (Popular)", monthly: "₹75" },
  { gb: "100", label: "100 GB", monthly: "₹150" },
  { gb: "250", label: "250 GB", monthly: "₹375" },
  { gb: "500", label: "500 GB (Power)", monthly: "₹750" },
];

export default function GiverSetupPage() {
  const [step, setStep] = useState(1);
  const [nodeName, setNodeName] = useState("Home Storage Node");
  const [capacityGb, setCapacityGb] = useState("50");
  const [loading, setLoading] = useState(false);
  const [registeredNode, setRegisteredNode] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [simulatedOnline, setSimulatedOnline] = useState(false);

  const estimatedMonthlyInr = Math.round(parseInt(capacityGb, 10) * 1.5);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/nodes/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nodeName,
          capacityGb: parseInt(capacityGb, 10),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setRegisteredNode(data);
        setStep(2);
      }
    } catch {} finally {
      setLoading(false);
    }
  };

  const handleSimulateStart = async () => {
    if (!registeredNode) return;
    try {
      await fetch("/api/nodes/heartbeat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: registeredNode.token,
          usedBytes: 0,
          availableBytes: parseInt(capacityGb, 10) * 1024 * 1024 * 1024,
          latencyMs: 8,
        }),
      });
      setSimulatedOnline(true);
    } catch {}
  };

  const copyCommand = () => {
    if (!registeredNode) return;
    navigator.clipboard.writeText(registeredNode.cliCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[85vh] bg-[var(--background)] text-[var(--foreground)] py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Back Link */}
        <Link
          href="/giver"
          className="inline-flex items-center gap-2 text-[13px] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Storage Provider Workspace</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="text-[12px] font-semibold text-[var(--secondary-accent)] uppercase tracking-wider mb-1">
            Storage Provider Onboarding
          </div>
          <h1 className="type-h1 text-[var(--foreground)] font-bold">
            Connect your storage
          </h1>
          <p className="text-[14px] text-[var(--foreground-secondary)] mt-1">
            Allocate spare hard drive space and start receiving monthly payouts in 3 simple steps.
          </p>
        </div>

        {/* 3-Step Plain Language Progress Bar */}
        <div className="grid grid-cols-3 gap-2 mb-8 pb-4 border-b border-[var(--border)]">
          <div
            className={`flex items-center gap-2 text-[13px] font-semibold ${
              step >= 1 ? "text-[var(--primary)]" : "text-[var(--foreground-muted)]"
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step >= 1
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--surface-subtle)] text-[var(--foreground-muted)]"
              }`}
            >
              1
            </span>
            <span className="hidden sm:inline">Choose capacity</span>
          </div>

          <div
            className={`flex items-center gap-2 text-[13px] font-semibold ${
              step >= 2 ? "text-[var(--primary)]" : "text-[var(--foreground-muted)]"
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step >= 2
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--surface-subtle)] text-[var(--foreground-muted)]"
              }`}
            >
              2
            </span>
            <span className="hidden sm:inline">Connect computer</span>
          </div>

          <div
            className={`flex items-center gap-2 text-[13px] font-semibold ${
              step >= 3 ? "text-[var(--primary)]" : "text-[var(--foreground-muted)]"
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step >= 3
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--surface-subtle)] text-[var(--foreground-muted)]"
              }`}
            >
              3
            </span>
            <span className="hidden sm:inline">Verify & start</span>
          </div>
        </div>

        {/* ── STEP 1: CHOOSE CAPACITY ── */}
        {step === 1 && (
          <div className="rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[var(--shadow-card)] space-y-6">
            <div>
              <label
                htmlFor="node-name"
                className="type-label block text-[var(--foreground)] mb-1.5 font-medium"
              >
                Name this storage node
              </label>
              <input
                id="node-name"
                type="text"
                value={nodeName}
                onChange={(e) => setNodeName(e.target.value)}
                placeholder="Home PC Storage"
                className="w-full h-[44px] rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-3.5 text-[14px] text-[var(--foreground)] focus-visible:ring-2 focus-visible:ring-[var(--primary)] outline-none"
              />
            </div>

            <div>
              <label className="type-label block text-[var(--foreground)] mb-2 font-medium">
                Choose allocation size
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {CAPACITY_PRESETS.map((preset) => (
                  <button
                    key={preset.gb}
                    type="button"
                    onClick={() => setCapacityGb(preset.gb)}
                    className={`p-3 rounded-[10px] border text-left transition-all cursor-pointer ${
                      capacityGb === preset.gb
                        ? "border-[var(--primary)] bg-[var(--primary-muted)] text-[var(--primary)] font-semibold"
                        : "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-subtle)] text-[var(--foreground)]"
                    }`}
                  >
                    <div className="text-[13px]">{preset.label}</div>
                    <div className="text-[11px] text-[var(--foreground-secondary)] mt-0.5">
                      Est. ~{preset.monthly}/mo
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Estimated Earnings Card */}
            <div className="p-4 rounded-[12px] bg-[var(--surface-subtle)] border border-[var(--border-subtle)] flex items-center justify-between">
              <div>
                <div className="text-[12px] font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">
                  Estimated Monthly Payout
                </div>
                <div className="type-metric text-[var(--foreground)] text-[26px]">
                  ₹{estimatedMonthlyInr} <span className="text-[13px] font-normal text-[var(--foreground-secondary)]">/ month</span>
                </div>
                <div className="text-[11px] text-[var(--foreground-muted)] mt-0.5">
                  Calculated at ₹1.50 per GB-month of active grid utilization.
                </div>
              </div>
              <Coins className="w-8 h-8 text-[var(--secondary-accent)] shrink-0" />
            </div>

            <Button
              onClick={handleRegister}
              disabled={loading || !nodeName}
              size="lg"
              className="w-full gap-2 font-semibold"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Continue to Connection</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        )}

        {/* ── STEP 2: CONNECT YOUR COMPUTER ── */}
        {step === 2 && registeredNode && (
          <div className="rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[var(--shadow-card)] space-y-6">
            <div>
              <h3 className="type-h3 font-bold text-[var(--foreground)] mb-1">
                Run the storage runner
              </h3>
              <p className="text-[14px] text-[var(--foreground-secondary)]">
                Launch the lightweight node client to connect your allocated space to the AetherGrid orchestrator.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-[12px] font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">
                Run this command in Terminal or PowerShell
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-[12px] font-mono bg-[var(--surface-subtle)] p-3 rounded-[8px] border border-[var(--border)] text-[var(--foreground)] overflow-x-auto">
                  {registeredNode.cliCommand}
                </code>
                <Button
                  variant="secondary"
                  size="default"
                  onClick={copyCommand}
                  className="gap-1.5 shrink-0"
                >
                  {copied ? <Check className="w-4 h-4 text-[var(--success)]" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </Button>
              </div>
            </div>

            <div className="p-4 rounded-[12px] bg-[var(--surface-subtle)] border border-[var(--border-subtle)] space-y-2 text-[13px] text-[var(--foreground-secondary)]">
              <div className="font-semibold text-[var(--foreground)] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[var(--success)]" />
                Provider Privacy Guarantee
              </div>
              <p>
                Your node client only receives pre-encrypted 2MB chunk blobs. It cannot read file contents, file names, or user identities.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setStep(1)}
                className="w-1/3"
              >
                Back
              </Button>
              <Button
                size="lg"
                onClick={() => setStep(3)}
                className="w-2/3 gap-2"
              >
                <span>Verify Connection</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ── STEP 3: VERIFY & START ── */}
        {step === 3 && registeredNode && (
          <div className="rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[var(--shadow-card)] space-y-6 text-center">
            <div className="w-14 h-14 rounded-full bg-[var(--success-muted)] text-[var(--success)] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="type-h2 font-bold text-[var(--foreground)] mb-1">
                Node Ready to Contribute
              </h3>
              <p className="text-[14px] text-[var(--foreground-secondary)] max-w-md mx-auto">
                Your storage node <span className="font-semibold text-[var(--foreground)]">{registeredNode.nodeName || nodeName}</span> is provisioned with {capacityGb} GB capacity.
              </p>
            </div>

            <div className="p-5 rounded-[12px] bg-[var(--surface-subtle)] border border-[var(--border-subtle)] max-w-md mx-auto text-left space-y-2">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[var(--foreground-secondary)]">Status:</span>
                <StatusBadge status={simulatedOnline ? "HEALTHY" : "ACTIVE"} size="sm" />
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[var(--foreground-secondary)]">Allocated Capacity:</span>
                <span className="font-semibold tabular-nums">{capacityGb} GB</span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[var(--foreground-secondary)]">Est. Monthly Payout:</span>
                <span className="font-semibold text-[var(--success)] tabular-nums">~₹{estimatedMonthlyInr}/month</span>
              </div>
            </div>

            {!simulatedOnline && (
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="default"
                  onClick={handleSimulateStart}
                  className="gap-2"
                >
                  <Play className="w-4 h-4 text-[var(--success)]" />
                  <span>Send Test Heartbeat (Verify Instantly)</span>
                </Button>
              </div>
            )}

            <div className="pt-4">
              <Button asChild size="lg" className="w-full">
                <Link href="/giver">
                  Go to Storage Provider Workspace
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
