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
  // Light neutral hairline/border grey — shared between the prose table
  // and card borders (tailwind.config.ts) and the email template.
  hairline: "#e6e6e3",
  // Solid (non-opacity) text colours for use on the navy ground. Computed to
  // meet WCAG AA (4.5:1) against #1E2761 without relying on alpha blending,
  // which is hard to audit at a glance.
  onNavy: {
    primary: "#FFFFFF", // 13.83:1
    secondary: "#C9CEE8", // ~9.4:1 — secondary copy on navy
    muted: "#A9AFD6", // ~6.3:1 — least-emphasis text on navy (e.g. disabled labels)
  },
  // Reserved product-UI status colours — not used decoratively on the
  // marketing site. Only add a colour here once an actual UI state needs it.
  status: {
    green: "#2C6E49",
    red: "#9B2C2C",
  },
} as const;

/**
 * Colours used only in the plain-HTML email templates (src/lib/emails.ts),
 * which render in mail clients rather than through Tailwind/the browser.
 * Kept separate from `colors` so the Tailwind-facing palette above only
 * ever contains values something in the UI actually uses.
 */
export const emailColors = {
  pageBg: "#F4F4F2",
  mutedLink: "#a9b6e0",
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
  display: ["2.75rem", { lineHeight: "1.15", letterSpacing: "-0.015em" }], // 44px — h1 desktop
  displaySm: ["1.65rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }], // 26.4px — h1 mobile
  h2: ["1.875rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }], // 30px desktop
  h2Sm: ["1.875rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }], // 30px mobile
  h3: ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.005em" }], // 24px
  h4: ["1.125rem", { lineHeight: "1.4" }], // 18px
  bodyLg: ["1.125rem", { lineHeight: "1.7" }], // 18px — desktop prose/body copy
  body: ["1rem", { lineHeight: "1.65" }], // 16px — meta, secondary copy
  small: ["0.875rem", { lineHeight: "1.5" }], // 14px
  micro: ["0.75rem", { lineHeight: "1.4" }], // 12px — labels/tags
  // Long-form prose headings (article/legal pages) sit deliberately smaller
  // than the marketing-page h2/h3 scale above, so they get their own steps.
  proseH2: ["1.75rem", { lineHeight: "1.3" }], // 28px
  proseH3: ["1.375rem", { lineHeight: "1.35" }], // 22px
};

/**
 * Section vertical rhythm, in rem, [mobile, desktop]. Wired into Tailwind
 * as the `section`/`section-lg` spacing keys (see tailwind.config.ts) and
 * applied as `py-section md:py-section-lg` in section wrappers — a single
 * source of truth so the rhythm changes everywhere at once, not per page.
 */
export const sectionSpacing = {
  base: ["2.5rem", "4rem"], // ~half the original 4.5rem/8rem: sections
  // should read as one document, not isolated islands.
} as const;

/**
 * Gap between a section heading and its first paragraph, in rem. Wired into
 * Tailwind as the `heading-gap` spacing key — applied as `mt-heading-gap`.
 */
export const headingGap = "0.5rem";

/** Layout widths. */
export const layout = {
  contentWidth: "1100px", // wide sections (grids, two-column layouts)
  proseWidth: "700px", // long-form article/legal-copy measure
  diagramCaption: "200px", // ChainDiagram node description line length
} as const;
