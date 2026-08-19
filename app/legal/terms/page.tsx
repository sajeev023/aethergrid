import type { Metadata } from "next";
import Link from "next/link";

import { LegalDocument } from "@/components/legal-document";
import { getInstitutionData } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing use of the Little Flower Junior College website, including content ownership, accuracy of information, and limitation of liability.",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  const inst = getInstitutionData("lfjc");

  return (
    <LegalDocument
      eyebrow="Website Terms"
      title="Terms of Use"
      description={`These terms govern your use of the ${inst.name} website. By accessing this site you agree to the terms below.`}
      lastUpdated="August 2026"
      sections={[
        {
          heading: "Acceptance of terms",
          body: (
            <p>
              By browsing this website you accept these terms in full. If you do not agree with any part, please do not
              continue to use the site. These terms may be updated from time to time; continued use constitutes acceptance
              of the revised terms.
            </p>
          ),
        },
        {
          heading: "Information accuracy",
          body: (
            <p>
              The college endeavours to keep all information — programmes, fees, dates, faculty, and policies — accurate
              and current. However, details are subject to change as per the Board of Intermediate Education, Telangana and
              internal administrative decisions. Official communication from the college office prevails over any content
              on this website in case of discrepancy.
            </p>
          ),
        },
        {
          heading: "Intellectual property",
          body: (
            <p>
              All content on this website — including the LFJC name, crest, text, photographs, and design — is the property
              of {inst.name} / {inst.society} unless otherwise stated, and may not be reproduced without written
              permission. Alumni photographs are published with consent.
            </p>
          ),
        },
        {
          heading: "External links",
          body: (
            <p>
              This site may link to external institutions (e.g., the Montfortian family of schools and colleges) and
              official bodies. {inst.shortName} is not responsible for the content or privacy practices of external sites.
            </p>
          ),
        },
        {
          heading: "Forms and submissions",
          body: (
            <p>
              Information submitted through inquiry, admissions, and alumni forms is governed by our{" "}
              <Link href="/legal/privacy" className="font-semibold text-montfortian-blue hover:underline">Privacy Policy</Link>.
              Submission of a form does not constitute admission or guarantee placement; admission is subject to
              eligibility, document verification, and the college&apos;s admission process.
            </p>
          ),
        },
        {
          heading: "Limitation of liability",
          body: (
            <p>
              To the extent permitted by law, {inst.shortName} shall not be liable for any indirect or incidental damages
              arising from the use of this website. Every effort is made to keep the site secure and available, but
              uninterrupted access is not guaranteed.
            </p>
          ),
        },
      ]}
    />
  );
}