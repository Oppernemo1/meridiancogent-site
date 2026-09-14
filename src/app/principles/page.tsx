import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SidebarLayout } from "@/components/SidebarLayout";
import { BackgroundLines } from "@/components/LineGraphMotif";
import {
  CONTACT_EMAIL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const TITLE = "Principles";
const DESCRIPTION =
  "What MeridianCogent deliberately will not assert, calculate, or infer — and why those constraints make the output defensible.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/principles" },
  openGraph: {
    url: "/principles",
    title: `${TITLE} — ${SITE_NAME}`,
    description: DESCRIPTION,
  },
  twitter: {
    title: `${TITLE} — ${SITE_NAME}`,
    description: DESCRIPTION,
  },
};

const SECTIONS = [
  { id: "pressure", label: "The pressure" },
  { id: "legal", label: "The law" },
  { id: "arithmetic", label: "Arithmetic" },
  { id: "costs", label: "What this costs you" },
  { id: "direct", label: "One exception" },
];

export default function PrinciplesPage() {
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
      <section className="relative overflow-hidden py-section md:py-section-lg">
        <BackgroundLines className="pointer-events-none absolute inset-0 h-full w-full" />
        <Container className="relative">
          <div className="max-w-3xl">
            <h1 className="text-balance text-h1-sm md:text-h1">
              What this platform will not do
            </h1>
            <p className="mt-heading-gap text-body-sm leading-relaxed text-ink md:text-body">
              Most software is sold on what it can tell you. This page is
              about what MeridianCogent deliberately refuses to tell you, and
              why those refusals are the most useful thing about it.
            </p>
          </div>
        </Container>
      </section>

      <SidebarLayout sections={SECTIONS}>
        {/* Opening */}
        <Section id="pressure" label="The pressure" divider={false}>
          <p>
            Every piece of M&amp;A software eventually faces the same
            commercial pressure: a customer asks a question the system
            cannot honestly answer, and answering it anyway would be easy,
            impressive, and wrong.
          </p>
          <p>
            Produce a risk score. Estimate what is left to spend. Tell them
            what the notice period is in Germany. Each of these is a small
            step, each is individually defensible, and each moves the
            platform from recording what people decided to asserting things
            it has no basis to assert.
          </p>
          <p>
            The constraints below are how that pressure is refused. They
            are design positions, not gaps waiting to be filled.
          </p>
        </Section>

        {/* Legal */}
        <Section id="legal" label="The law" heading="It will not tell you what the law requires">
          <p>
            MeridianCogent does not maintain a corpus of jurisdictional
            rules. It does not tell you what a consultation requires, what
            notice period applies, what a regulator will want, or what your
            obligations are in any country.
          </p>
          <p>
            Where jurisdiction-specific content exists in a programme, it
            was entered by the customer or their advisor, and formally
            adopted by a named person who takes responsibility for it. The
            platform records that decision. It does not make it, suggest
            it, or validate it.
          </p>
          <p>
            This applies to the public tools as well. The readiness
            assessment on this site makes no jurisdictional claim of any
            kind — not even a hedged one, not even with a note to confirm
            with counsel. A hedge changes the wording, not who made the
            claim.
          </p>
          <p>
            Two capabilities are held back for exactly this reason: legal
            entity step plans and regulatory approval tracking. Both are
            commercially attractive. Both would require the platform to
            assert what a jurisdiction requires. Neither will be built on
            that basis.
          </p>
        </Section>

        {/* Arithmetic */}
        <Section id="arithmetic" label="Arithmetic" heading="It will not calculate what it has no basis to calculate">
          <p>Some numbers look like arithmetic but are not.</p>
          <p>
            A risk register that multiplies likelihood by impact produces a
            score. High multiplied by medium is not a quantity. The
            platform records both dimensions and shows them together; it
            never derives a score from them, and never ranks risks by one.
          </p>
          <p>
            A cost-to-complete figure derived from burn rate is a forecast,
            not a measurement. Where a cost-to-complete exists here, a
            person entered it, and it is recorded as their estimate with
            their name and the date attached.
          </p>
          <p>
            An annual run rate and a one-time cost are different
            quantities. They are never summed.{" "}
            <Link
              href="/platform"
              className="text-accent-dark underline underline-offset-4 hover:text-muted"
            >
              A synergy figure and an integration cost are independently
              reported and shown side by side — never netted into a single
              number that implies a precision nobody has.
            </Link>
          </p>
          <p>
            A difference between a budget and an actual is only a variance
            if a phased budget exists. Otherwise it is remaining budget,
            and it is labelled that way.
          </p>
          <p>
            These distinctions sound pedantic until a board pack built on
            them turns out to be wrong.
          </p>
        </Section>

        {/* What this costs you */}
        <Section id="costs" label="What this costs you" heading="What this costs you">
          <p>
            These constraints are not free, and it would be dishonest to
            present them as pure benefit.
          </p>
          <p>
            MeridianCogent asks more of you than a platform that guesses.
            Someone has to enter the jurisdictional content and put their
            name to it. Someone has to decide what a perimeter
            item&apos;s disposition is. Someone has to state what a figure
            represents before it can be stored, and someone has to
            formally adopt it before it affects a plan.
          </p>
          <p>
            That is more work than accepting a default. It is the work
            that makes the output defensible, and it is the work a
            platform cannot do on your behalf without pretending to a
            knowledge it does not have.
          </p>
          <p>
            If what you want is a system that fills in the blanks for you,
            this is the wrong product, and that is a reasonable thing to
            want.
          </p>
        </Section>

        {/* Direct questions */}
        <Section id="direct" label="One exception" heading="One deliberate exception">
          <p>
            There is a difference between a forecast the platform
            volunteers and a counterfactual you explicitly ask for.
          </p>
          <p>
            MeridianCogent is being built to answer a direct question —
            move this date, and show me what it does to exit timing and
            cost. You supply the change, and the answer is computed
            through the same pricing and scheduling logic that governs the
            live programme. Nothing is assumed on your behalf; the input is
            yours, and the output is traceable to it.
          </p>
          <p>
            That is not a prediction. It is arithmetic you asked for, on
            inputs you chose.
          </p>
        </Section>
      </SidebarLayout>
    </>
  );
}
