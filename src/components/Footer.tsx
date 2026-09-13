import Link from "next/link";
import { Container } from "./Container";
import { EarlyAccessForm } from "./EarlyAccessForm";
import { BackgroundLines } from "./LineGraphMotif";
import { CONTACT_EMAIL } from "@/lib/site";

const FOOTER_NAV = [
  { label: "Product", href: "/#approach" },
  { label: "Resources", href: "/resources" },
  { label: "Early Access", href: "/early-access" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

// Placeholder only — no accounts exist yet. Rendered as non-links on purpose.
const SOCIAL_PLACEHOLDERS = ["LinkedIn", "X", "RSS"];

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-graphite text-on-dark-primary">
      <BackgroundLines
        tone="accent"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 w-full opacity-60"
      />
      <Container className="relative py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-h2-sm text-on-dark-primary md:text-h2">
              Get updates as we open access.
            </h2>
            <p className="mt-heading-gap max-w-md leading-relaxed text-on-dark-secondary">
              In development. Join the early access list for updates.
            </p>
            <div className="mt-6 max-w-md">
              <EarlyAccessForm theme="dark" source="footer" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:justify-items-end">
            <nav aria-label="Footer">
              <h3 className="text-label font-semibold uppercase text-on-dark-secondary">
                Site
              </h3>
              <ul className="mt-4 space-y-2 text-small">
                {FOOTER_NAV.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-on-dark-secondary transition-colors hover:text-accent"
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
                {SOCIAL_PLACEHOLDERS.map((name) => (
                  <li key={name} aria-disabled="true" title="Coming soon">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/15 pt-8 text-small text-on-dark-secondary/70 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} MeridianCogent. All rights
            reserved.
          </p>
          <p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-on-dark-secondary underline underline-offset-4 hover:text-accent"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
