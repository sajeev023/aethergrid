import Image from "next/image";
import { getInstitutionData } from "@/lib/site-data";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";

interface FacultyProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
}

type FacultyCategory = "present" | "retired" | "former-principal";
type FacultyMember = {
  name: string;
  designation: string;
  subject?: string;
  department: string;
  image?: string;
  category?: FacultyCategory;
};

function getFacultyCategory(member: FacultyMember): FacultyCategory {
  return member.category ?? "present";
}

const departmentOrder = [
  "Mathematics Department",
  "Physics Department",
  "Chemistry Department",
  "Biology Department",
  "Humanities Department",
  "Languages Department",
  "Computer & Library Department",
  "Physical Education & Sports",
  "Office Administration",
  "Support Staff",
];

function FacultyCard({ member, index }: { member: FacultyMember; index: number }) {
  const cleanName = member.name.replace(/^(Bro\.|Ms\.|Mr\.|Dr\.)\s+/i, "");
  const nameParts = cleanName.split(" ").filter(Boolean);
  const initials =
    nameParts.length >= 2
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
      : cleanName.slice(0, 2).toUpperCase();

  return (
    <Reveal key={`${member.name}-${index}`} delay={index * 0.02} className="h-full">
      <div className="group h-full flex flex-col overflow-hidden rounded-lg border border-stone-texture/60 bg-white">
        <div className="relative aspect-[5/6] w-full overflow-hidden bg-royal-cream/50 border-b border-stone-texture/40">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(min-width: 1280px) 15vw, (min-width: 1024px) 20vw, (min-width: 640px) 25vw, 50vw"
              className="object-cover object-top"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-royal-cream text-academic-slate">
              <div className="w-10 h-10 rounded-full border border-heritage-gold/30 flex items-center justify-center bg-white">
                <span className="font-serif text-base font-bold text-montfortian-blue">{initials}</span>
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-between p-2.5 sm:p-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-heritage-gold-strong font-sans line-clamp-1">{member.designation}</p>
            <h3 className="font-serif text-xs sm:text-sm font-bold leading-snug text-academic-slate">{member.name}</h3>
            {member.subject && (
              <p className="text-[11px] text-academic-slate/70 font-sans line-clamp-1">{member.subject}</p>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Faculty({ activeInst = "lfjc" }: FacultyProps) {
  const instData = getInstitutionData(activeInst);
  const allStaff = instData.faculty.slice(1) as FacultyMember[];
  const principal = instData.faculty[0];

  return (
    <div id="faculty" className="bg-white">
      <Section variant="default" className="bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-academic-slate">Faculty</h1>
          </Reveal>
        </div>
      </Section>

      <Section id="leadership" variant="default" className="bg-royal-cream/20 border-y border-stone-texture/30">
        <div className="flex items-center gap-2 mb-5">
          <span className="w-1.5 h-5 bg-heritage-gold-strong rounded-full" />
          <h2 className="font-serif text-lg sm:text-xl font-bold text-academic-slate">Principal</h2>
        </div>
        <div className="grid gap-5 sm:gap-8 lg:grid-cols-12 items-center">
          <Reveal className="lg:col-span-4">
            <div className="relative aspect-[3/4] max-w-xs mx-auto lg:mx-0 overflow-hidden rounded-xl border border-stone-texture/50 shadow-elevation">
              <Image
                src={principal.image || "/images/lfjc-logo.jpg"}
                alt={principal.name}
                fill
                sizes="(min-width: 1024px) 30vw, 60vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <div className="rounded-xl border border-stone-texture/60 bg-white p-4 sm:p-6">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-academic-slate">{principal.name}</h3>
              <p className="text-[11px] font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">{principal.designation}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="departments" variant="default" className="bg-white">
        <div className="flex items-center gap-2 mb-5">
          <span className="w-1.5 h-5 bg-heritage-gold-strong rounded-full" />
          <h2 className="font-serif text-lg sm:text-xl font-bold text-academic-slate">Departments</h2>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {departmentOrder.map((deptName) => {
            const deptStaff = allStaff.filter((m) => getFacultyCategory(m) === "present" && m.department === deptName);
            if (deptStaff.length === 0) return null;
            return (
              <div key={deptName} className="pt-5 sm:pt-6 first:pt-0 border-t border-stone-texture/20 first:border-t-0">
                <h3 className="font-serif text-base sm:text-lg font-bold text-academic-slate mb-3">{deptName}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3.5">
                  {deptStaff.map((member, index) => (
                    <FacultyCard key={`${member.name}-${index}`} member={member} index={index} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section id="principals" variant="default" className="bg-royal-cream/20 border-y border-stone-texture/30">
        <div className="flex items-center gap-2 mb-5">
          <span className="w-1.5 h-5 bg-heritage-gold-strong rounded-full" />
          <h2 className="font-serif text-lg sm:text-xl font-bold text-academic-slate">Former Principals</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4">
          {allStaff
            .filter((m) => getFacultyCategory(m) === "former-principal")
            .map((member, index) => (
              <FacultyCard key={`${member.name}-${index}`} member={member} index={index} />
            ))}
        </div>
      </Section>
    </div>
  );
}
