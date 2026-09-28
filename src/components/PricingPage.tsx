import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import {
  CurrencyProvider,
  CurrencySwitch,
  Price,
  PriceSheetLink,
} from "@/components/Currency";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { BackgroundLines } from "@/components/LineGraphMotif";
import {
  ARCHIVE_PLAN,
  DIAGNOSTIC,
  EXTRA_PROGRAM,
  LARGER_PLANS,
  PILOT,
  PLANS,
  SERVICES,
  pricingOffers,
  type Currency,
} from "@/lib/pricing";
import { shareMetadata } from "@/lib/metadata";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const PRICING_TITLE = "Pricing";
export const PRICING_SUBLINE =
  "One product. Unlimited people. Security by default. Price scales with the number of live transactions.";

/**
 * Shared by /pricing (EUR) and its USD variant (src/app/usd/pricing), which
 * is served at the same URL — so the canonical is /pricing on both.
 */
export const pricingMetadata: Metadata = {
  title: PRICING_TITLE,
  description: PRICING_SUBLINE,
  alternates: { canonical: "/pricing" },
  ...shareMetadata({
    url: "/pricing",
    title: `${PRICING_TITLE} — ${SITE_NAME}`,
    description: PRICING_SUBLINE,
  }),
};

const INCLUDED = [
  {
    heading: "See the deal",
    body: "Control tower, executive view with Present mode, timeline, portfolio",
  },
  {
    heading: "Plan and execute",
    body: "Tasks and critical path, workstreams, playbooks, Day 1 readiness board, cutover, hypercare, diligence findings, Excel import",
  },
  {
    heading: "Scope and obligations",
    body: "Perimeter, systems and decommissioning, contract novation, obligations, conditions precedent, consents, escalations",
  },
  {
    heading: "Money",
    body: "TSA register and exit costs, delay scenarios, synergies, integration, stranded and transaction costs",
  },
  {
    heading: "Evidence",
    body: "Decision record, watermarked PDF exports with export ID and digest, archive-grade PDF/A",
  },
  {
    heading: "People",
    body: "Unlimited users, unlimited outside guests limited to their program",
  },
];

const SECURITY_POINTS = [
  "Need-to-know access for every program",
  "Code names for undisclosed deals",
  "Append-only audit trail and security alerts",
  "Watermarked, traceable exports",
  "Data hosted in the EU (Frankfurt)",
];

const HOW_PLANS_WORK: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Priced by live deals, not people.",
    body: "Invite the whole deal team and every adviser.",
  },
  {
    heading: "Completed deals don’t count towards your plan.",
    body: "A completed program becomes a read-only archive; with no live deal, the Archive plan keeps every record readable and exportable.",
  },
  {
    heading: "Growing mid-year.",
    body: (
      <>
        A new program can always be started; each extra costs{" "}
        <Price amount={EXTRA_PROGRAM} /> a year, pro-rated, until the next
        plan is the better buy.
      </>
    ),
  },
  {
    heading: "No lock, no delay.",
    body: "A deal that signs tomorrow starts tomorrow.",
  },
];

const FAQ: FaqItem[] = [
  {
    question: "What counts as an active program?",
    answer:
      "A program is one transaction workspace. It counts while active; when you mark it completed it becomes a read-only archive and no longer counts towards your plan.",
  },
  {
    question: "What happens when our deal is finished?",
    answer: (
      <>
        Your completed programs stay readable and exportable. If you have no
        new deal, the Archive plan keeps them available for{" "}
        <Price amount={ARCHIVE_PLAN.price} /> a year.
      </>
    ),
  },
  {
    question: "Are users or guests limited?",
    answer:
      "No. Every plan includes unlimited users and unlimited outside guests. Guests see only the program they are invited to.",
  },
  {
    question: "What if we start another deal mid-year?",
    answer: (
      <>
        Start it straight away. Each program above your plan costs{" "}
        <Price amount={EXTRA_PROGRAM} /> a year, pro-rated to your renewal
        date.
      </>
    ),
  },
  {
    question: "What is the Deal Diagnostic?",
    answer:
      "A fixed-scope first step for teams not ready to run a live deal on the platform: one deal, loaded by your team inside your own account, reviewed with you in a 90-minute session. Your data stays in the platform, and we see it only when you grant access. The fee is credited against a pilot or plan signed within 60 days.",
  },
  {
    question: "Where is our data hosted?",
    answer: "In the European Union, in Frankfurt.",
  },
  {
    question: "How is it contracted?",
    answer:
      "An annual subscription (or 24 months on the Deal plan), invoiced in advance in EUR or USD, with a data processing agreement on every plan. Prices exclude VAT and other applicable taxes. You can export your data at any time, and there are no exit fees.",
  },
  {
    question: "Is the platform giving legal or financial advice?",
    answer:
      "No. MeridianCogent organises and calculates from the data you enter; decisions and professional advice remain yours.",
  },
];

const linkClass =
  "font-medium text-accent-dark underline underline-offset-4 hover:text-muted";
const buttonDark =
  "inline-block bg-graphite px-5 py-3 text-body font-semibold text-on-dark-primary transition-colors hover:bg-graphite/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const buttonLight =
  "inline-block bg-white px-5 py-3 text-body font-semibold text-graphite transition-colors hover:bg-on-dark-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-light";

function SectionHeading({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <p className="text-label font-semibold uppercase text-accent-dark">
        {label}
      </p>
      <h2 id={id} className="mt-2 text-h2-sm md:text-h2">
        {children}
      </h2>
    </>
  );
}

/**
 * The /pricing page body. Rendered by two static routes — /pricing (EUR) and
 * /usd/pricing (USD, reached only through the middleware rewrite) — so each
 * variant's HTML is complete and cacheable, with the switch taking over on
 * the client.
 */
export function PricingPage({ currency }: { currency: Currency }) {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: SITE_NAME,
    url: `${SITE_URL}/pricing`,
    description: PRICING_SUBLINE,
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: pricingOffers(currency),
  };

  return (
    <CurrencyProvider initial={currency}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <BackgroundLines className="pointer-events-none absolute inset-0 h-full w-full" />
        <Container className="relative pt-section pb-10 md:pt-section-lg md:pb-12">
          <div className="max-w-3xl">
            <h1 className="text-balance text-h1-sm md:text-h1">
              Plans and pricing
            </h1>
            <p className="mt-heading-gap text-body-sm leading-relaxed text-ink md:text-body">
              {PRICING_SUBLINE}
            </p>
            <CurrencySwitch className="mt-8" />
          </div>
        </Container>
      </section>

      <Container>
        {/* Plans */}
        <section aria-labelledby="plans-heading" className="pb-section md:pb-section-lg">
          <h2 id="plans-heading" className="sr-only">
            Plans
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className="flex flex-col border border-hairline bg-white p-6"
              >
                <span aria-hidden="true" className="block h-px w-10 bg-accent" />
                <h3 className="mt-3 font-serif text-h2-sm font-semibold text-graphite">
                  {plan.name}
                </h3>
                <p className="mt-1 text-small text-muted">{plan.programs}</p>
                <p className="mt-6 font-serif text-h1-sm text-graphite">
                  <Price amount={plan.price} />
                  <span className="ml-1 font-sans text-small text-muted">
                    per year
                  </span>
                </p>
                {plan.twoYear && (
                  <p className="mt-1 text-small text-muted">
                    or <Price amount={plan.twoYear} /> for 24 months
                  </p>
                )}
                <div className="mt-auto pt-6">
                  <p className="border-t border-hairline pt-4 text-small text-ink">
                    {plan.support}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {LARGER_PLANS.map((plan) => (
              <div
                key={plan.id}
                className="flex flex-col gap-4 rounded-lg bg-graphite p-6 text-on-dark-primary sm:flex-row sm:items-start sm:justify-between"
              >
                <div>
                  <h3 className="font-serif text-h2-sm font-semibold text-on-dark-primary">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-small text-on-dark-secondary">
                    {plan.programs}
                  </p>
                  <p className="mt-3 text-small text-on-dark-secondary">
                    {plan.support}
                  </p>
                </div>
                <p className="shrink-0 text-on-dark-primary sm:text-right">
                  <span className="text-small text-on-dark-secondary">from </span>
                  <span className="font-serif text-h2-sm">
                    <Price amount={plan.price} />
                  </span>
                  <span className="block text-small text-on-dark-secondary">
                    per year
                  </span>
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 border-y border-hairline py-4 text-body-sm leading-relaxed text-ink">
            <strong className="font-semibold text-graphite">
              {ARCHIVE_PLAN.name}:
            </strong>{" "}
            no live deal? Keep every completed program and its decision record
            readable and exportable ·{" "}
            <strong className="font-semibold text-graphite">
              <Price amount={ARCHIVE_PLAN.price} />
            </strong>{" "}
            per year
          </p>

          <p className="mt-6 max-w-measure text-small leading-relaxed text-muted">
            Every plan includes the complete platform, unlimited users and
            unlimited outside guests. Prices exclude VAT and other applicable
            taxes (such as US sales tax).
          </p>
        </section>

        {/* Included in every plan */}
        <section
          aria-labelledby="included-heading"
          className="border-t border-hairline py-section md:py-section-lg"
        >
          <SectionHeading id="included-heading" label="Every plan">
            Included in every plan
          </SectionHeading>
          <dl className="mt-heading-gap grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED.map((group) => (
              <div key={group.heading}>
                <div className="h-px w-10 bg-graphite" />
                <dt className="mt-3 text-h3 text-graphite">{group.heading}</dt>
                <dd className="mt-2 text-small leading-relaxed text-muted">
                  {group.body}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Security by default */}
        <section
          aria-labelledby="security-heading"
          className="border-t border-hairline py-section md:py-section-lg"
        >
          <div className="rounded-lg bg-graphite p-6 md:p-8">
            <p className="text-label font-semibold uppercase text-accent-light">
              Security
            </p>
            <h2
              id="security-heading"
              className="mt-2 text-h2-sm text-on-dark-primary md:text-h2"
            >
              Security by default
            </h2>
            <ul className="mt-heading-gap grid gap-x-10 gap-y-2 text-body-sm text-on-dark-primary sm:grid-cols-2 md:text-body">
              {SECURITY_POINTS.map((point) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.8em] h-px w-3 shrink-0 bg-accent" />
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-measure text-body-sm leading-relaxed text-on-dark-secondary md:text-body">
              Not enterprise add-ons sold separately — how the platform works
              by default.
            </p>
            <p className="mt-4 text-small">
              <Link
                href="/security"
                className="font-medium text-accent-light underline underline-offset-4 hover:text-on-dark-primary"
              >
                Read the security page
              </Link>
            </p>
          </div>
        </section>

        {/* How the plans work */}
        <section
          aria-labelledby="how-heading"
          className="border-t border-hairline py-section md:py-section-lg"
        >
          <SectionHeading id="how-heading" label="Plans">
            How the plans work
          </SectionHeading>
          <dl className="mt-heading-gap grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {HOW_PLANS_WORK.map((item) => (
              <div key={item.heading}>
                <div className="h-px w-10 bg-graphite" />
                <dt className="mt-3 text-h3 text-graphite">{item.heading}</dt>
                <dd className="mt-2 text-small leading-relaxed text-muted">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Services */}
        <section
          aria-labelledby="services-heading"
          className="border-t border-hairline py-section md:py-section-lg"
        >
          <SectionHeading id="services-heading" label="Services">
            Services
          </SectionHeading>
          <table className="mt-heading-gap w-full max-w-measure text-body-sm tabular-nums md:text-body">
            <caption className="sr-only">Services and prices</caption>
            <thead>
              <tr className="border-b-2 border-graphite text-left">
                <th scope="col" className="pb-2 text-label font-semibold uppercase text-muted">
                  Service
                </th>
                <th scope="col" className="pb-2 text-right text-label font-semibold uppercase text-muted">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {SERVICES.map((service) => (
                <tr key={service.id} className="border-b border-hairline">
                  <th scope="row" className="py-3 pr-4 text-left font-normal text-ink">
                    {service.name}
                  </th>
                  <td className="py-3 text-right text-ink">
                    {service.from && "from "}
                    <span className="font-semibold text-graphite">
                      <Price amount={service.price} />
                    </span>{" "}
                    <span className="whitespace-nowrap text-muted">{service.unit}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 max-w-measure text-small leading-relaxed text-muted">
            The first program&apos;s onboarding is included in year one on
            every plan, and every program&apos;s on Enterprise and PE plans.
          </p>
        </section>

        {/* Two ways to start */}
        <section
          aria-labelledby="start-heading"
          className="border-t border-hairline py-section md:py-section-lg"
        >
          <SectionHeading id="start-heading" label="Getting started">
            Two ways to start
          </SectionHeading>
          <div className="mt-heading-gap grid gap-6 md:grid-cols-2">
            <div className="flex flex-col rounded-lg bg-graphite p-6 md:p-8">
              <p className="text-label font-semibold uppercase text-accent-light">
                Recommended
              </p>
              <h3 className="mt-2 font-serif text-h2-sm font-semibold text-on-dark-primary">
                {PILOT.name}
              </h3>
              <p className="mt-2 font-serif text-h1-sm text-on-dark-primary">
                <Price amount={PILOT.price} />
              </p>
              <p className="mt-4 text-body-sm leading-relaxed text-on-dark-secondary md:text-body">
                One live program on the complete platform, onboarding
                included. Credited in full to a first-year plan signed within
                30 days of the pilot.
              </p>
              <p className="mt-auto pt-6">
                <Link href="/early-access?source=pricing-pilot" className={buttonLight}>
                  Talk to us about a pilot
                </Link>
              </p>
            </div>

            <div className="flex flex-col rounded-lg border border-hairline bg-white p-6 md:p-8">
              <p className="text-label font-semibold uppercase text-accent-dark">
                Not ready to move a live deal?
              </p>
              <h3 className="mt-2 font-serif text-h2-sm font-semibold text-graphite">
                {DIAGNOSTIC.name}
              </h3>
              <p className="mt-2 font-serif text-h1-sm text-graphite">
                <Price amount={DIAGNOSTIC.price} />
              </p>
              <p className="mt-4 text-body-sm leading-relaxed text-ink md:text-body">
                Your team loads one deal&apos;s TSAs, obligations and Day 1
                plan with our templates. We review it with you in a 90-minute
                readout, and you keep the diagnostic report. Credited within
                60 days.
              </p>
              <p className="mt-auto pt-6">
                <Link href="/early-access?source=pricing-diagnostic" className={buttonDark}>
                  Talk to us about a diagnostic
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          aria-labelledby="faq-heading"
          className="border-t border-hairline py-section md:py-section-lg"
        >
          <SectionHeading id="faq-heading" label="Questions">
            Frequently asked questions
          </SectionHeading>
          <div className="mt-heading-gap">
            <FaqAccordion items={FAQ} />
          </div>
        </section>

        {/* Closing */}
        <section
          aria-label="Price sheet and contact"
          className="flex flex-col gap-6 border-t border-hairline pt-section sm:flex-row sm:items-center sm:justify-between md:pt-section-lg"
        >
          <p className="text-body-sm md:text-body">
            <PriceSheetLink className={linkClass} />
          </p>
          <p>
            <Link href="/early-access" className={buttonDark}>
              Talk to us
            </Link>
          </p>
        </section>
      </Container>
    </CurrencyProvider>
  );
}
