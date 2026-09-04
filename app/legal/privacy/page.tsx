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
      eyebrow="Institutional Governance & DPDP Compliance"
      title="Privacy Policy"
      description={`This policy outlines how ${inst.name} handles personal information across website inquiries, admissions processing, alumni community submissions, and external administrative portals, in alignment with the Digital Personal Data Protection Act, 2023 (DPDP Act) of India. Prepared for formal review and adoption by college management.`}
      lastUpdated="September 2026"
      sections={[
        {
          heading: "Scope and Data Collection Channels",
          body: (
            <>
              <p>
                This Privacy Policy applies to personal data collected through the official Little Flower Junior College website and affiliated channels:
              </p>
              <ul className="list-disc space-y-2 pl-5 mt-2">
                <li>
                  <strong>Website Inquiry &amp; Contact Forms:</strong> Prospective student and parent inquiries (name, phone number, email address, chosen stream, and inquiry message).
                </li>
                <li>
                  <strong>Admissions Interest Forms:</strong> Student and parent/guardian contact details, Class X board, qualifying scores, and stream preferences submitted for counseling.
                </li>
                <li>
                  <strong>Alumni Directory Submissions:</strong> Voluntarily submitted biographical details (name, batch years, stream, professional designation, employer, city, profile photo, and achievements) submitted via web drawer or the official LFJC Alumni Google Form.
                </li>
                <li>
                  <strong>Direct Electronic Communications:</strong> Telephone inquiries, emails sent directly to college administrative mailboxes, and inbound WhatsApp messaging initiated via website buttons.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "External Portals & Third-Party Services",
          body: (
            <>
              <p>
                To provide comprehensive academic and administrative services, LFJC interfaces with designated third-party systems:
              </p>
              <ul className="list-disc space-y-2 pl-5 mt-2">
                <li>
                  <strong>MySkoolCom Student/Parent Portal:</strong> Enrolled student attendance, marks, fee records, and administrative notices are hosted on the enterprise MySkoolCom platform (<span className="font-mono text-xs">myskoolcom.com</span>). Credentials and student records on MySkoolCom are managed under institutional enterprise controls.
                </li>
                <li>
                  <strong>Google Forms (Alumni Registration):</strong> Alumni may choose to submit their graduation records through the Google Forms portal hosted on Google Workspace.
                </li>
                <li>
                  <strong>Transactional Delivery &amp; Hosting:</strong> Inquiry notifications are routed via secure mail transport (Resend) directly to authorized college counselors. Our web hosting infrastructure employs industry-standard HTTPS encryption and edge firewalls.
                </li>
                <li>
                  <strong>WhatsApp Links:</strong> Clicking WhatsApp contact links opens the user&apos;s WhatsApp application subject to WhatsApp/Meta terms of service.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "Parental/Guardian Consent for Minors",
          body: (
            <p>
              Intermediate junior college students are predominantly between 15 and 18 years of age (minors under Indian law). Website inquiries submitted by prospective students are presumed to be made with parental or guardian awareness. Formal admission, document verification, and fee payment require verifiable written consent from a parent or legal guardian in accordance with TSBIE regulations and the DPDP Act.
            </p>
          ),
        },
        {
          heading: "How We Use Personal Data",
          body: (
            <p>
              Personal data collected through this website is used exclusively for legitimate educational and institutional purposes: answering academic inquiries, scheduling counseling visits, verifying eligibility, coordinating alumni community initiatives, and issuing official notices. Little Flower Junior College does not sell, rent, or trade personal data to commercial advertisers or marketing agencies.
            </p>
          ),
        },
        {
          heading: "Data Retention & Archival Schedule",
          body: (
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Admissions &amp; General Inquiries:</strong> Retained for the active academic intake cycle (up to 12 months) to facilitate counseling, after which inquiries are purged or archived.
              </li>
              <li>
                <strong>Enrolled Student Records:</strong> Academic registers, enrollment rosters, and board examination filings are retained permanently in accordance with Telangana State Board of Intermediate Education statutory mandates.
              </li>
              <li>
                <strong>Alumni Directory Profiles:</strong> Retained indefinitely to foster community connection, unless an alumnus requests update or removal.
              </li>
            </ul>
          ),
        },
        {
          heading: "Data Subject Rights (Access, Correction & Deletion)",
          body: (
            <p>
              Under the DPDP Act, students, parents, and alumni have the right to request access to the personal data we hold about them, request correction of inaccurate records, or request erasure of voluntary directory submissions. To exercise any of these rights, please submit a written request to the College Administrative Office. Requests are processed within 30 days following identity verification.
            </p>
          ),
        },
        {
          heading: "Responsible Institutional Data Owner & Contact",
          body: (
            <>
              <p>
                The designated institutional data controller for Little Flower Junior College is:
              </p>
              <div className="mt-3 rounded-lg border border-stone-texture/60 bg-royal-cream/30 p-4 font-sans text-xs sm:text-sm text-academic-slate space-y-1">
                <p className="font-semibold text-montfortian-blue">The Principal &amp; Administrative Office</p>
                <p>Little Flower Junior College</p>
                <p>Survey No. 102/1, Opposite Survey of India, Tarnaka-Uppal Road, Uppal, Hyderabad, Telangana 500039</p>
                <p>Email: <a href={`mailto:${inst.email}`} className="font-semibold text-montfortian-blue hover:underline">{inst.email}</a></p>
                <p>Phone: <a href={`tel:${inst.phone.replace(/\s/g, "")}`} className="font-semibold text-montfortian-blue hover:underline">{inst.phone}</a></p>
              </div>
              <p className="mt-3 text-xs text-academic-slate/70 italic">
                *Note for Institutional Review: This policy draft has been updated to reflect active digital workflows and is subject to formal adoption by the LFJC Governing Board and legal counsel.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}