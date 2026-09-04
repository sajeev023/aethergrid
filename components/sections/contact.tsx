"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, MapPin, Phone, Clock, ExternalLink, Navigation, Compass, Car } from "lucide-react";

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

            {/* Campus Location & Maps Column */}
            <Reveal delay={0.1} className="lg:col-span-6 space-y-4">
              {/* Verified Campus Photo & Identity Card */}
              <div className="rounded-2xl overflow-hidden border border-stone-texture/60 bg-white shadow-panel">
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-royal-cream">
                  <Image
                    src="/images/campus-building.jpg"
                    alt="Little Flower Junior College Administrative Campus, Uppal, Hyderabad"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/85 via-deep-navy/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="inline-block px-2.5 py-0.5 rounded bg-heritage-gold text-deep-navy text-[10px] font-bold uppercase tracking-wider font-sans mb-1 shadow-xs">
                      Uppal Campus • 8 Acres
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-bold leading-snug">
                      Little Flower Junior College
                    </h3>
                    <p className="text-xs text-royal-cream/90 font-sans">
                      Survey No. 102/1, Opposite Survey of India, Tarnaka-Uppal Main Road
                    </p>
                  </div>
                </div>

                {/* Transit & Navigation Details */}
                <div className="p-4 bg-royal-cream/20 border-t border-stone-texture/40 space-y-2 text-xs text-academic-slate font-sans">
                  <div className="flex items-start gap-2">
                    <Compass className="h-4 w-4 text-heritage-gold-strong shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-montfortian-blue">Transit Landmark: </span>
                      Directly opposite the Survey of India main campus on the Habsiguda–Uppal arterial corridor.
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Car className="h-4 w-4 text-heritage-gold-strong shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-montfortian-blue">Nearest Metro Stations: </span>
                      NGRI Metro Station (~1.3 km) and Habsiguda Metro Station (~1.8 km) on Hyderabad Metro Blue Line.
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-3 bg-white border-t border-stone-texture/40 flex flex-wrap items-center justify-between gap-2">
                  <a
                    href="https://maps.google.com/?q=Little+Flower+Junior+College+Uppal+Hyderabad"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-montfortian-blue text-white text-xs font-bold font-sans hover:bg-deep-navy transition-colors shadow-xs"
                  >
                    <Navigation className="h-3.5 w-3.5 text-heritage-gold-bright" />
                    Open in Google Maps
                    <ExternalLink className="h-3 w-3 opacity-80" />
                  </a>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Little+Flower+Junior+College+Uppal+Hyderabad"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-stone-texture text-academic-slate text-xs font-bold font-sans hover:border-heritage-gold hover:text-montfortian-blue transition-colors"
                  >
                    Get Driving Directions →
                  </a>
                </div>
              </div>

              {/* Verified Map Embed with fallback container */}
              <div className="rounded-2xl overflow-hidden border border-stone-texture/60 shadow-xs bg-white p-2">
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-royal-cream">
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
                <div className="px-2 pt-2 text-[11px] text-academic-slate/70 font-sans flex items-center justify-between">
                  <span>Pin: 500039 • Medchal-Malkajgiri District</span>
                  <span>Coordinates: 17.4065° N, 78.5583° E</span>
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
              Direct Inquiries &amp; Office Routing
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate mt-1">
              Send a Message to College Office
            </h2>
            <p className="mt-1.5 text-xs text-academic-slate/75 font-sans max-w-xl mx-auto">
              General inquiries are addressed by the Principal&apos;s Administrative Office. Admissions inquiries are forwarded directly to the Admissions Counseling Desk.
            </p>
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
