import { colors } from "@/lib/tokens";

type Mechanism = {
  name: string;
  /** Who the cost actually lands on, per the guide's own exposure map. */
  borneBy: string;
};

const MECHANISMS: Mechanism[] = [
  { name: "One-off separation costs", borneBy: "Buyer, seller, or negotiated" },
  { name: "TSA costs", borneBy: "Buyer, as the paying party" },
  { name: "Standalone cost uplift", borneBy: "The new standalone entity" },
  { name: "Stranded costs", borneBy: "Seller" },
  { name: "Dis-synergies", borneBy: "Both, deal-specific" },
  { name: "Execution slippage", borneBy: "Both, by whose delay" },
];

/**
 * The six separation cost mechanisms, drawn as six equal blocks.
 *
 * Equal width is the whole point, and it is load-bearing rather than
 * decorative. A proportional stacked bar would encode relative magnitude,
 * and a diagram gets screenshotted and shared without its caption — so
 * proportional widths would assert sizes the guide never claims. Every block
 * is the same size deliberately: the claim is that there are six distinct
 * mechanisms, not that any one is bigger than another.
 *
 * Blocks are also unnumbered. The guide numbers them for reading order, but
 * numbering here would imply sequence or priority between mechanisms that
 * run concurrently and land on different parties.
 *
 * Every block is styled identically, so colour distinguishes nothing and the
 * diagram reads in grayscale. Nothing depends on hover, and there is no
 * animation.
 */
export function CostMechanismBlocks() {
  return (
    <figure className="mt-12">
      <p className="text-label font-semibold uppercase text-accent-dark">
        Illustrative cost categories
      </p>

      {/* 1fr columns, so the blocks are exactly equal at every breakpoint.
          Six across only at lg; below that they reflow to three, two and one
          rather than narrowing until the labels break up. */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {MECHANISMS.map((m) => (
          <div
            key={m.name}
            aria-hidden="true"
            className="flex flex-col p-4"
            style={{ border: `1.5px solid ${colors.hairline}` }}
          >
            <span
              aria-hidden="true"
              className="mb-3 block h-px w-8"
              style={{ backgroundColor: colors.accent }}
            />
            <p className="text-small font-semibold leading-snug text-graphite">
              {m.name}
            </p>
            <p className="mt-2 text-small leading-snug text-muted">
              {m.borneBy}
            </p>
          </div>
        ))}
      </div>

      {/* Spans the block grid rather than the prose measure, so it reads as
          the diagram's caption rather than a stray paragraph. Kept short
          enough to sit on one line at desktop width; the fuller explanation
          lives in the screen-reader text below. */}
      <figcaption className="mt-5 text-small leading-relaxed text-muted">
        Illustrative cost categories. Six distinct mechanisms shown at equal
        size — nothing here implies that any one is larger than another.
      </figcaption>

      <div className="sr-only">
        <p>
          Separation cost is made up of six distinct mechanisms, each landing
          on a different party:{" "}
          {MECHANISMS.map((m) => `${m.name} (${m.borneBy})`).join("; ")}. They
          are shown as six equal blocks because their relative magnitude
          depends entirely on the transaction; the diagram carries no
          information about the size of any mechanism.
        </p>
      </div>
    </figure>
  );
}
