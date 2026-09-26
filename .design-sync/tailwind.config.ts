// Sync-only Tailwind config: the site's own config, plus the preview sources
// and a safelist of the token utilities so designs built in Claude Design can
// use any token class, not only the ones the site happens to use today.
import type { Config } from "tailwindcss";
import site from "../tailwind.config";

const color =
  "graphite|accent|accent-dark|accent-light|ink|muted|hairline|paper|white|on-dark-primary|on-dark-secondary|status-green|status-red";

const config: Config = {
  ...site,
  content: [
    "./src/**/*.{ts,tsx,js,jsx,mdx}",
    "./content/**/*.{md,mdx}",
    "./.design-sync/previews/**/*.tsx",
  ],
  safelist: [
    { pattern: new RegExp(`^(bg|text|border|divide|ring|fill|stroke)-(${color})$`), variants: ["hover", "focus"] },
    { pattern: /^text-(h1|h1-sm|h2|h2-sm|h3|body|body-sm|label|sidebar|small|nav)$/, variants: ["md"] },
    { pattern: /^(m|mt|mb|p|py|pt|pb|gap|space-y)-(section|section-lg|heading-gap|paragraph-gap)$/, variants: ["md"] },
    { pattern: /^max-w-(content|measure|panel|sidebar|diagram-caption)$/ },
    { pattern: /^font-(serif|sans)$/ },
  ],
};

export default config;
