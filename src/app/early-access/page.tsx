import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import { Section } from "@/components/Section";
import { SidebarLayout } from "@/components/SidebarLayout";
import { BackgroundLines } from "@/components/LineGraphMotif";
import { SITE_NAME } from "@/lib/site";

const TITLE = "Join the Program";
const DESCRIPTION =
  "MeridianCogent is currently in testing. Join the program for occasional email updates as we get closer to launch — no specific date promised.";

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
    heading: "Updates come by email",
    body: "If you join the list, you'll get occasional updates as the product takes shape and as access widens. That's it — no newsletter cadence, no drip sequence.",
  },
  {
    heading: "No launch date is promised",
    body: "We are not going to give you a quarter and miss it. When there is something concrete to show you, you will hear from us.",
  },
  {
    heading: "One email address, nothing else",
    body: "We ask for an email address and nothing else. No company, no role, no phone number.",
  },
  {
    heading: "Unsubscribe anytime",
    body: "Every email has a one-click unsubscribe link. Use it and you're off the list immediately — no confirmation step, no waiting.",
  },
];

const SECTIONS = [{ id: "expect", label: "What to expect" }];

export default function EarlyAccessPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <BackgroundLines className="pointer-events-none absolute inset-0 h-full w-full" />
        <Container className="relative py-section md:py-section-lg">
          <div className="max-w-2xl">
            <h1 className="text-balance text-h1-sm md:text-h1">
              Join the program
            </h1>
            <p className="mt-heading-gap text-body-sm leading-relaxed text-ink md:text-body">
              MeridianCogent is a control environment for separation offices and
              integration teams. It&apos;s currently in testing. The program is how
              we stay in touch with the people we&apos;re building it for.
            </p>
            <div className="mt-8 max-w-lg">
              <p className="text-small font-medium text-graphite">
                Currently in testing. Join the program for updates.
              </p>
              <div className="mt-3">
                <EarlyAccessForm source="early-access-page" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <SidebarLayout sections={SECTIONS}>
        {/* What to expect */}
        <Section id="expect" label="What to expect" heading="What to expect" divider={false} wide>
          <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {EXPECTATIONS.map((item) => (
              <div key={item.heading}>
                <div className="h-px w-10 bg-graphite" />
                <dt className="mt-3 text-h3 text-graphite">
                  {item.heading}
                </dt>
                <dd className="mt-2 text-small leading-relaxed text-muted">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>

          <p className="text-small text-muted">
            Questions about the program? Email{" "}
            <a
              href="mailto:hello@meridiancogent.com"
              className="text-accent-dark underline underline-offset-4 hover:text-muted"
            >
              hello@meridiancogent.com
            </a>
            .
          </p>
        </Section>
      </SidebarLayout>
    </>
  );
}
