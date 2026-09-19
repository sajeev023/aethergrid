"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  Layers,
  Cloud,
  HardDrive,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") === "GIVER" ? "GIVER" : "TAKER";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"GIVER" | "TAKER">(initialRole);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isPasswordValid = password.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration could not be completed.");
      }

      if (role === "GIVER") {
        router.push("/giver");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[var(--background)] text-[var(--foreground)]">
      <div className="w-full max-w-[460px]">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 mb-4 group focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-[8px] p-1"
          >
            <div className="w-9 h-9 rounded-[8px] bg-[var(--primary)] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <span className="type-h3 font-bold text-[var(--foreground)]">AetherGrid</span>
          </Link>
          <h1 className="type-h2 font-bold text-[var(--foreground)]">Create your account</h1>
          <p className="text-[14px] text-[var(--foreground-secondary)] mt-1">
            Get private cloud storage or start earning by contributing space
          </p>
        </div>

        {/* Main Form Card */}
        <div className="rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-7 sm:p-8 shadow-[var(--shadow-card)]">
          {error && (
            <div
              className="mb-5 p-3 rounded-[8px] bg-[var(--error-muted)] border border-[var(--error)]/30 text-[var(--error)] text-[13px] flex items-start gap-2.5"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Workspace Preference Selection (Audit: explicit value exchange & role switching explanation) */}
            <div>
              <label className="type-label block text-[var(--foreground)] mb-1.5 font-medium">
                Choose your starting workspace
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Option 1: Taker */}
                <button
                  type="button"
                  onClick={() => setRole("TAKER")}
                  className={`p-3.5 rounded-[12px] border text-left transition-all cursor-pointer select-none ${
                    role === "TAKER"
                      ? "border-[var(--primary)] bg-[var(--primary-muted)]"
                      : "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-subtle)]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Cloud
                      className={`w-4 h-4 ${
                        role === "TAKER" ? "text-[var(--primary)]" : "text-[var(--foreground-muted)]"
                      }`}
                    />
                    <span
                      className={`text-[13px] font-semibold ${
                        role === "TAKER" ? "text-[var(--primary)]" : "text-[var(--foreground)]"
                      }`}
                    >
                      I want cloud storage
                    </span>
                  </div>
                  <div className="text-[11px] text-[var(--foreground-secondary)] leading-snug">
                    Includes 3 GB beta storage quota, AES-256 encryption, and private personal cloud.
                  </div>
                </button>

                {/* Option 2: Giver */}
                <button
                  type="button"
                  onClick={() => setRole("GIVER")}
                  className={`p-3.5 rounded-[12px] border text-left transition-all cursor-pointer select-none ${
                    role === "GIVER"
                      ? "border-[var(--secondary-accent)] bg-[var(--surface-subtle)]"
                      : "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-subtle)]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <HardDrive
                      className={`w-4 h-4 ${
                        role === "GIVER"
                          ? "text-[var(--secondary-accent)]"
                          : "text-[var(--foreground-muted)]"
                      }`}
                    />
                    <span
                      className={`text-[13px] font-semibold ${
                        role === "GIVER"
                          ? "text-[var(--secondary-accent)]"
                          : "text-[var(--foreground)]"
                      }`}
                    >
                      I want to contribute
                    </span>
                  </div>
                  <div className="text-[11px] text-[var(--foreground-secondary)] leading-snug">
                    Connect spare disk space, host peer blobs, and earn recurring payouts.
                  </div>
                </button>
              </div>

              <div className="text-[11px] text-[var(--foreground-muted)] mt-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)]" />
                <span>You can switch between both workspaces anytime from your account.</span>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label
                htmlFor="name-input"
                className="type-label block text-[var(--foreground)] mb-1.5 font-medium"
              >
                Full name
              </label>
              <input
                id="name-input"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aarav Sharma"
                className="flex h-[44px] w-full rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-[14px] text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus-visible:border-[var(--primary)] focus-visible:ring-2 focus-visible:ring-[var(--primary-muted)] outline-none transition-all"
              />
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email-input"
                className="type-label block text-[var(--foreground)] mb-1.5 font-medium"
              >
                Email address
              </label>
              <input
                id="email-input"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="flex h-[44px] w-full rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-[14px] text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus-visible:border-[var(--primary)] focus-visible:ring-2 focus-visible:ring-[var(--primary-muted)] outline-none transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password-input"
                className="type-label block text-[var(--foreground)] mb-1.5 font-medium"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="flex h-[44px] w-full rounded-[8px] border border-[var(--border)] bg-[var(--surface)] pl-3.5 pr-11 py-2 text-[14px] text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus-visible:border-[var(--primary)] focus-visible:ring-2 focus-visible:ring-[var(--primary-muted)] outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-1.5 mt-1.5 text-[11px]">
                <span
                  className={
                    password.length >= 6
                      ? "text-[var(--success)] font-medium"
                      : "text-[var(--foreground-muted)]"
                  }
                >
                  {password.length >= 6 ? "✓ At least 6 characters" : "○ At least 6 characters required"}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading || !name || !email || !isPasswordValid}
              className="w-full font-semibold mt-4"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                role === "GIVER" ? "Start Contributing Storage" : "Create Personal Cloud"
              )}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] text-[12px] text-[var(--foreground-muted)] text-center">
            By registering, you agree to the distributed storage network acceptable use guidelines. Your account is protected by client-derived authentication keys.
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-6 text-[13px] text-[var(--foreground-secondary)]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[var(--primary)] font-semibold hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
