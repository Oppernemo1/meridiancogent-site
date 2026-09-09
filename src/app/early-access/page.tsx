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
    <div className="py-16 md:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-xl border border-black/10 bg-navy px-6 py-14 text-white md:px-14 md:py-20">
          <BackgroundLines
            tone="ice"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
          />
          <div className="relative max-w-2xl">
            <h1 className="font-serif text-4xl text-white md:text-5xl">
              Early access
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ice/90">
              MeridianCogent is a control environment for separation offices and
              integration teams. It&apos;s still being built. Early access is how
              we stay in touch with the people we&apos;re building it for.
            </p>
            <div className="mt-8 max-w-lg">
              <p className="text-sm font-medium text-ice">
                In development. Join the early access list for updates.
              </p>
              <div className="mt-3">
                <EarlyAccessForm theme="dark" source="early-access-page" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-serif text-2xl text-navy md:text-3xl">
            What to expect
          </h2>
          <dl className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {EXPECTATIONS.map((item) => (
              <div key={item.heading}>
                <div className="h-px w-10 bg-navy" />
                <dt className="mt-3 font-serif text-lg text-navy">
                  {item.heading}
                </dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-muted">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-12 text-sm text-muted">
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
    </div>
  );
}
