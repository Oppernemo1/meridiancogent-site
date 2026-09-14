import type { Config } from "tailwindcss";
import {
  colors,
  fontFamily,
  fontSize,
  headingGap,
  layout,
  paragraphGap,
  sectionSpacing,
} from "./src/lib/tokens";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        // The "on this page" sidebar's own breakpoint — deliberately not one
        // of the default screens, since the sidebar needs more room than a
        // typical two-column switch (768px) before it stops competing with
        // the 720px content measure.
        sidebar: "900px",
      },
      colors: {
        graphite: colors.graphite,
        accent: {
          DEFAULT: colors.accent,
          dark: colors.accentDark,
          light: colors.accentLight,
        },
        ink: colors.ink,
        muted: colors.muted,
        hairline: colors.hairline,
        paper: colors.paper,
        "on-dark": colors.onDark,
        status: colors.status,
      },
      fontFamily: {
        serif: [...fontFamily.serif],
        sans: [...fontFamily.sans],
      },
      fontSize: {
        h1: fontSize.h1,
        "h1-sm": fontSize.h1Sm,
        h2: fontSize.h2,
        "h2-sm": fontSize.h2Sm,
        h3: fontSize.h3,
        body: fontSize.body,
        "body-sm": fontSize.bodySm,
        label: fontSize.label,
        sidebar: fontSize.sidebar,
        small: fontSize.small,
        nav: fontSize.nav,
      },
      maxWidth: {
        content: layout.contentWidth,
        measure: layout.proseWidth,
        "diagram-caption": layout.diagramCaption,
        sidebar: layout.sidebarWidth,
        panel: layout.dataPanelWidth,
      },
      gridTemplateColumns: {
        sidebar: `${layout.sidebarWidth} 1fr`,
      },
      spacing: {
        section: sectionSpacing.base[0],
        "section-lg": sectionSpacing.base[1],
        "heading-gap": headingGap,
        "paragraph-gap": paragraphGap,
      },
      typography: () => ({
        meridian: {
          css: {
            "--tw-prose-body": colors.ink,
            "--tw-prose-headings": colors.graphite,
            "--tw-prose-lead": colors.muted,
            "--tw-prose-links": colors.accentDark,
            "--tw-prose-bold": colors.ink,
            "--tw-prose-counters": colors.muted,
            "--tw-prose-bullets": colors.hairline,
            "--tw-prose-hr": colors.hairline,
            "--tw-prose-quotes": colors.ink,
            "--tw-prose-quote-borders": colors.hairline,
            "--tw-prose-captions": colors.muted,
            "--tw-prose-th-borders": colors.graphite,
            "--tw-prose-td-borders": colors.hairline,
            maxWidth: layout.proseWidth,
            fontSize: fontSize.bodySm[0],
            lineHeight: fontSize.body[1].lineHeight,
            "h1, h2, h3, h4": {
              fontFamily: fontFamily.serif.join(", "),
              fontWeight: "600",
              letterSpacing: "-0.01em",
            },
            "h3, h4": {
              fontFamily: fontFamily.sans.join(", "),
              fontWeight: "500",
            },
            h2: { fontSize: fontSize.h2Sm[0], lineHeight: fontSize.h2Sm[1].lineHeight, marginTop: "2.25em", marginBottom: headingGap },
            h3: { fontSize: fontSize.h3[0], lineHeight: fontSize.h3[1].lineHeight, marginTop: "2em", marginBottom: headingGap },
            p: { marginTop: paragraphGap, marginBottom: paragraphGap },
            a: { textDecoration: "underline", textUnderlineOffset: "3px", textDecorationThickness: "1px" },
            "a:hover": { color: colors.muted },
            table: {
              width: "100%",
              fontSize: fontSize.small[0],
              fontVariantNumeric: "tabular-nums",
            },
            'th[style*="right"], td[style*="right"]': {
              whiteSpace: "nowrap",
            },
            thead: {
              borderBottomWidth: "2px",
              borderBottomColor: "var(--tw-prose-th-borders)",
            },
            "thead th": {
              fontWeight: "600",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              fontSize: fontSize.label[0],
              color: colors.muted,
              paddingBottom: "0.6em",
            },
            "tbody tr": {
              borderBottomWidth: "1px",
              borderBottomColor: "var(--tw-prose-td-borders)",
            },
            "tbody tr:last-child": {
              borderBottomWidth: "0",
            },
            "thead th, tbody td": {
              paddingTop: "0.7em",
              paddingBottom: "0.7em",
            },
            pre: {
              overflowX: "auto",
              maxWidth: "100%",
              whiteSpace: "pre",
            },
            code: {
              wordBreak: "break-word",
            },
          },
        },
        // Desktop-only font-size step for the `meridian` variant above —
        // the typography plugin's css-in-JS config doesn't support a nested
        // `@media` key (it gets emitted as a literal, non-functional
        // selector), so the responsive step has to be its own variant,
        // applied as `md:prose-meridian-lg` alongside `prose-meridian`.
        "meridian-lg": {
          css: {
            fontSize: fontSize.body[0],
            h2: { fontSize: fontSize.h2[0], lineHeight: fontSize.h2[1].lineHeight },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
