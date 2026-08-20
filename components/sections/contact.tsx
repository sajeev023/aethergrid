"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone, Users } from "lucide-react";

import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInstitutionData } from "@/lib/site-data";

interface ContactProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
  headingLevel?: "h1" | "h2";
}

export function Contact({ activeInst = "lfjc", headingLevel = "h2" }: ContactProps) {
  const [activeForm, setActiveForm] = useState<"general" | "inquiry">("general");

  const instData = getInstitutionData(activeInst);
  const { resources } = instData;

  const getMapQuery = () => {
    return "Little%20Flower%20Junior%20College%20Uppal%20Hyderabad";
  };

  const getCounselingText = () => {
    return "Our resident student counselor is available for academic streaming assistance, counseling support, and personal development reviews.";
  };

  return (
    <div id="contact" className="overflow-hidden bg-royal-cream/40 border-b border-stone-texture/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-6 sm:py-12 md:py-16 section-texture">
        {/* Top Header & Visuals */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <SectionHeading
              align="left"
              as={headingLevel}
              eyebrow="Contact & Resources"
              title="Get in Touch"
              description={`Whether you are a prospective student, parent, alumnus, or campus visitor, the ${instData.shortName} administration office is ready to support you.`}
            />
            
            <div className="mt-4 sm:mt-5 grid gap-2 sm:gap-3 font-sans">
              <a
                href={`mailto:${instData.email}`}
                className="group inline-flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm md:text-base font-semibold text-montfortian-blue hover:text-montfortian-blue/80 transition-colors"
              >
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded bg-white border border-stone-texture group-hover:border-montfortian-blue/40 shadow-xs transition-all duration-300">
                  <Mail className="h-4 w-4 text-montfortian-blue" aria-hidden="true" />
                </div>
                <span className="underline decoration-stone-texture/80 decoration-1 underline-offset-4 group-hover:decoration-montfortian-blue/50 transition-all truncate">
                  {instData.email}
                </span>
              </a>
              
              <a
                href={`tel:${instData.phone.replace(/\s/g, "")}`}
                className="group inline-flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm md:text-base font-semibold text-montfortian-blue hover:text-montfortian-blue/80 transition-colors"
              >
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded bg-white border border-stone-texture group-hover:border-montfortian-blue/40 shadow-xs transition-all duration-300">
                  <Phone className="h-4 w-4 text-montfortian-blue" aria-hidden="true" />
                </div>
                <span className="underline decoration-stone-texture/80 decoration-1 underline-offset-4 group-hover:decoration-montfortian-blue/50 transition-all">
                  {instData.phone}
                </span>
              </a>
              
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${getMapQuery()}`}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-academic-slate/80 leading-relaxed sm:leading-6 font-sans hover:text-montfortian-blue transition-colors"
              >
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded bg-white border border-stone-texture shadow-xs group-hover:border-montfortian-blue/40 transition-all duration-300">
                  <MapPin className="h-4 w-4 text-montfortian-blue" aria-hidden="true" />
                </div>
                <span className="pt-0.5 sm:pt-1 font-medium underline decoration-stone-texture/80 decoration-1 underline-offset-4 group-hover:decoration-montfortian-blue/50 transition-all">
                  {instData.addressLine}, Opposite Survey of India, Uppal, Hyderabad, Telangana 500039
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-stone-texture shadow-[0_15px_35px_rgba(22,29,31,0.08)] rounded-lg group p-1.5 bg-white">
              <div className="relative h-full w-full overflow-hidden rounded-md">
                <Image
                  src="/images/contact-campus.jpg"
                  alt={`${instData.name} campus facilities`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 95vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-10">
                  <span className="inline-block bg-academic-slate/85 backdrop-blur-sm border border-heritage-gold/30 px-2.5 py-1 sm:px-3 sm:py-1.5 font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-heritage-gold-bright rounded-sm shadow-xs">
                    Golden Jubilee Block
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Detailed Info Grid */}
        <div className="mt-5 sm:mt-6 grid min-w-0 gap-3.5 sm:gap-4 lg:grid-cols-[1.1fr_0.9fr] items-start">

          {/* Left Column: Hours, Campus Visit & Counseling */}
          <div className="grid min-w-0 gap-3.5 sm:gap-4">
            {/* Office Hours Grid */}
            <div className="grid gap-2.5 sm:gap-4 md:grid-cols-2">
              <Reveal>
                <HoursCard
                  title="Administrative Hours"
                  rows={[
                    ["Monday - Friday", "9:00 AM - 4:00 PM"],
                    ["Saturday", "8:00 AM - 1:00 PM"],
                    ["Sunday", "Closed"],
                  ]}
                />
              </Reveal>
              <Reveal delay={0.06}>
                <HoursCard
                  id="admissions-office"
                  title="Admissions Office"
                  rows={[
                    ["Monday - Friday", "10:00 AM - 3:00 PM"],
                    ["Saturday", "By appointment only"],
                    ["Sunday", "Closed"],
                  ]}
                />
              </Reveal>
              <Reveal delay={0.12}>
                <HoursCard
                  id="coaching-sections"
                  title="Coaching Sections"
                  rows={[
                    ["Monday - Friday", "8:00 AM - 4:00 PM"],
                    ["Saturday", "8:00 AM - 1:00 PM"],
                    ["Sunday", "Closed"],
                  ]}
                />
              </Reveal>
            </div>

            <Reveal>
              <Card id="location" className="bg-white border border-stone-texture hover:border-heritage-gold/30 hover:shadow-[0_15px_30px_rgba(15,76,129,0.04)] transition-all duration-300 scroll-mt-28">
                <CardHeader className="p-3.5 pb-0 sm:p-5 sm:pb-0">
                  <CardTitle className="font-serif text-base sm:text-lg font-bold text-academic-slate">Visit Our Campus</CardTitle>
                </CardHeader>
                <CardContent className="p-3.5 sm:p-5 pt-2.5 sm:pt-3 space-y-2.5 sm:space-y-3">
                  <div className="border border-stone-texture/80 bg-royal-cream/30 p-2.5 sm:p-3 rounded-md hover:bg-white transition-colors duration-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-montfortian-blue shrink-0" aria-hidden="true" />
                      <p className="font-semibold text-xs md:text-sm text-academic-slate font-sans">
                        Uppal, Hyderabad - 500039
                      </p>
                    </div>
                  </div>

                  {/* Touch-locked Map Container */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-md overflow-hidden border border-stone-texture group">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.126487823906!2d78.5583!3d17.3995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb98a1a3b56a3d%3A0x6b4f74ab7986b6a3!2sLittle%20Flower%20Junior%20College!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="LFJC Google Map Location"
                      className="w-full h-full"
                    />
                  </div>

                  <Button asChild variant="secondary" className="w-full shadow-xs text-xs font-bold uppercase tracking-wider py-2.5 min-h-[44px]">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${getMapQuery()}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open in Google Maps
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </Reveal>

            {/* Counselor Component Card */}
            <Reveal>
              <Card className="border-l-4 border-l-heritage-gold bg-white border border-stone-texture hover:shadow-[0_15px_30px_rgba(15,76,129,0.04)] transition-all duration-300">
                <CardContent className="p-3.5 sm:p-4">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded bg-royal-cream text-heritage-gold-strong border border-stone-texture/60">
                      <Users className="h-4 w-4 text-heritage-gold-strong" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-semibold text-academic-slate">
                        Counseling &amp; Career Guidance
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed sm:leading-5 text-academic-slate/75 font-sans">
                        {getCounselingText()}
                      </p>
                      <div className="mt-2.5 sm:mt-3 flex flex-wrap gap-y-1 gap-x-3 sm:gap-x-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-montfortian-blue font-sans">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          Tue &amp; Thu: 10:00 AM - 1:00 PM
                        </span>
                        <span className="text-academic-slate/30">|</span>
                        <span>By prior appointment</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>

          {/* Right Column: Portal & Form Switching */}
          <div className="grid min-w-0 gap-3.5 sm:gap-5">
            <Reveal>
              <Card className="overflow-hidden bg-white border border-stone-texture hover:shadow-[0_20px_50px_rgba(15,76,129,0.04)] transition-all duration-300">
                <CardHeader className="bg-academic-slate p-3.5 sm:p-5 text-white border-b border-stone-texture/20">
                  <CardTitle className="text-white font-serif text-lg sm:text-xl">Resource Portal</CardTitle>
                  <p className="text-xs leading-relaxed sm:leading-5 text-royal-cream/80 font-sans mt-1">
                    Quick access to essential campus services and digital databases.
                  </p>
                </CardHeader>
                <CardContent className="grid gap-2.5 sm:gap-3 p-3.5 sm:p-5 bg-royal-cream/10">
                  {resources.map((resource) => {
                    const Icon = resource.icon;

                    return (
                      <Link
                        key={resource.title}
                        href={resource.href || "#contact"}
                        className="premium-focus group flex items-center justify-between gap-3 sm:gap-4 border border-stone-texture/60 bg-white p-2.5 sm:p-3 rounded-md hover:border-heritage-gold hover:shadow-panel transition-all duration-300"
                      >
                        <span className="flex items-center gap-2.5 sm:gap-3">
                          <span className="grid h-8 w-8 sm:h-10 sm:w-10 shrink-0 place-items-center rounded bg-royal-cream text-montfortian-blue border border-stone-texture/40 group-hover:bg-white transition-colors">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <span>
                            <span className="block font-serif text-sm sm:text-base font-semibold text-academic-slate group-hover:text-montfortian-blue transition-colors">
                              {resource.title}
                            </span>
                            <span className="mt-0.5 block text-[11px] sm:text-xs leading-4 text-academic-slate/65 font-sans">
                              {resource.description}
                            </span>
                          </span>
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-academic-slate/30 transition-transform group-hover:translate-x-1 group-hover:text-montfortian-blue" aria-hidden="true" />
                      </Link>
                    );
                  })}
                </CardContent>
              </Card>
            </Reveal>

            {/* Smart Interactive Form Switcher */}
            <Reveal>
              <div id="inquiry" className="grid grid-cols-2 scroll-mt-28 gap-1 border border-stone-texture bg-white p-1 rounded-xl shadow-xs">
                <button
                  type="button"
                  onClick={() => setActiveForm("general")}
                  aria-pressed={activeForm === "general"}
                  className={`min-w-0 px-2 py-2.5 sm:py-3 min-h-[44px] text-center text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-lg cursor-pointer ${
                    activeForm === "general"
                      ? "bg-montfortian-blue text-white shadow-xs"
                      : "text-academic-slate/70 hover:text-academic-slate hover:bg-royal-cream/50"
                  }`}
                >
                  Send a Message
                </button>
                <button
                  type="button"
                  onClick={() => setActiveForm("inquiry")}
                  aria-pressed={activeForm === "inquiry"}
                  className={`min-w-0 px-2 py-2.5 sm:py-3 min-h-[44px] text-center text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-lg cursor-pointer ${
                    activeForm === "inquiry"
                      ? "bg-montfortian-blue text-white shadow-xs"
                      : "text-academic-slate/70 hover:text-academic-slate hover:bg-royal-cream/50"
                  }`}
                >
                  Admission Inquiry
                </button>
              </div>
            </Reveal>

            <Reveal>
              <div className="transition-all duration-500">
                {activeForm === "general" ? (
                  <LeadForm
                    type="contact"
                    activeInst={activeInst}
                    title="Send a Message"
                    description={`For general administrative questions, transcript requests, and feedback related to ${instData.shortName}.`}
                    className="border border-stone-texture shadow-[0_20px_50px_rgba(22,29,31,0.05)] bg-white"
                  />
                ) : (
                  <LeadForm
                    type="inquiry"
                    activeInst={activeInst}
                    title="Admission Inquiry"
                    description="Have stream-specific questions regarding eligibility or course modules? Write to us."
                    className="border border-stone-texture shadow-[0_20px_50px_rgba(22,29,31,0.05)] bg-white"
                  />
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}

function HoursCard({
  title,
  rows,
  id,
}: {
  title: string;
  rows: [string, string][];
  id?: string;
}) {
  return (
    <Card id={id} className="h-full bg-white border border-stone-texture hover:border-heritage-gold/30 transition-all duration-300 scroll-mt-28">
      <CardContent className="p-3.5 sm:p-5">
        <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded bg-royal-cream border border-stone-texture/60 text-heritage-gold-strong">
          <Clock className="h-4 w-4 text-heritage-gold-strong" aria-hidden="true" />
        </div>
        <h3 className="mt-2.5 sm:mt-3 font-serif text-sm sm:text-base font-semibold text-academic-slate">
          {title}
        </h3>
        <dl className="mt-2.5 sm:mt-3 grid gap-1.5 sm:gap-2 text-xs sm:text-sm font-sans">
          {rows.map(([day, value]) => (
            <div key={day} className="flex flex-wrap justify-between gap-x-3 gap-y-1 border-b border-stone-texture/40 pb-1.5 sm:pb-2 last:border-b-0 last:pb-0">
              <dt className="text-academic-slate/65">{day}</dt>
              <dd className="text-right font-medium text-academic-slate">{value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
