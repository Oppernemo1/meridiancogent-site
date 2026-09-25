import { useId } from "react";
import { colors } from "@/lib/tokens";

export type LaneState = "reached" | "blocked" | "pending";

export type TimelineLane = {
  name: string;
  /** One state per milestone, same order and length as `milestones`. */
  states: LaneState[];
  /** Shown beneath the lane name — why it is where it is. */
  note?: string;
};

const STATE_TEXT: Record<LaneState, string> = {
  reached: "reached",
  blocked: "blocked",
  pending: "not reached",
};

/** Sentence case for standalone use in the legend. */
const STATE_LABEL: Record<LaneState, string> = {
  reached: "Reached",
  blocked: "Blocked",
  pending: "Not reached",
};

/**
 * Program timeline with per-jurisdiction lanes, showing that countries run
 * on their own clocks: one lane can block without stopping the others, and a
 * program milestone downstream of a blocked lane inherits the block.
 *
 * Built on the same conventions as ChainDiagram: dot-and-line geometry, every label
 * in HTML so type never scales below its set size, and a full restructure at
 * the `md` breakpoint rather than a shrunk-down copy of the desktop layout.
 *
 * State is encoded by marker shape and by line style (solid vs dashed), never
 * by colour alone — the diagram reads correctly in grayscale. Nothing depends
 * on hover. The `<table>` at the end carries the same content for screen
 * readers, so the information is available and not merely described.
 */
export function CountryLaneTimeline({
  milestones,
  lanes,
  caption,
}: {
  milestones: string[];
  lanes: TimelineLane[];
  caption: string;
}) {
  const captionId = useId();
  const count = milestones.length;

  // Markers are fixed-size HTML/SVG positioned along the track rather than
  // drawn inside one wide viewBox: a viewBox scales its contents to the
  // rendered width, which shrinks a marker to a few pixels in a narrow
  // column. Percentages keep the track fluid while the markers stay legible.
  const pct = (i: number) => ((i + 0.5) / count) * 100;

  return (
    <figure className="mt-10" aria-describedby={captionId}>
      {/* ---------- Desktop / tablet: lanes as horizontal tracks ---------- */}
      <div className="hidden md:block" aria-hidden="true">
        {/* Milestone headings, aligned to the marker columns */}
        <div className="grid grid-cols-[120px_1fr] gap-x-5">
          <div />
          <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${count}, 1fr)` }}
          >
            {milestones.map((m) => (
              <div key={m} className="px-1 text-center">
                <span className="text-small font-medium text-graphite">
                  {m}
                </span>
              </div>
            ))}
          </div>
        </div>

        {lanes.map((lane) => (
          <div
            key={lane.name}
            className="mt-5 grid grid-cols-[120px_1fr] items-center gap-x-5 border-t border-hairline pt-5"
          >
            <div>
              <p className="text-body-sm font-semibold leading-snug text-graphite">
                {lane.name}
              </p>
              {lane.note && (
                <p className="mt-1 text-small leading-snug text-muted">
                  {lane.note}
                </p>
              )}
            </div>

            <div className="relative h-6">
              {/* Connectors. A segment is dashed when the milestone it leads
                  into has not been reached, so progress reads without colour. */}
              {Array.from({ length: count - 1 }).map((_, i) => {
                const solid = lane.states[i + 1] === "reached";
                return (
                  <span
                    key={i}
                    className="absolute top-1/2 border-t"
                    style={{
                      left: `${pct(i)}%`,
                      width: `${pct(i + 1) - pct(i)}%`,
                      borderTopStyle: solid ? "solid" : "dashed",
                      borderTopWidth: 1.5,
                      borderTopColor: solid ? colors.accent : colors.muted,
                      opacity: solid ? 0.85 : 0.6,
                    }}
                  />
                );
              })}

              {lane.states.map((state, i) => (
                <span
                  key={i}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${pct(i)}%` }}
                >
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 28 28"
                    className="block"
                  >
                    <Marker state={state} cx={14} cy={14} />
                  </svg>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ---------- Mobile: one block per lane, milestones stacked ---------- */}
      <div className="md:hidden" aria-hidden="true">
        {lanes.map((lane) => (
          <div
            key={lane.name}
            className="border-t border-hairline py-5 first:border-t-0 first:pt-0"
          >
            <p className="text-body-sm font-semibold leading-snug text-graphite">
              {lane.name}
            </p>
            {lane.note && (
              <p className="mt-1 text-small leading-snug text-muted">
                {lane.note}
              </p>
            )}
            <ul className="mt-3 space-y-2">
              {lane.states.map((state, i) => (
                <li key={milestones[i]} className="flex items-center gap-3">
                  <svg
                    width={22}
                    height={22}
                    viewBox="0 0 28 28"
                    className="shrink-0"
                  >
                    <Marker state={state} cx={14} cy={14} />
                  </svg>
                  <span className="text-small leading-snug text-ink">
                    {milestones[i]}
                    <span className="text-muted"> — {STATE_TEXT[state]}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ---------- Legend ---------- */}
      <ul
        aria-hidden="true"
        className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-hairline pt-4"
      >
        {(["reached", "blocked", "pending"] as LaneState[]).map((state) => (
          <li key={state} className="flex items-center gap-2">
            <svg
              width={18}
              height={18}
              viewBox="0 0 28 28"
              className="shrink-0"
            >
              <Marker state={state} cx={14} cy={14} />
            </svg>
            <span className="text-small text-muted">{STATE_LABEL[state]}</span>
          </li>
        ))}
      </ul>

      <figcaption
        id={captionId}
        className="mt-4 text-small leading-relaxed text-muted"
      >
        {caption}
      </figcaption>

      {/* The same content as a table, for screen readers: the diagram's
          information rather than a description of its appearance.
          `sr-only` goes on a block wrapper, not on the table: a table keeps
          display:table, which treats sr-only's width:1px as a minimum and
          expands to its content, pushing the page's scrollWidth out. */}
      <div className="sr-only">
        <table>
          <caption>{caption}</caption>
          <thead>
            <tr>
              <th scope="col">Lane</th>
              {milestones.map((m) => (
                <th key={m} scope="col">
                  {m}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lanes.map((lane) => (
              <tr key={lane.name}>
                <th scope="row">
                  {lane.name}
                  {lane.note ? ` (${lane.note})` : ""}
                </th>
                {lane.states.map((state, i) => (
                  <td key={milestones[i]}>{STATE_TEXT[state]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

/**
 * Marker shapes carry the meaning on their own: a filled disc for reached, an
 * open ring for not reached, and a ringed cross for blocked. Colour reinforces
 * but never carries the distinction.
 */
function Marker({
  state,
  cx,
  cy,
}: {
  state: LaneState;
  cx: number;
  cy: number;
}) {
  if (state === "reached") {
    return <circle cx={cx} cy={cy} r={6} fill={colors.accent} />;
  }

  if (state === "pending") {
    return (
      <circle
        cx={cx}
        cy={cy}
        r={5.5}
        fill={colors.paper}
        stroke={colors.muted}
        strokeWidth={1.5}
      />
    );
  }

  // Blocked: a heavier ring with a cross through it.
  const d = 4;
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={8}
        fill={colors.paper}
        stroke={colors.graphite}
        strokeWidth={2}
      />
      <line
        x1={cx - d}
        y1={cy - d}
        x2={cx + d}
        y2={cy + d}
        stroke={colors.graphite}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <line
        x1={cx + d}
        y1={cy - d}
        x2={cx - d}
        y2={cy + d}
        stroke={colors.graphite}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </g>
  );
}
