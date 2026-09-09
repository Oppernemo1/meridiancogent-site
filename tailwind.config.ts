import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1E2761",
        ice: "#CADCFC",
        ink: "#2C2C2A",
        muted: "#5F5E5A",
        // Reserved product-UI status colours (not used decoratively on the site)
        status: {
          green: "#2C6E49",
          amber: "#B7791F",
          red: "#9B2C2C",
        },
      },
      fontFamily: {
        serif: ["Georgia", "'Times New Roman'", "Times", "serif"],
        sans: ["Helvetica", "Arial", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      maxWidth: {
        measure: "680px",
      },
      typography: () => ({
        meridian: {
          css: {
            "--tw-prose-body": "#2C2C2A",
            "--tw-prose-headings": "#1E2761",
            "--tw-prose-lead": "#5F5E5A",
            "--tw-prose-links": "#1E2761",
            "--tw-prose-bold": "#2C2C2A",
            "--tw-prose-counters": "#5F5E5A",
            "--tw-prose-bullets": "#CADCFC",
            "--tw-prose-hr": "#e6e6e3",
            "--tw-prose-quotes": "#2C2C2A",
            "--tw-prose-quote-borders": "#CADCFC",
            "--tw-prose-captions": "#5F5E5A",
            maxWidth: "680px",
            lineHeight: "1.8",
            "h2, h3, h4": {
              fontFamily: "Georgia, 'Times New Roman', Times, serif",
              fontWeight: "600",
              letterSpacing: "-0.01em",
            },
            h2: { marginTop: "2.5em", marginBottom: "0.8em" },
            a: { textDecoration: "underline", textUnderlineOffset: "3px", textDecorationThickness: "1px" },
            "a:hover": { color: "#5F5E5A" },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
