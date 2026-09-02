"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, CheckCircle2, Copy, Check, FileCheck, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { getInstitutionData } from "@/lib/site-data";

type FormType = "inquiry" | "contact" | "admissions";

type LeadFormProps = {
  type?: FormType;
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
  title?: string;
  description?: string;
  compact?: boolean;
  className?: string;
};

type FormStatus = {
  state: "idle" | "submitting" | "success" | "error";
  message: string;
  refNumber?: string;
  submittedData?: Record<string, string>;
};

export function LeadForm({
  type = "admissions",
  activeInst = "lfjc",
  title,
  description,
  compact = false,
  className,
}: LeadFormProps) {
  const id = useId();
  const [status, setStatus] = useState<FormStatus>({
    state: "idle",
    message: "",
  });
  const [copied, setCopied] = useState(false);

  const instData = getInstitutionData(activeInst);

  const getStreamOptions = () => {
    return [
      "M.P.C (Math, Physics, Chemistry)",
      "Bi.P.C (Botany, Zoology, Physics, Chemistry)",
      "M.E.C (Math, Economics, Commerce)",
      "C.E.C (Civics, Economics, Commerce)",
    ];
  };

  const streamOptions = getStreamOptions();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    // Attach institutional identifier to payload
    payload.activeInst = activeInst;

    setStatus({ state: "submitting", message: "Submitting your inquiry to the admissions desk..." });

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string; refNumber?: string; success?: boolean };

      if (!response.ok) {
        throw new Error(result.message ?? "Please check the form entries and try again.");
      }

      form.reset();
      setStatus({
        state: "success",
        message: result.message ?? `Thank you. The ${instData.shortName} admissions office will review your inquiry.`,
        refNumber: result.refNumber,
        submittedData: {
          name: String(payload.studentName ?? payload.name ?? ""),
          parent: String(payload.parentName ?? ""),
          stream: String(payload.stream ?? ""),
          phone: String(payload.phone ?? ""),
          email: String(payload.email ?? ""),
        },
      });
    } catch (error) {
      setStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again or contact the office directly.",
      });
    }
  }

  const handleCopyRef = () => {
    if (status.refNumber) {
      navigator.clipboard.writeText(status.refNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // ── Success State View ──
  if (status.state === "success") {
    return (
      <div
        className={cn(
          "grid gap-4 rounded-xl border-2 border-emerald-600/30 bg-emerald-50/40 p-5 sm:p-7 shadow-[0_20px_60px_rgba(22,29,31,0.06)] text-academic-slate",
          className,
        )}
      >
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm">
            <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-emerald-800">
              Inquiry Received
            </span>
            <h3 className="mt-0.5 font-serif text-lg sm:text-xl font-bold text-deep-navy">
              Thank You
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-academic-slate/85 leading-relaxed">
              The {instData.shortName} admissions office will contact you.
            </p>
          </div>
        </div>

        {/* Reference Card */}
        {status.refNumber && (
          <div className="rounded-lg border border-emerald-200 bg-white p-3.5 sm:p-4 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-academic-slate/70 font-sans">
                  Reference Number
                </p>
                <p className="font-mono text-base sm:text-lg font-bold text-montfortian-blue tracking-wide mt-0.5">
                  {status.refNumber}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCopyRef}
                className="h-8 gap-1.5 text-xs border-emerald-300 text-emerald-800 hover:bg-emerald-50"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy Ref"}
              </Button>
            </div>
          </div>
        )}

        {/* Summary of submitted details */}
        {status.submittedData && status.submittedData.name && (
          <div className="rounded-lg border border-stone-texture/60 bg-white/80 p-3.5 text-xs font-sans text-academic-slate/85 space-y-1.5">
            <p><span className="font-medium text-academic-slate/60">Candidate Name:</span> {status.submittedData.name}</p>
            {status.submittedData.parent && (
              <p><span className="font-medium text-academic-slate/60">Parent / Guardian:</span> {status.submittedData.parent}</p>
            )}
            {status.submittedData.stream && (
              <p><span className="font-medium text-academic-slate/60">Preferred Stream:</span> {status.submittedData.stream}</p>
            )}
            {status.submittedData.phone && (
              <p><span className="font-medium text-academic-slate/60">Contact Phone:</span> {status.submittedData.phone}</p>
            )}
            {status.submittedData.email && (
              <p><span className="font-medium text-academic-slate/60">Email:</span> {status.submittedData.email}</p>
            )}
          </div>
        )}

        <div className="pt-2 flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStatus({ state: "idle", message: "" })}
            className="w-full text-xs font-bold uppercase tracking-wider h-10 border-stone-texture hover:bg-white"
          >
            Submit Another Inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      className={cn(
        "grid gap-3.5 sm:gap-4 rounded-xl border border-stone-texture bg-white p-4 sm:p-6 shadow-[0_20px_60px_rgba(22,29,31,0.06)]",
        compact ? "p-3.5 sm:p-4" : "p-4 sm:p-6",
        className,
      )}
      onSubmit={handleSubmit}
      noValidate={false}
    >
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="activeInst" value={activeInst} />
      
      {/* Honeypot — hidden from humans, bots fill it. Server drops any submission where this is non-empty. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor={`${id}-website`}>Website (leave blank)</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>

      {title ? (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileCheck className="h-4 w-4 text-heritage-gold-strong" />
            <h3 className="font-serif text-lg sm:text-xl font-semibold text-academic-slate">
              {title}
            </h3>
          </div>
          {description ? (
            <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm leading-relaxed text-academic-slate/70">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}

      {/* Error alert banner */}
      {status.state === "error" && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 sm:p-3.5 text-xs sm:text-sm text-red-800 leading-relaxed flex items-start gap-2.5"
        >
          <span className="font-bold shrink-0">Error:</span>
          <span>{status.message}</span>
        </div>
      )}

      {type === "admissions" ? (
        <div className="grid gap-2.5 sm:gap-4 sm:grid-cols-2">
          <Field id={`${id}-student`} label="Student Name *">
            <Input
              id={`${id}-student`}
              name="studentName"
              required
              minLength={2}
              autoComplete="name"
              placeholder="e.g. Rahul Sharma"
            />
          </Field>
          <Field id={`${id}-parent`} label="Parent / Guardian Name *">
            <Input
              id={`${id}-parent`}
              name="parentName"
              required
              minLength={2}
              autoComplete="name"
              placeholder="e.g. S. Sharma"
            />
          </Field>
          <Field id={`${id}-email`} label="Parent Email Address *">
            <Input
              id={`${id}-email`}
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="e.g. parent@example.com"
            />
          </Field>
          <Field id={`${id}-phone`} label="Mobile Contact Number *">
            <Input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              required
              minLength={8}
              autoComplete="tel"
              inputMode="tel"
              placeholder="e.g. 9876543210"
            />
          </Field>
          <Field id={`${id}-stream`} label="Preferred Academic Stream *">
            <Select id={`${id}-stream`} name="stream" required defaultValue="">
              <option value="" disabled>
                Select academic stream
              </option>
              {streamOptions.map((stream) => (
                <option key={stream} value={stream}>
                  {stream}
                </option>
              ))}
            </Select>
          </Field>
          <Field id={`${id}-board`} label="Class X Board">
            <Input id={`${id}-board`} name="board" placeholder="SSC / CBSE / ICSE / Other" />
          </Field>
          <div className="sm:col-span-2">
            <Field id={`${id}-marks`} label="Expected / Scored Marks or GPA">
              <Input id={`${id}-marks`} name="percentage" placeholder="e.g. 10.0 GPA / 95% (Optional)" />
            </Field>
          </div>
        </div>
      ) : (
        <div className="grid gap-2.5 sm:gap-4 sm:grid-cols-2">
          <Field id={`${id}-name`} label="Full Name *">
            <Input id={`${id}-name`} name="name" required minLength={2} autoComplete="name" />
          </Field>
          <Field id={`${id}-email`} label="Email Address">
            <Input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="e.g. yourname@example.com"
            />
          </Field>
          <Field id={`${id}-phone`} label="Mobile Number">
            <Input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="e.g. 9876543210"
            />
          </Field>
          {type === "inquiry" ? (
            <Field id={`${id}-stream`} label="Preferred Stream">
              <Select id={`${id}-stream`} name="stream" required defaultValue="">
                <option value="" disabled>
                  Select option
                </option>
                {streamOptions.map((stream) => (
                  <option key={stream} value={stream}>
                    {stream}
                  </option>
                ))}
              </Select>
            </Field>
          ) : (
            <Field id={`${id}-relation`} label="I am a">
              <Select id={`${id}-relation`} name="relation" required defaultValue="Parent">
                <option value="Prospective student">Prospective student</option>
                <option value="Parent">Parent / Guardian</option>
                <option value="Alumnus">Alumnus</option>
                <option value="General visitor">General visitor</option>
              </Select>
            </Field>
          )}
        </div>
      )}

      <Field id={`${id}-message`} label="Message / Academic Goals *">
        <Textarea
          id={`${id}-message`}
          name="message"
          required
          minLength={8}
          rows={3}
          placeholder={
            type === "admissions"
              ? "Share candidate's academic interests, future entrance goals (JEE/NEET/CA-CPT), or specific queries (min 8 characters)."
              : `How can the ${instData.shortName} administration office assist you?`
          }
        />
      </Field>

      {/* Parental Consent Checkbox for Minor Data Processing */}
      {type === "admissions" && (
        <div className="rounded-lg border border-stone-texture/60 bg-royal-cream/20 p-3 sm:p-3.5">
          <label htmlFor={`${id}-consent`} className="flex items-start gap-2.5 cursor-pointer text-xs leading-relaxed text-academic-slate/85 font-sans">
            <input
              id={`${id}-consent`}
              name="consent"
              type="checkbox"
              required
              defaultChecked
              className="mt-0.5 h-4 w-4 rounded border-stone-texture text-montfortian-blue focus:ring-montfortian-blue shrink-0 cursor-pointer"
            />
            <span>
              <strong>Parental Consent:</strong> I consent to Little Flower Junior College contacting me via phone, email, and WhatsApp regarding admission inquiries and academic guidance.
            </span>
          </label>
        </div>
      )}

      <Button disabled={status.state === "submitting"} type="submit" className="w-full h-11 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm">
        {status.state === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" aria-hidden="true" />
            Submitting Inquiry...
          </>
        ) : (
          <>
            Submit Inquiry
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </>
        )}
      </Button>

      <p
        aria-live="polite"
        className="min-h-5 text-center text-[11px] sm:text-xs text-academic-slate/60 font-sans"
      >
        All inquiries are routed to the {instData.shortName} admissions office.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1 sm:gap-1.5">
      <Label htmlFor={id} className="text-xs font-semibold text-academic-slate">
        {label}
      </Label>
      {children}
    </div>
  );
}
