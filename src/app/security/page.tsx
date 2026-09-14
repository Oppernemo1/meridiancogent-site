import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SidebarLayout } from "@/components/SidebarLayout";
import { DataPanel } from "@/components/DataPanel";
import {
  CONTACT_EMAIL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const TITLE = "Security";
const DESCRIPTION =
  "Programme-scoped access, time-bounded external access, watermarked exports and EU data residency — and a plain statement of what is not yet in place.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/security" },
  openGraph: {
    url: "/security",
    title: `${TITLE} — ${SITE_NAME}`,
    description: DESCRIPTION,
  },
  twitter: {
    title: `${TITLE} — ${SITE_NAME}`,
    description: DESCRIPTION,
  },
};

const NOT_IN_PLACE = [
  "No SOC 2 report. A Type II requires an observation window and an audit; neither has begun.",
  "No ISO 27001 certification.",
  "No third-party penetration test has been commissioned.",
  "No SSO or SCIM integration. Both require an enterprise identity provider to configure and test against, which requires a customer.",
  "No data processing agreement executed with any customer, because there is no customer yet.",
];

const SECTIONS = [
  { id: "problem", label: "The problem" },
  { id: "access", label: "Access" },
  { id: "advisors", label: "External access" },
  { id: "confidentiality", label: "Confidentiality" },
  { id: "not-in-place", label: "Not in place yet" },
  { id: "questions", label: "Questions" },
];

export default function SecurityPage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-mark.svg`,
    description: SITE_DESCRIPTION,
    email: CONTACT_EMAIL,
    foundingDate: "2026",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      {/* Hero */}
      <section className="py-section md:py-section-lg">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-balance text-h1-sm md:text-h1">
              Security and confidentiality
            </h1>
            <p className="mt-heading-gap text-body-sm leading-relaxed text-ink md:text-body">
              Written for the person asked to review whether live deal data
              can go into this. What follows is what is architecturally true
              today, and what is not yet in place.
            </p>
          </div>
        </Container>
      </section>

      <SidebarLayout sections={SECTIONS}>
        {/* The problem this has to solve */}
        <Section id="problem" label="The problem" heading="A separation is not one organisation" divider={false}>
          <p>
            Most software treats access control as an organisational
            question: you work here, so you can see our data. That model
            does not survive contact with a carve-out.
          </p>
          <p>
            A single separation programme involves the seller&apos;s team
            and the buyer&apos;s team, who must not see each other&apos;s
            commercial positions. It involves external advisors and
            counsel, whose access should end when their engagement does. It
            often involves a transaction that has not been announced,
            inside a company where most employees should not know it
            exists at all.
          </p>
          <p>
            Access control here is scoped to the programme, not the
            organisation, because that is the only model that matches how
            a deal actually works.
          </p>
        </Section>

        {/* Access */}
        <Section
          id="access"
          label="Access"
          heading="Programme-scoped access by default"
          panel={
            <DataPanel
              label="Access scope"
              rows={[
                { label: "Organisation", value: "No" },
                { label: "Programme", value: "Yes" },
                { label: "Advisor", value: "Bounded" },
              ]}
            />
          }
        >
          <p>
            Being a member of the customer&apos;s organisation does not
            grant visibility of a programme. Membership is granted per
            programme, explicitly, and every access path in the system
            enforces that boundary at the database level rather than in
            application code.
          </p>
          <p>
            Row-level security policies govern every table. A query that
            should not return a row does not return it, regardless of
            which part of the application issued it. That boundary has
            been reviewed directly — including an audit of database
            privileges beyond the row-level policies themselves, because
            row-level security is only one edge of the permission surface
            and the others are easy to leave open by accident.
          </p>
          <p>
            Data is held in the European Union, in Frankfurt. Tenant
            isolation is enforced in the database rather than by
            convention — there is no shared table without a policy
            governing who can read from it.
          </p>
        </Section>

        {/* Advisors and vendors */}
        <Section id="advisors" label="External access" heading="External access, time-bounded and logged">
          <p>
            Advisors, counsel and vendors need access to run a deal, and
            that access should not outlive the engagement.
          </p>
          <p>
            External participants are granted access to specific
            programmes with a defined scope, and that access is logged.
            Privileged vendor access is brokered and recorded rather than
            handed over as a standing credential. When an engagement ends,
            access ends with it — not as a policy someone is expected to
            remember, but as a property of how the access was granted.
          </p>
        </Section>

        {/* Confidentiality */}
        <Section id="confidentiality" label="Confidentiality" heading="Deals that are not public yet">
          <p>
            A programme can run under a code name. The people working on it
            see the code name; the real identity of the target is not
            scattered across the system for anyone with incidental access
            to find.
          </p>
          <p>
            Exports are watermarked with the identity of the person who
            generated them. A document that leaves the platform carries a
            record of who took it out, which changes the calculation for
            anyone considering forwarding it.
          </p>
          <p>
            An audit log nobody reads is not a control. Access patterns are
            monitored for anomalies — unusual volume, unusual timing,
            access to programmes outside a user&apos;s normal pattern — and
            surfaced to the people who would need to act on them.
          </p>
          <p>
            The audit record itself is append-only.{" "}
            <Link
              href="/principles"
              className="text-accent-dark underline underline-offset-4 hover:text-muted"
            >
              Corrections supersede rather than overwrite, and records
              supporting the evidentiary trail cannot be deleted by design,
              including by the organisation that owns them.
            </Link>
          </p>
        </Section>

        {/* What is not in place yet */}
        <Section id="not-in-place" label="Not in place yet" heading="What is not in place yet">
          <p>
            MeridianCogent is in development and pre-revenue. The following
            do not exist, and it would be misleading to imply otherwise:
          </p>
          <ul className="list-disc space-y-3 pl-5">
            {NOT_IN_PLACE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            These are sequencing, not position. They are on the path to a
            first customer, and a prospective customer&apos;s requirements
            should shape which come first. If your review requires any of
            them before a pilot, that is a reasonable position and worth
            telling us early.
          </p>
        </Section>

        {/* Questions */}
        <Section id="questions" label="Questions" heading="If you are reviewing this">
          <p>
            Security questionnaires, architecture questions and specific
            control requirements are welcome, and answering them honestly
            is more useful to both sides than a page like this one.
          </p>
          <p>
            Write to{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-accent-dark underline underline-offset-4 hover:text-muted"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>
      </SidebarLayout>
    </>
  );
}
