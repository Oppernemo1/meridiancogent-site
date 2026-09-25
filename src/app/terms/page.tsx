import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SidebarLayout } from "@/components/SidebarLayout";
import { SITE_NAME } from "@/lib/site";

const TITLE = "Terms of Use";
const DESCRIPTION =
  "The basic terms that apply to visitors of the MeridianCogent pre-launch website.";
const LAST_UPDATED = "25 September 2026";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/terms" },
  openGraph: {
    url: "/terms",
    title: `${TITLE} — ${SITE_NAME}`,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

const SECTIONS = [
  { id: "use-of-this-site", label: "Use of this site" },
  { id: "early-access", label: "Talking to us" },
  { id: "no-warranties", label: "No warranties" },
  { id: "intellectual-property", label: "Intellectual property" },
  { id: "limitation-of-liability", label: "Limitation of liability" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-section md:py-section-lg">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-balance text-h1-sm md:text-h1">
              Terms of Use
            </h1>
            <p className="mt-heading-gap text-body-sm leading-relaxed text-ink md:text-body">
              <em>Last updated: {LAST_UPDATED}.</em> This is a pre-launch
              marketing website for MeridianCogent, an M&amp;A execution
              platform. These terms are early-stage
              boilerplate and are subject to change. They will be replaced
              with full product terms before the platform becomes generally
              available.
            </p>
          </div>
        </Container>
      </section>

      <SidebarLayout sections={SECTIONS}>
        {/* Use of this site */}
        <Section id="use-of-this-site" label="Use of this site" heading="Use of this site" divider={false}>
          <p>
            You may view this site for the purpose of learning about
            MeridianCogent and getting in touch with us. Please don&apos;t
            attempt to disrupt the site, access it other than through the
            interface we provide, or use it in a way that breaks the law.
          </p>
        </Section>

        {/* Talking to us */}
        <Section id="early-access" label="Talking to us" heading="Talking to us">
          <p>
            Submitting a request to talk to us, or downloading a guide,
            places your details on a list for occasional updates and, for a
            request to talk, lets us contact you to arrange a call. It is
            not a contract, it does not guarantee access to the product, and
            it does not commit MeridianCogent to any date, feature, or
            price. Nothing on this site is an offer to
            sell a product or a commitment to deliver one.
          </p>
        </Section>

        {/* No warranties */}
        <Section id="no-warranties" label="No warranties" heading="No warranties">
          <p>
            This site is provided &ldquo;as is&rdquo;. Content is for general
            information only and may be incomplete, out of date, or changed
            without notice. Articles in the Resources section reflect the
            MeridianCogent team&apos;s reading of publicly available research and
            are not professional, legal, or financial advice.
          </p>
        </Section>

        {/* Intellectual property */}
        <Section id="intellectual-property" label="Intellectual property" heading="Intellectual property">
          <p>
            The MeridianCogent name, logo, and site content are owned by
            MeridianCogent. You may quote or link to articles with attribution;
            please don&apos;t reproduce them in full without permission.
          </p>
        </Section>

        {/* Limitation of liability */}
        <Section id="limitation-of-liability" label="Limitation of liability" heading="Limitation of liability">
          <p>
            To the extent permitted by law, MeridianCogent is not liable for any
            loss arising from your use of, or reliance on, this site or its
            content.
          </p>
        </Section>

        {/* Changes */}
        <Section id="changes" label="Changes" heading="Changes">
          <p>
            We may update these terms at any time. The version posted here, with
            the date above, is the current one.
          </p>
        </Section>

        {/* Contact */}
        <Section id="contact" label="Contact" heading="Contact">
          <p>
            Questions about these terms:{" "}
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
