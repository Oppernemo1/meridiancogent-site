import { type ReactNode, useId } from "react";
import { colors } from "@/lib/tokens";

const fontFamilySans = "ui-sans-serif, -apple-system, sans-serif";

export type ChainNode = {
  title: ReactNode;
  description: string;
};

/**
 * Five-stage sequence diagram: "Node N" markers and connectors are inline
 * SVG (ice strokes on navy, per the design tokens); node titles and
 * descriptions are real HTML text so they read, wrap and link normally.
 * Desktop shows a left-to-right connector; mobile stacks nodes vertically
 * rather than shrinking the desktop layout.
 */
export function ChainDiagram({ nodes }: { nodes: ChainNode[] }) {
  const titleId = useId();
  const descId = useId();

  const summary =
    "Five stages, each depending on the one before: " +
    nodes.map((n) => (typeof n.title === "string" ? n.title : "")).join(", ") +
    ".";

  return (
    <div className="mt-10">
      {/* Desktop / tablet: horizontal connector */}
      <div className="hidden md:block">
        <svg
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
          viewBox="0 0 1000 140"
          className="w-full"
        >
          <title id={titleId}>Sequence diagram of the separation dependency chain</title>
          <desc id={descId}>{summary}</desc>
          <defs>
            <marker
              id="chain-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill={colors.ice} />
            </marker>
          </defs>
          {[0, 1, 2, 3].map((i) => {
            const x1 = 100 + i * 200 + 32;
            const x2 = 100 + (i + 1) * 200 - 32;
            return (
              <line
                key={i}
                x1={x1}
                y1={70}
                x2={x2}
                y2={70}
                stroke={colors.ice}
                strokeWidth={2}
                markerEnd="url(#chain-arrow)"
              />
            );
          })}
          {nodes.map((_, i) => {
            const cx = 100 + i * 200;
            return (
              <g key={i}>
                <circle
                  cx={cx}
                  cy={70}
                  r={32}
                  fill={colors.navy}
                  stroke={colors.ice}
                  strokeWidth={2}
                />
                <text
                  x={cx}
                  y={70}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={colors.ice}
                  fontSize={26}
                  fontWeight={600}
                  fontFamily={fontFamilySans}
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="mt-6 grid grid-cols-5 gap-6">
          {nodes.map((node, i) => (
            <div key={i}>
              <h3 className="font-serif text-h4 text-white">{node.title}</h3>
              <p className="mt-2 text-small leading-relaxed text-on-navy-secondary">
                {node.description}
              </p>
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
            className="absolute bottom-6 left-[23px] top-6 w-px bg-ice/40"
          />
          <div className="space-y-10">
            {nodes.map((node, i) => (
              <div key={i} className="relative flex gap-5">
                <svg
                  width={48}
                  height={48}
                  viewBox="0 0 48 48"
                  className="relative z-10 shrink-0"
                  aria-hidden="true"
                >
                  <circle
                    cx={24}
                    cy={24}
                    r={22}
                    fill={colors.navy}
                    stroke={colors.ice}
                    strokeWidth={2}
                  />
                  <text
                    x={24}
                    y={24}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={colors.ice}
                    fontSize={18}
                    fontWeight={600}
                    fontFamily={fontFamilySans}
                  >
                    {i + 1}
                  </text>
                </svg>
                <div className="pt-1">
                  <h3 className="font-serif text-h4 text-white">{node.title}</h3>
                  <p className="mt-2 text-small leading-relaxed text-on-navy-secondary">
                    {node.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
