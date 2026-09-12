import Link from "next/link";
import { Container } from "./Container";
import { NAV_LINKS } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white">
      <Container className="flex min-h-16 items-center justify-between gap-4 py-2 md:h-20 md:py-0">
        <Link href="/" className="flex shrink-0 items-center" aria-label="MeridianCogent — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-full.svg"
            alt="MeridianCogent"
            width={186}
            height={41}
            className="h-6 w-auto md:h-9"
          />
        </Link>
        <nav aria-label="Primary" className="min-w-0">
          <ul className="flex items-center gap-x-3 gap-y-1 text-micro flex-wrap justify-end md:flex-nowrap md:gap-8 md:text-body">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted transition-colors hover:text-navy"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
