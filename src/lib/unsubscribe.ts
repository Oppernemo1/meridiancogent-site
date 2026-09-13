import { createHmac, timingSafeEqual } from "crypto";
import { SITE_URL } from "./site";

// Resend does not manage unsubscribe state for transactional sends (only for
// Broadcasts sent to an Audience) — https://resend.com/docs/dashboard/emails/add-unsubscribe-to-transactional-emails
// So the link/header we send has to point at our own endpoint, which then
// calls contacts.update to flip `unsubscribed` in the Segment ourselves.
// The token is an HMAC of the email so the link can't be used to unsubscribe
// an address that never received it.
function secret(): string {
  const value = process.env.UNSUBSCRIBE_SECRET || process.env.RESEND_API_KEY;
  if (!value) {
    throw new Error(
      "Missing UNSUBSCRIBE_SECRET (or RESEND_API_KEY as fallback) for signing unsubscribe links.",
    );
  }
  return value;
}

export function signUnsubscribeToken(email: string): string {
  return createHmac("sha256", secret())
    .update(email.trim().toLowerCase())
    .digest("hex")
    .slice(0, 32);
}

export function verifyUnsubscribeToken(email: string, token: string): boolean {
  if (!email || !token) return false;
  const expected = Buffer.from(signUnsubscribeToken(email));
  const provided = Buffer.from(token);
  if (expected.length !== provided.length) return false;
  return timingSafeEqual(expected, provided);
}

export function unsubscribeUrl(email: string): string {
  const params = new URLSearchParams({
    email: email.trim().toLowerCase(),
    token: signUnsubscribeToken(email),
  });
  return `${SITE_URL}/api/unsubscribe?${params.toString()}`;
}
