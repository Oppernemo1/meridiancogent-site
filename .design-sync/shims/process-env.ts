// src/lib/site.ts reads process.env at module load (Next inlines it at build
// time). Give the browser bundle an empty env so the site defaults apply.
const g = globalThis as { process?: { env: Record<string, string | undefined> } };
g.process ??= { env: {} };
export {};
