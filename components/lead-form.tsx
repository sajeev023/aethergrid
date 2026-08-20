"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { getInstitutionData } from "@/lib/site-data";

type FormType = "inquiry" | "contact" | "admissions";

type LeadFormProps = {
  type: FormType;
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
  title?: string;
  description?: string;
  compact?: boolean;
  className?: string;
};

type FormStatus = {
  state: "idle" | "submitting" | "success" | "error";
  message: string;
};

export function LeadForm({
  type,
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

  const instData = getInstitutionData(activeInst);

  const getStreamOptions = () => {
    return [
      "M.P.C (Math, Physics, Chemistry)",
      "Bi.P.C (Botany, Zoology, Physics, Chemistry)",
      "M.E.C (Math, Economics, Commerce)",
      "C.E.C (Civics, Economics, Commerce)"
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

    setStatus({ state: "submitting", message: "Sending your request..." });

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Please check the form and try again.");
      }

      form.reset();
      setStatus({
        state: "success",
        message: result.message ?? `Thank you. The ${instData.shortName} office will review your request.`,
      });
    } catch (error) {
      setStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <form
      className={cn(
        "grid gap-3.5 sm:gap-4 rounded-xl border border-stone-texture bg-white p-4 sm:p-6 shadow-[0_20px_60px_rgba(22,29,31,0.06)]",
        compact ? "p-3.5 sm:p-4" : "p-4 sm:p-6",
        className,
      )}
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="activeInst" value={activeInst} />
      {/* Honeypot — hidden from humans, bots fill it. Server drops any
          submission where this is non-empty. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
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
          <h3 className="font-serif text-lg sm:text-xl font-semibold text-academic-slate">
            {title}
          </h3>
          {description ? (
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm leading-relaxed sm:leading-6 text-academic-slate/70">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}

      {type === "admissions" ? (
        <div className="grid gap-2.5 sm:gap-4 sm:grid-cols-2">
          <Field id={`${id}-student`} label="Student name">
            <Input id={`${id}-student`} name="studentName" required autoComplete="name" />
          </Field>
          <Field id={`${id}-parent`} label="Parent / guardian">
            <Input id={`${id}-parent`} name="parentName" required autoComplete="name" />
          </Field>
          <Field id={`${id}-phone`} label="Mobile number">
            <Input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
            />
          </Field>
          <Field id={`${id}-stream`} label="Preferred stream">
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
          <Field id={`${id}-board`} label="Class X board">
            <Input id={`${id}-board`} name="board" placeholder="SSC / CBSE / ICSE" />
          </Field>
          <Field id={`${id}-marks`} label="Expected / scored marks/percentage">
            <Input id={`${id}-marks`} name="percentage" placeholder="Optional" />
          </Field>
        </div>
      ) : (
        <div className="grid gap-2.5 sm:gap-4 sm:grid-cols-2">
          <Field id={`${id}-name`} label="Full name">
            <Input id={`${id}-name`} name="name" required autoComplete="name" />
          </Field>
          {type === "contact" ? (
            <Field id={`${id}-email`} label="Email address">
              <Input
                id={`${id}-email`}
                name="email"
                type="email"
                required
                autoComplete="email"
              />
            </Field>
          ) : (
            <Field id={`${id}-phone`} label="Mobile number">
              <Input
                id={`${id}-phone`}
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="tel"
              />
            </Field>
          )}
          {type === "inquiry" ? (
            <Field id={`${id}-stream`} label="Preferred stream">
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
              <Select id={`${id}-relation`} name="relation" required defaultValue="">
                <option value="" disabled>
                  Select one
                </option>
                <option value="Prospective student">Prospective student</option>
                <option value="Parent">Parent</option>
                <option value="Alumnus">Alumnus</option>
                <option value="General visitor">General visitor</option>
              </Select>
            </Field>
          )}
        </div>
      )}

      <Field id={`${id}-message`} label="Message">
        <Textarea
          id={`${id}-message`}
          name="message"
          required
          placeholder={
            type === "admissions"
              ? "Tell us about the student's academic goals."
              : `How can the ${instData.shortName} office help you?`
          }
        />
      </Field>

      <Button disabled={status.state === "submitting"} type="submit" className="w-full">
        {status.state === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending
          </>
        ) : (
          <>
            Submit Inquiry
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </Button>

      <p
        aria-live="polite"
        className={cn(
          "min-h-5 text-xs sm:text-sm leading-relaxed sm:leading-6",
          status.state === "success" && "text-montfortian-blue",
          status.state === "error" && "text-red-700",
          status.state === "idle" && "text-academic-slate/70",
        )}
      >
        {status.message || `All submissions are routed to the ${instData.shortName} administration office.`}
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
    <div className="grid gap-1 sm:gap-2">
      <Label htmlFor={id} className="text-xs sm:text-sm">{label}</Label>
      {children}
    </div>
  );
}
