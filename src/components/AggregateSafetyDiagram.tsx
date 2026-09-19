import { colors } from "@/lib/tokens";

type Panel = {
  label: string;
  /** Record names this viewer can read. */
  visible: string[];
  /** Record names this viewer cannot read. */
  hidden: string[];
  /** The count the interface would show. */
  count: number;
  /** true = what the platform does; false = the outcome this prevents. */
  correct: boolean;
  /** What the count means, in plain words. */
  verdict: string;
};

const PANELS: Panel[] = [
  {
    label: "What the platform does",
    visible: ["A", "B", "C"],
    hidden: ["D", "E"],
    count: 3,
    correct: true,
    verdict: "The count matches what you can actually open.",
  },
  {
    label: "What this prevents",
    visible: ["A", "B", "C"],
    hidden: ["D", "E"],
    count: 5,
    correct: false,
    verdict:
      "A count of five would tell you two records exist that you are not allowed to read.",
  },
];

/**
 * Two panels showing that a count is subject to the same access rules as the
 * records behind it: the count a viewer sees covers only the records that
 * viewer can open, never the full population.
 *
 * Correct and prevented are distinguished by border style (solid vs dashed),
 * by a tick or cross glyph, and by a strike through the wrong number — so the
 * contrast survives in grayscale. Nothing depends on hover. The panels sit
 * side by side from `lg` up and stack below it. The `sr-only` block carries
 * the same content in prose rather than describing the picture.
 */
export function AggregateSafetyDiagram() {
  return (
    <figure className="mt-10">
      {/* Side by side only from lg. At 768 the content column is already
          narrowed by the floated data panel, and two columns there squeeze
          each panel to ~237px, wrapping its label — that is shrinking the
          layout rather than reflowing it, so below lg the panels stack. */}
      <div className="grid gap-6 lg:grid-cols-2">
        {PANELS.map((panel) => (
          <div
            key={panel.label}
            aria-hidden="true"
            className="p-5"
            style={{
              border: `1.5px ${panel.correct ? "solid" : "dashed"} ${
                panel.correct ? colors.graphite : colors.muted
              }`,
            }}
          >
            <div className="flex items-start gap-2">
              <Glyph correct={panel.correct} />
              <p className="text-body-sm font-semibold leading-snug text-graphite">
                {panel.label}
              </p>
            </div>

            <dl className="mt-5 space-y-4">
              <div>
                <dt className="text-small text-muted">Records you can read</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {panel.visible.map((name) => (
                    <Chip key={name} name={name} readable />
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-small text-muted">
                  Records you cannot read
                </dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {panel.hidden.map((name) => (
                    <Chip key={name} name={name} readable={false} />
                  ))}
                </dd>
              </div>
            </dl>

            <div className="mt-5 border-t border-hairline pt-4">
              <p className="text-small text-muted">Count shown</p>
              <p className="mt-1 flex items-baseline gap-2">
                <span
                  className={`text-h2-sm md:text-h2 ${
                    panel.correct
                      ? "text-graphite"
                      : "text-muted line-through decoration-2"
                  }`}
                >
                  {panel.count}
                </span>
              </p>
              <p className="mt-2 text-small leading-relaxed text-muted">
                {panel.verdict}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="sr-only">
        <p>
          A viewer who can read records A, B and C but not records D and E sees
          a count of three, because the count is subject to the same access
          rules as the records behind it. The prevented alternative is a count
          of five, which would disclose that two records exist that the viewer
          is not allowed to read.
        </p>
      </div>
    </figure>
  );
}

/** A record, shown as readable or not by border style and by an explicit label. */
function Chip({ name, readable }: { name: string; readable: boolean }) {
  return (
    <span
      className={`inline-flex h-9 w-9 items-center justify-center text-small font-semibold ${
        readable ? "text-graphite" : "text-muted"
      }`}
      style={{
        border: `1.5px ${readable ? "solid" : "dashed"} ${
          readable ? colors.graphite : colors.muted
        }`,
      }}
    >
      {name}
    </span>
  );
}

/** Tick for the real behaviour, cross for the prevented one. */
function Glyph({ correct }: { correct: boolean }) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 20 20"
      className="mt-0.5 shrink-0"
      aria-hidden="true"
    >
      {correct ? (
        <path
          d="M4 10.5 L8 14.5 L16 5.5"
          fill="none"
          stroke={colors.graphite}
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <g stroke={colors.muted} strokeWidth={2.2} strokeLinecap="round">
          <line x1={5} y1={5} x2={15} y2={15} />
          <line x1={15} y1={5} x2={5} y2={15} />
        </g>
      )}
    </svg>
  );
}
