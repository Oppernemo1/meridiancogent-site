/**
 * Design tokens — the single source of truth for colour, type, spacing, and
 * layout width across the site. Tailwind config reads from this file;
 * components should reference Tailwind utility classes generated from it
 * rather than hardcoding hex values, px sizes, or one-off max-widths.
 */

export const colors = {
  navy: "#1E2761",
  ice: "#CADCFC",
  ink: "#2C2C2A",
  muted: "#5F5E5A",
  // Solid (non-opacity) text colours for use on the navy ground. Computed to
  // meet WCAG AA (4.5:1) against #1E2761 without relying on alpha blending,
  // which is hard to audit at a glance.
  onNavy: {
    primary: "#FFFFFF", // 13.83:1
    secondary: "#C9CEE8", // ~9.4:1 — secondary copy on navy
    muted: "#A9AFD6", // ~6.3:1 — least-emphasis text on navy (e.g. disabled labels)
  },
  // Reserved product-UI status colours — not used decoratively on the
  // marketing site.
  status: {
    green: "#2C6E49",
    amber: "#B7791F",
    red: "#9B2C2C",
  },
} as const;

export const fontFamily = {
  serif: [
    "ui-serif",
    "Iowan Old Style",
    "Apple Garamond",
    "Palatino Linotype",
    "Georgia",
    "Times New Roman",
    "serif",
  ],
  sans: [
    "ui-sans-serif",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif",
  ],
} as const;

/**
 * Type scale. Sizes are desktop values; headings step down responsively via
 * Tailwind's `md:`/`sm:` variants in components rather than a fluid-clamp
 * mechanism, to keep the scale easy to reason about.
 */
export const fontSize: Record<string, [string, { lineHeight: string; letterSpacing?: string }]> = {
  display: ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.015em" }], // 60px — h1 desktop
  displaySm: ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }], // 36px — h1 mobile
  h2: ["2.5rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }], // 40px desktop
  h2Sm: ["1.875rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }], // 30px mobile
  h3: ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.005em" }], // 24px
  h4: ["1.125rem", { lineHeight: "1.4" }], // 18px
  bodyLg: ["1.125rem", { lineHeight: "1.7" }], // 18px — desktop prose/body copy
  body: ["1rem", { lineHeight: "1.65" }], // 16px — meta, secondary copy
  small: ["0.875rem", { lineHeight: "1.5" }], // 14px
  micro: ["0.75rem", { lineHeight: "1.4" }], // 12px — labels/tags
};

/**
 * Section vertical rhythm, in rem, [mobile, desktop]. Applied as
 * `py-[mobile] md:py-[desktop]` in section wrappers.
 */
export const sectionSpacing = {
  base: ["4.5rem", "8rem"],
  large: ["5rem", "10rem"], // hero, footer, and other high-emphasis sections
} as const;

/** Layout widths. */
export const layout = {
  contentWidth: "1100px", // wide sections (grids, two-column layouts)
  proseWidth: "700px", // long-form article/legal-copy measure
} as const;
