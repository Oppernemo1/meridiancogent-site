import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import { Section } from "@/components/Section";
import { SidebarLayout } from "@/components/SidebarLayout";
import { BackgroundLines } from "@/components/LineGraphMotif";
import { SITE_NAME } from "@/lib/site";

const TITLE = "Talk to Us";
const DESCRIPTION =
  "MeridianCogent is ready to demo. Tell us about your program and we'll show you how it works.";

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
    heading: "We reply by email",
    body: "Someone from the team writes back from hello@meridiancogent.com to find a time for a call.",
  },
  {
    heading: "The call starts with your program",
    body: "Tell us about the deal, the perimeter and where it's hard. Then we show you how the platform handles it.",
  },
  {
    heading: "What we ask for, and why",
    body: "Name, company and email, so whoever picks up your request knows who they're emailing. Role is optional. No phone number.",
  },
  {
    heading: "Unsubscribe anytime",
    body: "Your email also goes on our update list. Every email has a one-click unsubscribe link. Use it and you're off the list immediately.",
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
              Talk to us
            </h1>
            <p className="mt-heading-gap text-body-sm leading-relaxed text-ink md:text-body">
              MeridianCogent is a control environment for separation offices and
              integration teams. It&apos;s ready to demo. Tell us about your
              program and we&apos;ll show you how it works.
            </p>
            {/* Same graphite panel treatment as DataPanel, so the four
                fields read as one contained block rather than loose inputs. */}
            <div className="mt-8 max-w-xl rounded-lg bg-graphite p-5 md:p-6">
              <p className="text-label font-semibold uppercase text-accent-light">
                Request a demo
              </p>
              <p className="mt-2 text-small leading-relaxed text-on-dark-secondary">
                Some of the platform is live today and some is in build.
                We&apos;ll show you which is which.
              </p>
              <div className="mt-5">
                <EarlyAccessForm
                  theme="dark"
                  fields="full"
                  source="early-access-page"
                />
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
            Running a security review? What is and isn&apos;t in place yet
            is on the{" "}
            <Link
              href="/security"
              className="text-accent-dark underline underline-offset-4 hover:text-muted"
            >
              security page
            </Link>
            . Anything else, email{" "}
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
