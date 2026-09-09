import { NextResponse } from "next/server";
import { Resend } from "resend";
import { earlyAccessSchema } from "@/lib/validation";
import { confirmationEmail, internalNotification } from "@/lib/emails";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CONTACT_EMAIL = "hello@meridiancogent.com";
const DEFAULT_FROM = "MeridianCogent <noreply@meridiancogent.com>";

function json(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  // --- Parse body ---
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // --- Server-side validation (authoritative) ---
  const parsed = earlyAccessSchema.safeParse(payload);
  if (!parsed.success) {
    const message =
      parsed.error.issues[0]?.message ?? "Enter a valid email address.";
    return json({ error: message }, 400);
  }
  const email = parsed.data.email.toLowerCase();
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
      { error: "Signups aren't available right now. Please try again later." },
      500,
    );
  }

  const resend = new Resend(apiKey);

  // --- 1. Add the contact to the Resend Segment ---
  try {
    const { error } = await resend.contacts.create({
      email,
      audienceId: segmentId,
      unsubscribed: false,
    });

    if (error) {
      const alreadyExists = /already|exist/i.test(
        `${error.name} ${error.message}`,
      );
      if (!alreadyExists) {
        console.error("[early-access] contacts.create error:", error);
        return json(
          {
            error:
              "We couldn't add you to the list. Please try again in a moment.",
          },
          502,
        );
      }
    }
  } catch (err) {
    console.error("[early-access] contacts.create threw:", err);
    return json(
      { error: "We couldn't add you to the list. Please try again in a moment." },
      502,
    );
  }

  // --- 2. Branded confirmation email to the registrant (best-effort) ---
  try {
    const { subject, html, text } = confirmationEmail();
    await resend.emails.send({ from: fromEmail, to: email, subject, html, text });
  } catch (err) {
    console.error("[early-access] confirmation email failed:", err);
    // The signup itself succeeded; don't fail the request.
  }

  // --- 3. Plain internal notification (best-effort) ---
  try {
    const { subject, text } = internalNotification({ email, source });
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

  return json({ ok: true }, 200);
}

export async function GET() {
  return json({ error: "Method not allowed." }, 405);
}
