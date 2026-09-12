import Link from "next/link";
import { Container } from "./Container";
import { NAV_LINKS } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center" aria-label="MeridianCogent — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-full.svg"
            alt="MeridianCogent"
            width={186}
            height={41}
            className="h-8 w-auto md:h-9"
          />
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-5 text-small md:gap-8 md:text-body">
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
