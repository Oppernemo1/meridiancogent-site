// Simple in-memory per-key rate limiter. Good enough to stop someone looping
// a single endpoint from one IP — not a distributed limiter, so a burst
// spread across serverless instances or a cold start resets it. That's an
// acceptable trade-off for the modest limit this guards (program
// signups), not something worth a Redis dependency for.
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_HITS = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Bound memory growth from the occasional stray/spoofed key.
  if (hits.size > 5000) {
    for (const [k, timestamps] of hits) {
      if (timestamps.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return recent.length > MAX_HITS;
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}
