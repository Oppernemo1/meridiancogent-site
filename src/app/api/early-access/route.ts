import { NextResponse } from "next/server";
import { Resend } from "resend";
import { earlyAccessSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CONTACT_EMAIL = "hello@meridiancogent.com";

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
      ? ((payload as { source: string }).source.slice(0, 64))
      : "unknown";

  // --- Config ---
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || `MeridianCogent <${CONTACT_EMAIL}>`;
  const internalEmail =
    process.env.INTERNAL_NOTIFICATION_EMAIL || CONTACT_EMAIL;

  if (!apiKey || !audienceId) {
    console.error(
      "[early-access] Missing RESEND_API_KEY or RESEND_AUDIENCE_ID env var.",
    );
    return json(
      { error: "Signups aren't available right now. Please try again later." },
      500,
    );
  }

  const resend = new Resend(apiKey);

  // --- 1. Add to Resend Audience ---
  try {
    const { error } = await resend.contacts.create({
      email,
      audienceId,
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

  // --- 2. Confirmation email to the signup (best-effort) ---
  try {
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "You're on the MeridianCogent early access list",
      text: [
        "You're on the list — we'll email you as we get closer to launch.",
        "",
        "MeridianCogent is a control environment for separation offices and",
        "integration teams running M&A execution. It's still in development;",
        "early access opens in phases, and we'll only email you when there's",
        "something concrete to share.",
        "",
        "If you didn't sign up, you can ignore this email and you won't hear",
        "from us again.",
        "",
        "— The MeridianCogent team",
      ].join("\n"),
    });
  } catch (err) {
    console.error("[early-access] confirmation email failed:", err);
    // The signup itself succeeded; don't fail the request.
  }

  // --- 3. Internal notification (best-effort) ---
  try {
    await resend.emails.send({
      from: fromEmail,
      to: internalEmail,
      replyTo: email,
      subject: `New early access signup: ${email}`,
      text: [
        `Email: ${email}`,
        `Source: ${source}`,
        `Time: ${new Date().toISOString()}`,
      ].join("\n"),
    });
  } catch (err) {
    console.error("[early-access] internal notification failed:", err);
  }

  return json({ ok: true }, 200);
}

export async function GET() {
  return json({ error: "Method not allowed." }, 405);
}
