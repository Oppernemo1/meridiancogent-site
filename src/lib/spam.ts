// Bot checks for /api/early-access, run before anything touches Resend.
//
// Three layers: a honeypot field people never see, a minimum time between the
// form mounting and the submission, and a Cloudflare Turnstile token verified
// server-side. The first two reject silently (the bot gets a normal success
// response and learns nothing); a failed Turnstile check returns an error so a
// real visitor can retry.

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Name of the hidden field. Real visitors never see or fill it. */
export const HONEYPOT_FIELD = "website";

/** Faster than this from form mount to submit is treated as a bot. */
export const MIN_SUBMIT_MS = 3000;

export type RejectReason =
  | "rate_limited"
  | "honeypot"
  | "too_fast"
  | "turnstile_missing"
  | "turnstile_invalid"
  | "turnstile_unavailable";

// Per-instance running totals. Serverless instances come and go, so these
// reset; each rejection is also logged on its own line, which is the durable
// record in the Vercel logs. Only the reason is logged — never the email,
// name, company or IP of the submission.
const rejections: Record<RejectReason, number> = {
  rate_limited: 0,
  honeypot: 0,
  too_fast: 0,
  turnstile_missing: 0,
  turnstile_invalid: 0,
  turnstile_unavailable: 0,
};

export function logRejection(reason: RejectReason, detail?: string) {
  rejections[reason] += 1;
  const totals = Object.entries(rejections)
    .map(([k, v]) => `${k}=${v}`)
    .join(" ");
  console.warn(
    `[early-access] REJECTED reason=${reason}${detail ? ` detail=${detail}` : ""} totals(instance): ${totals}`,
  );
}

export function rejectionCounts(): Readonly<Record<RejectReason, number>> {
  return { ...rejections };
}

/**
 * The silent checks. Returns the reason to reject, or null to carry on.
 * `elapsedMs` is reported by the form; a missing or non-numeric value means
 * the request didn't come from the form and is treated as too fast.
 */
export function silentRejectReason(
  body: Record<string, unknown>,
): "honeypot" | "too_fast" | null {
  const trap = body[HONEYPOT_FIELD];
  if (typeof trap === "string" ? trap.trim() !== "" : trap != null) {
    return "honeypot";
  }
  const elapsed = body.elapsedMs;
  if (typeof elapsed !== "number" || !Number.isFinite(elapsed)) {
    return "too_fast";
  }
  if (elapsed < MIN_SUBMIT_MS) return "too_fast";
  return null;
}

export type TurnstileResult =
  | { ok: true }
  | {
      ok: false;
      reason: "turnstile_missing" | "turnstile_invalid" | "turnstile_unavailable";
      /** Cloudflare's error codes, safe to log (no personal data). */
      codes?: string;
    };

/** Verifies a Turnstile token with Cloudflare. Tokens are single-use. */
export async function verifyTurnstile(
  token: unknown,
  secret: string,
): Promise<TurnstileResult> {
  if (typeof token !== "string" || token.length === 0 || token.length > 2048) {
    return { ok: false, reason: "turnstile_missing" };
  }
  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      return { ok: false, reason: "turnstile_unavailable", codes: `http-${res.status}` };
    }
    const data = (await res.json()) as {
      success?: boolean;
      "error-codes"?: string[];
    };
    if (data.success === true) return { ok: true };
    return {
      ok: false,
      reason: "turnstile_invalid",
      codes: (data["error-codes"] ?? []).join(","),
    };
  } catch {
    return { ok: false, reason: "turnstile_unavailable" };
  }
}
