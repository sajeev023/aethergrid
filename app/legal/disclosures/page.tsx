import type { Metadata } from "next";
import Link from "next/link";

import { LegalDocument } from "@/components/legal-document";
import { getInstitutionData } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Mandatory Public Disclosures",
  description:
    "Statutory public disclosures for Little Flower Junior College: affiliation, governance, fee structure, faculty, infrastructure, and minority status, as required for affiliated intermediate colleges.",
  alternates: { canonical: "/legal/disclosures" },
};

export default function DisclosuresPage() {
  const inst = getInstitutionData("lfjc");

  return (
    <LegalDocument
      eyebrow="Statutory Compliance"
      title="Mandatory Public Disclosures"
      description={`As an intermediate college affiliated to the Board of Intermediate Education, Telangana, ${inst.name} publishes the following statutory information for students, parents, and the public.`}
      lastUpdated="August 2026"
      sections={[
        {
          heading: "Institutional identity",
          body: (
            <ul className="list-disc space-y-2 pl-5">
              <li><strong>Name:</strong> {inst.name}</li>
              <li><strong>Established:</strong> {inst.established}</li>
              <li><strong>Address:</strong> {inst.addressLine}</li>
              <li><strong>Affiliation:</strong> Board of Intermediate Education, Telangana</li>
              <li><strong>Governing society:</strong> {inst.society}</li>
              <li><strong>Correspondent &amp; Principal:</strong> {inst.principalName}</li>
              <li><strong>Status:</strong> Minority educational institution (Catholic, Montfortian)</li>
            </ul>
          ),
        },
        {
          heading: "Academic programmes",
          body: (
            <p>
              Four Board-recognised intermediate streams: M.P.C (Mathematics, Physics, Chemistry), Bi.P.C (Botany, Zoology,
              Physics, Chemistry), M.E.C (Mathematics, Economics, Commerce), and C.E.C (Civics, Economics, Commerce). Detailed
              subject combinations and entrance orientations are available on the{" "}
              <Link href="/academics" className="font-semibold text-montfortian-blue hover:underline">Academics</Link> page.
            </p>
          ),
        },
        {
          heading: "Fee structure",
          body: (
            <p>
              The annual fee structure for each stream is published on the{" "}
              <Link href="/admissions#fee-structure" className="font-semibold text-montfortian-blue hover:underline">Admissions</Link>{" "}
              page and is also available at the college office. Fees are charged in accordance with norms prescribed by the
              Board of Intermediate Education, Telangana. Merit concessions and scholarships are offered as per the
              college&apos;s scholarship policy.
            </p>
          ),
        },
        {
          heading: "Faculty & staff",
          body: (
            <p>
              The college maintains a full complement of qualified faculty across 13 departments. The teaching staff roster,
              with department heads, is published on the{" "}
              <Link href="/faculty/teaching" className="font-semibold text-montfortian-blue hover:underline">Teaching &amp; Support Staff</Link>{" "}
              page. The complete staff list with qualifications is available at the college office on request.
            </p>
          ),
        },
        {
          heading: "Infrastructure & facilities",
          body: (
            <p>
              The 8-acre Uppal campus houses academic blocks, accredited physics, chemistry, and biology laboratories, a
              library, an auditorium, a two-acre sports arena, and supporting infrastructure. See{" "}
              <Link href="/campus/facilities" className="font-semibold text-montfortian-blue hover:underline">Facilities &amp; Labs</Link>.
            </p>
          ),
        },
        {
          heading: "Admission & anti-ragging",
          body: (
            <p>
              Admissions are conducted on the basis of Class X board performance and the college&apos;s counselling process,
              without discrimination on grounds of religion, caste, or gender, subject to the minority-institution status.
              The college enforces a strict{" "}
              <Link href="/legal/anti-ragging" className="font-semibold text-montfortian-blue hover:underline">Anti-Ragging Policy</Link>.
            </p>
          ),
        },
        {
          heading: "Grievance redressal",
          body: (
            <p>
              Students and parents may raise grievances with the Principal&apos;s office in person, by phone ({inst.phone}),
              or by email ({inst.email}). Grievances are addressed in accordance with the Board&apos;s grievance redressal
              guidelines.
            </p>
          ),
        },
      ]}
    />
  );
}