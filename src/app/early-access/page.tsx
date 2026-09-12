import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import { BackgroundLines } from "@/components/LineGraphMotif";
import { SITE_NAME } from "@/lib/site";

const TITLE = "Early Access";
const DESCRIPTION =
  "MeridianCogent is in development. Join the early access list for occasional email updates as we get closer to launch — no specific date promised.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/early-access" },
  openGraph: {
    url: "/early-access",
    title: `${TITLE} — ${SITE_NAME}`,
    description: DESCRIPTION,
  },
  twitter: {
    title: `${TITLE} — ${SITE_NAME}`,
    description: DESCRIPTION,
  },
};

const EXPECTATIONS = [
  {
    heading: "It's in development",
    body: "MeridianCogent isn't generally available yet. The product is being built with a small group of separation and integration teams, and access opens in phases — diagnostics first, then the full platform.",
  },
  {
    heading: "Updates come by email",
    body: "If you join the list, you'll get occasional updates as the product takes shape and as access widens. That's it — no newsletter cadence, no drip sequence.",
  },
  {
    heading: "No launch date is promised",
    body: "We're not going to give you a quarter and miss it. When there's something concrete to show you or to give you access to, you'll hear from us.",
  },
  {
    heading: "One email, unsubscribe anytime",
    body: "We ask for an email address and nothing else. You can leave the list at any point, and we won't share the address outside MeridianCogent.",
  },
];

export default function EarlyAccessPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <BackgroundLines className="pointer-events-none absolute inset-0 h-full w-full" />
        <Container className="relative py-section md:py-section-lg">
          <div className="max-w-2xl">
            <h1 className="text-balance font-serif text-display-sm leading-[1.1] text-navy md:text-display">
              Early access
            </h1>
            <p className="mt-heading-gap text-body-lg leading-relaxed text-ink">
              MeridianCogent is a control environment for separation offices and
              integration teams. It&apos;s still being built. Early access is how
              we stay in touch with the people we&apos;re building it for.
            </p>
            <div className="mt-8 max-w-lg">
              <p className="text-small font-medium text-navy">
                In development. Join the early access list for updates.
              </p>
              <div className="mt-3">
                <EarlyAccessForm source="early-access-page" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What to expect */}
      <section aria-labelledby="expect-heading" className="py-section md:py-section-lg">
        <Container>
          <div className="mx-auto max-w-measure">
            <h2
              id="expect-heading"
              className="font-serif text-h2-sm text-navy md:text-h2"
            >
              What to expect
            </h2>
            <dl className="mt-heading-gap grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {EXPECTATIONS.map((item) => (
                <div key={item.heading}>
                  <div className="h-px w-10 bg-navy" />
                  <dt className="mt-3 font-serif text-h4 text-navy">
                    {item.heading}
                  </dt>
                  <dd className="mt-2 text-small leading-relaxed text-muted">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-14 text-small text-muted">
              Questions about early access? Email{" "}
              <a
                href="mailto:hello@meridiancogent.com"
                className="text-navy underline underline-offset-4 hover:text-muted"
              >
                hello@meridiancogent.com
              </a>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
