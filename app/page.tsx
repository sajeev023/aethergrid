"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { 
  HardDrive, 
  Cloud, 
  ShieldCheck, 
  Zap, 
  Smartphone, 
  TrendingUp, 
  ChevronRight, 
  Server, 
  Lock, 
  RefreshCw,
  Cpu,
  Coins,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export default function HomePage() {
  const [metrics, setMetrics] = useState<any>({
    totalCapacityBytes: 250 * 1024 * 1024 * 1024,
    onlineNodes: 2,
    totalFiles: 0,
    activeGivers: 1,
    activeTakers: 1,
  });

  const [spareGb, setSpareGb] = useState<number>(100);

  useEffect(() => {
    fetch("/api/admin/marketplace")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.metrics) {
          setMetrics(data.metrics);
        }
      })
      .catch(() => {});
  }, []);

  const totalCapacityGb = Math.round(metrics.totalCapacityBytes / (1024 * 1024 * 1024));
  const estimatedMonthlyEarnings = Math.round(spareGb * 1.5); // ₹1.5 per GB-month

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden text-slate-100">
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-cyan-500/15 via-blue-600/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Decentralized Two-Sided Storage Grid • Live MVP
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Your phone. Your files. <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Always recoverable.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Storage, without owning the data centers. Rent unified encrypted space for pennies,
            or turn idle hard drive capacity into reliable passive income.
          </p>

          {/* Real-time Network Pulse Banner */}
          <div className="inline-grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md max-w-3xl mx-auto mb-14 text-left">
            <div className="px-3 border-r border-white/5">
              <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-cyan-400" /> Total Capacity
              </div>
              <div className="text-xl font-bold text-white mt-1">{totalCapacityGb} GB</div>
              <div className="text-[11px] text-emerald-400">Available across peers</div>
            </div>
            <div className="px-3 border-r border-white/5">
              <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-emerald-400" /> Active Nodes
              </div>
              <div className="text-xl font-bold text-emerald-400 mt-1">{metrics.onlineNodes} Online</div>
              <div className="text-[11px] text-slate-400">10s heartbeat cadence</div>
            </div>
            <div className="px-3 border-r border-white/5">
              <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Redundancy
              </div>
              <div className="text-xl font-bold text-blue-400 mt-1">2x Replicas</div>
              <div className="text-[11px] text-slate-400">AES-256-GCM encrypted</div>
            </div>
            <div className="px-3">
              <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-purple-400" /> Zero Trust
              </div>
              <div className="text-xl font-bold text-purple-400 mt-1">Provider-Blind</div>
              <div className="text-[11px] text-slate-400">Chunks only, zero plaintext</div>
            </div>
          </div>
        </div>

        {/* The Two Hero Paths: GIVE STORAGE vs GET STORAGE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {/* Card 1: 🟢 GIVE STORAGE */}
          <div className="relative group rounded-3xl p-8 bg-gradient-to-b from-emerald-500/10 via-slate-900/60 to-slate-950 border border-emerald-500/30 hover:border-emerald-400 transition-all duration-300 shadow-xl shadow-emerald-500/5 hover:shadow-emerald-500/15">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
                <HardDrive className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Storage Provider
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              🟢 Give Storage
            </h2>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Have unused hard drive space? Connect a storage node daemon in 30 seconds.
              Store encrypted chunks and earn recurring monthly payouts in ₹ based on allocated GB-hours.
            </p>

            <ul className="space-y-2.5 mb-8 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>1-line daemon</strong> runs seamlessly on Windows, Mac, or Linux</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>100% Zero Plaintext:</strong> You only hold encrypted 2MB chunks</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Real Earnings Ledger:</strong> Live per-minute income tracking</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-400 uppercase font-mono">Potential Yield</div>
                <div className="text-lg font-bold text-emerald-400">₹1.50 / GB / month</div>
              </div>
              <Link
                href="/giver"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-sm hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 group-hover:scale-105"
              >
                Launch Giver Node
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: 🔵 GET STORAGE */}
          <div className="relative group rounded-3xl p-8 bg-gradient-to-b from-blue-500/10 via-slate-900/60 to-slate-950 border border-blue-500/30 hover:border-blue-400 transition-all duration-300 shadow-xl shadow-blue-500/5 hover:shadow-blue-500/15">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-lg shadow-blue-500/20">
                <Cloud className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Unified Cloud
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              🔵 Get Storage
            </h2>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Experience one unified, unbreakable cloud drive. Your files, photos, and phone
              backups are encrypted with AES-256-GCM and replicated across peer nodes with instant failover.
            </p>

            <ul className="space-y-2.5 mb-8 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span><strong>2x Redundancy:</strong> Files remain downloadable even if a node drops</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span><strong>Phone Companion:</strong> One-tap backup for contacts, photos & state</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span><strong>Starter Tier Free:</strong> 20 GB included instantly on signup</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-400 uppercase font-mono">Subscription</div>
                <div className="text-lg font-bold text-blue-400">20 GB Included (Trial)</div>
              </div>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500 text-white font-semibold text-sm hover:bg-blue-400 transition-all shadow-lg shadow-blue-500/20 group-hover:scale-105"
              >
                Access My Cloud
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Interactive Earnings & Capacity Calculator */}
        <div className="max-w-4xl mx-auto rounded-3xl p-8 bg-white/[0.02] border border-white/10 backdrop-blur-xl mb-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase mb-2">
                <Coins className="w-4 h-4" /> Provider Earnings Estimator
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Calculate your monthly node payout
              </h3>
              <p className="text-slate-400 text-xs mb-6">
                Drag the slider to choose how many gigabytes of unused SSD or HDD storage you want to allocate to the AetherGrid peer network.
              </p>

              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-slate-300">Allocated Space:</span>
                  <span className="text-cyan-400 font-mono font-bold">{spareGb} GB</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={spareGb}
                  onChange={(e) => setSpareGb(parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                  <span>10 GB</span>
                  <span>500 GB</span>
                  <span>1 TB</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 bg-slate-900/80 rounded-2xl p-6 border border-white/10 text-center flex flex-col items-center justify-center">
              <div className="text-xs text-slate-400 uppercase font-mono mb-1">Estimated Monthly Income</div>
              <div className="text-4xl font-extrabold text-emerald-400 mb-2">
                ₹{estimatedMonthlyEarnings}
                <span className="text-sm font-normal text-slate-400"> / month</span>
              </div>
              <p className="text-[12px] text-slate-400 mb-4 max-w-xs">
                Zero active work required. Your node runs silently in the background and sends a ping every 10 seconds.
              </p>
              <Link
                href="/giver/setup"
                className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold hover:bg-emerald-500/30 transition-all"
              >
                Set Up Node in 3 Steps →
              </Link>
            </div>
          </div>
        </div>

        {/* Live Failover & Architecture Interactive Proof */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase mb-4">
            <Smartphone className="w-3.5 h-3.5" /> Live Resilience Playground
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Want to test what happens when a node fails?
          </h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-6">
            Use our built-in Mobile Simulator to back up phone contacts and simulate dropping Node Alpha.
            See how the client immediately downloads from surviving Node Beta without losing a single byte.
          </p>
          <Link
            href="/mobile-simulator"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold text-sm hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/25"
          >
            Launch Mobile & Failover Simulator
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}