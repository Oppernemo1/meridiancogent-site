import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SidebarLayout } from "@/components/SidebarLayout";
import { DataPanel } from "@/components/DataPanel";
import { ChainDiagram, type ChainNode } from "@/components/ChainDiagram";
import {
  CountryLaneTimeline,
  type TimelineLane,
} from "@/components/CountryLaneTimeline";
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
        className="text-graphite underline underline-offset-4 hover:text-accent-dark"
      >
        Day 1 readiness
      </Link>
    ),
    description:
      "What is actually blocking Day 1, derived from the chain rather than typed into a status field.",
  },
];

/**
 * Separator between an item's term and its gloss in the lists below. Each
 * item is authored as "Term — gloss": the term renders as the row heading
 * and the gloss as the muted line beneath it, so the dash is a field
 * separator rather than punctuation and is dropped on render. An item with
 * no dash renders as a term on its own.
 */
const ITEM_SEP = " — ";

const TIMELINE_MILESTONES = [
  "Signing",
  "Day 1",
  "TSA exit",
  "Integration complete",
];

// Illustrative, and deliberately only three lanes: enough to show that
// jurisdictions run independently without implying a country list.
const TIMELINE_LANES: TimelineLane[] = [
  {
    name: "Programme",
    note: "the consolidated date",
    states: ["reached", "reached", "reached", "pending"],
  },
  {
    name: "Germany",
    note: "consultation not closed",
    states: ["reached", "reached", "blocked", "pending"],
  },
  {
    name: "US",
    note: "exited on schedule",
    states: ["reached", "reached", "reached", "reached"],
  },
];


const WHAT_IT_COVERS_GROUPS = [
  {
    heading: "Scope and obligations",
    items: [
      "The perimeter register — what transfers, what is retained, what remains disputed",
      "Obligations and conditions precedent — what must be done, and what gates closing",
      "The consent register — change-of-control consents and where they stand",
      "Contract novation and assignment — the full population to be re-papered",
      "Attestations — who confirmed what, and when",
    ],
  },
  {
    heading: "Cost and risk",
    items: [
      "TSA catalogue and exposure — services, multi-currency, overrun and step-up pricing",
      "Integration budget and cost-to-complete — what the capture is costing",
      "Stranded costs — the overhead that does not leave when the business does",
      "Advisory and transaction fees — what the advisers on the deal are costing",
      "Risk register — assessed on two dimensions, never reduced to a score",
      "The synergy ledger — with every amount stating what it represents",
      "Delay scenarios — what a slipped date does to exit timing and cost",
    ],
  },
  {
    heading: "Execution",
    items: [
      "Programme structure — tasks, workstreams, typed dependencies and a real critical path",
      "Guided programme setup — a new programme shows what still needs to be configured rather than turning missing information into a zero",
      "Gates that block rather than annotate",
      "Systems register and decommission sequencing — what the business runs on, and the order it comes apart in",
      "Day 1 readiness — derived from the chain, not typed into a status field",
      "Cutover runbook and hypercare — for the weekend itself, and the weeks immediately after",
      "The communications plan — who hears what, and when",
      "Escalations with a clock",
      "Reusable playbooks — platform and organisation-owned playbooks instantiate tasks, dependencies, role mappings and country-specific work against programme milestones, then can be adapted and saved back as reusable operating standards",
    ],
  },
  {
    heading: "Getting data in and out",
    items: [
      "Bulk import — because a real carve-out arrives as a spreadsheet",
      "Email-in — for the people who will never log in",
      "Exports, watermarked to whoever generated them",
      "Full programme export — registers, decisions and the audit history remain readable outside the platform, not trapped inside the application",
      "Public tools — a TSA exit cost calculator and a Day 1 readiness score, both planned and not yet built",
    ],
  },
  {
    heading: "Visibility and record",
    items: [
      "Control tower, exceptions first — six-week trajectories for Day 1 readiness, TSA monthly exposure and open blockers, each showing the coverage behind the number rather than a bare figure",
      "Timeline rail — the programme sequence from signing through Day 1, TSA exit and integration completion, with country-specific lanes showing where jurisdictions diverge or block",
      "Waiting on me — one view of everything currently requiring action from you, matched across every register by identity rather than by name",
      "Executive review — the same governed numbers as the control tower, reweighted for steering committees, with a factual view of what changed since the last review point: gates cleared or reopened, dates moved, risks escalated, grouped by workstream",
      "Portfolio view across several programmes — where an organisation is running more than one separation at a time",
      "Coverage stays visible — incomplete modelling, stale assumptions and unavailable inputs remain beside the figures they qualify, rather than disappearing behind a dashboard total",
      "Dedicated external workspace — advisors, counsel and other guests see the records and actions shared with them for their engagement, not a reduced copy of the full programme control tower",
      "The decision record — append-only, corrections supersede",
      "Board pack export — for the meeting that happens outside the platform",
      "Activity centre and command palette — what changed recently, and a way to reach any record without hunting for it",
    ],
  },
];

const SECTIONS = [
  { id: "covers", label: "What it covers" },
  { id: "chain", label: "The chain" },
  { id: "timeline", label: "Timeline" },
  { id: "gates", label: "Gates" },
  { id: "record", label: "The record" },
  { id: "tsa", label: "TSA exposure" },
  { id: "scenarios", label: "Scenarios" },
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
        <Container className="relative py-section md:py-section-lg">
          <div className="max-w-3xl">
            <h1 className="text-balance text-h1-sm md:text-h1">
              The execution layer for separations and integrations
            </h1>
            <p className="mt-heading-gap text-body-sm leading-relaxed text-ink md:text-body">
              MeridianCogent models how a carve-out actually works — what a
              business depends on, what has to be untangled, in what order,
              and what it costs when that slips. Currently in testing.
            </p>
          </div>
        </Container>
      </section>

      <SidebarLayout sections={SECTIONS}>
        {/* What it covers */}
        <Section id="covers" label="What it covers" heading="Everything a separation actually runs on" divider={false} wide>
          <p className="max-w-measure">
            A carve-out is not one problem. It is scope, obligations,
            contracts, costs, systems, people and dates, all moving at once
            and all depending on each other. MeridianCogent holds them in
            one place.
          </p>

          {/* Balanced columns rather than a grid: the groups are different
              lengths, and a grid stretches every cell in a row to the tallest
              one — which left a near-empty cell beside the longest group and
              an empty third cell, adding ~1200px of whitespace. Multi-column
              flows the groups and balances the column heights instead.
              `break-inside-avoid` keeps each group whole. */}
          <div className="columns-1 gap-x-10 sm:columns-2 lg:columns-3">
            {WHAT_IT_COVERS_GROUPS.map((group) => (
              <div key={group.heading} className="mb-12 break-inside-avoid">
                <div aria-hidden="true" className="h-px w-10 bg-accent" />
                <h3 className="mt-3 text-h3 text-graphite">
                  {group.heading}
                </h3>
                <ul className="mt-4 divide-y divide-hairline border-t border-hairline">
                  {group.items.map((item) => {
                    const sepIndex = item.indexOf(ITEM_SEP);
                    const term =
                      sepIndex === -1 ? item : item.slice(0, sepIndex);
                    const gloss =
                      sepIndex === -1
                        ? null
                        : item.slice(sepIndex + ITEM_SEP.length);
                    return (
                      <li key={item} className="py-2.5">
                        <p className="text-body-sm font-semibold leading-snug text-graphite">
                          {term}
                        </p>
                        {gloss && (
                          <p className="mt-1 text-small leading-snug text-muted">
                            {gloss}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <p className="max-w-measure">
            Some of this is live today and some is in build. MeridianCogent
            is not commercially available yet.
          </p>
        </Section>

        {/* The chain */}
        <Section id="chain" label="The chain" heading="Most tools track tasks. This one tracks consequence." wide>
          <p className="max-w-measure">
            A separation is not a list of work. It is a chain of
            dependencies where each link determines the next, and where
            the cost of a missed link compounds rather than accumulates.
          </p>
          <p className="max-w-measure">
            A shared system has to be untangled before a transitional
            service can end. That service has to end before the business
            is genuinely standalone. Whether it will end on time is
            knowable months ahead of the date — but only if the dependency
            between the two is modelled rather than assumed.
          </p>
          <p className="max-w-measure">
            MeridianCogent models that chain explicitly:
          </p>

          <ChainDiagram nodes={CHAIN_NODES} />

          <p className="max-w-measure">
            Every stage reads from the one before it. Nothing in this chain
            is a status someone updates by hand.
          </p>
        </Section>

        {/* Timeline */}
        <Section id="timeline" label="Timeline" heading="Jurisdictions run on their own clocks">
          <p className="max-w-measure">
            A separation does not happen in one place. The programme has a
            sequence — signing, Day 1, TSA exit, integration completion —
            and every jurisdiction inside it runs that sequence on its own
            calendar, against its own filings, consents and consultation
            periods.
          </p>
          <p className="max-w-measure">
            The timeline rail holds both. Country lanes show where a
            jurisdiction has diverged from the programme date or blocked
            outright, and what that does to the milestones downstream of it.
          </p>

          <CountryLaneTimeline
            milestones={TIMELINE_MILESTONES}
            lanes={TIMELINE_LANES}
            caption="Illustrative. Germany is blocked at TSA exit while the US lane exits on schedule — the block does not stop the other lanes, but the consolidated integration date sits downstream of it and cannot be treated as reached."
          />

          <p className="max-w-measure">
            A programme date is only as good as its latest lane. Showing the
            lanes separately is what makes that visible before the date
            arrives rather than after it.
          </p>
        </Section>

        {/* Gates */}
        <Section id="gates" label="Gates" heading="Gates that actually block">
          <p>
            Most platforms have gates that record disapproval. A gate is
            marked red, and the work continues anyway, because nothing in
            the system can stop it.
          </p>
          <p>
            Here, a gate is a real constraint on the schedule. Work
            downstream of an unsatisfied gate cannot be scheduled as though
            the gate will clear. Conditions precedent block closing rather
            than annotating it. The critical path reflects what is
            genuinely possible, not what the plan assumed in January.
          </p>
          <p>
            This is the difference between a system that reports on a
            programme and a system that governs one.
          </p>
        </Section>

        {/* The record */}
        <Section id="record" label="The record" heading="Every number has a named human behind it">
          <p>
            The platform does not source legal requirements, costs,
            valuations or jurisdictional rules. Every material figure is
            entered by a customer or their advisor, and formally adopted by
            a named person before it can affect a plan.
          </p>
          <p>
            When it is adopted, the platform takes a snapshot of exactly
            what was adopted and when. If the underlying figure later
            changes, the adoption is marked stale rather than silently
            updating — the original decision remains visible, along with
            who made it and on what basis.
          </p>
          <p>
            Corrections are made by superseding a record, never by
            overwriting one. The history of what was believed, and when,
            survives intact.
          </p>
          <p>
            <Link
              href="/principles"
              className="text-accent-dark underline underline-offset-4 hover:text-muted"
            >
              This constraint is deliberate and it is not negotiable. A
              platform that asserts what a jurisdiction requires has taken
              on a liability it cannot discharge and a claim it cannot stand
              behind.
            </Link>
          </p>
          <p>
            Access is scoped to the programme rather than the organisation.{" "}
            <Link
              href="/security"
              className="text-accent-dark underline underline-offset-4 hover:text-muted"
            >
              Security and confidentiality
            </Link>{" "}
            covers how.
          </p>
        </Section>

        {/* TSA */}
        <Section
          id="tsa"
          label="TSA exposure"
          heading="Transitional services, modelled as exposure"
          panel={
            <DataPanel
              label="Modelled"
              rows={[
                { label: "Service catalogue", value: "Multi-currency" },
                { label: "Exposure", value: "With step-up" },
                { label: "Exit risk", value: "Months ahead" },
              ]}
            />
          }
        >
          <p>
            A{" "}
            <Link
              href="/resources/what-is-a-tsa"
              className="text-accent-dark underline underline-offset-4 hover:text-muted"
            >
              TSA
            </Link>{" "}
            is not a document to be stored. It is a live cost with an end
            date that may or may not hold.
          </p>
          <p>
            The platform holds the service catalogue across multiple
            currencies, models exposure and overrun including step-up
            pricing, and — critically — connects each service to the
            separation work that has to finish before it can end. Where
            the modelled completion of that work falls after the
            contractual exit date, that is surfaced as exit risk, months
            before it becomes an invoice.
          </p>
          <p>
            The point is not to record what the TSA costs.{" "}
            <Link
              href="/resources/the-real-cost-of-a-late-tsa-exit"
              className="text-accent-dark underline underline-offset-4 hover:text-muted"
            >
              It is to know, in March, that the September exit will not
              happen.
            </Link>
          </p>
        </Section>

        {/* Scenarios */}
        <Section id="scenarios" label="Scenarios" heading="What happens if this slips?">
          <p>
            It is one thing to know a transitional service exits in
            September. It is another to know what a two-week delay on a
            single cutover does to that date — and to the invoice that
            follows it.
          </p>
          <p>
            MeridianCogent is being built to answer that directly: take the
            current schedule, move one date, and see which transitional
            services can no longer end when they were meant to, and what
            that costs.
          </p>
          <p>
            The question a CFO actually asks is not what the plan says. It
            is what the plan costs when it does not hold.
          </p>
        </Section>
      </SidebarLayout>
    </>
  );
}
