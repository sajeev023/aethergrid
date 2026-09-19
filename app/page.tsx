"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Cloud,
  HardDrive,
  Lock,
  ArrowRight,
  Server,
  ShieldCheck,
  CheckCircle2,
  Send,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  // Waitlist state
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistName, setWaitlistName] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [waitlistLoading, setWaitlistLoading] = useState(false);
  const [waitlistError, setWaitlistError] = useState<string | null>(null);

  // Feedback state
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedbackCategory, setFeedbackCategory] = useState("GENERAL");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail.trim()) return;
    setWaitlistLoading(true);
    setWaitlistError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: waitlistEmail.trim(),
          name: waitlistName.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to join waitlist");
      setWaitlistSubmitted(true);
    } catch (err: unknown) {
      setWaitlistError(err instanceof Error ? err.message : "Failed to join waitlist");
    } finally {
      setWaitlistLoading(false);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) return;
    setFeedbackLoading(true);
    setFeedbackError(null);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: feedbackEmail.trim() || undefined,
          category: feedbackCategory,
          message: feedbackMessage.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send feedback");
      setFeedbackSubmitted(true);
    } catch (err: unknown) {
      setFeedbackError(err instanceof Error ? err.message : "Failed to send feedback");
    } finally {
      setFeedbackLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* ── BETA NOTICE BANNER ── */}
      <div className="bg-[var(--surface-subtle)] border-b border-[var(--border)] px-4 py-2.5 text-center text-[13px] text-[var(--foreground-secondary)]">
        <div className="max-w-[1200px] mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 font-semibold text-[var(--primary)] bg-[var(--primary-muted)] px-2 py-0.5 rounded-full text-[11px] uppercase tracking-wider">
            <Sparkles className="w-3 h-3" /> AetherGrid Beta
          </span>
          <span>You&apos;re using the early public beta of AetherGrid. Every account receives <strong>3 GB beta storage</strong>.</span>
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-12 sm:pb-16 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-subtle)] border border-[var(--border)] text-[12px] font-semibold text-[var(--primary)] uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
          <span>PERSONAL CLOUD • 3 GB BETA STORAGE</span>
        </div>

        {/* Headline */}
        <h1 className="type-display text-[var(--foreground)] max-w-3xl mx-auto mb-5 text-[32px] sm:text-[48px] font-bold tracking-tight">
          Your files. Your cloud. <br className="hidden sm:inline" />
          <span className="text-[var(--primary)]">Your storage network.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="type-body-large text-[var(--foreground-secondary)] max-w-2xl mx-auto mb-10 text-[15px] sm:text-[17px] leading-relaxed">
          Store and access your files in a private personal cloud powered by dedicated physical storage nodes. Client-authenticated encryption, server-enforced quotas, and direct data ownership.
        </p>

        {/* ── PRIMARY PATHS ("Get Storage" vs "Give Storage") ── */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* PATH 1: GET STORAGE (TAKER) */}
          <div
            id="get-storage"
            className="relative p-6 sm:p-8 rounded-[16px] border-2 border-[var(--primary)]/30 bg-[var(--surface)] hover:border-[var(--primary)] transition-all shadow-[var(--shadow-card)] flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-[12px] bg-[var(--primary-muted)] flex items-center justify-center text-[var(--primary)] mb-5">
                <Cloud className="w-6 h-6" />
              </div>
              <div className="text-[12px] font-semibold uppercase tracking-wider text-[var(--primary)] mb-1">
                Personal Cloud
              </div>
              <h2 className="text-[24px] text-[var(--foreground)] font-bold mb-2">
                Get Storage
              </h2>
              <p className="text-[14px] text-[var(--foreground-secondary)] leading-relaxed mb-6">
                Store your files in your personal cloud. Every beta account receives 3 GB free storage with zero tracking.
              </p>
              <ul className="space-y-2.5 mb-8 text-[13px] text-[var(--foreground-secondary)]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0" />
                  <span>3 GB beta storage quota per account</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0" />
                  <span>Client-side AES-256-GCM encryption</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0" />
                  <span>Mobile & desktop file management</span>
                </li>
              </ul>
            </div>

            <div>
              <Button asChild size="lg" className="w-full min-h-[48px] justify-between font-semibold">
                <Link href="/signup?role=TAKER">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <div className="text-center mt-2 text-[12px] text-[var(--foreground-muted)]">
                Instant setup • No credit card required
              </div>
            </div>
          </div>

          {/* PATH 2: GIVE STORAGE (GIVER) */}
          <div
            id="give-storage"
            className="relative p-6 sm:p-8 rounded-[16px] border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--secondary-accent)] transition-all shadow-[var(--shadow-card)] flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-[12px] bg-[var(--surface-subtle)] flex items-center justify-center text-[var(--secondary-accent)] mb-5">
                <HardDrive className="w-6 h-6" />
              </div>
              <div className="text-[12px] font-semibold uppercase tracking-wider text-[var(--secondary-accent)] mb-1">
                Node Providers
              </div>
              <h2 className="text-[24px] text-[var(--foreground)] font-bold mb-2">
                Give Storage
              </h2>
              <p className="text-[14px] text-[var(--foreground-secondary)] leading-relaxed mb-6">
                Provide unused storage from a compatible computer. Sandboxed storage directory with configurable capacity limits.
              </p>
              <ul className="space-y-2.5 mb-8 text-[13px] text-[var(--foreground-secondary)]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0" />
                  <span>Strict sandboxed directory containment</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0" />
                  <span>Encrypted chunk blobs only — hosts cannot view content</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0" />
                  <span>Configurable disk allocation safety buffer</span>
                </li>
              </ul>
            </div>

            <div>
              <Button asChild variant="secondary" size="lg" className="w-full min-h-[48px] justify-between font-semibold hover:border-[var(--secondary-accent)]">
                <Link href="/giver/setup">
                  <span>Give Storage</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <div className="text-center mt-2 text-[12px] text-[var(--foreground-muted)]">
                1-click connection • Windows, Mac, Linux
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE HONEST ARCHITECTURE ── */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)] py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="type-h2 text-[var(--foreground)] font-bold text-[22px] sm:text-[28px]">
              Honest, Transparent Architecture
            </h2>
            <p className="text-[14px] text-[var(--foreground-secondary)] mt-2">
              Verified cryptographic privacy and honest engineering without marketing exaggeration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-[12px] bg-[var(--surface-subtle)] border border-[var(--border-subtle)]">
              <div className="w-9 h-9 rounded-[8px] bg-[var(--primary-muted)] text-[var(--primary)] flex items-center justify-center mb-3">
                <Lock className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-semibold text-[15px] mb-1">Encrypted at Rest</h3>
              <p className="text-[13px] text-[var(--foreground-secondary)] leading-relaxed">
                Files are partitioned and encrypted with AES-256-GCM using per-object HKDF keys. Hosts only store opaque chunk blobs.
              </p>
            </div>

            <div className="p-5 rounded-[12px] bg-[var(--surface-subtle)] border border-[var(--border-subtle)]">
              <div className="w-9 h-9 rounded-[8px] bg-[var(--primary-muted)] text-[var(--primary)] flex items-center justify-center mb-3">
                <Server className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-semibold text-[15px] mb-1">Single-Node Beta Storage</h3>
              <p className="text-[13px] text-[var(--foreground-secondary)] leading-relaxed">
                Primary storage is anchored to dedicated Node #001 hardware. Redundant multi-node replication will roll out as the provider network expands.
              </p>
            </div>

            <div className="p-5 rounded-[12px] bg-[var(--surface-subtle)] border border-[var(--border-subtle)]">
              <div className="w-9 h-9 rounded-[8px] bg-[var(--primary-muted)] text-[var(--primary)] flex items-center justify-center mb-3">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-semibold text-[15px] mb-1">Strict Sandbox Boundary</h3>
              <p className="text-[13px] text-[var(--foreground-secondary)] leading-relaxed">
                Storage nodes are mathematically sandboxed to their configured directory with strict traversal and path injection defenses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WAITLIST & FEEDBACK SECTION ── */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* WAITLIST CARD */}
        <div id="waitlist" className="p-7 sm:p-8 rounded-[16px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-card)] flex flex-col justify-between">
          <div>
            <div className="text-[12px] font-semibold text-[var(--primary)] uppercase tracking-wider mb-1">
              Future Expansion
            </div>
            <h2 className="type-h2 text-[var(--foreground)] font-bold mb-2">
              Join the Waitlist
            </h2>
            <p className="text-[14px] text-[var(--foreground-secondary)] leading-relaxed mb-6">
              Be the first to get access to multi-node geographic replication, expanded storage tiers, and provider payout pools.
            </p>

            {waitlistSubmitted ? (
              <div className="p-4 rounded-[12px] bg-[var(--success-muted)] border border-[var(--success)]/30 text-[var(--success)] flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <div className="font-semibold text-[14px]">You&apos;re on the list.</div>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="space-y-3">
                {waitlistError && (
                  <div className="p-2.5 text-[12px] rounded-[8px] bg-[var(--error-muted)] text-[var(--error)] border border-[var(--error)]/30">
                    {waitlistError}
                  </div>
                )}
                <div>
                  <label htmlFor="waitlist-email" className="sr-only">Email address</label>
                  <input
                    id="waitlist-email"
                    type="email"
                    required
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full h-[44px] px-3.5 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] text-[14px] text-[var(--foreground)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                </div>
                <div>
                  <label htmlFor="waitlist-name" className="sr-only">Your name (optional)</label>
                  <input
                    id="waitlist-name"
                    type="text"
                    value={waitlistName}
                    onChange={(e) => setWaitlistName(e.target.value)}
                    placeholder="Your name (optional)"
                    className="w-full h-[44px] px-3.5 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] text-[14px] text-[var(--foreground)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                </div>
                <Button type="submit" disabled={waitlistLoading} className="w-full min-h-[44px] font-semibold gap-2">
                  <span>{waitlistLoading ? "Submitting..." : "Join the Waitlist"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* FEEDBACK CARD */}
        <div id="feedback" className="p-7 sm:p-8 rounded-[16px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-card)] flex flex-col justify-between">
          <div>
            <div className="text-[12px] font-semibold text-[var(--secondary-accent)] uppercase tracking-wider mb-1">
              Beta Improvements
            </div>
            <h2 className="type-h2 text-[var(--foreground)] font-bold mb-2">
              Send Feedback
            </h2>
            <p className="text-[14px] text-[var(--foreground-secondary)] leading-relaxed mb-6">
              Your feedback is the most valuable input for shaping AetherGrid. Tell us what worked, what broke, or what you want next.
            </p>

            {feedbackSubmitted ? (
              <div className="p-4 rounded-[12px] bg-[var(--success-muted)] border border-[var(--success)]/30 text-[var(--success)] flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <div className="font-semibold text-[14px]">Thank you for your feedback!</div>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                {feedbackError && (
                  <div className="p-2.5 text-[12px] rounded-[8px] bg-[var(--error-muted)] text-[var(--error)] border border-[var(--error)]/30">
                    {feedbackError}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="feedback-email" className="sr-only">Your email (optional)</label>
                    <input
                      id="feedback-email"
                      type="email"
                      value={feedbackEmail}
                      onChange={(e) => setFeedbackEmail(e.target.value)}
                      placeholder="Your email (optional)"
                      className="w-full h-[44px] px-3.5 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] text-[14px] text-[var(--foreground)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="feedback-category" className="sr-only">Category</label>
                    <select
                      id="feedback-category"
                      value={feedbackCategory}
                      onChange={(e) => setFeedbackCategory(e.target.value)}
                      className="w-full h-[44px] px-3 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] text-[14px] text-[var(--foreground)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    >
                      <option value="GENERAL">General Feedback</option>
                      <option value="BUG">Bug Report</option>
                      <option value="STORAGE">Storage / Upload Issue</option>
                      <option value="MOBILE">Mobile UX Issue</option>
                      <option value="FEATURE">Feature Suggestion</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="feedback-message" className="sr-only">Your message</label>
                  <textarea
                    id="feedback-message"
                    required
                    rows={3}
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    placeholder="Share your thoughts or report an issue..."
                    className="w-full p-3 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] text-[14px] text-[var(--foreground)] outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
                  />
                </div>
                <Button type="submit" disabled={feedbackLoading} variant="secondary" className="w-full min-h-[44px] font-semibold gap-2">
                  <Send className="w-4 h-4" />
                  <span>{feedbackLoading ? "Sending..." : "Send Feedback"}</span>
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[var(--border)] bg-[var(--surface)] py-8 text-[13px] text-[var(--foreground-secondary)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-[6px] bg-[var(--primary)] flex items-center justify-center text-white text-[10px] font-bold">
              AG
            </div>
            <span className="font-semibold text-[var(--foreground)]">AetherGrid</span>
            <span>— A Distributed Private Cloud</span>
          </div>

          <div className="flex items-center gap-6 flex-wrap justify-center">
            <Link href="/#get-storage" className="hover:text-[var(--foreground)] transition-colors">
              Get Storage
            </Link>
            <Link href="/#give-storage" className="hover:text-[var(--foreground)] transition-colors">
              Give Storage
            </Link>
            <Link href="/#waitlist" className="hover:text-[var(--foreground)] transition-colors">
              Waitlist
            </Link>
            <Link href="/#feedback" className="hover:text-[var(--foreground)] transition-colors">
              Feedback
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