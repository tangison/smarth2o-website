import type { Metadata } from "next";
import { DocShell, DocH2, DocP } from "@/components/site/doc-shell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms of use for the Smart H₂O website, enquiries and machine advertising submissions.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <DocShell breadcrumb="Smart H₂O / Terms">
      <h1 className="text-3xl md:text-4xl font-bold tracking-[-0.01em] text-primary">
        Terms
      </h1>
      <DocP>
        These terms cover the use of smarth2o.com.na and the enquiry process.
        Commercial terms for hosting a machine, site visits or
        advertising are set out in a separate written agreement.
      </DocP>

      <DocH2>Website use</DocH2>
      <DocP>
        Content on this site is provided for information about Smart H₂O
        products and services. It may change as offerings develop. Nothing on
        this site is an offer to supply on fixed terms.
      </DocP>

      <DocH2>Water and health</DocH2>
      <DocP>
        Smart H₂O speaks to purification, taste, convenience and quality
        control. Nothing on this site is a medical or health claim. Water
        treatment performance is covered in the service documentation for
        each installation.
      </DocP>

      <DocH2>Enquiries</DocH2>
      <DocP>
        Submitting an enquiry does not create an obligation on either side.
        Assessments, hosting arrangements, pricing and advertising placements
        are confirmed individually in writing.
      </DocP>

      <DocH2>Advertising submissions</DocH2>
      <DocP>
        Advertising content submitted for machine screens is reviewed by the
        institution hosting the machine, and must comply with that
        institution's approval requirements. Smart H₂O may decline content at
        its own discretion before it reaches the host for approval.
      </DocP>

      <DocH2>Liability</DocH2>
      <DocP>
        To the extent permitted by Namibian law, {SITE.legalName} accepts no
        liability for decisions made on the basis of website content alone.
      </DocP>

      <DocH2>Contact</DocH2>
      <DocP>
        Questions about these terms:{" "}
        <a
          href={`mailto:${SITE.email}`}
          className="text-primary underline decoration-accent underline-offset-2 hover:decoration-2 transition-all font-medium"
        >
          {SITE.email}
        </a>
        .
      </DocP>
    </DocShell>
  );
}
