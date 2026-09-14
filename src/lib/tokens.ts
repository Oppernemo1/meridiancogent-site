/**
 * Design tokens — the single source of truth for colour, type, spacing, and
 * layout width across the site. Tailwind config reads from this file;
 * components should reference Tailwind utility classes generated from it
 * rather than hardcoding hex values, px sizes, or one-off max-widths.
 */

export const colors = {
  graphite: "#2B2F3A", // primary — dark grounds, headings, ink-on-paper emphasis
  // Three accent stops — #E8743B alone fails 4.5:1 AA as text against both
  // paper and graphite, so text uses get their own darkened/lightened stop
  // per ground. Never use `accent` itself for text.
  accent: "#E8743B", // signal orange — fills, the logo mark, rules/strokes/borders. Never text.
  accentDark: "#B04A22", // orange text on a light ground — links, section labels, emphasis. 5.23:1 on paper.
  accentLight: "#F08A55", // orange text on the graphite ground — panel labels/values, footer links. 5.39:1 on graphite.
  ink: "#2A2C31", // body text on paper
  muted: "#63676F", // secondary text on paper
  hairline: "#E3E4E7", // border colour — shared between the prose table, card borders (tailwind.config.ts) and the email template
  paper: "#FBFAF8", // page ground
  // Solid (non-opacity) text colours for use on the graphite ground.
  onDark: {
    primary: "#FFFFFF",
    secondary: "#C8CCD4",
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
 * Type scale. Exactly one value per level per breakpoint — no
 * page-specific variants (marketing vs. document/prose headings share the
 * same h2/h3). Mobile sizes are applied as the base class, desktop via
 * `md:`, matching the mobile-first pattern used throughout the components.
 */
export const fontSize: Record<string, [string, { lineHeight: string; letterSpacing?: string }]> = {
  h1: ["2.5rem", { lineHeight: "1.2" }], // 40px desktop
  h1Sm: ["1.75rem", { lineHeight: "1.2" }], // 28px mobile
  h2: ["1.625rem", { lineHeight: "1.3" }], // 26px desktop
  h2Sm: ["1.375rem", { lineHeight: "1.3" }], // 22px mobile
  h3: ["1.125rem", { lineHeight: "1.4" }], // 18px — sans, medium weight, no breakpoint step
  body: ["1rem", { lineHeight: "1.7" }], // 16px desktop
  bodySm: ["0.9375rem", { lineHeight: "1.7" }], // 15px mobile
  label: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.07em" }], // small-caps section label
  sidebar: ["0.75rem", { lineHeight: "1.4" }], // sidebar TOC item
  small: ["0.8125rem", { lineHeight: "1.5" }], // meta copy, footer, form status text
  nav: ["0.9375rem", { lineHeight: "1.4" }], // header nav links
};

/**
 * Section vertical rhythm, in rem, [mobile, desktop]. Wired into Tailwind
 * as the `section`/`section-lg` spacing keys (see tailwind.config.ts) and
 * applied as `py-section md:py-section-lg` in section wrappers — a single
 * source of truth so the rhythm changes everywhere at once, not per page.
 */
export const sectionSpacing = {
  base: ["2.5rem", "3.5rem"],
} as const;

/**
 * Gap between a section heading and its first paragraph, in rem. Wired into
 * Tailwind as the `heading-gap` spacing key — applied as `mt-heading-gap`.
 */
export const headingGap = "0.75rem";

/**
 * Gap between consecutive paragraphs, in rem. Equal to Tailwind's default
 * `5` spacing step (1.25rem) — exposed as its own token so intent is
 * explicit at call sites (`mt-paragraph-gap`) rather than an unlabelled `mt-5`.
 */
export const paragraphGap = "1.25rem";

/** Layout widths. */
export const layout = {
  contentWidth: "1100px", // wide sections (grids, two-column layouts)
  proseWidth: "720px", // long-form content measure — article/legal copy and the content column in the sidebar layout
  diagramCaption: "200px", // ChainDiagram node description line length
  sidebarWidth: "145px", // sticky "on this page" sidebar
  dataPanelWidth: "165px", // floated data panel
} as const;
