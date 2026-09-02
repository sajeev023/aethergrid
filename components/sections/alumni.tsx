"use client";

import React, { useState, useEffect, useCallback, useId, useRef } from "react";
import Image from "next/image";
import {
  X,
  Loader2,
  CheckCircle2,
  ExternalLink,
  Download,
  Mail,
  Phone,
  ShieldCheck,
  Quote,
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import {
  alumniData as seedAlumniData,
  Alumnus,
  alumniExecutiveBoard,
  alumniCoreCommittee,
  officialAlumniTestimonial,
  PORTAL_LINKS,
  lfjcData,
} from "@/lib/site-data";
import { AlumniSubmission } from "@/lib/admin/types";
import { useFocusTrap } from "@/lib/use-focus-trap";

const OFFICIAL_CIRCULARS = [
  { title: "Circular 1: Alumni Jubilee Meeting Notice", file: "/docs/LFJCAN-Circular-1.jpg", type: "Notice" },
  { title: "Circular 2: Core Committee & Jubilee Announcement", file: "/docs/LFJCAN-Circular-2.pdf", type: "Committee Roll" },
  { title: "Circular 3: Core Group Meeting Proceedings", file: "/docs/LFJCAN-Circular-3.pdf", type: "Meeting Minutes" },
  { title: "Circular 4: Office Bearers & Network Bylaws", file: "/docs/LFJCAN-Circular-4.pdf", type: "Executive Roster" },
];

export function Alumni() {
  const fid = useId();
  const drawerRef = useRef<HTMLDivElement>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  useFocusTrap(isFormOpen, drawerRef);
  const [dynamicAlumni, setDynamicAlumni] = useState<Alumnus[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formBatchFrom, setFormBatchFrom] = useState("");
  const [formBatchTo, setFormBatchTo] = useState("");
  const [formStream, setFormStream] = useState("MPC");
  const [formCategory, setFormCategory] = useState("Entrepreneurs & Leaders");
  const [formPosition, setFormPosition] = useState("");
  const [formCompany, setFormCompany] = useState("");
  const [formAchievements, setFormAchievements] = useState("");
  const [formBio, setFormBio] = useState("");
  const [formConsent, setFormConsent] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const loadApprovedDynamicAlumni = useCallback(async () => {
    try {
      const res = await fetch("/api/alumni");
      if (res.ok) {
        const data = await res.json();
        if (data && data.approved) {
          const mapped: Alumnus[] = data.approved.map((s: AlumniSubmission) => ({
            name: s.name,
            category: (s.category as Alumnus["category"]) || "Entrepreneurs & Leaders",
            description: s.bio,
            designation: `${s.position} at ${s.company}`,
            achievement: s.achievements,
            year: `Batch of ${s.batchFrom}-${s.batchTo} (${s.stream})`,
            image: s.photoUrl || "",
          }));
          setDynamicAlumni(mapped);
        }
      }
    } catch {
      // Gracefully fall back to seed data
    }
  }, []);

  useEffect(() => {
    loadApprovedDynamicAlumni();
  }, [loadApprovedDynamicAlumni]);

  const allAlumni = [...seedAlumniData, ...dynamicAlumni];
  const categories = ["All", "Civil Servants & Judiciary", "Entrepreneurs & Leaders", "Actors & Filmmakers"];

  const filteredAlumni =
    selectedCategory === "All"
      ? allAlumni
      : allAlumni.filter((a) => a.category === selectedCategory);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formConsent) {
      setSubmitError("Please confirm consent to share your details with LFJC Alumni Network.");
      return;
    }
    setSubmitting(true);
    setSubmitError("");

    try {
      const payload: Partial<AlumniSubmission> = {
        name: formName,
        email: formEmail,
        phone: formPhone,
        batchFrom: formBatchFrom,
        batchTo: formBatchTo,
        stream: formStream,
        category: formCategory,
        position: formPosition,
        company: formCompany,
        achievements: formAchievements,
        bio: formBio,
        consentShare: true,
      };

      const res = await fetch("/api/alumni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Submission failed. Please try again or use the official Google Form.");
      }

      setSubmitSuccess(true);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Failed to submit.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="alumni" className="bg-white">
      {/* ─── PAGE HEADER ──────────────────────────────────────────────── */}
      <Section variant="default" className="bg-gradient-to-b from-deep-navy to-montfortian-blue text-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-block px-3 py-1 rounded-full bg-heritage-gold/20 border border-heritage-gold/40 text-heritage-gold-bright text-xs font-bold uppercase tracking-widest font-sans mb-3">
              Official Alumni Network (LFJCAN)
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white tracking-tight">
              Little Flower Alumni Community
            </h1>
            <p className="mt-2 text-sm sm:text-base text-royal-cream/80 max-w-2xl mx-auto font-sans leading-relaxed">
              50 years of distinguished alumni shaping public service, medicine, corporate leadership, sciences, arts, and cinema across the globe.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-heritage-gold hover:bg-heritage-gold-bright text-deep-navy font-sans text-xs font-bold uppercase tracking-wider shadow-md">
                <a
                  href={PORTAL_LINKS.alumniRegistrationGoogleForm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Official Google Registration Form
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
              <Button
                variant="inverse"
                size="lg"
                onClick={() => setIsFormOpen(true)}
                className="border-white/40 hover:border-white text-white font-sans text-xs font-bold uppercase tracking-wider"
              >
                Join Web Directory
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ─── 1. OFFICIAL ALUMNI NETWORK LEADERSHIP (Circular 4) ───────── */}
      <Section id="executive-board" variant="default" className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
                Governing Council
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate mt-1">
                LFJC Alumni Network Executive Board
              </h2>
              <p className="text-xs sm:text-sm text-academic-slate/70 font-sans mt-1">
                Official office bearers established during the Golden Jubilee convention (Circular 4):
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-montfortian-blue bg-royal-cream/60 px-3 py-1.5 rounded-lg border border-stone-texture/40 font-sans">
              <ShieldCheck className="w-4 h-4 text-heritage-gold-strong" />
              <span>Registered Society Committee</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {alumniExecutiveBoard.map((officer, idx) => (
              <Reveal key={officer.name} delay={idx * 0.02}>
                <div className="bg-royal-cream/20 rounded-xl border border-stone-texture/50 p-4 h-full flex flex-col justify-between hover:border-heritage-gold/50 transition-colors">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-heritage-gold/20 text-montfortian-blue border border-heritage-gold/30 font-sans inline-block mb-2">
                      {officer.role}
                    </span>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-academic-slate">
                      {officer.name}
                    </h3>
                  </div>
                  <p className="text-[11px] text-academic-slate/70 font-sans mt-2 pt-2 border-t border-stone-texture/20">
                    {officer.details}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── 2. OFFICIAL 25 CORE COMMITTEE MEMBERS (Circular 2) ───────── */}
      <Section id="core-committee" variant="default" className="bg-royal-cream/20 border-y border-stone-texture/30 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
              Alumni Representation
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate mt-1">
              Core Committee Alumni Roster (25 Members)
            </h2>
            <p className="text-xs sm:text-sm text-academic-slate/70 font-sans mt-1">
              Verified alumni spanning 1976 through 2014 batches leading institutional initiatives and mentorship (Circular 2):
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {alumniCoreCommittee.map((alum) => (
              <div
                key={`${alum.name}-${alum.batch}`}
                className="bg-white p-3 rounded-lg border border-stone-texture/40 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-bold text-heritage-gold-strong font-sans">
                      {alum.batch}
                    </span>
                    <span className="text-[9px] font-semibold bg-royal-cream px-1.5 py-0.5 rounded text-academic-slate/60 font-sans">
                      {alum.designation}
                    </span>
                  </div>
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-academic-slate leading-tight">
                    {alum.name}
                  </h4>
                </div>
                <p className="text-[11px] text-academic-slate/75 font-sans mt-2 line-clamp-1">
                  {alum.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── 3. OFFICIAL ALUMNI TESTIMONIAL ───────────────────────────── */}
      <Section id="testimonial" variant="default" className="bg-deep-navy text-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/15 p-6 sm:p-10 relative">
            <Quote className="w-10 h-10 text-heritage-gold/40 mb-4" />
            <blockquote className="font-editorial italic text-base sm:text-lg leading-relaxed text-royal-cream/95">
              &quot;{officialAlumniTestimonial.quote}&quot;
            </blockquote>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="font-serif text-lg font-bold text-heritage-gold-bright">
                  {officialAlumniTestimonial.author}
                </div>
                <div className="text-xs text-royal-cream/70 font-sans">
                  {officialAlumniTestimonial.designation}
                </div>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold font-sans">
                {officialAlumniTestimonial.batch}
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── 4. REGISTRATION & OFFICIAL CIRCULARS ─────────────────────── */}
      <Section id="circulars" variant="default" className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Membership Details */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
                Official Network Membership
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate">
                Register with LFJC Alumni Network
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-academic-slate/80 font-sans leading-relaxed">
                <p>
                  The Little Flower Junior College Alumni Network is officially registered. Membership is open to all students who completed their intermediate education at LFJC.
                </p>
                <div className="p-4 rounded-xl bg-royal-cream/30 border border-stone-texture/40 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-heritage-gold-strong shrink-0" />
                    <span className="font-semibold text-montfortian-blue">
                      Lifetime Membership Fee: ₹500
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-heritage-gold-strong shrink-0" />
                    <span>Dedicated Alumni Email: <a href={`mailto:${lfjcData.alumniEmail}`} className="underline font-medium text-montfortian-blue">{lfjcData.alumniEmail}</a></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-heritage-gold-strong shrink-0" />
                    <span>Coordinator Helpline: <a href={`tel:${lfjcData.alumniPhone.replace(/\s/g, "")}`} className="underline font-medium text-montfortian-blue">{lfjcData.alumniPhone}</a></span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button asChild size="lg" className="w-full sm:w-auto bg-montfortian-blue hover:bg-montfortian-blue/90 text-white font-sans text-xs font-bold uppercase tracking-wider">
                  <a
                    href={PORTAL_LINKS.alumniRegistrationGoogleForm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 justify-center"
                  >
                    Open Official Google Form
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Official Circulars Downloads */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
                Official Documentation
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate">
                Alumni Circulars & Bylaws
              </h2>
              <p className="text-xs sm:text-sm text-academic-slate/70 font-sans">
                Download verified official notices and rosters issued by Little Flower Junior College:
              </p>

              <div className="space-y-2.5 pt-1">
                {OFFICIAL_CIRCULARS.map((circ) => (
                  <div
                    key={circ.title}
                    className="p-3 bg-royal-cream/20 rounded-xl border border-stone-texture/40 flex items-center justify-between gap-3 hover:border-heritage-gold/60 transition-colors"
                  >
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-stone-texture/30 text-montfortian-blue font-sans inline-block mb-1">
                        {circ.type}
                      </span>
                      <h4 className="font-serif text-xs sm:text-sm font-bold text-academic-slate">
                        {circ.title}
                      </h4>
                    </div>

                    <Button asChild size="sm" variant="secondary" className="shrink-0 text-xs font-sans font-semibold">
                      <a href={circ.file} download className="inline-flex items-center gap-1.5">
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── 5. PROMINENT ALUMNI DIRECTORY ────────────────────────────── */}
      <Section id="directory" variant="default" className="bg-royal-cream/15 border-t border-stone-texture/30 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
                Hall of Fame
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate mt-1">
                Prominent Alumni Across Industries
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-white p-1 rounded-lg border border-stone-texture/50">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-md text-xs font-bold font-sans transition-colors ${
                    selectedCategory === cat
                      ? "bg-montfortian-blue text-white shadow-xs"
                      : "text-academic-slate/70 hover:text-academic-slate hover:bg-royal-cream/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredAlumni.map((alum, idx) => (
              <Reveal key={`${alum.name}-${idx}`} delay={idx * 0.02} className="h-full">
                <div className="bg-white rounded-xl border border-stone-texture/50 overflow-hidden shadow-xs h-full flex flex-col justify-between hover:border-heritage-gold/50 transition-colors">
                  <div>
                    {alum.image ? (
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-royal-cream border-b border-stone-texture/30">
                        <Image
                          src={alum.image}
                          alt={alum.name}
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          className={`object-cover ${alum.objectPosition || "object-top"}`}
                        />
                      </div>
                    ) : (
                      <div className="p-4 bg-royal-cream/30 border-b border-stone-texture/30 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-heritage-gold-strong font-sans uppercase">
                          {alum.year}
                        </span>
                        {alum.verified && (
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded font-sans">
                            Verified
                          </span>
                        )}
                      </div>
                    )}

                    <div className="p-4">
                      {alum.image && (
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[10px] font-bold text-heritage-gold-strong font-sans">
                            {alum.year}
                          </span>
                          {alum.verified && (
                            <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded font-sans">
                              Verified
                            </span>
                          )}
                        </div>
                      )}
                      <h3 className="font-serif text-base font-bold text-academic-slate">
                        {alum.name}
                      </h3>
                      <p className="text-xs font-semibold text-montfortian-blue font-sans mt-0.5">
                        {alum.designation}
                      </p>
                      <p className="text-xs text-academic-slate/70 font-sans mt-2 line-clamp-3">
                        {alum.description}
                      </p>
                    </div>
                  </div>

                  {alum.achievement && (
                    <div className="p-3 bg-royal-cream/20 border-t border-stone-texture/20 text-[10px] font-bold text-academic-slate/60 font-sans">
                      ★ {alum.achievement}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── WEB INQUIRY DRAWER ───────────────────────────────────────── */}
      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 bg-deep-navy/80 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setIsFormOpen(false)}
        >
          <div
            ref={drawerRef}
            className="bg-white rounded-2xl border border-stone-texture max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-float"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl font-bold text-academic-slate">
                Join LFJC Alumni Directory
              </h3>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 rounded-full hover:bg-royal-cream text-academic-slate/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-academic-slate">Submission Received</h4>
                <p className="text-xs text-academic-slate/75 font-sans">
                  Thank you! Your profile has been submitted for verification by the LFJC Alumni Network.
                </p>
                <Button onClick={() => setIsFormOpen(false)} size="sm">
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs font-sans">
                {submitError && (
                  <div className="p-2 bg-red-100 text-red-800 rounded text-xs font-semibold">
                    {submitError}
                  </div>
                )}

                <div>
                  <label htmlFor={`${fid}-name`} className="block font-bold text-academic-slate mb-1">Full Name *</label>
                  <input
                    id={`${fid}-name`}
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full p-2 rounded border border-stone-texture/60 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor={`${fid}-email`} className="block font-bold text-academic-slate mb-1">Email *</label>
                    <input
                      id={`${fid}-email`}
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full p-2 rounded border border-stone-texture/60 text-xs"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${fid}-phone`} className="block font-bold text-academic-slate mb-1">Phone *</label>
                    <input
                      id={`${fid}-phone`}
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full p-2 rounded border border-stone-texture/60 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label htmlFor={`${fid}-batch-from`} className="block font-bold text-academic-slate mb-1">From Year *</label>
                    <input
                      id={`${fid}-batch-from`}
                      type="text"
                      placeholder="e.g. 1998"
                      required
                      value={formBatchFrom}
                      onChange={(e) => setFormBatchFrom(e.target.value)}
                      className="w-full p-2 rounded border border-stone-texture/60 text-xs"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${fid}-batch-to`} className="block font-bold text-academic-slate mb-1">To Year *</label>
                    <input
                      id={`${fid}-batch-to`}
                      type="text"
                      placeholder="e.g. 2000"
                      required
                      value={formBatchTo}
                      onChange={(e) => setFormBatchTo(e.target.value)}
                      className="w-full p-2 rounded border border-stone-texture/60 text-xs"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${fid}-stream`} className="block font-bold text-academic-slate mb-1">Stream</label>
                    <select
                      id={`${fid}-stream`}
                      value={formStream}
                      onChange={(e) => setFormStream(e.target.value)}
                      className="w-full p-2 rounded border border-stone-texture/60 text-xs"
                    >
                      <option value="MPC">MPC</option>
                      <option value="BiPC">BiPC</option>
                      <option value="MEC">MEC</option>
                      <option value="CEC">CEC</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor={`${fid}-category`} className="block font-bold text-academic-slate mb-1">Category</label>
                  <select
                    id={`${fid}-category`}
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full p-2 rounded border border-stone-texture/60 text-xs"
                  >
                    <option value="Entrepreneurs & Leaders">Entrepreneurs & Leaders</option>
                    <option value="Civil Servants & Judiciary">Civil Servants & Judiciary</option>
                    <option value="Actors & Filmmakers">Actors & Filmmakers</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor={`${fid}-position`} className="block font-bold text-academic-slate mb-1">Current Role</label>
                    <input
                      id={`${fid}-position`}
                      type="text"
                      placeholder="e.g. Director"
                      value={formPosition}
                      onChange={(e) => setFormPosition(e.target.value)}
                      className="w-full p-2 rounded border border-stone-texture/60 text-xs"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${fid}-company`} className="block font-bold text-academic-slate mb-1">Company / Organization</label>
                    <input
                      id={`${fid}-company`}
                      type="text"
                      placeholder="e.g. Google"
                      value={formCompany}
                      onChange={(e) => setFormCompany(e.target.value)}
                      className="w-full p-2 rounded border border-stone-texture/60 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={`${fid}-achievements`} className="block font-bold text-academic-slate mb-1">Key Achievement / Award</label>
                  <input
                    id={`${fid}-achievements`}
                    type="text"
                    placeholder="e.g. Gold Medalist, Vice President"
                    value={formAchievements}
                    onChange={(e) => setFormAchievements(e.target.value)}
                    className="w-full p-2 rounded border border-stone-texture/60 text-xs"
                  />
                </div>

                <div>
                  <label htmlFor={`${fid}-bio`} className="block font-bold text-academic-slate mb-1">Short Bio</label>
                  <textarea
                    id={`${fid}-bio`}
                    rows={2}
                    value={formBio}
                    onChange={(e) => setFormBio(e.target.value)}
                    className="w-full p-2 rounded border border-stone-texture/60 text-xs"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id={`${fid}-consent`}
                    checked={formConsent}
                    onChange={(e) => setFormConsent(e.target.checked)}
                    className="rounded border-stone-texture"
                  />
                  <label htmlFor={`${fid}-consent`} className="text-[11px] text-academic-slate/75">
                    I consent to having my details verified and included in the LFJC Alumni directory.
                  </label>
                </div>

                <div className="pt-2">
                  <Button type="submit" disabled={submitting} className="w-full font-bold text-xs uppercase tracking-wider">
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Details"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
