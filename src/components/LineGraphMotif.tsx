import { type CSSProperties } from "react";
import { colors } from "@/lib/tokens";

export type MotifVariant =
  | "deal"
  | "separation"
  | "portfolio"
  | "advisory"
  | "mark";

const PATHS: Record<string, string> = {
  // A rising, corrected tracking line — echoes the logo's zigzag "M".
  deal: "M6 92 L44 44 L74 70 L110 26 L150 78 L194 40",
  // A stepped separation path — parallel obligations winding down.
  separation:
    "M6 30 L40 30 L40 66 L84 66 L84 40 L128 40 L128 84 L172 84 L172 54 L194 54",
  // Overlaid trajectories — a portfolio running in parallel.
  portfolio: "M6 96 L60 52 L120 76 L194 24",
  portfolioAlt: "M6 70 L60 88 L120 34 L194 66",
  // A single considered stroke bending toward resolution.
  advisory: "M6 86 C 52 86 52 30 100 30 S 150 84 194 44",
  // The mark itself, for large decorative use.
  mark: "M40 140 L80 78 L100 118 L120 58 L160 140",
};

export function LineGraphMotif({
  variant,
  tone = "accent",
  className,
  style,
  strokeWidth = 4,
}: {
  variant: MotifVariant;
  tone?: "accent" | "graphite" | "faint";
  className?: string;
  style?: CSSProperties;
  strokeWidth?: number;
}) {
  const stroke = tone === "accent" ? colors.accent : colors.graphite;
  const opacity = tone === "faint" ? 0.14 : 1;

  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      aria-hidden="true"
      className={className}
      style={style}
      preserveAspectRatio="xMidYMid meet"
    >
      {variant === "portfolio" && (
        <path
          d={PATHS.portfolioAlt}
          stroke={stroke}
          strokeOpacity={opacity * 0.45}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      <path
        d={PATHS[variant]}
        stroke={stroke}
        strokeOpacity={opacity}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Large, very subtle background line-graph field. Purely decorative — sits
 * behind content at low opacity, never reads as a literal chart.
 *
 * preserveAspectRatio="none": call sites stretch this to fill containers of
 * very different aspect ratios (short wide heroes, a tall footer band). A
 * "meet"/"slice" fit keeps the 1200x400 aspect locked and crops or letterboxes
 * outside it, which cut the path off-frame or exposed empty canvas depending
 * on the container's proportions. Stretching non-uniformly keeps the line
 * spanning edge-to-edge with no clipping at any size — imperceptible for a
 * faint decorative stroke.
 */
export function BackgroundLines({
  className,
  tone = "faint",
}: {
  className?: string;
  tone?: "faint" | "accent";
}) {
  const stroke = tone === "accent" ? colors.accent : colors.graphite;
  const opacity = tone === "accent" ? 0.22 : 0.06;
  return (
    <svg
      viewBox="0 0 1200 400"
      fill="none"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M-20 320 L160 180 L300 250 L460 90 L640 210 L820 70 L1000 200 L1220 120"
        stroke={stroke}
        strokeOpacity={opacity}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M-20 380 L200 300 L360 340 L520 250 L700 320 L880 240 L1060 300 L1220 250"
        stroke={stroke}
        strokeOpacity={opacity * 0.7}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
