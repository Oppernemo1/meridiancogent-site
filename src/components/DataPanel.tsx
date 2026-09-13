export type DataPanelRow = { label: string; value: string };

/**
 * Graphite fact panel floated beside a section's prose. Used only where the
 * facts already exist in the copy — never to invent content. Stacks below
 * the prose at full width on mobile (the parent `Section` handles that via
 * its flex/stack switch at the `md` breakpoint).
 */
export function DataPanel({
  label,
  rows,
}: {
  label: string;
  rows: DataPanelRow[];
}) {
  return (
    <div className="w-full rounded-lg bg-graphite p-5">
      <p className="text-label font-semibold uppercase text-accent">{label}</p>
      <dl className="mt-4 divide-y divide-white/[0.18]">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0 last:pb-0"
          >
            <dt className="text-small text-on-dark-primary">{row.label}</dt>
            <dd className="text-right text-small font-medium text-accent">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
