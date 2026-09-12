import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import { PostCard } from "@/components/PostCard";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import {
  BackgroundLines,
  LineGraphMotif,
  type MotifVariant,
} from "@/components/LineGraphMotif";
import { getAllPosts } from "@/lib/posts";
import {
  CONTACT_EMAIL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE_NAME} — M&A execution, without the spreadsheet chaos`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    url: SITE_URL,
    title: `${SITE_NAME} — M&A execution, without the spreadsheet chaos`,
    description: SITE_DESCRIPTION,
  },
};

const PERSONAS: {
  heading: string;
  body: string;
  motif: MotifVariant;
}[] = [
  {
    heading: "Separation Offices & Divestiture Teams",
    body: "You're building a business to be sold, or preparing one for carve-out. Your work is scoped into the sale package months before a buyer exists. You need a single source of truth for TSA scope, entanglement inventory, and separation dependencies — not because it's nice to have, but because buyers ask for it, and giving them a diligent plan is how you avoid repricing the deal later.",
    motif: "separation",
  },
  {
    heading: "Integration & PMI Teams",
    body: "You inherited a populated programme on day one instead of a blank spreadsheet on day two. Your programme is already in the tool; the plan is already there. Your problem now is execution — tracking what's blocking, what's at risk, and whether you're actually going to make your Day 1 dates. You need visibility into the dependencies, not another status dashboard.",
    motif: "deal",
  },
  {
    heading: "Corporate Development",
    body: "You're evaluating and running multiple deals in parallel — or you will be once the market turns back on. You need to know, across your portfolio, which deals are running hot, which TSAs are at risk of overrun, and which integration commitments you're actually on track to deliver. A platform subscription is cheaper than losing half a deal's value to a missed TSA exit.",
    motif: "portfolio",
  },
  {
    heading: "Advisory Firms & Transaction Counsel",
    body: "You're guiding a team through a deal that doesn't fit a template — maybe a complex carve-out, maybe a hostile situation, maybe a regulatory carve. You need a tool that holds the plan you designed together without forcing you into someone else's taxonomy. And you need your client to execute against it with discipline after you've moved to the next deal.",
    motif: "advisory",
  },
];

const APPROACH = [
  {
    heading: "The plan is fragmented by default.",
    body: "Separation scope, TSA obligations, and Day 1 readiness live in separate spreadsheets, owned by separate teams, in separate organisations. No one is looking at the whole picture, because the whole picture doesn't exist in one place.",
  },
  {
    heading: "Status isn't the same as truth.",
    body: "A workstream marked “in progress” can mean almost anything. Without a defined standard for done and a named owner for each obligation, a status report describes activity, not readiness.",
  },
  {
    heading: "Dependencies are where deals slip.",
    body: "The commitments that matter are the ones that block other commitments. When those links aren't tracked, a missed date in one workstream surfaces as a surprise in another — usually too late to absorb cheaply.",
  },
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
        // Organization schema only — no SoftwareApplication, no pricing data.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <BackgroundLines className="pointer-events-none absolute inset-0 h-full w-full" />
        <Container className="relative py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-balance font-serif text-display-sm leading-[1.1] text-navy md:text-display">
              M&amp;A execution, without the spreadsheet chaos.
            </h1>

            <div className="mt-8 space-y-5 text-body-lg leading-relaxed text-ink">
              <p>
                A deal closes on the legal calendar, not the separation plan.
                Your TSAs run 12 to 36 months. Your Day 1 readiness sits on
                spreadsheets scattered across four organisations. And the cost
                of getting it wrong compounds monthly.
              </p>
              <p className="text-body text-muted">
                MeridianCogent is a control environment for the people running
                the hardest part of the deal — the part that happens after
                close. Separation offices and integration teams use it to track
                obligations, manage TSAs, measure Day 1 readiness, and hold
                themselves to the commitments they&apos;ve made.
              </p>
              <p className="text-body text-muted">
                It&apos;s built for people who know that &ldquo;in progress&rdquo;
                is not a state, that dependencies matter more than features, and
                that the decision record is as valuable as the deal itself.
              </p>
            </div>

            <div className="mt-10 max-w-xl">
              <p className="text-small font-medium text-navy">
                In development. Join the early access list for updates.
              </p>
              <div className="mt-3">
                <EarlyAccessForm source="homepage-hero" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Who this is for */}
      <section
        aria-labelledby="who"
        className="relative overflow-hidden bg-navy py-20 text-white md:py-32"
      >
        <BackgroundLines
          tone="ice"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        />
        <Container className="relative">
          <RevealOnScroll>
            <h2 id="who" className="font-serif text-h2-sm text-white md:text-h2">
              Who this is for
            </h2>
            <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2">
              {PERSONAS.map((persona) => (
                <div key={persona.heading} className="flex flex-col">
                  <LineGraphMotif
                    variant={persona.motif}
                    tone="ice"
                    strokeWidth={4}
                    className="h-14 w-28"
                  />
                  <h3 className="mt-5 font-serif text-h3 text-white">
                    {persona.heading}
                  </h3>
                  <p className="mt-3 text-body leading-relaxed text-on-navy-secondary">
                    {persona.body}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* How MeridianCogent thinks about execution */}
      <section
        id="approach"
        aria-labelledby="approach-heading"
        className="scroll-mt-24 py-20 md:py-32"
      >
        <Container>
          <RevealOnScroll>
            <div className="max-w-measure">
              <h2
                id="approach-heading"
                className="font-serif text-h2-sm text-navy md:text-h2"
              >
                How MeridianCogent thinks about execution
              </h2>
              <p className="mt-6 text-body-lg leading-relaxed text-ink">
                The problem looks like this: your deal is tracked in spreadsheets,
                status emails, and handshake agreements — not because anyone wants
                it that way, but because nobody&apos;s built the alternative. Every
                change is invisible to someone who needs to know. Every dependency
                sits in someone&apos;s head. Every commitment is re-negotiated when
                it slips.
              </p>
              <p className="mt-5 text-body-lg leading-relaxed text-ink">
                MeridianCogent replaces the spreadsheet with a control
                environment: one place where you define what needs to happen, who
                is accountable for it, and when it needs to be done. The
                difference is not in the feature count. It&apos;s in visibility —
                the moment something goes at-risk, everyone who needs to know
                finds out, and you have an audit trail of every commitment and
                every decision that led to it.
              </p>
              <p className="mt-5 text-body-lg leading-relaxed text-ink">
                That sounds like project management. It&apos;s actually
                protection. Your deal&apos;s value sits in the execution after
                close. Protecting that value means seeing it clearly.
              </p>
            </div>

            <div className="mt-16 grid gap-10 md:grid-cols-3">
              {APPROACH.map((item) => (
                <div key={item.heading}>
                  <div className="h-px w-12 bg-navy" />
                  <h3 className="mt-4 font-serif text-h4 text-navy">
                    {item.heading}
                  </h3>
                  <p className="mt-3 text-small leading-relaxed text-muted">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-16 max-w-measure text-body-lg leading-relaxed text-ink">
              MeridianCogent is the category of tool that treats execution as the
              deliverable: one source of truth for obligations and readiness, held
              to the commitments that were actually made.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Early access */}
      <section
        aria-labelledby="early-access-home"
        className="bg-navy py-20 text-white md:py-32"
      >
        <Container>
          <RevealOnScroll className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
            <div>
              <h2
                id="early-access-home"
                className="font-serif text-h2-sm text-white md:text-h2"
              >
                Get updates as we open access.
              </h2>
              <p className="mt-5 text-body leading-relaxed text-on-navy-secondary">
                We&apos;re building for the integration and separation teams
                running deals right now. Early access opens in phases —
                diagnostics first, then the full platform. If you&apos;re
                running a carve-out or integration, we&apos;d like to hear from
                you.
              </p>
              <p className="mt-4 text-small">
                <Link
                  href="/early-access"
                  className="font-medium text-ice underline underline-offset-4 hover:text-white"
                >
                  What early access means
                </Link>
              </p>
            </div>
            <div className="border border-white/15 bg-white/5 p-6 md:p-8">
              <EarlyAccessForm theme="dark" source="homepage-early-access" />
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Resources preview */}
      <section aria-labelledby="resources-preview" className="py-20 md:py-32">
        <Container>
          <RevealOnScroll>
            <div className="flex items-end justify-between gap-6">
              <h2
                id="resources-preview"
                className="font-serif text-h2-sm text-navy md:text-h2"
              >
                Resources
              </h2>
              <Link
                href="/resources"
                className="shrink-0 text-small font-medium text-navy underline underline-offset-4 hover:text-muted"
              >
                All articles
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
