"use client";

import React, { useState, useEffect, useCallback, useId, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  ExternalLink,
  Award,
  Users,
  ArrowRight,
  Globe,
  Building2,
  Sparkles,
  X,
  Upload,
  Loader2,
  CheckCircle2,
  Briefcase,
  ShieldCheck,
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PORTAL_LINKS, alumniData as seedAlumniData, Alumnus } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { AlumniSubmission } from "@/lib/admin/types";
import { useFocusTrap } from "@/lib/use-focus-trap";

interface AlumniProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
  headingLevel?: "h1" | "h2";
}



// Curated list of featured alumni success stories to display in the top banner
const featuredAlumni = [
  {
    name: "Vijay Deverakonda",
    title: "National Film Sensation",
    role: "Actor & Film Producer",
    batch: "Batch of 2007 (MPC)",
    category: "Actors & Filmmakers",
    bio: "Renowned Indian actor who studied intermediate MPC at LFJC. Rose to absolute national stardom, launching the apparel brand 'Rowdy' and establishing a global youth following.",
    image: "/images/alumni/vijay-deverakonda.jpg",
    achievement: "Filmfare Best Actor Award & Forbes 30 Under 30",
    objectPosition: "object-[center_10%]"
  },
  {
    name: "Akkineni Nagarjuna",
    title: "Cinematic Legend & Entrepreneur",
    role: "Superstar & Television Presenter",
    batch: "Batch of 1976",
    category: "Actors & Filmmakers",
    bio: "A titan of Telugu cinema and business, Nagarjuna completed his intermediate study at LFJC. Beyond acting in 100+ films, he manages Annapurna Studios and multiple hospitality ventures.",
    image: "/images/alumni/akkineni-nagarjuna.jpg",
    achievement: "Winner of 9 Nandi Awards & 3 National Film Awards",
    objectPosition: "object-[center_10%]"
  },
  {
    name: "Shashanka K, IAS",
    title: "Distinguished Civil Service Officer",
    role: "District Collector & Magistrate",
    batch: "Batch of 2005",
    category: "Civil Servants & Judiciary",
    bio: "Completed his intermediate study at LFJC before cracking the Civil Services. Served as District Collector in multiple key regions, spearheading rural development, healthcare, and water security initiatives.",
    image: "/images/alumni/shashanka-k.jpg",
    achievement: "Eminent Administrative Officer & Public Policy Reformer",
    objectPosition: "object-[center_12%]"
  },
  {
    name: "Nandamuri Balakrishna",
    title: "Cinema Icon & Public Leader",
    role: "Actor & Legislator",
    batch: "Batch of 1978",
    category: "Actors & Filmmakers",
    bio: "Legendary Telugu cinema actor with over 100 films, celebrated for his larger-than-life performances. Also serves as a Member of the Legislative Assembly, blending cinematic stardom with public service.",
    image: "/images/alumni/nandamuri-balakrishna.jpg",
    achievement: "MLA & Multiple Filmfare Award Winner",
    objectPosition: "object-[center_12%]"
  },
  {
    name: "Geetha Madhuri",
    title: "Celebrated Playback Vocalist",
    role: "Playback Singer & Dubbing Artist",
    batch: "Batch of 2006",
    category: "Singers & Artists",
    bio: "Leading playback singer who has recorded over 500 songs across Telugu, Tamil, Kannada, and Malayalam cinema, establishing herself as one of Tollywood's most sought-after voices.",
    image: "/images/alumni/geetha-madhuri.jpg",
    achievement: "Nandi Award & Filmfare Award South Recipient",
    objectPosition: "object-[center_12%]"
  }
];

export function Alumni({ activeInst, headingLevel = "h2" }: AlumniProps) {
  const pathname = usePathname() || "";

  // Stable id prefix for programmatic label/input association in the application form.
  const fid = useId();
  const drawerRef = useRef<HTMLDivElement>(null);

  // State for categories and form opening

  const [isFormOpen, setIsFormOpen] = useState(false);
  useFocusTrap(isFormOpen, drawerRef);
  const [dynamicAlumni, setDynamicAlumni] = useState<Alumnus[]>([]);
  const [loadingDynamic, setLoadingDynamic] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Form submission states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formBatchFrom, setFormBatchFrom] = useState("");
  const [formBatchTo, setFormBatchTo] = useState("");
  const [formStream, setFormStream] = useState("MPC");
  const [formCategory, setFormCategory] = useState("Entrepreneurs & Leaders");
  const [formPosition, setFormPosition] = useState("");
  const [formCompany, setFormCompany] = useState("");
  const [formIndustry, setFormIndustry] = useState("");
  const [formQualification, setFormQualification] = useState("");
  const [formAchievements, setFormAchievements] = useState("");
  const [formBio, setFormBio] = useState("");
  const [formLinkedin, setFormLinkedin] = useState("");
  const [formCity, setFormCity] = useState("");
  const [formCountry, setFormCountry] = useState("");
  const [formStudentId, setFormStudentId] = useState("");
  const [formVerification, setFormVerification] = useState("");
  const [formConsent, setFormConsent] = useState(false);

  // Files state
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [supportFiles, setSupportFiles] = useState<File[]>([]);
  
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Determine if we are rendering the full directory page or a landing page preview section
  const isFullPage = pathname === "/alumni" || !activeInst;

  // Fetch approved dynamic submissions
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
            image: s.photoUrl || ""
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
    if (isFullPage) {
      loadApprovedDynamicAlumni();
    } else {
      setLoadingDynamic(false);
    }
  }, [isFullPage, loadApprovedDynamicAlumni]);

  // Close the application modal on Escape and lock background scroll while open
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

  // Combine seed database with dynamic approved entries.
  // Exclude the featured alumni so no profile appears twice on the page.
  const featuredNames = new Set(featuredAlumni.map((f) => f.name));
  const combinedAlumni = [...seedAlumniData, ...dynamicAlumni].filter(
    (alumnus) => !featuredNames.has(alumnus.name)
  );

  // Sort combinedAlumni so that those with images appear first, preserving original order for matching elements
  const sortedCombinedAlumni = [...combinedAlumni].sort((a, b) => {
    const hasA = !!a.image;
    const hasB = !!b.image;
    if (hasA && !hasB) return -1;
    if (!hasA && hasB) return 1;
    return 0;
  });

  // Display criteria — all alumni on full page (optionally filtered by
  // category), first 4 on homepage preview (unfiltered).
  const categories = [
    "All",
    ...Array.from(new Set(combinedAlumni.map((a) => a.category))),
  ];
  const categorizedAlumni =
    selectedCategory === "All"
      ? sortedCombinedAlumni
      : sortedCombinedAlumni.filter((a) => a.category === selectedCategory);
  const displayedAlumni = isFullPage
    ? categorizedAlumni
    : sortedCombinedAlumni.slice(0, 4);

  const alumniWithImages = displayedAlumni.filter((alumnus) => !!alumnus.image);
  const alumniWithoutImages = displayedAlumni.filter((alumnus) => !alumnus.image);

  // Handle profile photo selection
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle supporting images selection
  const handleSupportFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files);
      setSupportFiles((prev) => [...prev, ...fileList].slice(0, 3)); // Max 3 files
    }
  };

  // Reset form states
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
    setFormIndustry("");
    setFormQualification("");
    setFormAchievements("");
    setFormBio("");
    setFormLinkedin("");
    setFormCity("");
    setFormCountry("");
    setFormStudentId("");
    setFormVerification("");
    setFormConsent(false);
    setPhotoFile(null);
    setPhotoPreview(null);
    setSupportFiles([]);
    setSubmitSuccess(false);
    setSubmitError("");
  };

  // Handle form submission
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
    formData.append("industry", formIndustry);
    formData.append("qualification", formQualification);
    formData.append("achievements", formAchievements);
    formData.append("bio", formBio);
    formData.append("linkedin", formLinkedin);
    formData.append("city", formCity);
    formData.append("country", formCountry);
    formData.append("studentId", formStudentId);
    formData.append("verificationDetails", formVerification);
    formData.append("consent", String(formConsent));
    formData.append("photo", photoFile);
    
    supportFiles.forEach((file) => {
      formData.append("supportingImages", file);
    });

    try {
      // Primary pipeline: multi-part alumni submission
      const res = await fetch("/api/alumni/submit", {
        method: "POST",
        body: formData,
      });

      // Also record in general inquiries pipeline for counselor dashboard tracking
      try {
        await fetch("/api/inquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "alumni",
            name: formName,
            email: formEmail,
            phone: formPhone,
            stream: formStream,
            message: `Alumni Profile Submission: ${formPosition} at ${formCompany}. Batch: ${formBatchFrom}-${formBatchTo}. Bio: ${formBio.substring(0, 300)}`,
            activeInst: activeInst || "lfjc",
          }),
        });
      } catch (inqErr) {
        console.warn("Inquiries notification sync skipped:", inqErr);
      }

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
      {/* ─── PAGE HERO (Exact requested hero design & typography) ─────── */}
      <Section variant="default" className="bg-gradient-to-b from-deep-navy to-montfortian-blue text-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl text-center px-4 sm:px-6">
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
                className="border-white/40 hover:border-white text-white font-sans text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Join Web Directory
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      
                <section className={cn(
        "bg-white border-b border-stone-texture/50",
        isFullPage ? "pb-6 pt-6 sm:pb-8 sm:pt-8 md:pb-12 md:pt-12" : "py-6 sm:py-8 md:py-12"
      )}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        {/* Section Heading */}
        <Reveal>
          <div className="mb-4 sm:mb-6">
            {isFullPage ? (
              <SectionHeading
                as={headingLevel}
                eyebrow="Official Registry • 1974–2024"
                title="Official Alumni Registry"
                description="Little Flower Junior College has nurtured over 15,000 graduates across five decades. Our alumni lead and excel globally in civil administration, national cinema, science, judiciary, and enterprise."
              />
            ) : (
              <SectionHeading
                eyebrow="Montfortian Legacy"
                title="Official Alumni Registry"
                description="Our graduates carry forward the values of academic rigor and moral discipline, achieving distinguished careers in government, cinema, classical arts, and business."
              />
            )}
          </div>
        </Reveal>

        {/* Official Registry Verification Trust Notice */}
        <Reveal delay={0.01}>
          <div className="mb-4 sm:mb-6 rounded-lg border border-heritage-gold/50 bg-royal-cream/35 p-3.5 sm:p-4 text-xs sm:text-sm text-academic-slate/85 font-sans flex items-start gap-3 shadow-2xs">
            <ShieldCheck className="h-5 w-5 text-heritage-gold-strong shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-academic-slate">Official Institutional Alumni Registry</p>
              <p className="text-xs text-academic-slate/75 mt-0.5">
                All featured alumni profiles and batch records are authenticated against college enrollment records. <strong>Alumni records held at the college office — verify in person.</strong>
              </p>
            </div>
          </div>
        </Reveal>

        {isFullPage && (
          <Reveal delay={0.02}>
            <div id="register" className="mb-4 sm:mb-6 bg-royal-cream/35 border border-stone-texture p-3.5 sm:p-5 md:p-6 rounded-xl shadow-xs relative overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4 scroll-mt-28">
              <div className="absolute top-0 right-0 w-48 h-48 bg-heritage-gold/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-montfortian-blue/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-1 max-w-2xl text-left">
                <h2 className="font-serif text-base sm:text-lg md:text-xl font-bold text-academic-slate">
                  Join Our Distinguished Alumni Network
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed text-academic-slate/75 font-sans">
                  Are you a Little Flower Junior College alumnus? Submit your profile to be reviewed and published in our official alumni registry.
                </p>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                <Button onClick={() => setIsFormOpen(true)} size="sm" className="shadow-md cursor-pointer text-xs font-bold uppercase tracking-wider h-9 sm:h-10 px-4 sm:px-5">
                  Apply to Feature Your Story
                </Button>
              </div>
            </div>
          </Reveal>
        )}

        {/* Statistics Banner (Only shown on full directory page) */}
        {isFullPage && (
          <Reveal delay={0.05}>
            <div id="network" className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-4 sm:mb-6 border-t border-b border-stone-texture/45 py-3 sm:py-4 bg-royal-cream/15 rounded-lg px-3 sm:px-6 scroll-mt-28">
              <div className="text-center md:border-r border-stone-texture/40">
                <span className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-montfortian-blue block mb-0.5 sm:mb-1">15,000+</span>
                <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-academic-slate/70 flex items-center justify-center gap-1 sm:gap-1.5">
                  <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-heritage-gold-strong" /> Global Network
                </span>
              </div>
              <div className="text-center md:border-r border-stone-texture/40">
                <span className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-montfortian-blue block mb-0.5 sm:mb-1">18+</span>
                <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-academic-slate/70 flex items-center justify-center gap-1 sm:gap-1.5">
                  <Globe className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-heritage-gold-strong" /> Countries
                </span>
              </div>
              <div className="text-center md:border-r border-stone-texture/40">
                <span className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-montfortian-blue block mb-0.5 sm:mb-1">12+</span>
                <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-academic-slate/70 flex items-center justify-center gap-1 sm:gap-1.5">
                  <Building2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-heritage-gold-strong" /> Sectors
                </span>
              </div>
              <div className="text-center">
                <span className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-montfortian-blue block mb-0.5 sm:mb-1">50+</span>
                <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-academic-slate/70 flex items-center justify-center gap-1 sm:gap-1.5">
                  <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-heritage-gold-strong" /> Board Medals
                </span>
              </div>
            </div>
          </Reveal>
        )}

        {/* Featured Success Stories Section (Only shown on full page) */}
        {isFullPage && (
          <div id="success-stories" className="mb-4 sm:mb-6 scroll-mt-28">
            <Reveal>
              <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                <span className="w-1.5 h-5 sm:h-6 bg-heritage-gold rounded-full" />
                <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-academic-slate">
                  Featured Alumni Success Stories
                </h2>
              </div>
            </Reveal>

            <div className="grid gap-2.5 sm:gap-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-start">
              {featuredAlumni.map((featured, idx) => (
                <Reveal key={featured.name} delay={idx * 0.06} className="h-full">
                  <Card className="group flex flex-col overflow-hidden border-2 border-heritage-gold/25 bg-royal-cream/10 rounded-lg hover:border-heritage-gold/75 hover:shadow-lg transition-all duration-300 h-auto">
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-container-low">
                      <Image
                        src={featured.image}
                        alt={featured.name}
                        fill
                        sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 22vw, (min-width: 768px) 30vw, (min-width: 640px) 45vw, 50vw"
                        className={cn(
                          "object-cover group-hover:scale-[1.03] transition-transform duration-500",
                          featured.objectPosition || "object-[center_15%]"
                        )}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/55 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                        <span className="inline-block font-sans text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded bg-white/95 backdrop-blur-sm border border-stone-texture/30 text-montfortian-blue uppercase tracking-wider shadow-xs">
                          {featured.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between bg-white">
                      <div>
                        <div className="flex items-center text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-heritage-gold-strong mb-0.5 sm:mb-1">
                          <span className="inline-flex items-center gap-1">
                            <GraduationCap className="h-3.5 w-3.5 shrink-0" />
                            {featured.batch.replace(/^Batch of\s+/i, "Batch: ")}
                          </span>
                        </div>
                        <h3 className="font-serif text-xs sm:text-base font-bold text-academic-slate mb-0.5 sm:mb-1 line-clamp-1">
                          {featured.name}
                        </h3>
                        <p className="text-[11px] sm:text-xs font-medium text-academic-slate/75 font-sans mb-1.5 sm:mb-2.5 line-clamp-1">
                          {featured.role}
                        </p>
                        <div className="flex items-start gap-1 sm:gap-1.5 bg-royal-cream/45 border border-stone-texture/30 p-1.5 sm:p-2 rounded-sm">
                          <Award className="h-3.5 w-3.5 text-heritage-gold-strong shrink-0 mt-0.5" />
                          <span className="text-[10px] sm:text-[11px] font-bold text-heritage-gold-strong leading-normal font-sans line-clamp-1">
                            {featured.title}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Category filter — full directory page only */}
        {isFullPage && (
          <div className="mb-5 sm:mb-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-bold uppercase tracking-wider font-sans transition-all duration-300 min-h-[38px] cursor-pointer",
                    active
                      ? "border-montfortian-blue bg-montfortian-blue text-white shadow-xs"
                      : "border-stone-texture/70 bg-white text-academic-slate/75 hover:border-montfortian-blue hover:text-montfortian-blue",
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Alumni Cards Grid */}
        {loadingDynamic ? (
          <div className="flex items-center justify-center py-8 sm:py-10">
            <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 text-montfortian-blue animate-spin" />
            <span className="ml-2 text-xs text-academic-slate/70 font-sans">Loading alumni database...</span>
          </div>
        ) : displayedAlumni.length > 0 ? (
          <>
            {isFullPage ? (
              <div className="space-y-6 sm:space-y-10">
                {/* Section 1 — Alumni with Profile Images */}
                {alumniWithImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3 items-start">
                    {alumniWithImages.map((alumnus, index) => (
                      <Reveal key={alumnus.name} delay={index % 5 * 0.04}>
                        <Card className="group flex flex-col overflow-hidden border border-stone-texture/70 bg-white hover:border-heritage-gold/55 hover:shadow-[0_15px_30px_rgba(15,76,129,0.08)] hover:shadow-panel-hover transition-all duration-300 rounded-lg h-full">
                          <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-container-low border-b border-stone-texture/40">
                            <Image
                              src={alumnus.image}
                              alt={alumnus.name}
                              fill
                              sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 22vw, (min-width: 768px) 30vw, (min-width: 640px) 45vw, 50vw"
                              className={cn(
                                "object-cover group-hover:scale-105 transition-transform duration-500",
                                alumnus.objectPosition || "object-[center_15%]"
                              )}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/35 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                              <span className="inline-block font-sans text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded bg-white/95 backdrop-blur-sm border border-stone-texture/30 text-montfortian-blue uppercase tracking-wider shadow-xs">
                                {alumnus.category}
                              </span>
                            </div>
                          </div>
                          <CardContent className="flex-1 flex flex-col justify-between p-2.5 sm:p-3 bg-white">
                            <div>
                              <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-heritage-gold-strong mb-0.5 sm:mb-1">
                                <GraduationCap className="h-3.5 w-3.5 shrink-0" />
                                <span>{alumnus.year.replace(/^Batch of\s+/i, "Batch: ")}</span>
                              </div>
                              <h3 className="font-serif text-xs sm:text-base font-bold leading-tight text-academic-slate group-hover:text-montfortian-blue transition-colors duration-300 line-clamp-1">
                                {alumnus.name}
                              </h3>
                              <p className="text-[11px] sm:text-xs font-medium text-academic-slate/75 font-sans mt-0.5 sm:mt-1 line-clamp-1">
                                {alumnus.designation}
                              </p>
                              <div className="mt-1.5 sm:mt-2 flex items-start gap-1 sm:gap-1.5 bg-royal-cream/45 border border-stone-texture/30 p-1.5 sm:p-2 rounded-sm">
                                <Award className="h-3.5 w-3.5 text-heritage-gold-strong shrink-0 mt-0.5" />
                                <p className="text-[10px] sm:text-[11px] font-bold font-sans text-heritage-gold-strong leading-normal line-clamp-1">
                                  {alumnus.achievement.replace(/https?:\/\/[^\s]+/, "").trim() || "Distinguished Achiever"}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Reveal>
                    ))}
                  </div>
                )}

                {/* Section 2 — Alumni without Profile Images */}
                {alumniWithoutImages.length > 0 && (
                  <div className="space-y-4 sm:space-y-6">
                    <Reveal>
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="w-1.5 h-5 sm:h-6 bg-heritage-gold rounded-full" />
                        <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold text-academic-slate">
                          Other Distinguished Alumni
                        </h3>
                      </div>
                    </Reveal>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3 items-start">
                      {alumniWithoutImages.map((alumnus, index) => (
                        <Reveal key={alumnus.name} delay={index % 5 * 0.04}>
                          <Card className="group flex flex-col overflow-hidden border border-stone-texture/70 bg-white hover:border-heritage-gold/55 hover:shadow-[0_15px_30px_rgba(15,76,129,0.08)] hover:shadow-panel-hover transition-all duration-300 rounded-lg h-full min-h-[110px] sm:min-h-[120px]">
                            <CardContent className="flex-1 flex flex-col justify-between p-2.5 sm:p-3 bg-white">
                              <div className="mb-1.5 sm:mb-2">
                                <span className="inline-block font-sans text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded border border-stone-texture/30 text-montfortian-blue uppercase tracking-wider bg-royal-cream/30">
                                  {alumnus.category}
                                </span>
                              </div>
                              <div>
                                <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-heritage-gold-strong mb-0.5 sm:mb-1">
                                  <GraduationCap className="h-3.5 w-3.5 shrink-0" />
                                  <span>{alumnus.year.replace(/^Batch of\s+/i, "Batch: ")}</span>
                                </div>
                                <h3 className="font-serif text-xs sm:text-base font-bold leading-tight text-academic-slate group-hover:text-montfortian-blue transition-colors duration-300 line-clamp-1">
                                  {alumnus.name}
                                </h3>
                                <p className="text-[11px] sm:text-xs font-medium text-academic-slate/75 font-sans mt-0.5 sm:mt-1 line-clamp-1">
                                  {alumnus.designation}
                                </p>
                                <div className="mt-1.5 sm:mt-2 flex items-start gap-1 sm:gap-1.5 bg-royal-cream/45 border border-stone-texture/30 p-1.5 sm:p-2 rounded-sm">
                                  <Award className="h-3.5 w-3.5 text-heritage-gold-strong shrink-0 mt-0.5" />
                                  <p className="text-[10px] sm:text-[11px] font-bold font-sans text-heritage-gold-strong leading-normal line-clamp-1">
                                    {alumnus.achievement.replace(/https?:\/\/[^\s]+/, "").trim() || "Distinguished Achiever"}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Homepage Quick Preview (render 2-column on mobile, sorted with images first) */
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3 items-start">
                {displayedAlumni.map((alumnus, index) => {
                  const hasImage = !!alumnus.image;
                  return (
                    <Reveal key={alumnus.name} delay={index % 5 * 0.04}>
                      <Card className="group flex flex-col overflow-hidden border border-stone-texture/70 bg-white hover:border-heritage-gold/55 hover:shadow-[0_15px_30px_rgba(15,76,129,0.08)] hover:shadow-panel-hover transition-all duration-300 rounded-lg h-full">
                        {hasImage && (
                          <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-container-low border-b border-stone-texture/40">
                            <Image
                              src={alumnus.image}
                              alt={alumnus.name}
                              fill
                              sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 22vw, (min-width: 768px) 30vw, (min-width: 640px) 45vw, 50vw"
                              className={cn(
                                "object-cover group-hover:scale-105 transition-transform duration-500",
                                alumnus.objectPosition || "object-[center_15%]"
                              )}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/35 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                              <span className="inline-block font-sans text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded bg-white/95 backdrop-blur-sm border border-stone-texture/30 text-montfortian-blue uppercase tracking-wider shadow-xs">
                                {alumnus.category}
                              </span>
                            </div>
                          </div>
                        )}
                        <CardContent className="flex-1 flex flex-col justify-between p-2.5 sm:p-3 bg-white">
                          {!hasImage && (
                            <div className="mb-1.5 sm:mb-2">
                              <span className="inline-block font-sans text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded border border-stone-texture/30 text-montfortian-blue uppercase tracking-wider bg-royal-cream/30">
                                {alumnus.category}
                              </span>
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-heritage-gold-strong mb-0.5 sm:mb-1">
                              <GraduationCap className="h-3.5 w-3.5 shrink-0" />
                              <span>{alumnus.year.replace(/^Batch of\s+/i, "Batch: ")}</span>
                            </div>
                            <h3 className="font-serif text-xs sm:text-base font-bold leading-tight text-academic-slate group-hover:text-montfortian-blue transition-colors duration-300 line-clamp-1">
                              {alumnus.name}
                            </h3>
                            <p className="text-[11px] sm:text-xs font-medium text-academic-slate/75 font-sans mt-0.5 sm:mt-1 line-clamp-1">
                              {alumnus.designation}
                            </p>
                            <div className="mt-1.5 sm:mt-2 flex items-start gap-1 sm:gap-1.5 bg-royal-cream/45 border border-stone-texture/30 p-1.5 sm:p-2 rounded-sm">
                              <Award className="h-3.5 w-3.5 text-heritage-gold-strong shrink-0 mt-0.5" />
                              <p className="text-[10px] sm:text-[11px] font-bold font-sans text-heritage-gold-strong leading-normal line-clamp-1">
                                {alumnus.achievement.replace(/https?:\/\/[^\s]+/, "").trim() || "Distinguished Achiever"}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Reveal>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          /* Empty Search/Filter State */
          <Reveal>
            <div className="text-center py-8 sm:py-10 bg-royal-cream/10 border border-dashed border-stone-texture/60 rounded-lg max-w-md mx-auto">
              <Users className="h-8 w-8 sm:h-10 sm:w-10 text-academic-slate/30 mx-auto mb-3 sm:mb-4" />
              <h3 className="font-serif text-base sm:text-lg font-bold text-academic-slate mb-1">No alumni found</h3>
              <p className="text-xs text-academic-slate/70 font-sans px-4 sm:px-6 text-center">
                No alumni found in the selected category. Try selecting another filter.
              </p>
            </div>
          </Reveal>
        )}

        {/* View All CTA (Only shown on the homepage preview) */}
        {!isFullPage && (
          <Reveal delay={0.1}>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" className="shadow-md">
                <Link href="/alumni" className="inline-flex items-center gap-2">
                  Explore Full Alumni Directory
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        )}

      </div>

      {/* Alumni Application Form Modal Overlay Drawer */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end" role="dialog" aria-modal="true" aria-label="Alumni registry application form">
          {/* Black Backdrop overlay */}
          <div
            className="fixed inset-0 bg-deep-navy/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => { if (!submitting) setIsFormOpen(false); }}
          />

          {/* Form container drawer */}
          <div ref={drawerRef} className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col justify-between z-10 transition-transform duration-300 translate-x-0">
            {/* Header */}
            <div className="px-4 py-3 border-b border-stone-texture/40 flex items-center justify-between bg-royal-cream/35">
              <div className="flex items-center gap-2">
                <NetworkIcon className="h-5 w-5 text-heritage-gold-strong" />
                <div>
                  <h3 className="font-serif text-lg font-bold text-academic-slate leading-tight">Join Our Alumni Registry</h3>
                  <p className="text-[10px] text-gray-500 font-sans mt-0.5">Submit credentials for verification and publication</p>
                </div>
              </div>
              <button
                type="button"
                disabled={submitting}
                className="grid h-8 w-8 place-items-center rounded-full border border-stone-texture/40 text-academic-slate hover:bg-stone-100 disabled:opacity-40 transition-colors cursor-pointer"
                onClick={() => setIsFormOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {submitSuccess ? (
                /* Success Message Dialog */
                <div className="text-center py-10 px-4 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto shadow-[0_4px_12px_rgba(22,101,52,0.1)]">
                    <CheckCircle2 className="h-10 w-10 animate-bounce" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-academic-slate">Application Received!</h4>
                  <p className="text-xs leading-relaxed text-academic-slate/75 max-w-md mx-auto font-sans">
                    Thank you for sharing your professional milestone. Your application has been logged under review. The LFJC office will verify your student credentials and publish your card to the directory.
                  </p>
                  <div className="pt-6">
                    <Button onClick={() => { setIsFormOpen(false); resetForm(); }} size="sm">
                      Return to Directory
                    </Button>
                  </div>
                </div>
              ) : (
                /* The Registration Form */
                <form onSubmit={handleSubmit} className="space-y-4 text-xs text-left">
                  {submitError && (
                    <div role="alert" className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-sm font-sans flex items-start gap-2">
                      <span className="font-bold text-sm leading-none shrink-0" aria-hidden="true">!</span>
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* 1. Academic Credentials */}
                  <div className="space-y-3.5">
                    <h4 className="text-[10px] font-bold text-heritage-gold-strong uppercase tracking-widest border-b border-stone-texture/40 pb-1 flex items-center gap-1.5">
                      <GraduationCap className="h-4 w-4 shrink-0" /> Academic &amp; Batch Identification
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label htmlFor={`${fid}-batchFrom`} className="font-bold text-academic-slate/70 block mb-1">Batch From Year*</label>
                        <input
                          id={`${fid}-batchFrom`}
                          type="number"
                          placeholder="e.g. 2005"
                          required
                          value={formBatchFrom}
                          onChange={(e) => setFormBatchFrom(e.target.value)}
                          className="w-full h-10 px-3 border border-stone-texture/60 rounded-sm outline-none focus:border-montfortian-blue focus:ring-1 focus:ring-montfortian-blue transition-colors font-sans"
                        />
                      </div>
                      <div>
                        <label htmlFor={`${fid}-batchTo`} className="font-bold text-academic-slate/70 block mb-1">Batch To Year*</label>
                        <input
                          id={`${fid}-batchTo`}
                          type="number"
                          placeholder="e.g. 2007"
                          required
                          value={formBatchTo}
                          onChange={(e) => setFormBatchTo(e.target.value)}
                          className="w-full h-10 px-3 border border-stone-texture/60 rounded-sm outline-none focus:border-montfortian-blue focus:ring-1 focus:ring-montfortian-blue transition-colors font-sans"
                        />
                      </div>
                      <div>
                        <label htmlFor={`${fid}-stream`} className="font-bold text-academic-slate/70 block mb-1">Stream Studied*</label>
                        <select
                          id={`${fid}-stream`}
                          value={formStream}
                          onChange={(e) => setFormStream(e.target.value)}
                          className="w-full h-10 px-3 bg-white border border-stone-texture/60 rounded-sm outline-none focus:border-montfortian-blue transition-colors font-sans cursor-pointer"
                        >
                          <option value="MPC">M.P.C (Math, Physics, Chem)</option>
                          <option value="BiPC">Bi.P.C (Botany, Zoology, Physics, Chem)</option>
                          <option value="MEC">M.E.C (Math, Econ, Commerce)</option>
                          <option value="CEC">C.E.C (Civics, Econ, Commerce)</option>
                          <option value="Other">Other Stream / Course</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label htmlFor={`${fid}-studentId`} className="font-bold text-academic-slate/70 block mb-1">Student ID Card Number (Optional)</label>
                        <input
                          id={`${fid}-studentId`}
                          type="text"
                          placeholder="e.g. LFJC/2005/741"
                          value={formStudentId}
                          onChange={(e) => setFormStudentId(e.target.value)}
                          className="w-full h-10 px-3 border border-stone-texture/60 rounded-sm outline-none focus:border-montfortian-blue focus:ring-1 focus:ring-montfortian-blue transition-colors font-sans"
                        />
                      </div>
                      <div>
                        <label htmlFor={`${fid}-category`} className="font-bold text-academic-slate/70 block mb-1">Stream/Category Selection*</label>
                        <select
                          id={`${fid}-category`}
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value)}
                          className="w-full h-10 px-3 bg-white border border-stone-texture/60 rounded-sm outline-none focus:border-montfortian-blue transition-colors font-sans cursor-pointer"
                        >
                          <option value="Entrepreneurs & Leaders">Entrepreneurs &amp; Leaders</option>
                          <option value="Actors & Filmmakers">Actors &amp; Filmmakers</option>
                          <option value="Civil Servants & Judiciary">Civil Servants &amp; Judiciary</option>
                          <option value="Singers & Artists">Singers &amp; Artists</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor={`${fid}-verification`} className="font-bold text-academic-slate/70 block mb-1">Batch Verification Details / Class Section details</label>
                      <textarea
                        id={`${fid}-verification`}
                        rows={2}
                        placeholder="Mention sectional details (e.g. MPC Section C, Class teachers names, or other verifiable details to help office cross-reference board memos)..."
                        value={formVerification}
                        onChange={(e) => setFormVerification(e.target.value)}
                        className="w-full p-3 border border-stone-texture/60 rounded-sm outline-none focus:border-montfortian-blue focus:ring-1 focus:ring-montfortian-blue transition-colors font-sans"
                      />
                    </div>
                  </div>

                  {/* 2. Personal Details */}
                  <div className="space-y-3.5">
                    <h4 className="text-[10px] font-bold text-heritage-gold-strong uppercase tracking-widest border-b border-stone-texture/40 pb-1 flex items-center gap-1.5">
                      <Users className="h-4 w-4 shrink-0" /> Personal Information
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-1">
                        <label htmlFor={`${fid}-name`} className="font-bold text-academic-slate/70 block mb-1">Full Name*</label>
                        <input
                          id={`${fid}-name`}
                          type="text"
                          placeholder="Name as printed on credentials"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          className="w-full h-10 px-3 border border-stone-texture/60 rounded-sm outline-none focus:border-montfortian-blue focus:ring-1 focus:ring-montfortian-blue transition-colors font-sans"
                        />
                      </div>
                      <div>
                        <label htmlFor={`${fid}-email`} className="font-bold text-academic-slate/70 block mb-1">Email Address*</label>
                        <input
                          id={`${fid}-email`}
                          type="email"
                          placeholder="personal or work email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          className="w-full h-10 px-3 border border-stone-texture/60 rounded-sm outline-none focus:border-montfortian-blue focus:ring-1 focus:ring-montfortian-blue transition-colors font-sans"
                        />
                      </div>
                      <div>
                        <label htmlFor={`${fid}-phone`} className="font-bold text-academic-slate/70 block mb-1">Contact Number*</label>
                        <input
                          id={`${fid}-phone`}
                          type="tel"
                          placeholder="Phone with country code"
                          required
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          className="w-full h-10 px-3 border border-stone-texture/60 rounded-sm outline-none focus:border-montfortian-blue focus:ring-1 focus:ring-montfortian-blue transition-colors font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label htmlFor={`${fid}-city`} className="font-bold text-academic-slate/70 block mb-1">Current City*</label>
                        <input
                          id={`${fid}-city`}
                          type="text"
                          placeholder="e.g. Hyderabad, San Francisco"
                          required
                          value={formCity}
                          onChange={(e) => setFormCity(e.target.value)}
                          className="w-full h-10 px-3 border border-stone-texture/60 rounded-sm outline-none focus:border-montfortian-blue focus:ring-1 focus:ring-montfortian-blue transition-colors font-sans"
                        />
                      </div>
                      <div>
                        <label htmlFor={`${fid}-country`} className="font-bold text-academic-slate/70 block mb-1">Current Country*</label>
                        <input
                          id={`${fid}-country`}
                          type="text"
                          placeholder="e.g. India, United States"
                          required
                          value={formCountry}
                          onChange={(e) => setFormCountry(e.target.value)}
                          className="w-full h-10 px-3 border border-stone-texture/60 rounded-sm outline-none focus:border-montfortian-blue focus:ring-1 focus:ring-montfortian-blue transition-colors font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. Professional Details */}
                  <div className="space-y-3.5">
                    <h4 className="text-[10px] font-bold text-heritage-gold-strong uppercase tracking-widest border-b border-stone-texture/40 pb-1 flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4 shrink-0" /> Professional Credentials
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor={`${fid}-position`} className="font-bold text-academic-slate/70 block mb-1">Current Position / Job Title*</label>
                        <input
                          id={`${fid}-position`}
                          type="text"
                          placeholder="e.g. Software Engineer, Director, Founder"
                          required
                          value={formPosition}
                          onChange={(e) => setFormPosition(e.target.value)}
                          className="w-full h-10 px-3 border border-stone-texture/60 rounded-sm outline-none focus:border-montfortian-blue focus:ring-1 focus:ring-montfortian-blue transition-colors font-sans"
                        />
                      </div>
                      <div>
                        <label htmlFor={`${fid}-company`} className="font-bold text-academic-slate/70 block mb-1">Company / Organization*</label>
                        <input
                          id={`${fid}-company`}
                          type="text"
                          placeholder="e.g. Google, Govt of India, Self-employed"
                          required
                          value={formCompany}
                          onChange={(e) => setFormCompany(e.target.value)}
                          className="w-full h-10 px-3 border border-stone-texture/60 rounded-sm outline-none focus:border-montfortian-blue focus:ring-1 focus:ring-montfortian-blue transition-colors font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div>
                        <label htmlFor={`${fid}-industry`} className="font-bold text-academic-slate/70 block mb-1">Industry Segment*</label>
                        <input
                          id={`${fid}-industry`}
                          type="text"
                          placeholder="e.g. Technology, Biotech, Arts"
                          required
                          value={formIndustry}
                          onChange={(e) => setFormIndustry(e.target.value)}
                          className="w-full h-10 px-3 border border-stone-texture/60 rounded-sm outline-none focus:border-montfortian-blue focus:ring-1 focus:ring-montfortian-blue transition-colors font-sans"
                        />
                      </div>
                      <div>
                        <label htmlFor={`${fid}-qualification`} className="font-bold text-academic-slate/70 block mb-1">Highest Qualification*</label>
                        <input
                          id={`${fid}-qualification`}
                          type="text"
                          placeholder="e.g. M.Tech (IIT), MBA, PhD"
                          required
                          value={formQualification}
                          onChange={(e) => setFormQualification(e.target.value)}
                          className="w-full h-10 px-3 border border-stone-texture/60 rounded-sm outline-none focus:border-montfortian-blue focus:ring-1 focus:ring-montfortian-blue transition-colors font-sans"
                        />
                      </div>
                      <div>
                        <label htmlFor={`${fid}-linkedin`} className="font-bold text-academic-slate/70 block mb-1">LinkedIn Profile Link*</label>
                        <input
                          id={`${fid}-linkedin`}
                          type="url"
                          placeholder="https://linkedin.com/in/username"
                          required
                          value={formLinkedin}
                          onChange={(e) => setFormLinkedin(e.target.value)}
                          className="w-full h-10 px-3 border border-stone-texture/60 rounded-sm outline-none focus:border-montfortian-blue focus:ring-1 focus:ring-montfortian-blue transition-colors font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor={`${fid}-achievements`} className="font-bold text-academic-slate/70 block mb-1">Key Achievements &amp; Awards*</label>
                      <input
                        id={`${fid}-achievements`}
                        type="text"
                        placeholder="e.g. UPSC rank holder, National Award Winner, Tech Innovator, 3 patents..."
                        required
                        value={formAchievements}
                        onChange={(e) => setFormAchievements(e.target.value)}
                        className="w-full h-10 px-3 border border-stone-texture/60 rounded-sm outline-none focus:border-montfortian-blue focus:ring-1 focus:ring-montfortian-blue transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label htmlFor={`${fid}-bio`} className="font-bold text-academic-slate/70 block mb-1">Professional Bio (Displayed on profile card)*</label>
                      <textarea
                        id={`${fid}-bio`}
                        rows={3}
                        required
                        placeholder="Provide a short synopsis of your professional background, milestones, and how your intermediate values at LFJC played a role in your development..."
                        value={formBio}
                        onChange={(e) => setFormBio(e.target.value)}
                        className="w-full p-3 border border-stone-texture/60 rounded-sm outline-none focus:border-montfortian-blue focus:ring-1 focus:ring-montfortian-blue transition-colors font-sans"
                      />
                    </div>
                  </div>

                  {/* 4. Assets uploading */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-heritage-gold-strong uppercase tracking-widest border-b border-stone-texture/40 pb-1 flex items-center gap-1.5">
                      <Upload className="h-4 w-4 shrink-0" /> Documents &amp; Photos Upload
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Photo upload box */}
                      <div className="border border-stone-texture/60 p-4 rounded bg-stone-50/50 space-y-3">
                        <label className="font-bold text-academic-slate/70 block">Profile Photograph*</label>
                        <div className="flex items-center gap-3">
                          {photoPreview ? (
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-stone-texture bg-white">
                              {/* Local data-URL preview — next/image does not optimize data URLs */}
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-full border border-dashed border-stone-texture flex items-center justify-center bg-white text-gray-400">
                              IMG
                            </div>
                          )}
                          <div className="flex-1">
                            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-texture text-[10px] font-bold uppercase rounded hover:bg-stone-50 transition-colors shadow-sm cursor-pointer">
                              <Upload className="h-3.5 w-3.5" /> Choose Photo
                              <input
                                type="file"
                                accept="image/*"
                                required
                                onChange={handlePhotoChange}
                                className="hidden"
                              />
                            </label>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP. Max 5MB.</p>
                          </div>
                        </div>
                      </div>

                      {/* Supporting documents upload */}
                      <div className="border border-stone-texture/60 p-4 rounded bg-stone-50/50 space-y-3">
                        <label className="font-bold text-academic-slate/70 block text-xs sm:text-sm">Additional Supporting Images (Optional)</label>
                        <div>
                          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-texture text-xs font-bold uppercase rounded hover:bg-stone-50 transition-colors shadow-sm cursor-pointer min-h-[38px]">
                            <Upload className="h-3.5 w-3.5" /> Choose Files
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleSupportFilesChange}
                              className="hidden"
                            />
                          </label>
                          <p className="text-xs text-gray-500 mt-1">Upload ID cards, memos or certificates. Max 3 files.</p>
                        </div>
                        {supportFiles.length > 0 && (
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-academic-slate/70">Selected files ({supportFiles.length}):</p>
                            <ul className="list-disc pl-3 text-xs text-gray-600 space-y-0.5 font-sans">
                              {supportFiles.map((file, i) => (
                                <li key={i} className="truncate">{file.name}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 5. Consent and Submit */}
                  <div className="pt-4 border-t border-stone-texture/40 space-y-4">
                    <label className="flex items-start gap-2 text-[10px] text-academic-slate/80 font-sans cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formConsent}
                        onChange={(e) => setFormConsent(e.target.checked)}
                        className="mt-0.5 rounded border-stone-texture/60 text-montfortian-blue focus:ring-montfortian-blue cursor-pointer"
                      />
                      <span>
                        I confirm that the information provided is accurate and I allow Little Flower Junior College to verify my details and publish my profile on the public website.
                      </span>
                    </label>

                    <div className="flex gap-3 justify-end pt-2">
                      <Button
                        type="button"
                        variant="secondary"
                        disabled={submitting}
                        onClick={() => { setIsFormOpen(false); resetForm(); }}
                        className="px-4 py-2"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={submitting || !formConsent}
                        className="px-6 py-2 shadow-md inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Submitting...
                          </>
                        ) : (
                          <>
                            Submit Application
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
    </div>
  );
}

// Custom local SVG replacement for NetworkIcon to represent network connectivity
function NetworkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M12 8v8" />
      <path d="M12 12H5v4" />
      <path d="M12 12h7v4" />
    </svg>
  );
}
