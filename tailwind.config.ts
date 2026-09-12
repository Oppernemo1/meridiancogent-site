import type { Config } from "tailwindcss";
import { colors, fontFamily, fontSize, layout } from "./src/lib/tokens";

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
      },
      maxWidth: {
        content: layout.contentWidth,
        measure: layout.proseWidth,
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
            "--tw-prose-hr": "#e6e6e3",
            "--tw-prose-quotes": colors.ink,
            "--tw-prose-quote-borders": colors.ice,
            "--tw-prose-captions": colors.muted,
            "--tw-prose-th-borders": colors.navy,
            "--tw-prose-td-borders": "#e6e6e3",
            maxWidth: layout.proseWidth,
            fontSize: "1.125rem",
            lineHeight: "1.7",
            "h1, h2, h3, h4": {
              fontFamily: fontFamily.serif.join(", "),
              fontWeight: "600",
              letterSpacing: "-0.01em",
            },
            h2: { fontSize: "1.75rem", marginTop: "2.75em", marginBottom: "0.8em" },
            h3: { fontSize: "1.375rem", marginTop: "2em", marginBottom: "0.7em" },
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
              fontSize: "0.75rem",
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
