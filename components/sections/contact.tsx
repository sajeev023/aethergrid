"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Clock, Users, ArrowRight } from "lucide-react";

import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { getInstitutionData } from "@/lib/site-data";
import { cn } from "@/lib/utils";

interface ContactProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
  headingLevel?: "h1" | "h2";
}

export function Contact({ activeInst = "lfjc", headingLevel = "h1" }: ContactProps) {
  const [activeForm, setActiveForm] = useState<"contact" | "inquiry">("contact");
  const instData = getInstitutionData(activeInst);

  return (
    <div id="contact" className="bg-white">
      <Section variant="default" className="bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="font-sans text-xs font-bold text-heritage-gold-strong uppercase tracking-wider mb-2 block">
              Contact
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-academic-slate">
              Contact Office
            </h1>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-academic-slate/75 font-sans max-w-2xl mx-auto">
              Reach the LFJC administrative office for admissions, general enquiries, or campus visits.
            </p>
          </Reveal>
        </div>
      </Section>
      <Section variant="default" className="bg-royal-cream/20 border-y border-stone-texture/30">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <Reveal className="space-y-3">
            {[
              { icon: MapPin, label: "Address", value: instData.addressLine, href: "https://maps.google.com/?q=Little+Flower+Junior+College+Uppal+Hyderabad" },
              { icon: Phone, label: "Phone", value: instData.phone, href: `tel:${instData.phone.replace(/\s/g, "")}` },
              { icon: Mail, label: "Email", value: instData.email, href: `mailto:${instData.email}` },
              { icon: Clock, label: "Office Hours", value: "Mon–Sat: 9:00 AM – 4:00 PM", href: undefined },
            ].map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="flex items-start gap-3 rounded-xl border border-stone-texture/60 bg-white p-3 sm:p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-royal-cream text-montfortian-blue border border-stone-texture/60">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">{item.label}</p>
                    <p className="text-xs sm:text-sm text-academic-slate font-sans">{item.value}</p>
                  </div>
                </div>
              );
              return item.href ? (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} className="block hover:border-heritage-gold/40 transition-colors">
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-stone-texture/50 shadow-elevation">
              <iframe
                title="LFJC location"
                src="https://maps.google.com/maps?q=Little+Flower+Junior+College+Uppal+Hyderabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                className="absolute inset-0"
              />
            </div>
          </Reveal>
        </div>
      </Section>
      <Section id="inquiry" variant="default" className="bg-white">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Enquiry" title="Send a Message" description="Use the form below." />

          <div className="mt-5 sm:mt-8 rounded-xl border border-stone-texture/60 bg-white p-4 sm:p-6 shadow-panel">
            <div className="grid grid-cols-2 gap-1 mb-4">
              {(["contact", "inquiry"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setActiveForm(type)}
                  className={cn(
                    "px-2 py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors",
                    activeForm === type
                      ? "bg-montfortian-blue text-white"
                      : "bg-royal-cream/40 text-academic-slate/70 hover:text-academic-slate"
                  )}
                >
                  {type === "contact" ? "General" : "Admission Inquiry"}
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
