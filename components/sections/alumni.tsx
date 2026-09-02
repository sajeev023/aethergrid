"use client";

import React, { useState, useEffect, useCallback, useId, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Award, Users, X, Loader2, CheckCircle2 } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { alumniData as seedAlumniData, Alumnus } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { AlumniSubmission } from "@/lib/admin/types";
import { useFocusTrap } from "@/lib/use-focus-trap";

interface AlumniProps {
  children?: never;
}

export function Alumni({}: AlumniProps = {}) {
  const fid = useId();
  const drawerRef = useRef<HTMLDivElement>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  useFocusTrap(isFormOpen, drawerRef);
  const [dynamicAlumni, setDynamicAlumni] = useState<Alumnus[]>([]);
  const [loadingDynamic, setLoadingDynamic] = useState(true);
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

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
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
            category: s.category || "Entrepreneurs & Leaders",
            description: s.bio,
            designation: `${s.position} at ${s.company}`,
            achievement: s.achievements,
            year: `Batch of ${s.batchFrom}-${s.batchTo} (${s.stream})`,
            image: s.photoUrl || "",
          }));
          setDynamicAlumni(mapped);
        }
      }
    } catch (err) {
      console.error("Failed to load approved alumni submissions", err);
    } finally {
      setLoadingDynamic(false);
    }
  }, []);

  useEffect(() => {
    loadApprovedDynamicAlumni();
  }, [loadApprovedDynamicAlumni]);

  useEffect(() => {
    if (!isFormOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && !submitting) {
        setIsFormOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isFormOpen, submitting]);

  const combinedAlumni = [...seedAlumniData, ...dynamicAlumni];
  const categories = ["All", ...Array.from(new Set(combinedAlumni.map((a) => a.category)))];
  const filteredAlumni = selectedCategory === "All"
    ? combinedAlumni
    : combinedAlumni.filter((a) => a.category === selectedCategory);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormName("");
    setFormEmail("");
    setFormPhone("");
    setFormBatchFrom("");
    setFormBatchTo("");
    setFormStream("MPC");
    setFormCategory("Entrepreneurs & Leaders");
    setFormPosition("");
    setFormCompany("");
    setFormAchievements("");
    setFormBio("");
    setFormConsent(false);
    setPhotoFile(null);
    setPhotoPreview(null);
    setSubmitSuccess(false);
    setSubmitError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);

    if (!photoFile) {
      setSubmitError("Profile photo is required.");
      setSubmitting(false);
      return;
    }
    if (!formConsent) {
      setSubmitError("You must consent to publishing your profile details.");
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", formName);
    formData.append("email", formEmail);
    formData.append("phone", formPhone);
    formData.append("batchFrom", formBatchFrom);
    formData.append("batchTo", formBatchTo);
    formData.append("stream", formStream);
    formData.append("category", formCategory);
    formData.append("position", formPosition);
    formData.append("company", formCompany);
    formData.append("achievements", formAchievements);
    formData.append("bio", formBio);
    formData.append("consent", String(formConsent));
    formData.append("photo", photoFile);

    try {
      const res = await fetch("/api/alumni/submit", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        setSubmitSuccess(true);
      } else {
        setSubmitError(data.message || "Failed to submit application.");
      }
    } catch {
      setSubmitError("A connection error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="alumni" className="bg-white">
      <Section variant="default" className="bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-academic-slate">
              Alumni
            </h1>
          </Reveal>
        </div>
      </Section>
      <Section variant="dense" className="bg-royal-cream/25 border-y border-stone-texture/30">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-academic-slate">Are you an LFJC alumnus?</h2>
            <p className="text-xs sm:text-sm text-academic-slate/70 font-sans">Submit your profile to join the official alumni directory.</p>
          </div>
          <Button onClick={() => { resetForm(); setIsFormOpen(true); }} size="sm">
            <Users className="h-4 w-4 mr-1" />
            Join the Registry
          </Button>
        </div>
      </Section>
      <Section variant="default" className="bg-white">
        <h2 className="font-serif text-lg sm:text-xl font-bold text-academic-slate">Distinguished Alumni</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider font-sans transition-colors",
                selectedCategory === cat
                  ? "border-montfortian-blue bg-montfortian-blue text-white"
                  : "border-stone-texture/70 bg-white text-academic-slate/75 hover:border-montfortian-blue hover:text-montfortian-blue"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-5 sm:mt-6">
          {loadingDynamic ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 text-montfortian-blue animate-spin" />
            </div>
          ) : filteredAlumni.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3">
              {filteredAlumni.map((alumnus, index) => (
                <Reveal key={alumnus.name} delay={(index % 5) * 0.04}>
                  <div className="group flex flex-col overflow-hidden rounded-lg border border-stone-texture/60 bg-white hover:border-heritage-gold/50 transition-all">
                    {alumnus.image ? (
                      <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-container-low border-b border-stone-texture/40">
                        <Image
                          src={alumnus.image}
                          alt={alumnus.name}
                          fill
                          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
                          className={cn("object-cover", alumnus.objectPosition || "object-[center_15%]")}
                        />
                        <div className="absolute top-2 left-2">
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-white/95 border border-stone-texture/30 text-montfortian-blue uppercase tracking-wider font-sans">
                            {alumnus.category}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-2">
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded border border-stone-texture/30 text-montfortian-blue uppercase tracking-wider bg-royal-cream/30 font-sans">
                          {alumnus.category}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 flex flex-col justify-between p-2.5 sm:p-3">
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
                        <Award className="h-3.5 w-3.5 shrink-0" />
                        <span className="line-clamp-1">{alumnus.year.replace(/^Batch of\s+/i, "")}</span>
                      </div>
                      <h3 className="font-serif text-sm font-bold text-academic-slate line-clamp-1">{alumnus.name}</h3>
                      <p className="text-[11px] text-academic-slate/70 font-sans line-clamp-1">{alumnus.designation}</p>
                      <p className="mt-1.5 text-[10px] font-bold text-heritage-gold-strong font-sans line-clamp-2">{alumnus.achievement.replace(/https?:\/\/[^\s]+/, "").trim() || "Distinguished Achiever"}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-academic-slate/70 font-sans">
              <p className="text-sm">No alumni found in this category.</p>
            </div>
          )}
        </div>
      </Section>
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end" role="dialog" aria-modal="true" aria-label="Alumni registry application form">
          <div className="fixed inset-0 bg-deep-navy/40 backdrop-blur-sm" onClick={() => { if (!submitting) setIsFormOpen(false); }} />
          <div ref={drawerRef} className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col z-10">
            <div className="px-4 py-3 border-b border-stone-texture/40 flex items-center justify-between bg-royal-cream/35">
              <h2 className="font-serif text-base sm:text-lg font-bold text-academic-slate">Alumni Registry Application</h2>
              <button type="button" onClick={() => { if (!submitting) setIsFormOpen(false); }} className="p-1">
                <X className="h-5 w-5 text-academic-slate" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {submitSuccess ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-bold text-academic-slate">Application Submitted</h3>
                  <p className="mt-2 text-sm text-academic-slate/70 font-sans">We will review and publish your profile after verification.</p>
                  <Button onClick={() => setIsFormOpen(false)} className="mt-6">Close</Button>
                </div>
              ) : (
                <form id={`${fid}-alumni-form`} onSubmit={handleSubmit} className="space-y-4">
                  {submitError && <p className="text-sm text-red-600 font-sans">{submitError}</p>}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor={`${fid}-name`} className="text-xs font-bold text-academic-slate font-sans">Full Name *</label>
                      <input id={`${fid}-name`} required value={formName} onChange={(e) => setFormName(e.target.value)} className="mt-1 w-full rounded-md border border-stone-texture/60 px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label htmlFor={`${fid}-email`} className="text-xs font-bold text-academic-slate font-sans">Email *</label>
                      <input id={`${fid}-email`} type="email" required value={formEmail} onChange={(e) => setFormEmail(e.target.value)} className="mt-1 w-full rounded-md border border-stone-texture/60 px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label htmlFor={`${fid}-phone`} className="text-xs font-bold text-academic-slate font-sans">Phone *</label>
                      <input id={`${fid}-phone`} required value={formPhone} onChange={(e) => setFormPhone(e.target.value)} className="mt-1 w-full rounded-md border border-stone-texture/60 px-3 py-2 text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor={`${fid}-from`} className="text-xs font-bold text-academic-slate font-sans">Batch From</label>
                        <input id={`${fid}-from`} value={formBatchFrom} onChange={(e) => setFormBatchFrom(e.target.value)} className="mt-1 w-full rounded-md border border-stone-texture/60 px-3 py-2 text-sm" />
                      </div>
                      <div>
                        <label htmlFor={`${fid}-to`} className="text-xs font-bold text-academic-slate font-sans">Batch To</label>
                        <input id={`${fid}-to`} value={formBatchTo} onChange={(e) => setFormBatchTo(e.target.value)} className="mt-1 w-full rounded-md border border-stone-texture/60 px-3 py-2 text-sm" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor={`${fid}-stream`} className="text-xs font-bold text-academic-slate font-sans">Stream</label>
                      <select id={`${fid}-stream`} value={formStream} onChange={(e) => setFormStream(e.target.value)} className="mt-1 w-full rounded-md border border-stone-texture/60 px-3 py-2 text-sm">
                        {["MPC", "BiPC", "MEC", "CEC"].map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor={`${fid}-category`} className="text-xs font-bold text-academic-slate font-sans">Category</label>
                      <select id={`${fid}-category`} value={formCategory} onChange={(e) => setFormCategory(e.target.value)} className="mt-1 w-full rounded-md border border-stone-texture/60 px-3 py-2 text-sm">
                        {["Actors & Filmmakers", "Civil Servants & Judiciary", "Singers & Artists", "Entrepreneurs & Leaders"].map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor={`${fid}-position`} className="text-xs font-bold text-academic-slate font-sans">Position</label>
                      <input id={`${fid}-position`} value={formPosition} onChange={(e) => setFormPosition(e.target.value)} className="mt-1 w-full rounded-md border border-stone-texture/60 px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label htmlFor={`${fid}-company`} className="text-xs font-bold text-academic-slate font-sans">Company / Organisation</label>
                      <input id={`${fid}-company`} value={formCompany} onChange={(e) => setFormCompany(e.target.value)} className="mt-1 w-full rounded-md border border-stone-texture/60 px-3 py-2 text-sm" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${fid}-achievements`} className="text-xs font-bold text-academic-slate font-sans">Achievement</label>
                    <input id={`${fid}-achievements`} value={formAchievements} onChange={(e) => setFormAchievements(e.target.value)} className="mt-1 w-full rounded-md border border-stone-texture/60 px-3 py-2 text-sm" />
                  </div>

                  <div>
                    <label htmlFor={`${fid}-bio`} className="text-xs font-bold text-academic-slate font-sans">Short Bio</label>
                    <textarea id={`${fid}-bio`} value={formBio} onChange={(e) => setFormBio(e.target.value)} rows={3} className="mt-1 w-full rounded-md border border-stone-texture/60 px-3 py-2 text-sm" />
                  </div>

                  <div>
                    <label htmlFor={`${fid}-photo`} className="text-xs font-bold text-academic-slate font-sans">Photo *</label>
                    <input id={`${fid}-photo`} type="file" accept="image/*" onChange={handlePhotoChange} className="mt-1 w-full text-sm" />
                    {photoPreview && (
                      <div className="relative mt-2 aspect-[3/4] w-24 overflow-hidden rounded-md border border-stone-texture/60">
                        <Image src={photoPreview} alt="Preview" fill className="object-cover" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-start gap-2">
                    <input id={`${fid}-consent`} type="checkbox" checked={formConsent} onChange={(e) => setFormConsent(e.target.checked)} className="mt-1" />
                    <label htmlFor={`${fid}-consent`} className="text-xs text-academic-slate/80 font-sans">I consent to publishing my profile details in the LFJC alumni directory.</label>
                  </div>

                  <Button type="submit" disabled={submitting} className="w-full">
                    {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Submit Application
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
