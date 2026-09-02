"use client";

import Image from "next/image";
import {
  Heart,
  Cross,
  Sparkles,
  Compass,
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import {
  founderData,
  patronessData,
  managementData,
  visionMissionData,
  annualThemeData,
  brothersInServiceData,
  lfjcData,
} from "@/lib/site-data";

interface AboutProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc" | string;
}

export function About({ activeInst = "lfjc" }: AboutProps = {}) {
  void activeInst;
  return (
    <div id="about" className="bg-white">
      {/* ─── PAGE HEADER ──────────────────────────────────────────────── */}
      <Section variant="default" className="bg-gradient-to-b from-deep-navy to-montfortian-blue text-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-block px-3 py-1 rounded-full bg-heritage-gold/20 border border-heritage-gold/40 text-heritage-gold-bright text-xs font-bold uppercase tracking-widest font-sans mb-3">
              Montfortian Heritage Since 1974
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white tracking-tight">
              About Little Flower Junior College
            </h1>
            <p className="mt-3 text-sm sm:text-base text-royal-cream/80 max-w-2xl mx-auto font-sans leading-relaxed">
              &quot;Knowledge is Truth.&quot; Five decades of academic excellence, moral integrity, and holistic formation under the Brothers of St. Gabriel.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ─── 1. INSTITUTIONAL HISTORY ─────────────────────────────────── */}
      <Section id="history" variant="default" className="bg-white py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-stone-texture/50 shadow-float">
              <Image
                src="/images/campus-hero.jpg"
                alt="LFJC Uppal Campus Grounds"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
                priority
              />
              <div className="absolute bottom-3 left-3 bg-deep-navy/85 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/15 text-white text-xs font-sans font-semibold">
                Uppal Campus • Opposite Survey of India
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
                Our Foundation & Growth
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate leading-snug">
                From Abids Origins (1974) to 2-Acre Uppal Campus
              </h2>
              <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-academic-slate/80 font-sans">
                <p>
                  Little Flower Junior College was established in <strong>1974</strong> by upgrading the historic Little Flower High School of Abids, Hyderabad. The college was later relocated in <strong>1982</strong> to its current spacious campus in Uppal.
                </p>
                <p>
                  When the college first opened its doors, it began with around <strong>200 students</strong>. Today, LFJC is home to over <strong>1,600 students</strong> pursuing Board-recognized Intermediate education across Mathematics, Physical Sciences, Biological Sciences, and Humanities.
                </p>
                <p>
                  Spread across <strong>2 acres</strong> on the Tarnaka–Uppal Road opposite the Survey of India, the campus features a sprawling playground, modern science and computer laboratories, a central library, and the historic Heritage Hall, all fostering intellectual, moral, and physical growth.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-royal-cream/40 p-3 rounded-lg border border-stone-texture/40 text-center">
                  <div className="font-serif text-xl sm:text-2xl font-bold text-montfortian-blue">1974</div>
                  <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-academic-slate/70">Founded</div>
                </div>
                <div className="bg-royal-cream/40 p-3 rounded-lg border border-stone-texture/40 text-center">
                  <div className="font-serif text-xl sm:text-2xl font-bold text-montfortian-blue">1,600+</div>
                  <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-academic-slate/70">Students</div>
                </div>
                <div className="bg-royal-cream/40 p-3 rounded-lg border border-stone-texture/40 text-center">
                  <div className="font-serif text-xl sm:text-2xl font-bold text-montfortian-blue">2 Acres</div>
                  <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-academic-slate/70">Campus</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ─── 2. FOUNDER & PATRONESS PROFILES ───────────────────────────── */}
      <Section id="founder" variant="default" className="bg-royal-cream/25 border-y border-stone-texture/30 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
              Spiritual & Institutional Roots
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-academic-slate mt-1">
              Our Founder & Patroness
            </h2>
            <p className="text-xs sm:text-sm text-academic-slate/70 max-w-xl mx-auto mt-2 font-sans">
              Little Flower Junior College draws perpetual inspiration from our Founder Saint Louis Marie de Montfort and our Patroness Saint Thérèse of Lisieux.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* Founder Card */}
            <Reveal className="h-full">
              <div className="bg-white rounded-2xl border border-stone-texture/60 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-heritage-gold/50 shadow-inner shrink-0 bg-royal-cream/40">
                      <Image
                        src={founderData.image}
                        alt={founderData.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
                        Founder
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-montfortian-blue leading-tight">
                        {founderData.name}
                      </h3>
                      <p className="text-xs text-academic-slate/70 font-sans mt-0.5">
                        Born: {founderData.birthDate} • Died: {founderData.deathDate}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-academic-slate/80 font-sans border-t border-stone-texture/20 pt-4">
                    <p>
                      <strong>Louis Mary Grignion</strong>, popularly known as Montfort, grew to be a prophet of his times. He saw God in the poor and gave his life for their cause. In him welled up a constant spring of Love, Courage, Self-surrendering Service, and Commitment.
                    </p>
                    <p>
                      The source of this unending spring was <em>&quot;God Always.&quot;</em> Though the Montfortian Society was founded in the 18th century, it is in <strong>1903</strong> that the Brothers arrived in India. Today, they operate over 200 educational and social establishments across India.
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-texture/20 text-xs font-semibold text-montfortian-blue flex items-center gap-1.5">
                  <Cross className="w-4 h-4 text-heritage-gold-strong" />
                  <span>Congregation of Montfort Brothers of St. Gabriel</span>
                </div>
              </div>
            </Reveal>

            {/* Patroness Card */}
            <Reveal delay={0.1} className="h-full">
              <div className="bg-white rounded-2xl border border-stone-texture/60 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-heritage-gold/50 shadow-inner shrink-0 bg-royal-cream/40">
                      <Image
                        src={patronessData.image}
                        alt={patronessData.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
                        Patroness
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-montfortian-blue leading-tight">
                        {patronessData.name}
                      </h3>
                      <p className="text-xs text-academic-slate/70 font-sans mt-0.5">
                        &quot;The Little Flower of Jesus&quot; (1873–1897)
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-academic-slate/80 font-sans border-t border-stone-texture/20 pt-4">
                    <p>
                      Born <strong>Marie Françoise-Thérèse Martin</strong> in France, she became a Carmelite nun at an early age. She is popularly celebrated as <em>&quot;The Little Flower of Jesus&quot;</em> — the direct namesake of Little Flower Junior College.
                    </p>
                    <p>
                      Her autobiography, <em>Story of a Soul</em>, became a world classic. She was proclaimed a Doctor of the Catholic Church and canonized by Pope Pius XI on May 17, 1925.
                    </p>
                    <blockquote className="italic border-l-2 border-heritage-gold pl-3 text-montfortian-blue text-xs sm:text-sm font-editorial">
                      &quot;What matters in life is not great deeds, but great love.&quot;
                    </blockquote>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-texture/20 text-xs font-semibold text-montfortian-blue flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-heritage-gold-strong" />
                  <span>Patron Saint of Little Flower Junior College</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ─── 3. GOVERNING SOCIETY & CHARISM ────────────────────────────── */}
      <Section id="society" variant="default" className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <Reveal className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
                Governing Body
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate leading-snug">
                Brothers of St. Gabriel Educational Society
              </h2>
              <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-academic-slate/80 font-sans">
                <p>
                  The college is administered by the <strong>Montfort Brothers of St. Gabriel</strong>, a religious institute of pontifical right recognized in the Catholic Church since 1910, actively engaged in educational and social upliftment across <strong>30 countries</strong>.
                </p>
                <p>
                  Gabriel Deshayes gave new impetus to the Brothers, stressing particularly the vital importance of the teaching profession. The Brothers consecrate their lives to God through the three vows of <strong>Poverty, Chastity, and Obedience</strong>, committing themselves to be <em>&quot;signs and bearers of God&apos;s love&quot;</em> with a preferential option for youth and the marginalized.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                {managementData.threeVows.map((vow) => (
                  <span
                    key={vow}
                    className="px-3 py-1 bg-royal-cream text-montfortian-blue border border-stone-texture/40 rounded-full text-xs font-bold font-sans"
                  >
                    Vow of {vow}
                  </span>
                ))}
                <span className="px-3 py-1 bg-montfortian-blue text-white rounded-full text-xs font-bold font-sans">
                  Pontifical Right (1910)
                </span>
                <span className="px-3 py-1 bg-heritage-gold/20 text-montfortian-blue border border-heritage-gold/30 rounded-full text-xs font-bold font-sans">
                  30 Countries Globally
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-stone-texture/50 shadow-float">
                <Image
                  src="/images/official/brothers.png"
                  alt="Montfort Brothers of St. Gabriel"
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ─── 4. OFFICIAL VISION & MISSION ─────────────────────────────── */}
      <Section id="vision" variant="default" className="bg-deep-navy text-white py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold font-sans">
              Our Core Charter
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-1">
              Official Vision & Mission
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Vision */}
            <Reveal>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/15 p-6 sm:p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-heritage-gold/20 flex items-center justify-center text-heritage-gold mb-4 border border-heritage-gold/40">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-heritage-gold-bright mb-3">
                    Institutional Vision
                  </h3>
                  <blockquote className="text-sm leading-relaxed text-royal-cream/90 font-sans italic">
                    &quot;{visionMissionData.vision}&quot;
                  </blockquote>
                </div>
                <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-heritage-gold/70 font-sans">
                  Equality • Fraternity • Freedom • Brotherhood
                </p>
              </div>
            </Reveal>

            {/* Mission */}
            <Reveal delay={0.1}>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/15 p-6 sm:p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-heritage-gold/20 flex items-center justify-center text-heritage-gold mb-4 border border-heritage-gold/40">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-heritage-gold-bright mb-3">
                    Educational Mission
                  </h3>
                  <blockquote className="text-sm leading-relaxed text-royal-cream/90 font-sans italic">
                    &quot;{visionMissionData.mission}&quot;
                  </blockquote>
                </div>
                <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-heritage-gold/70 font-sans">
                  Value-Based Formation • Holistic Development
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ─── 5. ANNUAL THEME 2024–25 ──────────────────────────────────── */}
      <Section id="theme" variant="default" className="bg-royal-cream/20 border-b border-stone-texture/30 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <Reveal className="lg:col-span-5">
              <div className="relative aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden border border-stone-texture/50 shadow-elevation bg-white p-3">
                <Image
                  src={annualThemeData.emblemImage}
                  alt={`LFJC Annual Theme ${annualThemeData.currentYear}: ${annualThemeData.currentTheme}`}
                  fill
                  className="object-contain p-2"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
                Academic Theme of the Year {annualThemeData.currentYear}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-academic-slate tracking-tight">
                {annualThemeData.currentTheme}
              </h2>
              <p className="text-xs sm:text-sm text-academic-slate/80 leading-relaxed font-sans">
                Every academic year at Little Flower Junior College is guided by a formative central theme. For 2024–25, our theme invites students to reach their highest potential through seven interconnected domains of character and endeavor:
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {annualThemeData.facets.map((facet) => (
                  <span
                    key={facet}
                    className="px-3 py-1 bg-white border border-stone-texture/50 rounded-full text-xs font-bold text-montfortian-blue shadow-xs font-sans"
                  >
                    ★ {facet}
                  </span>
                ))}
              </div>

              <div className="pt-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-academic-slate/70 font-sans mb-2">
                  Past Decade Annual Themes Archive:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-academic-slate/75 font-sans">
                  {annualThemeData.history.slice(1, 7).map((item) => (
                    <div key={item.year} className="bg-white p-2 rounded border border-stone-texture/30">
                      <span className="font-bold text-montfortian-blue">{item.year}:</span> {item.theme}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ─── 6. PRINCIPAL'S DESK WELCOME ──────────────────────────────── */}
      <Section id="principal" variant="default" className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <Reveal className="lg:col-span-4">
              <div className="relative aspect-[3/4] max-w-xs mx-auto lg:mx-0 overflow-hidden rounded-2xl border-2 border-heritage-gold/30 shadow-float bg-royal-cream/40">
                <Image
                  src={lfjcData.principalImg}
                  alt={lfjcData.principalName}
                  fill
                  sizes="(min-width: 1024px) 30vw, 60vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
                Principal&apos;s Desk
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate">
                {lfjcData.principalName}
              </h2>
              <p className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
                {lfjcData.principalRole}
              </p>

              <blockquote className="my-2 border-l-2 border-heritage-gold pl-3 font-editorial italic text-base sm:text-lg text-montfortian-blue">
                &quot;{lfjcData.principalQuote}&quot;
              </blockquote>

              <div className="space-y-2.5 text-xs sm:text-sm leading-relaxed text-academic-slate/80 font-sans">
                <p>{lfjcData.principalMessage}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ─── 7. BROTHERS IN SERVICE (LFJC ALUMNI) ─────────────────────── */}
      <Section id="brothers-alumni" variant="default" className="bg-royal-cream/20 border-t border-stone-texture/30 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
              Spiritual Roll of Honor
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate mt-1">
              Brothers Who Studied at LFJC & Served &gt;25 Years
            </h2>
            <p className="text-xs sm:text-sm text-academic-slate/70 max-w-xl mx-auto mt-1 font-sans">
              Former intermediate students of Little Flower Junior College who dedicated over 25 years of their lives in the service of the Montfort Brothers of St. Gabriel:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
            {brothersInServiceData.map((brother) => (
              <div
                key={brother.name}
                className="bg-white p-3 rounded-lg border border-stone-texture/40 shadow-xs flex items-center justify-between"
              >
                <div className="font-semibold text-xs text-montfortian-blue font-sans">{brother.name}</div>
                <div className="text-[10px] text-academic-slate/60 font-sans font-medium">{brother.batch}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}