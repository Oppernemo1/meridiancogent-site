"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { NAV_LINKS } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href;

  // Close on outside click/tap and on Escape.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Resizing past the nav breakpoint reveals the horizontal nav via CSS
  // regardless of `open` — this just resets the state so the panel doesn't
  // reopen stale if the viewport later narrows again.
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 900px)");
    const onChange = () => setOpen(false);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Belt-and-braces: a route change (e.g. via browser back/forward) should
  // never leave the panel open over the new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header ref={headerRef} className="sticky top-0 z-40 bg-graphite">
      <Container className="flex min-h-16 items-center justify-between gap-4 py-2 md:h-20 md:py-0">
        <Link href="/" className="flex shrink-0 items-center" aria-label="MeridianCogent — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-full.svg"
            alt="MeridianCogent"
            width={186}
            height={41}
            className="h-8 w-auto md:h-[46.7px]"
          />
        </Link>

        <nav aria-label="Primary" className="hidden nav:block">
          <ul className="flex items-center gap-8 text-nav">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`border-b-2 pb-1 transition-colors ${
                      active
                        ? "border-accent text-accent-light"
                        : "border-transparent text-on-dark-secondary hover:text-on-dark-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center text-on-dark-primary nav:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M5 5 L17 17 M17 5 L5 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6 H19 M3 11 H19 M3 16 H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </Container>

      <div
        id="mobile-nav-panel"
        className={`border-t border-white/10 nav:hidden ${open ? "block" : "hidden"}`}
      >
        <Container>
          <ul className="py-2">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-11 items-center border-l-2 pl-4 text-nav transition-colors ${
                      active
                        ? "border-accent font-medium text-accent-light"
                        : "border-transparent text-on-dark-secondary hover:text-on-dark-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </div>
    </header>
  );
}
