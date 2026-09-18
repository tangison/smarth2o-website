import type { Metadata } from "next";
import { DocShell, DocH2, DocP } from "@/components/site/doc-shell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Smart H₂O Solutions and Trading CC handles personal information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <DocShell breadcrumb="Smart H₂O / Privacy">
      <h1 className="text-3xl md:text-4xl font-bold tracking-[-0.01em] text-primary">
        Privacy policy
      </h1>
      <DocP>
        This policy explains what {SITE.legalName} ("Smart H₂O", "we") does
        with personal information collected through smarth2o.com.na.
      </DocP>

      <DocH2>What we collect</DocH2>
      <DocP>
        Through the enquiry form we collect the details you choose to give us:
        your name, email address, phone or WhatsApp number, organisation and
        your message. If you contact us by email, phone or WhatsApp, we keep
        that correspondence.
      </DocP>

      <DocH2>How we use it</DocH2>
      <DocP>
        We use enquiry information to respond to you, to prepare site
        assessments and quotations, and to keep a record of business
        communication. We do not sell your details, and we do not share them
        outside the team handling your enquiry.
      </DocP>

      <DocH2>Cookies and analytics</DocH2>
      <DocP>
        This website does not set advertising or tracking cookies and does not
        run third-party analytics.
      </DocP>

      <DocH2>Advertising content</DocH2>
      <DocP>
        Advertising shown on machine screens is subject to approval by the
        institution hosting each machine. Submitting advertising content does
        not create an agreement until terms are confirmed in writing.
      </DocP>

      <DocH2>Retention and access</DocH2>
      <DocP>
        We keep enquiry records for as long as they serve the purpose they
        were collected for. You can ask us to correct or remove your details
        at any time by emailing{" "}
        <a
          href={`mailto:${SITE.email}`}
          className="text-primary underline decoration-accent underline-offset-2 hover:decoration-2 transition-all font-medium"
        >
          {SITE.email}
        </a>
        .
      </DocP>

      <DocH2>Changes</DocH2>
      <DocP>
        If this policy changes, the updated version will be published on this
        page.
      </DocP>
    </DocShell>
  );
}
