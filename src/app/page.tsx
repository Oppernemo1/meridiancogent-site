import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import { PostCard } from "@/components/PostCard";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Section } from "@/components/Section";
import { SidebarLayout } from "@/components/SidebarLayout";
import { BackgroundLines } from "@/components/LineGraphMotif";
import { getAllPosts } from "@/lib/posts";
import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const TITLE = "MeridianCogent — M&A separation and integration execution";
const DESCRIPTION =
  "Execution platform for M&A separations, carve-outs and integrations. Model what a TSA depends on, see what a slipped date costs, and keep a decision record with a named human behind every number.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
  },
};

const AT_A_GLANCE = [
  {
    label: "What it is",
    body: "A platform for running M&A separations, carve-outs and integrations. It holds the perimeter, obligations, consents, contracts, TSAs, systems, risks, costs and dates in one place, with a named human behind every number that matters.",
  },
  {
    label: "Who it is for",
    body: "Separation offices and divestiture teams, integration and PMI teams, corporate development running several deals at once, and the advisors and counsel working alongside them. Buy-side and sell-side, corporate and sponsor. Typically eight to forty people per deal team, in mid-market and enterprise transactions.",
  },
  {
    label: "Where it is",
    body: "In development. Not commercially available yet. Join the list and we will tell you when there is something to show you.",
  },
];

const SECTIONS = [
  { id: "problem", label: "The problem" },
  { id: "how-it-thinks", label: "How it thinks" },
  { id: "gates", label: "Gates" },
  { id: "trust", label: "Trust & record" },
  { id: "confidentiality", label: "Confidentiality" },
  { id: "resources-preview", label: "Resources" },
];

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

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
        // Organization schema only — SoftwareApplication lives on /platform,
        // not duplicated here.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <BackgroundLines className="pointer-events-none absolute inset-0 h-full w-full" />
        <Container className="relative pt-section pb-8 md:pt-section-lg md:pb-10">
          <div className="max-w-3xl">
            <h1 className="text-balance text-h1-sm md:text-h1">
              A carve-out is a hundred moving parts and one date that has to
              hold.
            </h1>
            <p className="mt-heading-gap text-body-sm leading-relaxed text-ink md:text-body">
              MeridianCogent holds all of them — what transfers, what needs
              consent, what a TSA costs, what blocks Day 1 — and shows which
              commitments are still real. Built for separation offices,
              integration teams, corporate development, and the advisors
              working alongside them.
            </p>

            <div className="mt-10 max-w-xl">
              <p className="text-small font-medium text-graphite">
                In development. Join the list for updates as we open access.
              </p>
              <div className="mt-3">
                <EarlyAccessForm source="homepage-hero" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* At a glance */}
      <section className="border-t border-hairline">
        <Container>
          <div className="grid gap-8 py-8 sm:grid-cols-3 sm:gap-10 md:py-10">
            {AT_A_GLANCE.map((item) => (
              <div key={item.label}>
                <p className="text-label font-semibold uppercase text-accent-dark">
                  {item.label}
                </p>
                <p className="mt-2 text-body-sm leading-relaxed text-muted md:text-body">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <SidebarLayout sections={SECTIONS}>
        {/* The problem */}
        <RevealOnScroll>
          <Section id="problem" label="The problem" heading="The plan is not the problem. The plan not holding is the problem." divider={false}>
            <p>
              Every separation has a plan, and every plan has dates on it.
              What most programmes cannot tell you is which of those dates
              are still real.
            </p>
            <p>
              A transitional service ends when the work that replaces it
              finishes. That work depends on other work. Somewhere in that
              chain is the task that quietly determines whether September
              holds — and in a spreadsheet, it is indistinguishable from the
              forty tasks that do not matter.
            </p>
            <p>
              By the time it is obvious, the negotiating position is gone and
              the extension is priced accordingly.
            </p>
          </Section>
        </RevealOnScroll>

        {/* How it thinks */}
        <RevealOnScroll>
          <Section id="how-it-thinks" label="How it thinks" heading="Every date is a chain, not a status.">
            <p>
              A transitional service ends when the work behind it finishes.
              That work depends on other work. MeridianCogent models the
              chain — systems, decommissioning, TSA exit, exit risk, Day 1 —
              so the date that will not hold is visible months before the
              invoice arrives. Move one date and see what it costs the rest
              of the chain.
            </p>
            <p className="text-small">
              <Link
                href="/platform"
                className="font-medium text-accent-dark underline underline-offset-4 hover:text-muted"
              >
                See the full model →
              </Link>
            </p>
          </Section>
        </RevealOnScroll>

        {/* Gates */}
        <RevealOnScroll>
          <Section id="gates" label="Gates" heading="Gates that actually block">
            <p>
              Most platforms have gates that record disapproval. The gate
              turns red, and the work continues anyway, because nothing in
              the system can stop it.
            </p>
            <p>
              Here a gate is a real constraint on the schedule. Conditions
              precedent block closing rather than annotating it. The
              critical path reflects what is genuinely possible, not what
              the plan assumed in January.
            </p>
          </Section>
        </RevealOnScroll>

        {/* Trust */}
        <RevealOnScroll>
          <Section id="trust" label="Trust & record" heading="Every number has a named human behind it">
            <p>
              MeridianCogent does not tell you what a jurisdiction requires,
              does not score your risks, and does not estimate what is left
              to spend. Every material figure is entered by a customer or
              their advisor and formally adopted by a named person before it
              affects a plan.
            </p>
            <p>
              Corrections supersede rather than overwrite. When something is
              adopted, the platform snapshots exactly what was adopted and
              when — so eighteen months later, the decision that was
              actually made, on the information actually available, is
              still there.
            </p>
            <p>
              These are constraints, not gaps. They are the reason the
              output is defensible.
            </p>
            <p className="text-small">
              <Link
                href="/principles"
                className="font-medium text-accent-dark underline underline-offset-4 hover:text-muted"
              >
                What this platform will not do
              </Link>
            </p>
          </Section>
        </RevealOnScroll>

        {/* Confidentiality */}
        <RevealOnScroll>
          <Section id="confidentiality" label="Confidentiality" heading="Built for deals that are not public">
            <p>
              Access is scoped to the programme, not the organisation.
              Advisors and vendors hold time-bounded, logged access to only
              what they need. Programmes can run under code names, exports
              are watermarked to whoever generated them, and unusual access
              patterns are surfaced rather than sitting in a log nobody
              reads.
            </p>
            <p>
              Not enterprise add-ons sold separately — how the platform
              works by default.
            </p>
          </Section>
        </RevealOnScroll>

        {/* Resources preview */}
        <RevealOnScroll>
          <Section id="resources-preview" label="Resources" heading="From the resources" wide>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
            <p className="text-small">
              <Link
                href="/resources"
                className="font-medium text-accent-dark underline underline-offset-4 hover:text-muted"
              >
                All resources
              </Link>
            </p>
          </Section>
        </RevealOnScroll>
      </SidebarLayout>
    </>
  );
}
