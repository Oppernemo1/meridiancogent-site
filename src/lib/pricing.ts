/**
 * Every price on the site, in one place. The /pricing page, the homepage
 * strip, the currency switch and the /pricing schema.org Offers all read from
 * here, so a price change is made once.
 *
 * The price sheet PDFs in public/pricing/ are NOT generated from this file —
 * regenerate both whenever a figure here changes (see README).
 */

export const CURRENCIES = ["EUR", "USD"] as const;
export type Currency = (typeof CURRENCIES)[number];

export const DEFAULT_CURRENCY: Currency = "EUR";

/** Key the visitor's explicit currency choice is kept under in localStorage. */
export const CURRENCY_STORAGE_KEY = "mc-currency";

/** Countries (x-vercel-ip-country) that default to USD. Everyone else: EUR. */
export const USD_COUNTRIES = new Set(["US"]);

/**
 * Pre-built USD variants. Middleware rewrites US visitors from the public
 * path to the variant, so the public URL never changes and both are static.
 */
export const USD_VARIANT_PREFIX = "/usd";
export const CURRENCY_VARIANT_PATHS = ["/", "/pricing"] as const;

export function isCurrency(value: unknown): value is Currency {
  return value === "EUR" || value === "USD";
}

export type Money = Record<Currency, number>;

const SYMBOL: Record<Currency, string> = { EUR: "€", USD: "$" };

/** "€30,000" / "$35,000". Locale-independent, so server and client agree. */
export function formatPrice(amount: number, currency: Currency): string {
  const digits = String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${SYMBOL[currency]}${digits}`;
}

export type Plan = {
  id: string;
  name: string;
  programs: string;
  price: Money;
  /** "from" pricing: the figure is a minimum, not a list price. */
  from?: boolean;
  /** Deal only: the 24-month term. */
  twoYear?: Money;
  support: string;
};

export const PLANS: Plan[] = [
  {
    id: "deal",
    name: "Deal",
    programs: "1 active program",
    price: { EUR: 30_000, USD: 35_000 },
    twoYear: { EUR: 55_000, USD: 65_000 },
    support: "Standard support",
  },
  {
    id: "team",
    name: "Team",
    programs: "Up to 3 active programs",
    price: { EUR: 55_000, USD: 65_000 },
    support: "Priority support",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    programs: "Up to 6 active programs",
    price: { EUR: 80_000, USD: 90_000 },
    support: "Priority support",
  },
];

export const LARGER_PLANS: Plan[] = [
  {
    id: "enterprise",
    name: "Enterprise",
    programs: "Up to 10 active programs",
    price: { EUR: 120_000, USD: 140_000 },
    from: true,
    support: "Named contact",
  },
  {
    id: "pe-portfolio",
    name: "PE portfolio licence",
    programs:
      "Up to 10 active programs across the sponsor and its portfolio companies",
    price: { EUR: 150_000, USD: 175_000 },
    from: true,
    support: "Named contact",
  },
];

export const ARCHIVE_PLAN = {
  id: "archive",
  name: "Archive",
  price: { EUR: 5_000, USD: 6_000 } as Money,
};

/** Each program above the plan's allowance, per year, pro-rated. */
export const EXTRA_PROGRAM: Money = { EUR: 12_000, USD: 14_000 };

export type Service = {
  id: string;
  name: string;
  price: Money;
  from?: boolean;
  unit: string;
};

export const SERVICES: Service[] = [
  {
    id: "onboarding",
    name: "Program onboarding",
    price: { EUR: 5_000, USD: 6_000 },
    unit: "per program",
  },
  {
    id: "data-import",
    name: "Data import",
    price: { EUR: 2_500, USD: 3_000 },
    from: true,
    unit: "per program",
  },
  {
    id: "training",
    name: "Additional training",
    price: { EUR: 2_500, USD: 3_000 },
    unit: "per session",
  },
];

export const PILOT = {
  id: "pilot",
  name: "90-day pilot",
  price: { EUR: 9_000, USD: 10_500 } as Money,
};

export const DIAGNOSTIC = {
  id: "diagnostic",
  name: "Deal Diagnostic",
  price: { EUR: 6_000, USD: 7_000 } as Money,
};

/**
 * `source` values the Talk to Us page accepts from its ?source= query string
 * (the "Two ways to start" buttons). Anything else is ignored.
 */
export const PRICING_FORM_SOURCES = ["pricing-pilot", "pricing-diagnostic"];

/** The lowest plan price — "Plans from …" on the homepage strip. */
export const FROM_PRICE: Money = PLANS[0].price;

export const PRICE_SHEET_HREF: Record<Currency, string> = {
  EUR: "/pricing/meridiancogent-price-sheet-eur.pdf",
  USD: "/pricing/meridiancogent-price-sheet-usd.pdf",
};

/**
 * schema.org Offers for the prices shown on /pricing, in the currency the
 * served variant renders. Each Offer's `price` is the visible figure as a
 * plain number string; for "from" prices that is the starting price, and the
 * price specification carries it as minPrice. All prices exclude VAT.
 *
 * No return policy, shipping details, rating or reviews: they don't apply to
 * a software subscription.
 */
export function pricingOffers(currency: Currency, url: string) {
  const spec = (
    amount: number,
    opts: { from?: boolean; months?: number; unitText?: string } = {},
  ) => ({
    "@type": "UnitPriceSpecification",
    ...(opts.from ? { minPrice: amount } : { price: amount }),
    priceCurrency: currency,
    valueAddedTaxIncluded: false,
    ...(opts.months
      ? {
          billingDuration: {
            "@type": "QuantitativeValue",
            value: opts.months,
            unitCode: "MON",
          },
        }
      : {}),
    ...(opts.unitText ? { unitText: opts.unitText } : {}),
  });

  const offer = (
    name: string,
    amount: number,
    opts: { from?: boolean; months?: number; unitText?: string } = {},
  ) => ({
    "@type": "Offer",
    name,
    price: String(amount),
    priceCurrency: currency,
    priceSpecification: spec(amount, opts),
    availability: "https://schema.org/InStock",
    url,
  });

  return [
    ...PLANS.flatMap((plan) => [
      offer(`${plan.name} plan`, plan.price[currency], {
        from: plan.from,
        months: 12,
      }),
      ...(plan.twoYear
        ? [
            offer(`${plan.name} plan, 24 months`, plan.twoYear[currency], {
              months: 24,
            }),
          ]
        : []),
    ]),
    ...LARGER_PLANS.map((plan) =>
      offer(plan.name, plan.price[currency], { from: plan.from, months: 12 }),
    ),
    offer(`${ARCHIVE_PLAN.name} plan`, ARCHIVE_PLAN.price[currency], {
      months: 12,
    }),
    offer("Additional active program", EXTRA_PROGRAM[currency], {
      months: 12,
      unitText: "per program, pro-rated",
    }),
    ...SERVICES.map((service) =>
      offer(service.name, service.price[currency], {
        from: service.from,
        unitText: service.unit,
      }),
    ),
    offer(PILOT.name, PILOT.price[currency], { months: 3 }),
    offer(DIAGNOSTIC.name, DIAGNOSTIC.price[currency]),
  ];
}
