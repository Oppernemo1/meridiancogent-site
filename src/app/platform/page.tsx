import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import { ChainDiagram, type ChainNode } from "@/components/ChainDiagram";
import { BackgroundLines } from "@/components/LineGraphMotif";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const TITLE = "Platform";
const DESCRIPTION =
  "The execution layer for M&A separations and integrations: systems, TSA exit risk, Day 1 readiness, delay scenarios, and a decision record with a named human behind every number.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/platform" },
  openGraph: {
    url: "/platform",
    title: `${TITLE} — ${SITE_NAME}`,
    description: DESCRIPTION,
  },
  twitter: {
    title: `${TITLE} — ${SITE_NAME}`,
    description: DESCRIPTION,
  },
};

const CHAIN_NODES: ChainNode[] = [
  {
    title: "Systems register",
    description: "What the business runs on, and what it shares with the parent.",
  },
  {
    title: "Decommission sequencing",
    description:
      "What has to be separated, untangled or stood up, and in what order.",
  },
  {
    title: "TSA exit dependencies",
    description:
      "Which transitional services cannot end until that work completes.",
  },
  {
    title: "Exit risk",
    description:
      "Where the modelled completion date falls after the contractual exit date.",
  },
  {
    title: (
      <Link
        href="/resources/what-day-1-ready-actually-means-in-a-carve-out"
        className="text-ice underline underline-offset-4 hover:text-white"
      >
        Day 1 readiness
      </Link>
    ),
    description:
      "What is actually blocking Day 1, derived from the chain rather than typed into a status field.",
  },
];

const SCOPE_ITEMS = [
  {
    lead: "Obligations and conditions precedent",
    body: "what must be done, and what gates closing",
  },
  {
    lead: "The consent register",
    body: "change-of-control consents and where they stand",
  },
  {
    lead: "Contract novation",
    body: "the full population of contracts to be re-papered, assigned or novated",
  },
  {
    lead: "The perimeter register",
    body: "what transfers, what is retained, and what remains disputed",
  },
  {
    lead: "Risk register",
    body: "assessed on two dimensions, never reduced to a score",
  },
  {
    lead: "Integration budget and cost-to-complete",
    body: "what the capture is costing",
  },
  {
    lead: "Stranded costs",
    body: "the overhead that does not leave when the business does",
  },
  {
    lead: "Delay scenarios",
    body: "what a slipped date does to exit timing and cost",
  },
  {
    lead: "Cutover runbook and hypercare",
    body: "the hours around Day 1, and the weeks after",
  },
  {
    lead: "The communications plan",
    body: "what gets said, to whom, when",
  },
  {
    lead: "Playbooks",
    body: "Day 1 readiness, first hundred days, and carve-out separation, as starting structure rather than an empty list",
  },
  {
    lead: "Bulk import",
    body: "because a real carve-out arrives as a spreadsheet",
  },
];

export default function PlatformPage() {
  const softwareApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    description:
      "Execution platform for M&A separations, carve-outs and integrations: systems dependencies, TSA exit risk, Day 1 readiness and an auditable decision record.",
    operatingSystem: "Web",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // SoftwareApplication schema only — no offers, price, or
        // aggregateRating: there is no published price and no reviews.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationJsonLd),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <BackgroundLines className="pointer-events-none absolute inset-0 h-full w-full" />
        <Container className="relative py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-balance font-serif text-display-sm leading-[1.1] text-navy md:text-display">
              The execution layer for separations and integrations
            </h1>
            <p className="mt-8 text-body-lg leading-relaxed text-ink">
              MeridianCogent models how a carve-out actually works — what a
              business depends on, what has to be untangled, in what order,
              and what it costs when that slips. Currently in development.
            </p>
          </div>
        </Container>
      </section>

      {/* The chain */}
      <section
        aria-labelledby="chain-heading"
        className="bg-navy py-20 text-white md:py-32"
      >
        <Container>
          <div className="max-w-measure">
            <h2
              id="chain-heading"
              className="font-serif text-h2-sm text-white md:text-h2"
            >
              Most tools track tasks. This one tracks consequence.
            </h2>
            <p className="mt-6 text-body-lg leading-relaxed text-on-navy-secondary">
              A separation is not a list of work. It is a chain of
              dependencies where each link determines the next, and where
              the cost of a missed link compounds rather than accumulates.
            </p>
            <p className="mt-5 text-body-lg leading-relaxed text-on-navy-secondary">
              A shared system has to be untangled before a transitional
              service can end. That service has to end before the business
              is genuinely standalone. Whether it will end on time is
              knowable months ahead of the date — but only if the dependency
              between the two is modelled rather than assumed.
            </p>
            <p className="mt-5 text-body-lg leading-relaxed text-on-navy-secondary">
              MeridianCogent models that chain explicitly:
            </p>
          </div>

          <ChainDiagram nodes={CHAIN_NODES} />

          <p className="mt-12 max-w-measure text-body-lg leading-relaxed text-on-navy-secondary md:mt-16">
            Every stage reads from the one before it. Nothing in this chain
            is a status someone updates by hand.
          </p>
        </Container>
      </section>

      {/* Gates */}
      <section aria-labelledby="gates-heading" className="py-20 md:py-32">
        <Container>
          <div className="max-w-measure">
            <h2
              id="gates-heading"
              className="font-serif text-h2-sm text-navy md:text-h2"
            >
              Gates that actually block
            </h2>
            <p className="mt-6 text-body-lg leading-relaxed text-ink">
              Most platforms have gates that record disapproval. A gate is
              marked red, and the work continues anyway, because nothing in
              the system can stop it.
            </p>
            <p className="mt-5 text-body-lg leading-relaxed text-ink">
              Here, a gate is a real constraint on the schedule. Work
              downstream of an unsatisfied gate cannot be scheduled as though
              the gate will clear. Conditions precedent block closing rather
              than annotating it. The critical path reflects what is
              genuinely possible, not what the plan assumed in January.
            </p>
            <p className="mt-5 text-body-lg leading-relaxed text-ink">
              This is the difference between a system that reports on a
              programme and a system that governs one.
            </p>
          </div>
        </Container>
      </section>

      {/* The record */}
      <section
        aria-labelledby="record-heading"
        className="bg-navy py-20 text-white md:py-32"
      >
        <Container>
          <div className="max-w-measure">
            <h2
              id="record-heading"
              className="font-serif text-h2-sm text-white md:text-h2"
            >
              Every number has a named human behind it
            </h2>
            <p className="mt-6 text-body-lg leading-relaxed text-on-navy-secondary">
              The platform does not source legal requirements, costs,
              valuations or jurisdictional rules. Every material figure is
              entered by a customer or their advisor, and formally adopted by
              a named person before it can affect a plan.
            </p>
            <p className="mt-5 text-body-lg leading-relaxed text-on-navy-secondary">
              When it is adopted, the platform takes a snapshot of exactly
              what was adopted and when. If the underlying figure later
              changes, the adoption is marked stale rather than silently
              updating — the original decision remains visible, along with
              who made it and on what basis.
            </p>
            <p className="mt-5 text-body-lg leading-relaxed text-on-navy-secondary">
              Corrections are made by superseding a record, never by
              overwriting one. The history of what was believed, and when,
              survives intact.
            </p>
            <p className="mt-5 text-body-lg leading-relaxed text-on-navy-secondary">
              <Link
                href="/principles"
                className="text-ice underline underline-offset-4 hover:text-white"
              >
                This constraint is deliberate and it is not negotiable.
              </Link>{" "}
              A platform that asserts what a jurisdiction requires has taken
              on a liability it cannot discharge and a claim it cannot stand
              behind.
            </p>
          </div>
        </Container>
      </section>

      {/* TSA */}
      <section aria-labelledby="tsa-heading" className="py-20 md:py-32">
        <Container>
          <div className="max-w-measure">
            <h2
              id="tsa-heading"
              className="font-serif text-h2-sm text-navy md:text-h2"
            >
              Transitional services, modelled as exposure
            </h2>
            <p className="mt-6 text-body-lg leading-relaxed text-ink">
              A{" "}
              <Link
                href="/resources/what-is-a-tsa"
                className="text-navy underline underline-offset-4 hover:text-muted"
              >
                TSA
              </Link>{" "}
              is not a document to be stored. It is a live cost with an end
              date that may or may not hold.
            </p>
            <p className="mt-5 text-body-lg leading-relaxed text-ink">
              The platform holds the service catalogue across multiple
              currencies, models exposure and overrun including step-up
              pricing, and — critically — connects each service to the
              separation work that has to finish before it can end. Where
              the modelled completion of that work falls after the
              contractual exit date, that is surfaced as exit risk, months
              before it becomes an invoice.
            </p>
            <p className="mt-5 text-body-lg leading-relaxed text-ink">
              The point is not to record what the TSA costs.{" "}
              <Link
                href="/resources/the-real-cost-of-a-late-tsa-exit"
                className="text-navy underline underline-offset-4 hover:text-muted"
              >
                It is to know, in March, that the September exit will not
                happen.
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* Scenarios */}
      <section
        aria-labelledby="scenarios-heading"
        className="bg-navy py-20 text-white md:py-32"
      >
        <Container>
          <div className="max-w-measure">
            <h2
              id="scenarios-heading"
              className="font-serif text-h2-sm text-white md:text-h2"
            >
              What happens if this slips?
            </h2>
            <p className="mt-6 text-body-lg leading-relaxed text-on-navy-secondary">
              It is one thing to know a transitional service exits in
              September. It is another to know what a two-week delay on a
              single cutover does to that date — and to the invoice that
              follows it.
            </p>
            <p className="mt-5 text-body-lg leading-relaxed text-on-navy-secondary">
              MeridianCogent is being built to answer that directly: take the
              current schedule, move one date, and see which transitional
              services can no longer end when they were meant to, and what
              that costs.
            </p>
            <p className="mt-5 text-body-lg leading-relaxed text-on-navy-secondary">
              The question a CFO actually asks is not what the plan says. It
              is what the plan costs when it does not hold.
            </p>
          </div>
        </Container>
      </section>

      {/* Money */}
      <section aria-labelledby="money-heading" className="py-20 md:py-32">
        <Container>
          <div className="max-w-measure">
            <h2
              id="money-heading"
              className="font-serif text-h2-sm text-navy md:text-h2"
            >
              Numbers that mean what they say
            </h2>
            <p className="mt-6 text-body-lg leading-relaxed text-ink">
              A synergy ledger that lets one row mean an annual run rate and
              the next mean a cumulative figure, then adds them together,
              produces an authoritative total that is simply wrong.
            </p>
            <p className="mt-5 text-body-lg leading-relaxed text-ink">
              Every amount in the platform states what it represents before
              it can be stored. Quantities on different bases are never
              summed. Independently reported figures are shown side by side
              rather than netted into a single number that implies a
              precision nobody has.
            </p>
          </div>
        </Container>
      </section>

      {/* Confidentiality */}
      <section
        aria-labelledby="confidentiality-heading"
        className="bg-navy py-20 text-white md:py-32"
      >
        <Container>
          <div className="max-w-measure">
            <h2
              id="confidentiality-heading"
              className="font-serif text-h2-sm text-white md:text-h2"
            >
              Built for deals that are not public
            </h2>
            <p className="mt-6 text-body-lg leading-relaxed text-on-navy-secondary">
              Access is scoped to the programme, not the organisation — being
              an employee of the customer does not grant visibility of a
              deal. Advisors and vendors hold time-bounded, logged access to
              only what they need.
            </p>
            <p className="mt-5 text-body-lg leading-relaxed text-on-navy-secondary">
              Programmes can run under code names. Exports are watermarked to
              the person who generated them. Unusual access patterns are
              detected and surfaced rather than sitting in a log nobody
              reads.
            </p>
            <p className="mt-5 text-body-lg leading-relaxed text-on-navy-secondary">
              These are not enterprise add-ons sold separately. They are how
              the platform works by default, because a separation involves
              people who should not see each other&apos;s information and a
              deal that is not announced yet.
            </p>
          </div>
        </Container>
      </section>

      {/* Scope */}
      <section aria-labelledby="scope-heading" className="py-20 md:py-32">
        <Container>
          <div className="max-w-measure">
            <h2
              id="scope-heading"
              className="font-serif text-h2-sm text-navy md:text-h2"
            >
              What else the platform covers
            </h2>
            <p className="mt-6 text-body-lg leading-relaxed text-ink">
              Alongside the execution chain, MeridianCogent is being built to
              hold the artifacts every transaction actually runs on:
            </p>
          </div>

          <ul className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {SCOPE_ITEMS.map((item) => (
              <li
                key={item.lead}
                className="text-body leading-relaxed text-ink"
              >
                <span className="font-semibold text-navy">{item.lead}</span>{" "}
                — {item.body}
              </li>
            ))}
          </ul>

          <p className="mt-12 max-w-measure text-body-lg leading-relaxed text-ink">
            Some of these are live today and some are in build. MeridianCogent
            is not commercially available yet.
          </p>
        </Container>
      </section>

      {/* Early access */}
      <section
        aria-labelledby="early-access-platform"
        className="bg-navy py-20 text-white md:py-32"
      >
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
            <div>
              <h2
                id="early-access-platform"
                className="font-serif text-h2-sm text-white md:text-h2"
              >
                Early access
              </h2>
              <p className="mt-5 text-body leading-relaxed text-on-navy-secondary">
                MeridianCogent is in development. Join the list for updates
                as we open access.
              </p>
            </div>
            <div className="border border-white/15 bg-white/5 p-6 md:p-8">
              <EarlyAccessForm theme="dark" source="platform-page" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
