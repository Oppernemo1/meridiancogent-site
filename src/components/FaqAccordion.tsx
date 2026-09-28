"use client";

import { useId, useState, type ReactNode } from "react";

export type FaqItem = { question: string; answer: ReactNode };

/**
 * Question-and-answer accordion. Each question is a real <button> inside its
 * <h3>, with aria-expanded/aria-controls, so it is reachable by Tab and
 * toggled by Enter or Space. Closed answers use the `hidden` attribute
 * rather than being unmounted, so every answer is in the server-rendered
 * HTML for crawlers and find-in-page. Several answers can be open at once.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(() => new Set());

  const toggle = (index: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <div className="border-b border-hairline">
      {items.map((item, index) => {
        const expanded = open.has(index);
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;
        return (
          <div key={item.question} className="border-t border-hairline">
            <h3 className="text-h3 text-graphite">
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full items-center gap-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span className="flex-1">{item.question}</span>
                <span
                  aria-hidden="true"
                  className="relative h-4 w-4 shrink-0 text-graphite"
                >
                  <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 bg-current" />
                  {!expanded && (
                    <span className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 bg-current" />
                  )}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!expanded}
              className="max-w-measure pb-6 text-body-sm leading-relaxed text-ink md:text-body"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
