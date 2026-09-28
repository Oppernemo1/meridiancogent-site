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
  FAQ,
  PRICING_SUBLINE,
  buttonDark,
  buttonLight,
  linkClass,
  pricingJsonLd,
} from "@/components/PricingPage";
import {
  ARCHIVE_PLAN,
  DIAGNOSTIC,
  EXTRA_PROGRAM,
  LARGER_PLANS,
  PILOT,
  PLANS,
  SERVICES,
  type Currency,
  type Money,
} from "@/lib/pricing";

/** Lining, tabular figures for every price, so digits sit level. */
const NUMS = "lining-nums tabular-nums";

/** Section rhythm shared with /platform and /security (see Section.tsx). */
const SECTION = "border-t border-hairline py-section md:py-section-lg";

/** Enterprise, PE portfolio licence and Archive, as rows under the cards. */
const PLAN_ROWS: {
  id: string;
  name: string;
  description: string;
  price: Money;
  from?: boolean;
  support: string;
}[] = [
  ...LARGER_PLANS.map((plan) => ({
    id: plan.id,
    name: plan.name,
    description: plan.programs,
    price: plan.price,
    from: plan.from,
    support: plan.support,
  })),
  {
    id: ARCHIVE_PLAN.id,
    name: ARCHIVE_PLAN.name,
    description:
      "No live deal? Keep every completed program and its decision record readable and exportable",
    price: ARCHIVE_PLAN.price,
    support: "Standard support",
  },
];

const ADD_ONS: { id: string; name: string; price: Money; from?: boolean; unit: string }[] = [
  {
    id: "extra-program",
    name: "Additional active program",
    price: EXTRA_PROGRAM,
    unit: "per year, pro-rated",
  },
  ...SERVICES,
];

/** The /pricing FAQ, plus "How quickly can we start?" after the mid-year entry. */
const MOCK_FAQ: FaqItem[] = FAQ.flatMap((item) =>
  item.question === "What if we start another deal mid-year?"
    ? [
        item,
        {
          question: "How quickly can we start?",
          answer:
            "A deal that signs tomorrow starts tomorrow. There is no lock-in period and no waiting list.",
        },
      ]
    : [item],
);

/**
 * Restructured /pricing, for review at /mock-pricing: prices first (plans,
 * then add-ons and services, then the two ways to start), product content
 * reduced to two lines, then the FAQ. Same data file, switch, structured
 * data and copy as /pricing apart from the listed changes.
 */
export function PricingMockPage({ currency }: { currency: Currency }) {
  return (
    <CurrencyProvider initial={currency}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricingJsonLd(currency)),
        }}
      />

      {/* 1. Hero */}
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
        {/* 2. Plans */}
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
                <p className={`mt-6 font-serif text-h1-sm text-graphite ${NUMS}`}>
                  <Price amount={plan.price} />
                  <span className="ml-1 font-sans text-small text-muted">
                    per year
                  </span>
                </p>
                {plan.twoYear && (
                  <p className="mt-1 text-small text-muted">
                    or{" "}
                    <span className={NUMS}>
                      <Price amount={plan.twoYear} />
                    </span>{" "}
                    for 24 months
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

          <ul className="mt-6 border border-hairline bg-white">
            {PLAN_ROWS.map((row) => (
              <li
                key={row.id}
                className="grid gap-x-8 gap-y-1 border-t border-hairline px-6 py-5 first:border-t-0 md:grid-cols-[minmax(0,1fr)_auto_10rem] md:items-baseline"
              >
                <div>
                  <h3 className="font-serif text-h3 font-semibold text-graphite">
                    {row.name}
                  </h3>
                  <p className="mt-1 text-small text-muted">{row.description}</p>
                </div>
                <p className="mt-2 text-body-sm text-graphite md:mt-0 md:text-right md:text-body">
                  {row.from && <span className="text-small text-muted">from </span>}
                  <span className={`font-serif text-h3 font-semibold ${NUMS}`}>
                    <Price amount={row.price} />
                  </span>
                  <span className="ml-1 text-small text-muted">per year</span>
                </p>
                <p className="text-small text-ink md:text-right">{row.support}</p>
              </li>
            ))}
          </ul>

          <div className="mt-6 max-w-measure space-y-2 text-small leading-relaxed text-muted">
            <p>
              Every plan includes the complete platform, unlimited users and
              unlimited outside guests. Prices exclude VAT and other applicable
              taxes (such as US sales tax).
            </p>
            <p>List prices are held for 24 months for first-year customers.</p>
          </div>
        </section>

        {/* 3. Add-ons and services */}
        <section aria-labelledby="addons-heading" className={SECTION}>
          <h2 id="addons-heading" className="text-h2-sm md:text-h2">
            Add-ons and services
          </h2>
          <table className="mt-heading-gap w-full max-w-measure text-body-sm md:text-body">
            <caption className="sr-only">Add-ons, services and prices</caption>
            <thead>
              <tr className="border-b-2 border-graphite text-left">
                <th scope="col" className="pb-2 text-label font-semibold uppercase text-muted">
                  Item
                </th>
                <th scope="col" className="pb-2 text-right text-label font-semibold uppercase text-muted">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {ADD_ONS.map((item) => (
                <tr key={item.id} className="border-b border-hairline">
                  <th scope="row" className="py-3 pr-4 text-left align-baseline font-normal text-ink">
                    {item.name}
                  </th>
                  <td className="py-3 text-right align-baseline text-ink">
                    {item.from && "from "}
                    <span className={`font-semibold text-graphite ${NUMS}`}>
                      <Price amount={item.price} />
                    </span>{" "}
                    <span className="block text-small text-muted sm:inline">
                      {item.unit}
                    </span>
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

        {/* 4. Two ways to start — dark means "recommended", nothing else. */}
        <section aria-labelledby="start-heading" className={SECTION}>
          <h2 id="start-heading" className="text-h2-sm md:text-h2">
            Two ways to start
          </h2>
          <div className="mt-heading-gap grid gap-6 md:grid-cols-2">
            <div className="flex flex-col rounded-lg bg-graphite p-6 md:p-8">
              <p className="text-label font-semibold uppercase text-accent-light">
                Recommended
              </p>
              <h3 className="mt-2 font-serif text-h2-sm font-semibold text-on-dark-primary">
                {PILOT.name}
              </h3>
              <p className={`mt-2 font-serif text-h1-sm text-on-dark-primary ${NUMS}`}>
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
              <p className={`mt-2 font-serif text-h1-sm text-graphite ${NUMS}`}>
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

        {/* 5. What's included */}
        <section aria-labelledby="included-heading" className={SECTION}>
          <h2 id="included-heading" className="text-h2-sm md:text-h2">
            What&apos;s included
          </h2>
          <div className="mt-heading-gap max-w-measure space-y-paragraph-gap text-body-sm leading-relaxed text-ink md:text-body">
            <p>
              Every plan includes the complete platform.{" "}
              <Link href="/platform" className={linkClass}>
                See what it covers
              </Link>
            </p>
            <p>
              Security by default: need-to-know access, code names for
              undisclosed deals, an append-only audit trail, watermarked
              exports and EU hosting (Frankfurt).{" "}
              <Link href="/security" className={linkClass}>
                Read the security page
              </Link>
            </p>
          </div>
        </section>

        {/* 6. FAQ */}
        <section aria-labelledby="faq-heading" className={SECTION}>
          <h2 id="faq-heading" className="text-h2-sm md:text-h2">
            Frequently asked questions
          </h2>
          <div className="mt-heading-gap">
            <FaqAccordion items={MOCK_FAQ} />
          </div>
        </section>

        {/* 7. Closing */}
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
