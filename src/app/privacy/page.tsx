import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SidebarLayout } from "@/components/SidebarLayout";
import { SITE_NAME } from "@/lib/site";

const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How MeridianCogent handles the limited personal data collected through this website's forms.";
const LAST_UPDATED = "25 September 2026";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  openGraph: {
    url: "/privacy",
    title: `${TITLE} — ${SITE_NAME}`,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

const SECTIONS = [
  { id: "who-we-are", label: "Who we are" },
  { id: "what-we-collect", label: "What we collect" },
  { id: "how-we-use-it", label: "How we use it" },
  { id: "service-providers", label: "Service providers" },
  { id: "retention", label: "Retention" },
  { id: "your-choices", label: "Your choices" },
  { id: "changes", label: "Changes" },
];

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-section md:py-section-lg">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-balance text-h1-sm md:text-h1">
              Privacy Policy
            </h1>
            <p className="mt-heading-gap text-body-sm leading-relaxed text-ink md:text-body">
              <em>Last updated: {LAST_UPDATED}.</em> MeridianCogent is an
              early-stage company and this is its marketing website. This
              policy is deliberately short, describes only what
              the site does today, and is subject to change as the product
              develops. Material changes will be reflected here with a new
              date.
            </p>
          </div>
        </Container>
      </section>

      <SidebarLayout sections={SECTIONS}>
        {/* Who we are */}
        <Section id="who-we-are" label="Who we are" heading="Who we are" divider={false}>
          <p>
            &ldquo;MeridianCogent&rdquo;, &ldquo;we&rdquo; and &ldquo;us&rdquo;
            refer to the team building the MeridianCogent M&amp;A execution
            platform. You can reach us at{" "}
            <a
              href="mailto:hello@meridiancogent.com"
              className="text-accent-dark underline underline-offset-4 hover:text-muted"
            >
              hello@meridiancogent.com
            </a>
            .
          </p>
        </Section>

        {/* What we collect */}
        <Section id="what-we-collect" label="What we collect" heading="What we collect">
          <p>
            The only personal data this site collects is what you submit
            through its forms. A guide download asks for your email address
            only. A request to talk to us asks for your name, company and
            email address, and optionally your role. We do not ask for a
            phone number or any other detail. We do not use advertising or
            cross-site tracking cookies.
          </p>
          <p>
            We use Vercel Analytics to understand aggregate traffic (for
            example, which pages are visited). It is privacy-friendly and does
            not use cookies or collect personally identifiable information.
          </p>
        </Section>

        {/* How we use it */}
        <Section id="how-we-use-it" label="How we use it" heading="How we use it">
          <ul className="list-disc space-y-3 pl-5">
            <li>
              To reply to a request to talk, using the name, company, role
              and email address you gave us.
            </li>
            <li>
              To add you to our update list and send you occasional
              product updates by email.
            </li>
            <li>
              To send you a confirmation that we have received your request
              or sign-up.
            </li>
            <li>
              To notify our own team, at a role-based address, that a new
              request or sign-up has come in, including the details you
              submitted.
            </li>
          </ul>
          <p>
            We do not sell your details, and we do not share them outside
            MeridianCogent except with the service providers below who process it
            on our behalf.
          </p>
        </Section>

        {/* Service providers */}
        <Section id="service-providers" label="Service providers" heading="Service providers">
          <ul className="list-disc space-y-3 pl-5">
            <li>
              <strong>Resend</strong> — stores the update list (your email
              address and, if you gave it, your name) and delivers our
              email, including the internal notification that carries your
              company and role. See resend.com for their terms and privacy
              information.
            </li>
            <li>
              <strong>Vercel</strong> — hosts this website and provides the
              privacy-friendly analytics described above.
            </li>
          </ul>
        </Section>

        {/* Retention */}
        <Section id="retention" label="Retention" heading="Retention">
          <p>
            We keep your details on the update list until you unsubscribe
            or ask us to remove them, or until we decide the list is no
            longer needed.
          </p>
        </Section>

        {/* Your choices */}
        <Section id="your-choices" label="Your choices" heading="Your choices">
          <p>
            You can unsubscribe from updates at any time using the link in any
            email we send, or by contacting{" "}
            <a
              href="mailto:hello@meridiancogent.com"
              className="text-accent-dark underline underline-offset-4 hover:text-muted"
            >
              hello@meridiancogent.com
            </a>
            . You can also ask us to tell you what we hold about you or to
            delete it.
          </p>
        </Section>

        {/* Changes */}
        <Section id="changes" label="Changes" heading="Changes">
          <p>
            This policy covers this website only. Personal data processed
            within the MeridianCogent platform is governed by the agreement
            with the customer concerned. We will update this policy as the
            site changes. Continued use of the site after an update means
            you accept the revised policy.
          </p>
        </Section>
      </SidebarLayout>
    </>
  );
}
