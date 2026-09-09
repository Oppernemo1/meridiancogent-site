import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import { PostCard } from "@/components/PostCard";
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
      <section className="relative overflow-hidden border-b border-black/5">
        <BackgroundLines className="pointer-events-none absolute inset-0 h-full w-full" />
        <Container className="relative py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-balance font-serif text-4xl leading-[1.1] text-navy sm:text-5xl md:text-6xl">
              M&amp;A execution, without the spreadsheet chaos.
            </h1>

            <div className="mt-8 space-y-4 text-lg leading-relaxed text-ink">
              <p>
                A deal closes on the legal calendar, not the separation plan.
                Your TSAs run 12 to 36 months. Your Day 1 readiness sits on
                spreadsheets scattered across four organisations. And the cost
                of getting it wrong compounds monthly.
              </p>
              <p className="text-[17px] text-muted">
                MeridianCogent is a control environment for the people running
                the hardest part of the deal — the part that happens after
                close. Separation offices and integration teams use it to track
                obligations, manage TSAs, measure Day 1 readiness, and hold
                themselves to the commitments they&apos;ve made.
              </p>
              <p className="text-[17px] text-muted">
                It&apos;s built for people who know that &ldquo;in progress&rdquo;
                is not a state, that dependencies matter more than features, and
                that the decision record is as valuable as the deal itself.
              </p>
            </div>

            <div className="mt-10 max-w-xl">
              <p className="text-sm font-medium text-navy">
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
      <section aria-labelledby="who" className="py-20 md:py-28">
        <Container>
          <h2 id="who" className="font-serif text-3xl text-navy md:text-4xl">
            Who this is for
          </h2>
          <div className="mt-12 grid gap-x-10 gap-y-14 sm:grid-cols-2">
            {PERSONAS.map((persona) => (
              <div key={persona.heading} className="flex flex-col">
                <LineGraphMotif
                  variant={persona.motif}
                  tone="navy"
                  strokeWidth={4}
                  className="h-14 w-28"
                />
                <h3 className="mt-5 font-serif text-xl text-navy">
                  {persona.heading}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {persona.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How MeridianCogent thinks about execution */}
      <section
        id="approach"
        aria-labelledby="approach-heading"
        className="scroll-mt-24 border-y border-black/5 bg-ice/20 py-20 md:py-28"
      >
        <Container>
          <div className="max-w-3xl">
            <h2
              id="approach-heading"
              className="font-serif text-3xl text-navy md:text-4xl"
            >
              How MeridianCogent thinks about execution
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink">
              The hardest part of a deal isn&apos;t agreeing it. It&apos;s
              everything that has to happen after close — across organisations
              that don&apos;t share systems, on a timeline set by the legal
              calendar rather than the work.
            </p>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {APPROACH.map((item) => (
              <div key={item.heading}>
                <div className="h-px w-12 bg-navy" />
                <h3 className="mt-4 font-serif text-lg text-navy">
                  {item.heading}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 max-w-3xl text-lg leading-relaxed text-ink">
            MeridianCogent is the category of tool that treats execution as the
            deliverable: one source of truth for obligations and readiness, held
            to the commitments that were actually made.
          </p>
        </Container>
      </section>

      {/* Early access */}
      <section aria-labelledby="early-access-home" className="py-20 md:py-28">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
            <div>
              <h2
                id="early-access-home"
                className="font-serif text-3xl text-navy md:text-4xl"
              >
                Get updates as we open access.
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-muted">
                We&apos;re building for the integration and separation teams
                running deals right now. Early access opens in phases —
                diagnostics first, then the full platform. If you&apos;re
                running a carve-out or integration, we&apos;d like to hear from
                you.
              </p>
              <p className="mt-4 text-sm">
                <Link
                  href="/early-access"
                  className="font-medium text-navy underline underline-offset-4 hover:text-muted"
                >
                  What early access means
                </Link>
              </p>
            </div>
            <div className="rounded-lg border border-black/10 bg-white p-6 md:p-8">
              <EarlyAccessForm source="homepage-early-access" />
            </div>
          </div>
        </Container>
      </section>

      {/* Resources preview */}
      <section
        aria-labelledby="resources-preview"
        className="border-t border-black/5 py-20 md:py-28"
      >
        <Container>
          <div className="flex items-end justify-between gap-6">
            <h2
              id="resources-preview"
              className="font-serif text-3xl text-navy md:text-4xl"
            >
              Resources
            </h2>
            <Link
              href="/resources"
              className="shrink-0 text-sm font-medium text-navy underline underline-offset-4 hover:text-muted"
            >
              All articles
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
