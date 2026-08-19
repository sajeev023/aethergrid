import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal-document";
import { getInstitutionData } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "Refund and cancellation policy for fee payments and admissions at Little Flower Junior College, including applicable deductions and the procedure to request a refund.",
  alternates: { canonical: "/legal/refund-cancellation" },
};

export default function RefundCancellationPage() {
  const inst = getInstitutionData("lfjc");

  return (
    <LegalDocument
      eyebrow="Fees & Admissions"
      title="Refund & Cancellation Policy"
      description={`This policy outlines the conditions under which fees paid to ${inst.name} may be refunded and the procedure for cancellation of admission.`}
      lastUpdated="August 2026"
      sections={[
        {
          heading: "Application stage",
          body: (
            <p>
              Inquiries and applications submitted through this website are free of charge and do not constitute a confirmed
              admission. No payment is collected at the online inquiry stage; therefore no refund is applicable at this
              stage.
            </p>
          ),
        },
        {
          heading: "Admission fee & tuition",
          body: (
            <p>
              Fees are payable at the college administrative office in installments as communicated during admission
              counselling. A refund of tuition fee, subject to applicable deductions as per Board of Intermediate
              Education, Telangana norms, may be considered when a student cancels admission in writing before the
              notified cut-off date. Fees paid towards Board registration, examination, and statutory heads are
              non-refundable once remitted to the Board.
            </p>
          ),
        },
        {
          heading: "How to request a refund",
          body: (
            <ul className="list-disc space-y-2 pl-5">
              <li>Submit a written cancellation request to the Principal&apos;s office.</li>
              <li>Provide the student name, admission/reference number, and reason for cancellation.</li>
              <li>Attach the original fee receipt and surrender the issued identity card.</li>
              <li>The office will process the request and communicate the refund decision within the statutory timeline.</li>
            </ul>
          ),
        },
        {
          heading: "Non-refundable items",
          body: (
            <p>
              Admission processing charges, Board registration and examination fees, library and laboratory charges already
              utilised, and any amounts already remitted to statutory bodies are non-refundable.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              For refund queries, contact the {inst.name} office at{" "}
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