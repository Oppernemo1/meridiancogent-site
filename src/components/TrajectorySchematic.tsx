import { colors } from "@/lib/tokens";

type Series = {
  title: string;
  /** Schematic shape only. Seven points across a six-week window, in a
   *  0–240 x / 0–80 y space where y grows downward. Deliberately not derived
   *  from anything: these are drawn curves, not plotted values. */
  points: [number, number][];
};

const SERIES: Series[] = [
  {
    title: "Day 1 readiness",
    points: [
      [0, 68],
      [40, 63],
      [80, 52],
      [120, 49],
      [160, 34],
      [200, 27],
      [240, 18],
    ],
  },
  {
    title: "TSA monthly exposure",
    points: [
      [0, 44],
      [40, 38],
      [80, 36],
      [120, 43],
      [160, 53],
      [200, 61],
      [240, 66],
    ],
  },
  {
    title: "Open blockers",
    points: [
      [0, 28],
      [40, 37],
      [80, 26],
      [120, 33],
      [160, 47],
      [200, 57],
      [240, 63],
    ],
  },
];

const CAPTION =
  "Illustrative shape only — not data from a program. Each of these carries the coverage behind it: how much of the underlying population the figure actually reflects. A trajectory with thin coverage is reported as thin rather than smoothed into a clean line.";

/**
 * Three small panels, one per control-tower trajectory over a six-week
 * window, each with an empty slot where the coverage behind the figure sits.
 *
 * Small multiples rather than three lines on one axis: readiness is a
 * percentage, TSA exposure is currency and open blockers is a count, so a
 * shared vertical axis would imply a common scale that does not exist.
 *
 * There are no numbers anywhere — no axis values, no percentages, no
 * currency, no counts. The only numeral is the "6" in "6 weeks ago", which
 * names the window rather than measuring anything. That is deliberate: a
 * plausible-looking figure in an illustration gets screenshotted without its
 * caption and read as a real customer program.
 *
 * Every panel's line is drawn identically, so colour distinguishes nothing
 * and the diagram reads in grayscale. Nothing depends on hover, and there is
 * no animation — a trajectory that appeared to move would imply the product
 * is running live.
 */
export function TrajectorySchematic() {
  return (
    <figure className="mt-10">
      {/* Side by side from md; stacked below. A sparkline stays legible when
          narrow, and the only text inside a panel is its title and the
          coverage slot, so three columns hold up at tablet width. */}
      <div className="grid gap-x-8 gap-y-10 md:grid-cols-3">
        {SERIES.map((series) => (
          <div key={series.title} aria-hidden="true">
            <p className="text-body-sm font-semibold leading-snug text-graphite">
              {series.title}
            </p>

            <svg
              viewBox="0 0 240 80"
              preserveAspectRatio="none"
              className="mt-4 h-20 w-full"
            >
              {/* Baseline only: no gridlines and no vertical axis, so nothing
                  suggests a readable scale. */}
              <line
                x1={0}
                y1={79}
                x2={240}
                y2={79}
                stroke={colors.hairline}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
              <polyline
                points={series.points.map(([x, y]) => `${x},${y}`).join(" ")}
                fill="none"
                stroke={colors.accent}
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                /* Keeps the stroke constant while the curve stretches to the
                   panel's width, so a stacked panel is not drawn with a much
                   heavier line than a narrow one. */
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-small text-muted">6 weeks ago</span>
              <span className="text-small text-muted">now</span>
            </div>

            {/* The coverage slot, deliberately unfilled. The point is that a
                figure never travels without it, not what any value would be. */}
            <p
              className="mt-4 px-3 py-2 text-center text-small text-muted"
              style={{ border: `1.5px dashed ${colors.muted}` }}
            >
              coverage shown here
            </p>
          </div>
        ))}
      </div>

      <figcaption className="mt-6 max-w-measure text-small leading-relaxed text-muted">
        {CAPTION}
      </figcaption>

      <div className="sr-only">
        <p>
          A schematic of three control-tower trajectories across a six-week
          window: Day 1 readiness, TSA monthly exposure and open blockers.
          Each is shown as a separate panel with its own line, because the
          three are measured in different units and do not share a scale. No
          values are given: the panels show the shape of a trajectory and the
          slot in which its coverage appears, not figures from any program.
          {" "}
          {CAPTION}
        </p>
      </div>
    </figure>
  );
}
