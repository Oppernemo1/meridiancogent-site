import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SITE_NAME } from "@/lib/site";

const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How MeridianCogent handles the limited personal data collected through this website during early access.";
const LAST_UPDATED = "9 September 2026";

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

export default function PrivacyPage() {
  return (
    <div className="py-10 md:py-14">
      <Container>
        <div className="prose prose-meridian md:prose-meridian-lg mx-auto">
          <h1 className="text-h1-sm md:text-h1">Privacy Policy</h1>
          <p className="lead">
            <em>Last updated: {LAST_UPDATED}.</em> MeridianCogent is an
            early-stage company and this website is a pre-launch marketing site.
            This policy is deliberately short, describes only what the site does
            today, and is subject to change as the product develops. Material
            changes will be reflected here with a new date.
          </p>

          <h2>Who we are</h2>
          <p>
            &ldquo;MeridianCogent&rdquo;, &ldquo;we&rdquo; and &ldquo;us&rdquo;
            refer to the team building the MeridianCogent M&amp;A execution
            platform. You can reach us at{" "}
            <a href="mailto:hello@meridiancogent.com">
              hello@meridiancogent.com
            </a>
            .
          </p>

          <h2>What we collect</h2>
          <p>
            The only personal data this site collects is the email address you
            submit to the early access form. We do not ask for your name,
            company, or any other detail. We do not use advertising or
            cross-site tracking cookies.
          </p>
          <p>
            We use Vercel Analytics to understand aggregate traffic (for
            example, which pages are visited). It is privacy-friendly and does
            not use cookies or collect personally identifiable information.
          </p>

          <h2>How we use it</h2>
          <ul>
            <li>
              To add you to our early access list and send you occasional
              product updates by email.
            </li>
            <li>
              To send you a confirmation that you have joined the list.
            </li>
            <li>
              To notify our own team, at a role-based address, that a new signup
              has come in.
            </li>
          </ul>
          <p>
            We do not sell your email address, and we do not share it outside
            MeridianCogent except with the service providers below who process it
            on our behalf.
          </p>

          <h2>Service providers</h2>
          <ul>
            <li>
              <strong>Resend</strong> — stores the early access list and
              delivers our email. See resend.com for their terms and privacy
              information.
            </li>
            <li>
              <strong>Vercel</strong> — hosts this website and provides the
              privacy-friendly analytics described above.
            </li>
          </ul>

          <h2>Retention</h2>
          <p>
            We keep your email address on the early access list until you
            unsubscribe or ask us to remove it, or until we decide the list is
            no longer needed.
          </p>

          <h2>Your choices</h2>
          <p>
            You can unsubscribe from updates at any time using the link in any
            email we send, or by contacting{" "}
            <a href="mailto:hello@meridiancogent.com">
              hello@meridiancogent.com
            </a>
            . You can also ask us to tell you what we hold about you or to
            delete it.
          </p>

          <h2>Changes</h2>
          <p>
            As MeridianCogent moves from development toward launch, this policy
            will be replaced with a fuller version. Continued use of the site
            after an update means you accept the revised policy.
          </p>
        </div>
      </Container>
    </div>
  );
}
