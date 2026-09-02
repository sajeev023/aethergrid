"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { getInstitutionData } from "@/lib/site-data";
import { cn } from "@/lib/utils";

interface ContactProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
}

export function Contact({ activeInst = "lfjc" }: ContactProps) {
  const [activeForm, setActiveForm] = useState<"contact" | "inquiry">("contact");
  const instData = getInstitutionData(activeInst);

  return (
    <div id="contact" className="bg-white">
      {/* ─── PAGE HEADER ──────────────────────────────────────────────── */}
      <Section variant="default" className="bg-gradient-to-b from-deep-navy to-montfortian-blue text-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-block px-3 py-1 rounded-full bg-heritage-gold/20 border border-heritage-gold/40 text-heritage-gold-bright text-xs font-bold uppercase tracking-widest font-sans mb-3">
              Administrative Office
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white tracking-tight">
              Contact & Campus Location
            </h1>
            <p className="mt-2 text-sm sm:text-base text-royal-cream/80 max-w-2xl mx-auto font-sans leading-relaxed">
              We welcome inquiries from prospective students, parents, and alumni. Reach our administrative offices directly or visit our campus.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ─── CONTACT DETAILS & MAP ────────────────────────────────────── */}
      <Section variant="default" className="bg-royal-cream/20 border-y border-stone-texture/30 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-12 items-start">
            {/* Contact Details Column */}
            <Reveal className="lg:col-span-6 space-y-3">
              {[
                {
                  icon: MapPin,
                  label: "Campus Address (Official Source of Truth)",
                  value: instData.addressLine,
                  subvalue: "Landmark: Opposite Survey of India, Tarnaka-Uppal Road",
                  href: "https://maps.google.com/?q=Little+Flower+Junior+College+Uppal+Hyderabad",
                },
                {
                  icon: Phone,
                  label: "Administrative Office Phone",
                  value: instData.phone,
                  subvalue: "Reception & Admissions Helpdesk",
                  href: `tel:${instData.phone.replace(/\s/g, "")}`,
                },
                {
                  icon: Mail,
                  label: "Primary Email",
                  value: instData.email,
                  subvalue: "Official Institutional Correspondence",
                  href: `mailto:${instData.email}`,
                },
                {
                  icon: Mail,
                  label: "Secondary Email",
                  value: instData.secondaryEmail,
                  subvalue: "Administrative Inquiries",
                  href: `mailto:${instData.secondaryEmail}`,
                },
                {
                  icon: Phone,
                  label: "Alumni Network Office",
                  value: `${instData.alumniPhone} • ${instData.alumniEmail}`,
                  subvalue: "Golden Jubilee Alumni Coordination Desk",
                  href: `tel:${instData.alumniPhone.replace(/\s/g, "")}`,
                },
                {
                  icon: Clock,
                  label: "College Working Hours",
                  value: "Monday – Saturday: 9:00 AM – 4:00 PM",
                  subvalue: "Classes commence at 8:00 AM for coaching batches",
                  href: undefined,
                },
              ].map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-start gap-3.5 rounded-2xl border border-stone-texture/60 bg-white p-4 hover:border-heritage-gold/60 transition-colors shadow-xs">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-royal-cream text-montfortian-blue border border-stone-texture/60 shadow-inner">
                      <Icon className="h-5 w-5 text-heritage-gold-strong" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
                        {item.label}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-academic-slate font-sans mt-0.5">
                        {item.value}
                      </p>
                      {item.subvalue && (
                        <p className="text-[11px] text-academic-slate/60 font-sans mt-0.5">
                          {item.subvalue}
                        </p>
                      )}
                    </div>
                  </div>
                );
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="block"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </Reveal>

            {/* Google Maps Embed Column */}
            <Reveal delay={0.1} className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-stone-texture/60 shadow-panel bg-white p-2">
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-royal-cream">
                  <iframe
                    title="Little Flower Junior College Location Map"
                    src="https://maps.google.com/maps?q=Little+Flower+Junior+College+Uppal+Hyderabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    className="absolute inset-0"
                  />
                </div>
                <div className="p-3 text-xs text-academic-slate/75 font-sans flex items-center justify-between">
                  <span className="font-semibold text-montfortian-blue">
                    Uppal, Hyderabad, Telangana 500039
                  </span>
                  <a
                    href="https://maps.google.com/?q=Little+Flower+Junior+College+Uppal+Hyderabad"
                    target="_blank"
                    rel="noreferrer"
                    className="text-heritage-gold-strong font-bold hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ─── SEND MESSAGE FORM ────────────────────────────────────────── */}
      <Section id="inquiry" variant="default" className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
              Direct Inquiries
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate mt-1">
              Send a Message to College Office
            </h2>
          </div>

          <div className="rounded-2xl border border-stone-texture/60 bg-white p-6 sm:p-8 shadow-panel">
            <div className="grid grid-cols-2 gap-2 mb-6">
              {(["contact", "inquiry"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setActiveForm(type)}
                  className={cn(
                    "px-3 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all font-sans",
                    activeForm === type
                      ? "bg-montfortian-blue text-white shadow-xs"
                      : "bg-royal-cream/40 text-academic-slate/70 hover:text-academic-slate"
                  )}
                >
                  {type === "contact" ? "General Communication" : "Admissions Inquiry"}
                </button>
              ))}
            </div>

            <LeadForm
              type={activeForm}
              activeInst={activeInst}
              title={activeForm === "contact" ? "General Enquiry" : "Admission Inquiry"}
              description=""
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
