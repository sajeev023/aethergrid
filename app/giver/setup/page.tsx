"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  HardDrive, 
  Server, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Terminal, 
  Zap,
  Play
} from "lucide-react";

export default function GiverSetupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [nodeName, setNodeName] = useState("Alpha Storage Node");
  const [capacityGb, setCapacityGb] = useState("50");
  const [storageDir, setStorageDir] = useState("");
  const [loading, setLoading] = useState(false);
  const [registeredNode, setRegisteredNode] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [simulatedOnline, setSimulatedOnline] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/nodes/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nodeName,
          capacityGb: parseInt(capacityGb, 10),
          storageDirectory: storageDir || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setRegisteredNode(data);
        setStep(3);
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
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link href="/giver" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Giver Hub
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="text-emerald-400 text-xs font-mono uppercase mb-1">
            🟢 Connect Storage Node
          </div>
          <h1 className="text-3xl font-extrabold text-white">Join the AetherGrid Provider Mesh</h1>
          <p className="text-sm text-slate-400 mt-1">
            Allocate spare hard drive space and start earning recurring income in 3 simple steps.
          </p>
        </div>

        {/* Stepper Indicator */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <div className={`flex items-center gap-2 text-xs font-medium ${step >= 1 ? "text-emerald-400" : "text-slate-500"}`}>
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-bold">1</span>
            Node Specs
          </div>
          <div className="w-12 h-px bg-white/10" />
          <div className={`flex items-center gap-2 text-xs font-medium ${step >= 2 ? "text-emerald-400" : "text-slate-500"}`}>
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-bold">2</span>
            Storage Directory
          </div>
          <div className="w-12 h-px bg-white/10" />
          <div className={`flex items-center gap-2 text-xs font-medium ${step >= 3 ? "text-emerald-400" : "text-slate-500"}`}>
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-bold">3</span>
            Launch & Earn
          </div>
        </div>

        {/* Card Content */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-8 shadow-2xl backdrop-blur-xl">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Node Name</label>
                <input
                  type="text"
                  value={nodeName}
                  onChange={(e) => setNodeName(e.target.value)}
                  placeholder="e.g. Home PC / Workstation Storage"
                  className="w-full bg-slate-900 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Committed Capacity (GB)</label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {["20", "50", "100", "500"].map((gb) => (
                    <button
                      key={gb}
                      type="button"
                      onClick={() => setCapacityGb(gb)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        capacityGb === gb
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                          : "bg-slate-900 border-white/10 text-slate-400 hover:border-white/20"
                      }`}
                    >
                      {gb} GB
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={capacityGb}
                  onChange={(e) => setCapacityGb(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                Estimated Payout: <strong>₹{Math.round(parseInt(capacityGb || "0", 10) * 1.5)} / month</strong> based on active GB-hour allocation.
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Continue to Directory Config
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Storage Folder Path (Optional)</label>
                <input
                  type="text"
                  value={storageDir}
                  onChange={(e) => setStorageDir(e.target.value)}
                  placeholder="Default: ./data/nodes/{nodeId}/chunks"
                  className="w-full bg-slate-900 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-emerald-400 font-mono"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Leave blank to auto-create a dedicated sandbox folder in your project directory.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-2 text-xs text-slate-300">
                <div className="font-semibold text-white">🔒 Zero Plaintext Storage Guarantee:</div>
                <p className="text-slate-400">
                  Files uploaded by customers are split into 2MB chunks and encrypted with AES-256-GCM.
                  Your disk will only store opaque, encrypted binary blobs. You cannot see customer files, and customers cannot read your machine.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-slate-300 hover:bg-white/10 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleRegister}
                  className="w-2/3 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Register Node Token
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && registeredNode && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-white">Storage Node Registered!</h2>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  Node ID: {registeredNode.node.id}
                </p>
              </div>

              {/* Command box */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Daemon Terminal Command</span>
                  <span className="text-[11px] text-emerald-400">Run in your terminal</span>
                </label>
                <div className="relative">
                  <div className="bg-slate-950 p-4 rounded-xl border border-white/10 font-mono text-xs text-emerald-400 break-all pr-24">
                    {registeredNode.cliCommand}
                  </div>
                  <button
                    onClick={copyCommand}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Instant Simulator Button */}
              <div className="p-4 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    Instant Sandbox Simulator
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Want to test without terminal? Start a simulated background heartbeat right now.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSimulateStart}
                  disabled={simulatedOnline}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    simulatedOnline
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/20"
                  }`}
                >
                  {simulatedOnline ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Node Is Online!
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      Simulate Online
                    </>
                  )}
                </button>
              </div>

              <Link
                href="/giver"
                className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
              >
                Go to Provider Command Center
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
