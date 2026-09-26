# design-sync notes (MeridianCogent site → Claude Design)

- This is a Next.js site, not a published package: no dist/, no .d.ts tree. The bundle is built from `.design-sync/entry.ts`, which re-exports the 7 synced components from `src/components/`. Add a component by exporting it there, adding it to `componentSrcMap` and `dtsPropsFor`, and writing `previews/<Name>.tsx`.
- Scope (first sync, 2026-09-26): user chose the core set only (Container, Section, DataPanel, PostCard, Header, Footer, EarlyAccessForm). The diagram components (ChainDiagram, CountryLaneTimeline, etc.) and the sidebar components were deliberately left out.
- Prop contracts are hand-written in `config.dtsPropsFor`: the converter's ts-morph extraction finds nothing without a published .d.ts tree. **Keep them in step with the component source** — they are not derived.
- Framework stand-ins (`.design-sync/shims/`, wired via `.design-sync/tsconfig.json` paths): `next/link` → plain `<a>`, `next/navigation` → `usePathname()` returns "/" (no nav item active). `shims/process-env.ts` must stay the first import in entry.ts, because `src/lib/site.ts` reads `process.env` at load time and the bundle dies with "process is not defined" otherwise.
- CSS: `buildCmd` (`node .design-sync/build-css.mjs`) must run before the converter. It compiles Tailwind with `.design-sync/tailwind.config.ts` (the site config + previews content + a token-class safelist) into `.design-sync/.cache/site.css` (= cfg.cssEntry), then appends a rule that swaps the Header's `/logo-full.svg` img src for an inlined data URI (the root-relative path 404s in Claude Design).
- Fonts: Gelasio woff2 files are copied from the Next build into `.design-sync/fonts/` (next/font serves them in production; SIL OFL). `--font-serif` is set to "Gelasio" in `tailwind.input.css`. The sans stack is system fonts, so nothing to ship.
- Render check / capture: Playwright is installed in .ds-sync without a browser download; run with `DS_CHROMIUM_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`.
- Not statically previewable: Header mobile menu (open state needs a click and a <900px viewport); EarlyAccessForm success/error states (need a submit to /api/early-access, which doesn't exist in Claude Design; the form will show the "couldn't reach the server" error there).

## Known render warns
- none

## Re-sync risks
- `dtsPropsFor` is hand-maintained: a prop added to a synced component won't reach the design agent until it is added here.
- Gelasio files were copied from `.next/static/media` (next build of 2026-09-26). If fonts.ts changes weights or families, re-copy them from a fresh `next build`.
- The logo swap in build-css.mjs matches `img[src="/logo-full.svg"]` exactly; if Header's src changes, the logo breaks silently in Claude Design.
- The Tailwind safelist in `.design-sync/tailwind.config.ts` lists token names by hand; a new colour or size added to `src/lib/tokens.ts` needs adding there too.
- New `next/*` or server-only imports in a synced component (e.g. `next/image`) need a shim, or the bundle fails.
