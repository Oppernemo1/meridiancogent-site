import Link from "next/link";
import { Container } from "./Container";
import { EarlyAccessForm } from "./EarlyAccessForm";
import { BackgroundLines } from "./LineGraphMotif";
import { CONTACT_EMAIL } from "@/lib/site";

const FOOTER_NAV = [
  { label: "Platform", href: "/platform" },
  { label: "Principles", href: "/principles" },
  { label: "Security", href: "/security" },
  { label: "Resources", href: "/resources" },
  { label: "Talk to Us", href: "/early-access" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/meridiancogent/" },
];

// Placeholder only — no account exists yet. Rendered as a non-link on purpose.
const SOCIAL_PLACEHOLDERS = ["X"];

export function Footer() {
  return (
    <footer className="relative mt-section overflow-hidden bg-graphite text-on-dark-primary md:mt-section-lg">
      <BackgroundLines
        tone="accent"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 w-full opacity-60"
      />
      <Container className="relative py-10">
        <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-h2-sm text-on-dark-primary md:text-h2">
              Talk to us.
            </h2>
            <p className="mt-heading-gap max-w-md leading-relaxed text-on-dark-secondary">
              MeridianCogent is ready to demo. Tell us about your program
              and we&apos;ll show you how it works.
            </p>
            <div className="mt-6 max-w-md">
              <EarlyAccessForm theme="dark" source="footer" />
            </div>
          </div>

          <div className="grid grid-cols-2 items-start gap-8 md:justify-items-end">
            <nav aria-label="Footer">
              <h3 className="text-label font-semibold uppercase text-on-dark-secondary">
                Site
              </h3>
              <ul className="mt-4 space-y-2 text-small">
                {FOOTER_NAV.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-on-dark-secondary transition-colors hover:text-accent-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="text-label font-semibold uppercase text-on-dark-secondary">
                Elsewhere
              </h3>
              <ul className="mt-4 space-y-2 text-small text-on-dark-secondary/70">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-accent-light"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                {SOCIAL_PLACEHOLDERS.map((name) => (
                  <li key={name} aria-disabled="true" title="Coming soon">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 text-small text-on-dark-secondary/70 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} MeridianCogent. All rights
            reserved.
          </p>
          <p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-on-dark-secondary underline underline-offset-4 hover:text-accent-light"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
