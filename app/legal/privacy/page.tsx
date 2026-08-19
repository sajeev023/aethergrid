import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal-document";
import { getInstitutionData } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Little Flower Junior College collects, uses, and protects personal information of students, parents, and alumni, in compliance with the Digital Personal Data Protection Act, 2023.",
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  const inst = getInstitutionData("lfjc");

  return (
    <LegalDocument
      eyebrow="Data Protection"
      title="Privacy Policy"
      description={`This policy describes how ${inst.name} collects, uses, stores, and protects personal information submitted through this website, in alignment with the Digital Personal Data Protection Act, 2023 (DPDP Act) of India.`}
      lastUpdated="August 2026"
      sections={[
        {
          heading: "Information we collect",
          body: (
            <>
              <p>We collect only the information necessary to respond to inquiries and process admissions:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li><strong>Inquiry &amp; contact forms:</strong> name, email, phone, preferred stream, and message.</li>
                <li><strong>Admissions forms:</strong> student and parent/guardian name, contact, board, marks, and stream preference.</li>
                <li><strong>Alumni registry:</strong> name, batch, stream, profession, photo, and verification details — submitted voluntarily.</li>
                <li><strong>Technical data:</strong> basic browser and visit information for security and site improvement.</li>
              </ul>
            </>
          ),
        },
        {
          heading: "How we use your information",
          body: (
            <p>
              Your information is used solely to respond to your inquiry, process admissions, verify alumni identity, and
              communicate official college notices. We do not sell personal data to any third party. Aggregated,
              non-identifying analytics may be used to improve the website.
            </p>
          ),
        },
        {
          heading: "Legal basis and consent",
          body: (
            <p>
              We process personal data on the basis of the consent you provide when submitting a form, and for legitimate
              institutional purposes such as admissions and statutory compliance. You may withdraw consent at any time by
              contacting the college office; withdrawal does not affect processing already carried out.
            </p>
          ),
        },
        {
          heading: "Data retention and security",
          body: (
            <p>
              Submissions are retained only as long as required for the purpose collected and for statutory record-keeping.
              Access is restricted to authorised administrative staff. Pending alumni submissions are held privately and
              are not published until approved by the administration.
            </p>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <p>
              Under the DPDP Act, you have the right to access, correct, or request erasure of your personal data, and to
              nominate another individual to exercise these rights in the event of death or incapacity. To exercise these
              rights, contact the college office.
            </p>
          ),
        },
        {
          heading: "Children&apos;s data",
          body: (
            <p>
              As an intermediate college, we handle the data of students who are typically minors. Verifiable parental or
              guardian consent is obtained at admission. Parents may review or request correction of their child&apos;s data
              at any time.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              For any privacy request or concern, contact the {inst.name} office at{" "}
              <a href={`tel:${inst.phone.replace(/\s/g, "")}`} className="font-semibold text-montfortian-blue hover:underline">{inst.phone}</a>{" "}
              or{" "}
              <a href={`mailto:${inst.email}`} className="font-semibold text-montfortian-blue hover:underline">{inst.email}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}