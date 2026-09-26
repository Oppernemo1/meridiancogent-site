// Builds the stylesheet shipped to Claude Design: the site's Tailwind output
// (sync config: site config + token safelist), plus a rule that swaps the
// Header's root-relative logo src for an inlined copy of public/logo-full.svg.
// Claude Design serves the project from its own origin, so "/logo-full.svg"
// would 404 there. Re-reads the SVG each build so the copy can't go stale.
import { execFileSync } from "node:child_process";
import { appendFileSync, readFileSync } from "node:fs";

const out = ".design-sync/.cache/site.css";
execFileSync("npx", ["tailwindcss", "-c", ".design-sync/tailwind.config.ts",
  "-i", ".design-sync/tailwind.input.css", "-o", out], { stdio: "inherit" });

const logo = readFileSync("public/logo-full.svg").toString("base64");
appendFileSync(out,
  `\n/* design-sync: Header logo, inlined from public/logo-full.svg */\n` +
  `img[src="/logo-full.svg"] { content: url("data:image/svg+xml;base64,${logo}"); }\n`);
