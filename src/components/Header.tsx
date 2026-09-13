"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { NAV_LINKS } from "@/lib/site";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-graphite">
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
          <ul className="flex items-center gap-x-4 gap-y-1 text-small flex-wrap justify-end md:flex-nowrap md:gap-8">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`transition-colors ${
                      active
                        ? "text-on-dark-primary"
                        : "text-on-dark-secondary hover:text-on-dark-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
