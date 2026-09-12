import type { Config } from "tailwindcss";
import {
  colors,
  fontFamily,
  fontSize,
  headingGap,
  layout,
  sectionSpacing,
} from "./src/lib/tokens";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: colors.navy,
        ice: colors.ice,
        ink: colors.ink,
        muted: colors.muted,
        hairline: colors.hairline,
        "on-navy": colors.onNavy,
        status: colors.status,
      },
      fontFamily: {
        serif: [...fontFamily.serif],
        sans: [...fontFamily.sans],
      },
      fontSize: {
        display: fontSize.display,
        "display-sm": fontSize.displaySm,
        h2: fontSize.h2,
        "h2-sm": fontSize.h2Sm,
        h3: fontSize.h3,
        h4: fontSize.h4,
        "body-lg": fontSize.bodyLg,
        body: fontSize.body,
        small: fontSize.small,
        micro: fontSize.micro,
        "prose-h2": fontSize.proseH2,
        "prose-h3": fontSize.proseH3,
      },
      maxWidth: {
        content: layout.contentWidth,
        measure: layout.proseWidth,
        "diagram-caption": layout.diagramCaption,
      },
      spacing: {
        section: sectionSpacing.base[0],
        "section-lg": sectionSpacing.base[1],
        "heading-gap": headingGap,
      },
      typography: () => ({
        meridian: {
          css: {
            "--tw-prose-body": colors.ink,
            "--tw-prose-headings": colors.navy,
            "--tw-prose-lead": colors.muted,
            "--tw-prose-links": colors.navy,
            "--tw-prose-bold": colors.ink,
            "--tw-prose-counters": colors.muted,
            "--tw-prose-bullets": colors.ice,
            "--tw-prose-hr": colors.hairline,
            "--tw-prose-quotes": colors.ink,
            "--tw-prose-quote-borders": colors.ice,
            "--tw-prose-captions": colors.muted,
            "--tw-prose-th-borders": colors.navy,
            "--tw-prose-td-borders": colors.hairline,
            maxWidth: layout.proseWidth,
            fontSize: fontSize.bodyLg[0],
            lineHeight: "1.7",
            "h1, h2, h3, h4": {
              fontFamily: fontFamily.serif.join(", "),
              fontWeight: "600",
              letterSpacing: "-0.01em",
            },
            h2: { fontSize: fontSize.proseH2[0], marginTop: "1.6em", marginBottom: "0.5em" },
            h3: { fontSize: fontSize.proseH3[0], marginTop: "1.4em", marginBottom: "0.45em" },
            p: { marginTop: "1.4em", marginBottom: "1.4em" },
            a: { textDecoration: "underline", textUnderlineOffset: "3px", textDecorationThickness: "1px" },
            "a:hover": { color: colors.muted },
            table: {
              width: "100%",
              fontSize: "0.9375rem",
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
              fontSize: fontSize.micro[0],
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
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
