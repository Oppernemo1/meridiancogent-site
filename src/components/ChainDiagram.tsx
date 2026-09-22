import { type ReactNode, useId } from "react";
import { colors } from "@/lib/tokens";

export type ChainNode = {
  title: ReactNode;
  description?: string;
};

const COUNT_WORDS: Record<number, string> = {
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
  6: "Six",
  7: "Seven",
};

/**
 * Sequence diagram of N stages (five on /platform, six in the dependency
 * problem article). Labels are the primary element; nodes (small
 * dots) and the connecting line are supporting structure, so they're kept
 * visually subtle. Desktop centres each label under its dot using a
 * gap-free N-column grid — the grid's column widths are what the dot
 * x-positions are computed against, so column centres and dot centres always
 * match exactly, however long or short a label is. Mobile stacks nodes
 * vertically with labels to the right, left-aligned.
 *
 * `compact` renders labels only (no per-node description) — the condensed
 * form used in articles, versus the fuller version on /platform.
 *
 * `labelAs` sets the label element. /platform uses h3 because each stage is
 * a titled item in that section; in an article the labels are not section
 * headings, so they render as <p> with the same styling to keep them out of
 * the document outline.
 */
export function ChainDiagram({
  nodes,
  compact = false,
  title = "Sequence diagram of the separation dependency chain",
  labelAs: Label = "h3",
}: {
  nodes: ChainNode[];
  compact?: boolean;
  title?: string;
  labelAs?: "h3" | "p";
}) {
  const titleId = useId();
  const descId = useId();

  const summary =
    `${COUNT_WORDS[nodes.length] ?? nodes.length} stages, each depending on the one before: ` +
    nodes.map((n) => (typeof n.title === "string" ? n.title : "")).join(", ") +
    ".";

  const count = nodes.length;
  // Evenly spaced with a half-slot inset on each side, so the first and
  // last dots sit inset from the container edges rather than flush.
  const nodeX = (i: number) => ((i + 0.5) / count) * 1000;

  return (
    <div className="mt-10">
      {/* Desktop / tablet: horizontal connector */}
      <div className="hidden md:block">
        <svg
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
          viewBox="0 0 1000 32"
          className="w-full"
        >
          <title id={titleId}>{title}</title>
          <desc id={descId}>{summary}</desc>
          <defs>
            <marker
              id="chain-arrow"
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill={colors.accent} fillOpacity={0.8} />
            </marker>
          </defs>
          {Array.from({ length: count - 1 }).map((_, i) => {
            const x1 = nodeX(i) + 9;
            const x2 = nodeX(i + 1) - 9;
            return (
              <line
                key={i}
                x1={x1}
                y1={16}
                x2={x2}
                y2={16}
                stroke={colors.accent}
                strokeOpacity={0.7}
                strokeWidth={1.5}
                markerEnd="url(#chain-arrow)"
              />
            );
          })}
          {nodes.map((_, i) => (
            <circle key={i} cx={nodeX(i)} cy={16} r={5} fill={colors.accent} />
          ))}
        </svg>

        <div
          className="mt-5 grid"
          style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
        >
          {nodes.map((node, i) => (
            <div key={i} className="text-center">
              <Label className="text-h3 text-graphite">{node.title}</Label>
              {!compact && node.description && (
                <p className="mx-auto mt-2 max-w-diagram-caption text-small leading-relaxed text-muted">
                  {node.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="md:hidden">
        <p className="sr-only">{summary}</p>
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-4 left-[7px] top-4 w-px bg-accent/40"
          />
          <div className={compact ? "space-y-5" : "space-y-8"}>
            {nodes.map((node, i) => (
              <div key={i} className="relative flex items-center gap-4">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  className="relative z-10 shrink-0"
                  aria-hidden="true"
                >
                  <circle cx={8} cy={8} r={5} fill={colors.accent} />
                </svg>
                <div>
                  <Label className="text-h3 text-graphite">{node.title}</Label>
                  {!compact && node.description && (
                    <p className="mt-2 text-small leading-relaxed text-muted">
                      {node.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
