import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  contactRequestSchema,
  earlyAccessSchema,
  type ContactRequestInput,
} from "@/lib/validation";
import { confirmationEmail, internalNotification } from "@/lib/emails";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CONTACT_EMAIL = "hello@meridiancogent.com";
const DEFAULT_FROM = "MeridianCogent <noreply@meridiancogent.com>";

function json(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  // --- Rate limit (per IP, before anything else costs a Resend call) ---
  if (isRateLimited(`early-access:${getClientIp(request)}`)) {
    return json(
      { error: "Too many requests. Please try again later." },
      429,
    );
  }

  // --- Parse body ---
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // --- Server-side validation (authoritative) ---
  // A "Talk to Us" request carries name/company/role and requires the first
  // two; a guide download is email-only.
  const isContactRequest =
    (payload as { intent?: unknown } | null)?.intent === "talk";
  const parsed = isContactRequest
    ? contactRequestSchema.safeParse(payload)
    : earlyAccessSchema.safeParse(payload);
  if (!parsed.success) {
    const message =
      parsed.error.issues[0]?.message ?? "Enter a valid email address.";
    return json({ error: message }, 400);
  }
  const email = parsed.data.email.toLowerCase();
  const details = isContactRequest
    ? (parsed.data as ContactRequestInput)
    : undefined;
  const source =
    typeof (payload as { source?: unknown }).source === "string"
      ? (payload as { source: string }).source.slice(0, 64)
      : "unknown";

  // --- Config ---
  const apiKey = process.env.RESEND_API_KEY;
  // Resend Segment the contact is added to. RESEND_AUDIENCE_ID is accepted as
  // a fallback for older deployments.
  const segmentId =
    process.env.RESEND_SEGMENT_ID || process.env.RESEND_AUDIENCE_ID;
  const fromEmail = process.env.RESEND_FROM_EMAIL || DEFAULT_FROM;
  const internalEmail =
    process.env.INTERNAL_NOTIFICATION_EMAIL || CONTACT_EMAIL;

  if (!apiKey || !segmentId) {
    console.error(
      "[early-access] Missing RESEND_API_KEY or RESEND_SEGMENT_ID env var.",
    );
    return json(
      { error: "This form isn't available right now. Please email us instead." },
      500,
    );
  }

  const resend = new Resend(apiKey);

  // --- 1. Check whether this contact already exists in the Segment ---
  // Resend's create endpoint's behaviour on a duplicate email isn't
  // documented, so we check explicitly rather than rely on it. A repeat
  // submission gets the same success response but no second contact record
  // and no second confirmation email.
  let isNewContact = true;
  try {
    const { data, error } = await resend.contacts.get({
      audienceId: segmentId,
      email,
    });
    if (data) {
      isNewContact = false;
    } else if (error && error.name !== "not_found") {
      console.error("[early-access] contacts.get error:", error);
      return json(
        { error: "We couldn't send your request. Please try again in a moment." },
        502,
      );
    }
  } catch (err) {
    console.error("[early-access] contacts.get threw:", err);
    return json(
      { error: "We couldn't send your request. Please try again in a moment." },
      502,
    );
  }

  if (isNewContact) {
    // --- 2. Add the contact to the Resend Segment ---
    try {
      // Resend contacts only carry first/last name; company and role travel
      // in the internal notification below.
      const { firstName, lastName } = splitName(details?.name);
      const { error } = await resend.contacts.create({
        email,
        audienceId: segmentId,
        firstName,
        lastName,
        unsubscribed: false,
      });
      if (error) {
        console.error("[early-access] contacts.create error:", error);
        return json(
          {
            error:
              "We couldn't send your request. Please try again in a moment.",
          },
          502,
        );
      }
    } catch (err) {
      console.error("[early-access] contacts.create threw:", err);
      return json(
        { error: "We couldn't send your request. Please try again in a moment." },
        502,
      );
    }

    // --- 3. Branded confirmation email to the registrant (best-effort) ---
    try {
      const { subject, html, text, unsubscribeUrl: listUnsubscribe } =
        confirmationEmail(email, {
          kind: details ? "contact" : "list",
          name: details?.name,
        });
      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject,
        html,
        text,
        headers: {
          "List-Unsubscribe": `<${listUnsubscribe}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      });
    } catch (err) {
      console.error("[early-access] confirmation email failed:", err);
      // The submission itself succeeded; don't fail the request.
    }
  }

  // --- 4. Plain internal notification (best-effort) ---
  // Sent for every new contact, and for every "Talk to Us" request even from
  // an existing contact (e.g. someone who downloaded a guide and now wants a
  // call) — a request for a conversation must never be swallowed by the
  // duplicate check above.
  if (isNewContact || details) {
    try {
      const { subject, text } = internalNotification({
        email,
        source,
        details,
        existingContact: !isNewContact,
      });
      await resend.emails.send({
        from: fromEmail,
        to: internalEmail,
        replyTo: email,
        subject,
        text,
      });
    } catch (err) {
      console.error("[early-access] internal notification failed:", err);
    }
  }

  return json({ ok: true }, 200);
}

export async function GET() {
  return json({ error: "Method not allowed." }, 405);
}

function splitName(name?: string): { firstName?: string; lastName?: string } {
  if (!name) return {};
  const [first, ...rest] = name.split(/\s+/);
  return { firstName: first, lastName: rest.join(" ") || undefined };
}
