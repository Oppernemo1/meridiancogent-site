import { type ReactNode } from "react";

/**
 * The repeating content block used on every marketing/document page: a
 * small-caps label, an h2, prose, and an optional data panel floated beside
 * it. Sections are separated by a hairline rule rather than a change of
 * ground colour — see the layout system in Stage 3 of the site rebuild.
 *
 * `id` doubles as the sidebar TOC anchor and the `aria-labelledby` target
 * (via `${id}-heading` on the h2) — pass the same id used in the page's
 * `sections` array for the Sidebar component.
 */
export function Section({
  id,
  label,
  heading,
  panel,
  divider = true,
  wide = false,
  children,
}: {
  id: string;
  label: string;
  heading: ReactNode;
  panel?: ReactNode;
  divider?: boolean;
  /** Skip the 720px measure cap on the content — for card grids and other
   * layouts that need the full content-column width rather than a prose
   * reading measure. */
  wide?: boolean;
  children: ReactNode;
}) {
  const measure = wide ? "" : "max-w-measure";

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`py-section md:py-section-lg ${divider ? "border-t border-hairline" : ""}`}
    >
      <p className="text-label font-semibold uppercase text-accent-dark">
        {label}
      </p>
      <h2 id={`${id}-heading`} className={`mt-2 text-h2-sm md:text-h2 ${measure}`}>
        {heading}
      </h2>
      <div className={panel ? "mt-heading-gap md:flex md:items-start md:gap-10" : `mt-heading-gap ${measure}`}>
        <div className={`space-y-paragraph-gap text-body-sm leading-relaxed text-ink md:text-body ${panel ? "md:flex-1" : ""} ${measure}`}>
          {children}
        </div>
        {panel && (
          <div className="mt-8 w-full md:mt-0 md:w-full md:max-w-panel md:shrink-0">{panel}</div>
        )}
      </div>
    </section>
  );
}
