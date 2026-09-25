// Client-safe: plain data, no filesystem access, so the guide pages and the
// /resources index can both import it.
//
// Every figure and section heading below is taken from the PDF it describes.
// Nothing here is written to fill space: if a number appears on this page it
// appears in the guide, attributed to the same source. Keep it that way — the
// point of these pages is that the claim is checkable before the download.

export type GuideFigure = {
  /** The number as the guide states it. */
  value: string;
  /** What the number measures. */
  label: string;
  /** Who published it. */
  source: string;
};

export type Guide = {
  slug: string;
  /** Page h1 and the guide's own cover title. */
  title: string;
  /** Search-facing <title>/description. */
  metaTitle: string;
  metaDescription: string;
  /** The guide's own cover subtitle, verbatim. */
  standfirst: string;
  /** Tag shown above the h1, matching the article tag treatment. */
  tag: string;
  /** Served straight from public/. Filenames are stable — they get linked externally. */
  pdf: string;
  pages: number;
  /** The crawlable substance: 150–250 words of real content. */
  intro: string[];
  /** The guide's actual section headings. */
  contents: { heading: string; detail: string }[];
  /** Real sourced figures printed in the guide. */
  figures: GuideFigure[];
  /** Sources cited in the guide itself. */
  sources: string;
  /**
   * Optional explanatory diagram rendered after the intro. Keyed rather than
   * inferred from the slug so the guide page needs no per-guide branching.
   */
  diagram?: "cost-mechanisms";
  /**
   * Articles this guide is drawn from, shown as "The writing behind it".
   *
   * TEMP substitutes: three of these point at the nearest published article
   * rather than the intended one, which isn't written yet. Revisit alongside
   * the matching CTA comments in content/resources/*.mdx:
   *   day-1-readiness-checklist       -> wants carve-out-checklist
   *                                      and separation-management-office
   *   tsa-exit-plan-workbook          -> wants tsa-exit-plan
   *   separation-cost-model-worksheet -> wants separation-cost-model
   * See SITE-BUILD-MANUAL Part 4.
   */
  related: { slug: string; title: string }[];
};

export const GUIDES: Guide[] = [
  {
    slug: "day-1-readiness-checklist",
    title: "The Carve-Out Day 1 Readiness Checklist",
    metaTitle: "Carve-Out Day 1 Readiness Checklist",
    metaDescription:
      "A working Day 1 readiness checklist across HR, IT, Finance, Legal, Procurement, Facilities and TSA — built on four tests per item, not a single done flag. Free PDF.",
    standfirst:
      "A working checklist across HR, IT, Finance, Legal, Procurement, Facilities and TSA — with the readiness test that separates a completed task from an actually unblocked one.",
    tag: "Carve-out",
    pdf: "/guides/day-1-readiness-checklist.pdf",
    pages: 6,
    intro: [
      "Most carve-out checklists answer one question: has this task been done? That question matters, but it is not the one that determines whether Day 1 actually works. A task can be finished by the team that owns it and still leave the business unable to operate, if the thing it was supposed to unblock for someone else has not landed.",
      "This checklist is built around four questions for every material item rather than one. Complete: has the work itself been performed? Evidenced: is there objective proof it works, not just an assertion? Unblocked: are the prerequisites genuinely resolved, not just scheduled? Ready: can the downstream outcome now actually happen?",
      "The working tables cover five functions, and each item carries the evidence that would prove it — a reconciliation report with variance within tolerance rather than \"payroll tested\", a real test transaction rather than \"bank accounts opened\", role-based access control validated rather than access enabled. The closing section deals with sequencing: entity formation, regulatory approvals, permits and statutory consultation periods contain waiting periods that no amount of extra resource shortens, and they set the actual floor on the timeline regardless of how well-resourced everything else is.",
      "It requires no software. It is built to be useful with a spreadsheet and a disciplined owner.",
    ],
    contents: [
      {
        heading: "Before you start: completion is not the same as readiness",
        detail:
          "The four-question test — complete, evidenced, unblocked, ready — applied to every material item.",
      },
      {
        heading: "HR & People",
        detail:
          "Transferring population sign-off, countersigned contracts, payroll parallel run, employee consultation, benefits, manager toolkits.",
      },
      {
        heading: "IT & Systems",
        detail:
          "Application UAT, access provisioning, identity and SSO migration, cutover and rollback approval, data migration validation.",
      },
      {
        heading: "Finance",
        detail:
          "Bank accounts, opening balance sheet, standalone AP/AR, carve-out financial statements, retention and audit trail.",
      },
      {
        heading: "Legal & Procurement",
        detail:
          "NewCo entities per jurisdiction, permits and licences, contract classification, change-of-control consents.",
      },
      {
        heading: "Facilities, TSA & Operations",
        detail:
          "Site access and badging, the full TSA service catalogue, the seller-side stranded-cost action plan, rehearsed Day 1 processes.",
      },
      {
        heading: "Sequencing: start with what you can't compress",
        detail:
          "What should already be underway well before close, in the final months, in the final weeks, and on Day 1 itself.",
      },
    ],
    figures: [
      {
        value: "51%",
        label:
          "of divesting companies saw a profitability drop greater than 3.3pp in year one post-divestiture",
        source: "Deloitte",
      },
      {
        value: "1–5% of revenue",
        label: "one-off separation costs, typical range across 50+ divestitures",
        source: "BCG",
      },
      {
        value: "10%+ of revenue",
        label: "one-off separation costs for complex or large carve-outs",
        source: "BCG",
      },
    ],
    sources:
      "Deloitte, “Day One Readiness”; Umbrex, “Checklist: HR-Related Actions for Day 1 Readiness”; PwC, TSA exit value analysis; BCG, separation cost research across 50+ divestitures; McKinsey, “Solving the carve-out conundrum.”",
    related: [
      {
        slug: "what-day-1-ready-actually-means-in-a-carve-out",
        title: "What ‘Day 1 Ready’ Actually Means in a Carve-Out",
      },
      {
        slug: "separation-timing-paradox",
        title: "The Separation Readiness Paradox",
      },
    ],
  },
  {
    slug: "tsa-exit-plan-workbook",
    title: "The TSA Exit Plan Workbook",
    metaTitle: "TSA Exit Plan Workbook",
    metaDescription:
      "A month-by-month TSA exit structure, a service-by-service exit acceptance matrix, and the failure patterns behind most TSA exits that run long. Free PDF.",
    standfirst:
      "A month-by-month operating structure, a service-by-service exit acceptance matrix, and the failure patterns that account for most TSA exits that run long.",
    tag: "TSA",
    pdf: "/guides/tsa-exit-plan-workbook.pdf",
    pages: 6,
    intro: [
      "Every TSA has an exit date written into it. Very few have a working operating plan behind that date — the milestones, owners and acceptance gates that actually get the buyer to standalone capability on schedule. A signed date with no plan behind it is a hope, not a schedule.",
      "This workbook gives you the structure to build that plan. It starts with the service catalogue, because that is the single most valuable document in the exit plan and the one most often left incomplete: built once at signing and never revisited. From there it sets out a month-by-month sequence for a program running across roughly a twelve-month window, from establishing the baseline through build-buy-migrate-terminate decisions, execution, cutover preparation, and economic close-out.",
      "The exit acceptance matrix applies four questions to every service rather than one — is replacement capability built, has it been tested against real criteria, are its prerequisites genuinely resolved, and can the downstream process now run on it. The workbook includes a worked matrix covering payroll, ERP, identity and billing, with the exit condition, evidence, approver and downstream dependency for each.",
      "It closes on the failure patterns that recur in practitioner guidance independent of deal specifics: under-scoped TSAs, identity left until last, payroll without a parallel run, big-bang billing migrations, and gold-plating the standalone build.",
    ],
    contents: [
      {
        heading: "Before you start: the exit date and the exit plan are different documents",
        detail:
          "Why a negotiated date without milestones, owners and acceptance gates behind it is not a schedule.",
      },
      {
        heading: "Step 1 — Build the service catalogue first",
        detail:
          "Every service, owned on both sides, with a target exit date and its dependencies.",
      },
      {
        heading: "Step 2 — A month-by-month structure",
        detail:
          "Baseline, build-buy-migrate-terminate decisions, execution, cutover preparation, and service exits with economic close-out.",
      },
      {
        heading: "Step 3 — The exit acceptance matrix",
        detail:
          "Complete, evidenced, unblocked, ready — applied per service, with a worked example for payroll, ERP, identity and billing.",
      },
      {
        heading: "Step 4 — The artefacts that make this real",
        detail:
          "Service catalogue, cutover runbook per service family, cost and benefits tracker, risk and commitments register, acceptance matrix.",
      },
      {
        heading: "Step 5 — Failure patterns worth knowing in advance",
        detail:
          "Under-scoped TSAs, identity left until last, payroll without a parallel run, big-bang billing migrations, gold-plating the standalone build.",
      },
    ],
    figures: [
      {
        value: "15–25% / month",
        label: "typical extension escalation on a missed exit date",
        source: "practitioner guidance",
      },
      {
        value: "12–24 months",
        label: "seller cost-takeout lag if started only at TSA end",
        source: "BD Emerson",
      },
      {
        value: "5–7%",
        label: "observed TSA value uplift from early, disciplined exit",
        source: "PwC",
      },
    ],
    sources:
      "Mayer Brown, “Negotiating Transition Services Agreements in Carve-Out M&A Deals”; BD Emerson, “TSA Exit Planning and Stranded Costs”; Introlution, “Carve-Outs & TSAs: Exit Cleanly and On Time”; PwC, TSA exit value analysis.",
    related: [
      {
        slug: "what-is-a-tsa",
        title: "What Is a Transition Service Agreement (TSA)?",
      },
      {
        slug: "the-real-cost-of-a-late-tsa-exit",
        title: "The Real Cost of a Late TSA Exit",
      },
    ],
  },
  {
    slug: "separation-cost-model-worksheet",
    title: "The Separation Cost Model Worksheet",
    metaTitle: "Separation Cost Model Worksheet",
    metaDescription:
      "The six separation cost mechanisms most deal models miss, a buyer/seller exposure map, and a worksheet to size your own transaction against sourced benchmarks. Free PDF.",
    standfirst:
      "Six cost mechanisms most deal models miss, a buyer/seller exposure map, and a worksheet to size your own transaction against real benchmarks.",
    tag: "Carve-out",
    pdf: "/guides/separation-cost-model-worksheet.pdf",
    pages: 6,
    intro: [
      "The purchase price is negotiated once. Separation economics move every week.",
      "Separation cost is not one number. It is a portfolio of distinct mechanisms distributed across buyer and seller, one-time and recurring, fixed and execution-dependent. A deal model that treats “separation cost” as a single contingency line is missing the fact that it is actually six separate mechanisms, each with its own driver and its own timeline.",
      "This worksheet works through all six: one-off separation costs, TSA costs including step-up and extension pricing, standalone cost uplift, stranded costs, dis-synergies, and execution slippage. Each is given with its benchmark and its source, and then mapped to whose economics it actually lands on — because separation cost is not one symmetric number shared by both sides. Stranded costs sit with the seller. Standalone uplift sits with the new entity. TSA cost sits primarily with the buyer as the party paying for the service.",
      "The worksheet itself is a structure rather than a formula: mechanism, estimate, basis and source, owner. There is a deliberately illustrative example showing how an original “€12M separation budget” was never really a €12M economic exposure, because each mechanism hits a different P&L, in a different period, owned by a different function. That fragmentation is why the consolidated number goes stale even when every function is tracking its own piece carefully.",
    ],
    contents: [
      {
        heading: "Before you start: the purchase price is negotiated once",
        detail:
          "Why a single separation contingency line misses six mechanisms with different drivers and timelines.",
      },
      {
        heading: "Mechanism 1 — One-off separation costs",
        detail:
          "Legal and entity setup, IT and data migration, PMO and advisory fees, HR transition, facilities.",
      },
      {
        heading: "Mechanism 2 — TSA costs",
        detail:
          "Not just base service charges: the step-up and extension pricing that activates past base term.",
      },
      {
        heading: "Mechanism 3 — Standalone cost uplift",
        detail:
          "The gap between what a service costs at the parent's scale and what it costs to run independently.",
      },
      {
        heading: "Mechanism 4 — Stranded costs",
        detail:
          "Seller-side costs that remain after the corresponding business leaves.",
      },
      {
        heading: "Mechanism 5 — Dis-synergies",
        detail:
          "The benefit of combination that disappears on separation — harder to quantify, so most likely to be assumed away.",
      },
      {
        heading: "Mechanism 6 — Execution slippage",
        detail:
          "The cost of the plan not holding: extra TSA months at step-up pricing, duplicate running costs, delayed value capture.",
      },
      {
        heading: "Whose economics are they? Plus the worksheet",
        detail:
          "A buyer/seller exposure map per mechanism, and the blank structure to size your own transaction.",
      },
    ],
    figures: [
      {
        value: "1–5% of revenue",
        label:
          "one-off separation costs, exceeding 10% for complex or large carve-outs",
        source: "BCG",
      },
      {
        value: "up to 200% of allocation",
        label:
          "observed cost of replacing centrally allocated services when standing up alone",
        source: "McKinsey",
      },
      {
        value: "20–40% of allocation",
        label: "stranded costs, as a share of cost previously allocated to the divested business",
        source: "BD Emerson",
      },
      {
        value: "51% of sellers",
        label: "saw a profitability drop greater than 3.3pp in year one",
        source: "Deloitte",
      },
    ],
    sources:
      "BCG, “The 2021 M&A Report: Mastering the Art of Breaking Up” and “6 Technology Due Diligence Imperatives in Carve-outs”; McKinsey, “Solving the carve-out conundrum”; Deloitte, 2026 Global Divestiture Survey; BD Emerson, TSA and stranded cost analysis.",
    diagram: "cost-mechanisms",
    related: [
      {
        slug: "stranded-costs",
        title: "Stranded Costs: The Divestiture Number That Shows Up a Year Late",
      },
      {
        slug: "scope-creep-carveout",
        title: "Scope Creep in M&A Carve-Outs",
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function guideHref(slug: string): string {
  return `/resources/guides/${slug}`;
}
