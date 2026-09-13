import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import { PostCard } from "@/components/PostCard";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Section } from "@/components/Section";
import { SidebarLayout } from "@/components/SidebarLayout";
import { ChainDiagram, type ChainNode } from "@/components/ChainDiagram";
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

const CHAIN_NODES: ChainNode[] = [
  { title: "Systems" },
  { title: "Decommission sequencing" },
  { title: "TSA exit dependencies" },
  { title: "Exit risk" },
  { title: "Day 1 readiness" },
];

const SECTIONS = [
  { id: "problem", label: "The problem" },
  { id: "chain", label: "Dependencies" },
  { id: "scenarios", label: "Scenarios" },
  { id: "gates", label: "Gates" },
  { id: "trust", label: "Trust & record" },
  { id: "confidentiality", label: "Confidentiality" },
  { id: "who", label: "Who it's for" },
  { id: "resources-preview", label: "Resources" },
  { id: "early-access", label: "Early access" },
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
        <Container className="relative py-section md:py-section-lg">
          <div className="max-w-3xl">
            <h1 className="text-balance text-h1-sm md:text-h1">
              The exit date nobody checked is the one that slips.
            </h1>
            <p className="mt-heading-gap text-body-sm leading-relaxed text-ink md:text-body">
              MeridianCogent is an execution platform for M&amp;A
              separations, carve-outs and integrations. It models what every
              transitional service actually depends on — so a date that will
              not hold is visible months before the invoice arrives.
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

        {/* The chain */}
        <RevealOnScroll>
          <Section id="chain" label="Dependencies" heading="Dependencies, modelled rather than assumed" wide>
            <p className="max-w-measure">
              MeridianCogent models the chain that actually governs a
              separation: what the business runs on, what has to be
              untangled, which transitional services cannot end until that
              work completes, and what is genuinely blocking Day 1.
            </p>

            <ChainDiagram nodes={CHAIN_NODES} compact />

            <p className="max-w-measure">
              Every stage reads from the one before it. Nothing here is a
              status someone updates by hand.
            </p>

            <p className="text-small">
              <Link
                href="/platform"
                className="font-medium text-accent-dark underline underline-offset-4 hover:text-muted"
              >
                How the platform works
              </Link>
            </p>
          </Section>
        </RevealOnScroll>

        {/* Scenarios */}
        <RevealOnScroll>
          <Section id="scenarios" label="Scenarios" heading="Move one date. See what it costs.">
            <p>
              Knowing a service exits in September is useful. Knowing what a
              two-week slip on a single cutover does to that date — and to
              the invoice that follows it — is the question a CFO actually
              asks.
            </p>
            <p>
              MeridianCogent answers it directly: change one date, and see
              which transitional services can no longer end when they were
              meant to, repriced through the same engine that governs the
              live programme.
            </p>
            <p>
              Not a forecast. Arithmetic you asked for, on inputs you chose.
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

        {/* Who it is for */}
        <RevealOnScroll>
          <Section id="who" label="Who it's for" heading="Who it is for">
            <p>
              Separation offices preparing a business for divestiture.
              Integration and PMI teams running the programme after close.
              Corporate development managing several transactions at once.
              Advisory firms and transaction counsel guiding execution and
              needing the plan to survive their departure.
            </p>
            <p>
              Typically eight to forty people per deal team, in mid-market
              and enterprise transactions.
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

        {/* Early access */}
        <RevealOnScroll>
          <Section id="early-access" label="Early access" heading="Early access" wide>
            <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
              <div>
                <p className="text-muted">
                  MeridianCogent is in development. Join the list for updates
                  as we open access.
                </p>
              </div>
              <div className="border border-hairline bg-white p-6 md:p-8">
                <EarlyAccessForm source="homepage-early-access" />
              </div>
            </div>
          </Section>
        </RevealOnScroll>
      </SidebarLayout>
    </>
  );
}
