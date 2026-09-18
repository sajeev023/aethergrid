"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Cloud,
  HardDrive,
  ShieldCheck,
  Lock,
  ArrowRight,
  Server,
  Smartphone,
  RefreshCw,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const totalCapacityGb = Math.round((metrics.totalCapacityBytes || 0) / (1024 * 1024 * 1024));
  // Transparent calculation: ₹1.5 per GB per month based on active network allocation
  const estimatedMonthlyEarnings = Math.round(spareGb * 1.5);

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* ── Signature Interconnected Grid Thread Visual Motif (Subtle, Non-Distracting) ── */}
      <div className="absolute inset-0 grid-thread-subtle opacity-60 pointer-events-none -z-10" />

      {/* ── HERO SECTION ── */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--surface-subtle)] border border-[var(--border)] text-[12px] font-semibold text-[var(--primary)] uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
          <span>A DISTRIBUTED PRIVATE CLOUD • {totalCapacityGb} GB ACTIVE CAPACITY</span>
        </div>

        {/* Headline */}
        <h1 className="type-display text-[var(--foreground)] max-w-3xl mx-auto mb-6">
          Your files. Your storage. <br className="hidden sm:inline" />
          <span className="text-[var(--primary)]">Your network.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="type-body-large text-[var(--foreground-secondary)] max-w-2xl mx-auto mb-12">
          A private cloud powered by a distributed storage network. Encrypted on your terms, replicated across independent peer nodes with automatic failover.
        </p>

        {/* ── PRIMARY INTENT SELECTION ("What do you want to do?") ── */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="type-h3 font-semibold text-[var(--foreground)]">
              What do you want to do?
            </h2>
            <p className="text-[14px] text-[var(--foreground-secondary)] mt-1">
              Choose your path to begin. You can switch between workspaces at any time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* PATH 1: GET STORAGE (TAKER) */}
            <div
              id="get-storage"
              className="relative p-7 sm:p-8 rounded-[16px] border-2 border-[var(--primary)]/30 bg-[var(--surface)] hover:border-[var(--primary)] transition-all shadow-[var(--shadow-card)] flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-[12px] bg-[var(--primary-muted)] flex items-center justify-center text-[var(--primary)] mb-5">
                  <Cloud className="w-6 h-6" />
                </div>
                <div className="text-[12px] font-semibold uppercase tracking-wider text-[var(--primary)] mb-1">
                  For Individuals & Devices
                </div>
                <h3 className="type-h2 text-[var(--foreground)] font-bold mb-3">
                  Get Storage
                </h3>
                <p className="text-[15px] text-[var(--foreground-secondary)] leading-relaxed mb-6">
                  Your private cloud, powered by a distributed storage network. Keep your files and phone backups safe with client-authenticated encryption and seamless redundancy.
                </p>
                <ul className="space-y-2.5 mb-8 text-[13px] text-[var(--foreground-secondary)]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0" />
                    <span>20 GB included free trial space</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0" />
                    <span>Automatic 2x replica distribution</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0" />
                    <span>Fast phone and mobile photo sync</span>
                  </li>
                </ul>
              </div>

              <div>
                <Button asChild size="lg" className="w-full justify-between">
                  <Link href="/signup?role=TAKER">
                    <span>Get Storage</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <div className="text-center mt-2.5 text-[12px] text-[var(--foreground-muted)]">
                  Instant account setup • No credit card required
                </div>
              </div>
            </div>

            {/* PATH 2: GIVE STORAGE (GIVER) */}
            <div
              id="give-storage"
              className="relative p-7 sm:p-8 rounded-[16px] border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--secondary-accent)] transition-all shadow-[var(--shadow-card)] flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-[12px] bg-[var(--surface-subtle)] flex items-center justify-center text-[var(--secondary-accent)] mb-5">
                  <HardDrive className="w-6 h-6" />
                </div>
                <div className="text-[12px] font-semibold uppercase tracking-wider text-[var(--secondary-accent)] mb-1">
                  For Computer Owners
                </div>
                <h3 className="type-h2 text-[var(--foreground)] font-bold mb-3">
                  Give Storage
                </h3>
                <p className="text-[15px] text-[var(--foreground-secondary)] leading-relaxed mb-6">
                  Turn unused storage into a useful resource. Allocate spare hard drive capacity, run a lightweight background daemon, and earn recurring payouts.
                </p>
                <ul className="space-y-2.5 mb-8 text-[13px] text-[var(--foreground-secondary)]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0" />
                    <span>Encrypted chunk blobs only — providers cannot read file content</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0" />
                    <span>Flexible commitment from 20 GB to multi-TB</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0" />
                    <span>Direct INR / bank ledger payout tracking</span>
                  </li>
                </ul>
              </div>

              <div>
                <Button asChild variant="secondary" size="lg" className="w-full justify-between hover:border-[var(--secondary-accent)]">
                  <Link href="/giver/setup">
                    <span>Give Storage</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <div className="text-center mt-2.5 text-[12px] text-[var(--foreground-muted)]">
                  Setup in about 2 minutes • Mac, Windows, Linux
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE INTERCONNECTED GRID THREAD: BENEFIT PILLARS ── */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)] py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--primary)] uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4" /> Core Architecture
            </div>
            <h2 className="type-h2 text-[var(--foreground)] font-bold">
              Infrastructure designed for safety and privacy
            </h2>
            <p className="type-body text-[var(--foreground-secondary)] mt-2">
              Every design decision in AetherGrid is guided by verifiable cryptographic principles, not marketing hype.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* PILLAR 1: ENCRYPTED */}
            <div className="p-6 rounded-[12px] bg-[var(--surface-subtle)] border border-[var(--border-subtle)]">
              <div className="w-10 h-10 rounded-[10px] bg-[var(--primary-muted)] text-[var(--primary)] flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="type-h3 text-[var(--foreground)] font-semibold mb-2">Encrypted</h3>
              <p className="text-[14px] text-[var(--foreground-secondary)] leading-relaxed">
                Files are partitioned and encrypted with AES-256-GCM using per-object derived keys before distribution to peer nodes.
              </p>
            </div>

            {/* PILLAR 2: DISTRIBUTED */}
            <div className="p-6 rounded-[12px] bg-[var(--surface-subtle)] border border-[var(--border-subtle)]">
              <div className="w-10 h-10 rounded-[10px] bg-[var(--primary-muted)] text-[var(--primary)] flex items-center justify-center mb-4">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="type-h3 text-[var(--foreground)] font-semibold mb-2">Distributed</h3>
              <p className="text-[14px] text-[var(--foreground-secondary)] leading-relaxed">
                Data is sliced into 2MB chunk blobs and stored across independent peer machines, eliminating single centralized targets.
              </p>
            </div>

            {/* PILLAR 3: RESILIENT */}
            <div className="p-6 rounded-[12px] bg-[var(--surface-subtle)] border border-[var(--border-subtle)]">
              <div className="w-10 h-10 rounded-[10px] bg-[var(--primary-muted)] text-[var(--primary)] flex items-center justify-center mb-4">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="type-h3 text-[var(--foreground)] font-semibold mb-2">Resilient</h3>
              <p className="text-[14px] text-[var(--foreground-secondary)] leading-relaxed">
                Redundant 2x replica distribution ensures that if any host drops offline, secondary replicas automatically step in without downtime.
              </p>
            </div>

            {/* PILLAR 4: PRIVATE */}
            <div className="p-6 rounded-[12px] bg-[var(--surface-subtle)] border border-[var(--border-subtle)]">
              <div className="w-10 h-10 rounded-[10px] bg-[var(--primary-muted)] text-[var(--primary)] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="type-h3 text-[var(--foreground)] font-semibold mb-2">Private</h3>
              <p className="text-[14px] text-[var(--foreground-secondary)] leading-relaxed">
                Provider-blind architecture ensures storage hosts only store opaque ciphertext. Hosts cannot view file names, contents, or metadata.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ESTIMATED EARNINGS CALCULATOR (TRANSPARENT & BOUNDED) ── */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-10 shadow-[var(--shadow-card)]">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="text-[12px] font-semibold text-[var(--secondary-accent)] uppercase tracking-wider mb-1">
              Provider Economics
            </div>
            <h2 className="type-h2 text-[var(--foreground)] font-bold">
              Estimate your storage contribution
            </h2>
            <p className="text-[14px] text-[var(--foreground-secondary)] mt-1">
              See what you could earn by sharing unused hard drive capacity with the network.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-[14px] mb-2 font-medium">
                <span>Allocated Capacity</span>
                <span className="type-metric text-[var(--foreground)] text-[22px]">
                  {spareGb} <span className="text-[14px] text-[var(--foreground-secondary)] font-normal">GB</span>
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={1000}
                step={20}
                value={spareGb}
                onChange={(e) => setSpareGb(Number(e.target.value))}
                aria-label="Allocated capacity in gigabytes"
                className="w-full h-2.5 bg-[var(--surface-subtle)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
              />
              <div className="flex justify-between text-[12px] text-[var(--foreground-muted)] mt-1.5 tabular-nums">
                <span>20 GB (Starter)</span>
                <span>250 GB</span>
                <span>500 GB</span>
                <span>1 TB</span>
              </div>
            </div>

            <div className="p-5 rounded-[12px] bg-[var(--surface-subtle)] border border-[var(--border-subtle)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-[12px] font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">
                  Estimated monthly payout
                </div>
                <div className="type-metric text-[var(--foreground)] text-[32px] mt-0.5">
                  ₹{estimatedMonthlyEarnings} <span className="text-[14px] font-normal text-[var(--foreground-secondary)]">/ month</span>
                </div>
                <div className="text-[12px] text-[var(--foreground-muted)] mt-1">
                  Based on ₹1.50 per GB-month of active allocated storage.
                </div>
              </div>

              <Button asChild size="default">
                <Link href="/giver/setup">
                  Start Contributing
                </Link>
              </Button>
            </div>

            <p className="text-[12px] text-[var(--foreground-muted)] leading-relaxed italic text-center">
              Note: Payouts depend on active grid utilization, node uptime, and verified heartbeat reliability. This estimate reflects standard allocation rates and is not a guaranteed return.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAILOVER SIMULATOR CALLOUT ── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-subtle)] py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[var(--primary-muted)] text-[var(--primary)] text-[12px] font-medium mb-3">
              <Smartphone className="w-3.5 h-3.5" /> Interactive Proof
            </div>
            <h2 className="type-h3 text-[var(--foreground)] font-bold mb-2">
              See real-time node failover in action
            </h2>
            <p className="text-[14px] text-[var(--foreground-secondary)] leading-relaxed">
              Test what happens when a storage node unexpectedly drops offline. Run our live simulation to verify how redundant replicas rescue files without data loss.
            </p>
          </div>

          <Button asChild variant="secondary" size="lg" className="shrink-0 gap-2">
            <Link href="/mobile-simulator">
              <span>Open Failover Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[var(--border)] bg-[var(--surface)] py-10 text-[13px] text-[var(--foreground-secondary)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-[6px] bg-[var(--primary)] flex items-center justify-center text-white text-[10px] font-bold">
              AG
            </div>
            <span className="font-semibold text-[var(--foreground)]">AetherGrid</span>
            <span>— A Distributed Private Cloud</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="hover:text-[var(--foreground)] transition-colors">
              Personal Cloud
            </Link>
            <Link href="/giver" className="hover:text-[var(--foreground)] transition-colors">
              Storage Provider
            </Link>
            <Link href="/mobile-simulator" className="hover:text-[var(--foreground)] transition-colors">
              Simulator
            </Link>
            <Link href="/login" className="hover:text-[var(--foreground)] transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}