import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal-document";
import { getInstitutionData } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Anti-Ragging Policy",
  description:
    "Little Flower Junior College maintains a zero-tolerance anti-ragging policy in compliance with the UGC Anti-Ragging Regulations. Committee contacts, helpline, and reporting procedure.",
  alternates: { canonical: "/legal/anti-ragging" },
};

export default function AntiRaggingPage() {
  const inst = getInstitutionData("lfjc");

  return (
    <LegalDocument
      eyebrow="Student Welfare"
      title="Anti-Ragging Policy"
      description={`${inst.name} prohibits ragging in every form, in compliance with the UGC Regulations on Curbing the Menace of Ragging in Higher Educational Institutions, 2009, and the applicable provisions of the Andhra Pradesh Prohibition of Ragging Act, 1997. Ragging is a criminal offence.`}
      lastUpdated="August 2026"
      sections={[
        {
          heading: "What constitutes ragging",
          body: (
            <p>
              Ragging includes any conduct — physical or psychological — by a student or group of students that causes
              intimidation, teasing, harassment, embarrassment, or harm to a fellow student. It covers acts inside and
              outside the campus, in hostels, transport, and online spaces. Any act that disrupts a junior student&apos;s
              peace of mind, dignity, or academic progress is ragging, regardless of intent or &quot;tradition.&quot;
            </p>
          ),
        },
        {
          heading: "Zero-tolerance stance",
          body: (
            <p>
              {inst.shortName} maintains a strict zero-tolerance policy. Any student found guilty of ragging is liable to
              dismissal from the college, forfeiture of fees, and criminal prosecution under the applicable law. The
              institution cooperates fully with law enforcement in all such cases.
            </p>
          ),
        },
        {
          heading: "Anti-Ragging Committee",
          body: (
            <p>
              The college has constituted an Anti-Ragging Committee and a squad to monitor campus conduct, receive
              complaints, and take prompt action. Students or parents may report any incident — anonymously if preferred —
              and every complaint is treated with confidentiality and urgency.
            </p>
          ),
        },
        {
          heading: "How to report an incident",
          body: (
            <ul className="list-disc space-y-2 pl-5">
              <li>Call the college office: <a href={`tel:${inst.phone.replace(/\s/g, "")}`} className="font-semibold text-montfortian-blue hover:underline">{inst.phone}</a></li>
              <li>Email: <a href={`mailto:${inst.email}`} className="font-semibold text-montfortian-blue hover:underline">{inst.email}</a></li>
              <li>UGC Anti-Ragging Helpline: 1800-180-5522 (toll-free, 24×7)</li>
              <li>UGC online portal: <span className="font-semibold">antiragging.in</span> (file an online complaint or affidavit)</li>
              <li>Approach the Principal or any faculty member in person at the administrative office.</li>
            </ul>
          ),
        },
        {
          heading: "Undertaking at admission",
          body: (
            <p>
              As required by regulation, every student and parent/guardian submits an anti-ragging undertaking at the time of
              admission, affirming that the student will not engage in ragging and understands the consequences. This
              undertaking is a condition of enrollment.
            </p>
          ),
        },
      ]}
    />
  );
}