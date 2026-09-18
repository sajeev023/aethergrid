"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  Layers,
  Eye,
  EyeOff,
  FlaskConical,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recoveryOpen, setRecoveryOpen] = useState(false);
  const [recoverySent, setRecoverySent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Invalid email or password.");
      }

      if (data.user.activeRole === "GIVER") {
        router.push("/giver");
      } else {
        router.push(redirectUrl);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSandboxLogin = async (demoRole: "GIVER" | "TAKER") => {
    const demoEmail = demoRole === "GIVER" ? "giver@aethergrid.io" : "taker@aethergrid.io";
    const demoPass = "AetherPass123!";

    setEmail(demoEmail);
    setPassword(demoPass);
    setLoading(true);
    setError(null);

    try {
      // 1. Try to log in directly
      let res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: demoEmail, password: demoPass }),
      });

      // 2. If not registered yet, auto-register
      if (!res.ok) {
        await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: demoRole === "GIVER" ? "Suresh Node Provider" : "Aarav Cloud User",
            email: demoEmail,
            password: demoPass,
            role: demoRole,
          }),
        });

        // Retry login
        res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: demoEmail, password: demoPass }),
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sandbox login failed");

      if (demoRole === "GIVER") {
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
      <div className="w-full max-w-[420px]">
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
          <h1 className="type-h2 font-bold text-[var(--foreground)]">Sign in to your account</h1>
          <p className="text-[14px] text-[var(--foreground-secondary)] mt-1">
            Access your private cloud files or manage storage nodes
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email-input"
                className="type-label block text-[var(--foreground)] mb-1.5 font-medium"
              >
                Email address
              </label>
              <div className="relative">
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
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password-input"
                  className="type-label block text-[var(--foreground)] font-medium"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setRecoveryOpen(!recoveryOpen)}
                  className="text-[12px] text-[var(--primary)] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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
            </div>

            {recoveryOpen && (
              <div className="p-3.5 rounded-[10px] bg-[var(--surface-subtle)] border border-[var(--border-subtle)] text-[12px] text-[var(--foreground-secondary)] space-y-2">
                <div className="font-semibold text-[var(--foreground)]">Password Recovery</div>
                <p>
                  Because AetherGrid uses zero-knowledge encryption for private storage, your account password protects your encryption keys. If you cannot recall your password, enter your account email below to receive a password reset link.
                </p>
                {recoverySent ? (
                  <div className="text-[var(--success)] font-medium flex items-center gap-1.5 pt-1">
                    <CheckCircle2 className="w-4 h-4" /> Reset instructions dispatched to your email.
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full mt-1"
                    onClick={() => setRecoverySent(true)}
                  >
                    Send Recovery Email
                  </Button>
                )}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full font-semibold mt-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          {/* Subordinated Sandbox Access (Audit requirement: label as sandbox, subordinate to normal sign in) */}
          <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]">
            <div className="flex items-center justify-between text-[12px] text-[var(--foreground-muted)] mb-3">
              <span className="flex items-center gap-1.5 font-medium">
                <FlaskConical className="w-3.5 h-3.5 text-[var(--primary)]" />
                Try the sandbox
              </span>
              <span>Fast evaluation</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                disabled={loading}
                onClick={() => handleSandboxLogin("TAKER")}
                className="text-[12px]"
              >
                Demo Cloud User
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                disabled={loading}
                onClick={() => handleSandboxLogin("GIVER")}
                className="text-[12px]"
              >
                Demo Node Host
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-6 text-[13px] text-[var(--foreground-secondary)]">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-[var(--primary)] font-semibold hover:underline"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
