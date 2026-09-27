/**
 * Separator between an item's term and its gloss. Each item is authored as
 * "Term — gloss": the term renders as the row heading and the gloss as the
 * muted line beneath it, so the dash is a field separator rather than
 * punctuation and is dropped on render. An item with no dash renders as a
 * term on its own.
 */
const ITEM_SEP = " — ";

export type CoverageGroup = { heading: string; items: string[] };

/**
 * The /platform "What it covers" groups as an accordion, collapsed by
 * default so the section opens on six headings rather than ~40 items.
 *
 * Built on native `<details>`/`<summary>` rather than a scripted disclosure:
 * it opens and closes with no JavaScript, Enter/Space and the open/closed
 * state come from the browser, and the items stay in the server-rendered
 * HTML for crawlers and find-in-page. Several groups can be open at once —
 * collapsing one when another opens would move content out from under the
 * reader mid-comparison. Nothing depends on hover: the open state is carried
 * by the +/− glyph, and the focus ring is the only interactive affordance.
 */
export function CoverageAccordion({ groups }: { groups: CoverageGroup[] }) {
  return (
    <div className="border-b border-hairline">
      {groups.map((group) => (
        <details key={group.heading} className="group border-t border-hairline">
          <summary className="flex cursor-pointer list-none items-center gap-6 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
            <span className="flex-1">
              <span aria-hidden="true" className="block h-px w-10 bg-accent" />
              <h3 className="mt-3 text-h3 text-graphite">{group.heading}</h3>
            </span>
            <span className="text-small text-muted">
              {group.items.length} items
            </span>
            <span
              aria-hidden="true"
              className="relative h-4 w-4 shrink-0 text-graphite"
            >
              <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 bg-current" />
              <span className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 bg-current group-open:hidden" />
            </span>
          </summary>

          <ul className="mb-6 grid gap-x-10 border-t border-hairline md:grid-cols-2">
            {group.items.map((item) => {
              const sepIndex = item.indexOf(ITEM_SEP);
              const term = sepIndex === -1 ? item : item.slice(0, sepIndex);
              const gloss =
                sepIndex === -1 ? null : item.slice(sepIndex + ITEM_SEP.length);
              return (
                <li key={item} className="border-b border-hairline py-2.5">
                  <p className="text-body-sm font-semibold leading-snug text-graphite">
                    {term}
                  </p>
                  {gloss && (
                    <p className="mt-1 text-small leading-snug text-muted">
                      {gloss}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </details>
      ))}
    </div>
  );
}
