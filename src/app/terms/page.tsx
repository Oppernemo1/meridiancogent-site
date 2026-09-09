import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SITE_NAME } from "@/lib/site";

const TITLE = "Terms of Use";
const DESCRIPTION =
  "The basic terms that apply to visitors of the MeridianCogent pre-launch website.";
const LAST_UPDATED = "9 September 2026";

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

export default function TermsPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="prose prose-meridian mx-auto">
          <h1>Terms of Use</h1>
          <p className="lead">
            <em>Last updated: {LAST_UPDATED}.</em> This is a pre-launch marketing
            website for MeridianCogent, an M&amp;A execution platform currently
            in development. These terms are early-stage boilerplate and are
            subject to change. They will be replaced with full product terms
            before the platform becomes generally available.
          </p>

          <h2>Use of this site</h2>
          <p>
            You may view this site for the purpose of learning about
            MeridianCogent and joining the early access list. Please don&apos;t
            attempt to disrupt the site, access it other than through the
            interface we provide, or use it in a way that breaks the law.
          </p>

          <h2>Early access</h2>
          <p>
            Joining the early access list places your email address on a list
            for occasional updates. It is not a contract, it does not guarantee
            access to the product, and it does not commit MeridianCogent to any
            launch date, feature, or price. Nothing on this site is an offer to
            sell a product or a commitment to deliver one.
          </p>

          <h2>No warranties</h2>
          <p>
            This site is provided &ldquo;as is&rdquo;. Content is for general
            information only and may be incomplete, out of date, or changed
            without notice. Articles in the Resources section reflect the
            MeridianCogent team&apos;s reading of publicly available research and
            are not professional, legal, or financial advice.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The MeridianCogent name, logo, and site content are owned by
            MeridianCogent. You may quote or link to articles with attribution;
            please don&apos;t reproduce them in full without permission.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the extent permitted by law, MeridianCogent is not liable for any
            loss arising from your use of, or reliance on, this site or its
            content.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms at any time. The version posted here, with
            the date above, is the current one.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms:{" "}
            <a href="mailto:hello@meridiancogent.com">
              hello@meridiancogent.com
            </a>
            .
          </p>
        </div>
      </Container>
    </div>
  );
}
