"use client";

import { useEffect, useState } from "react";

export type SidebarSection = { id: string; label: string };

const ACTIVE_LINE = 120; // px from viewport top — below the sticky header

/**
 * Sticky "on this page" TOC. Hidden below the `sidebar` breakpoint (900px —
 * see tailwind.config.ts) via CSS only, so there's no client-side layout
 * shift as it appears/disappears. Active-section tracking is the only
 * client-side behaviour: the active section is whichever one's top has
 * most recently scrolled above `ACTIVE_LINE`.
 */
export function Sidebar({ sections }: { sections: SidebarSection[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const targets = sections
      .map((s) => ({ id: s.id, el: document.getElementById(s.id) }))
      .filter((t): t is { id: string; el: HTMLElement } => t.el !== null);

    if (targets.length === 0) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      let current = targets[0].id;
      for (const t of targets) {
        if (t.el.getBoundingClientRect().top <= ACTIVE_LINE) {
          current = t.id;
        } else {
          break;
        }
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-28 hidden max-w-sidebar self-start sidebar:block"
    >
      <ul className="space-y-3 border-l border-hairline">
        {sections.map((section) => {
          const isActive = section.id === active;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`-ml-px block border-l-2 pl-3 text-sidebar leading-snug transition-colors ${
                  isActive
                    ? "border-accent font-medium text-graphite"
                    : "border-transparent text-muted hover:text-graphite"
                }`}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
