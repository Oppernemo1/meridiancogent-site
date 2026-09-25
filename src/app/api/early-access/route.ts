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
  // Where on the site the form sat (homepage-hero, footer, guide-<slug>…).
  // Goes in the internal notification.
  const source =
    typeof (payload as { source?: unknown }).source === "string"
      ? (payload as { source: string }).source.slice(0, 64)
      : "unknown";
  // What the contact asked for, stored on the Resend contact as the `source`
  // property: "talk-to-us", or the guide's "guide-<slug>".
  const contactSource = details ? "talk-to-us" : source;

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

  // --- 1. Check whether this contact already exists ---
  // Since Resend's move from Audiences to Segments, contacts are global to
  // the account (one per email address) and Segments are memberships, so the
  // lookup is by email alone. A repeat submission gets the same success
  // response but no second contact record and no second confirmation email.
  let isNewContact = true;
  try {
    const { data, error } = await resend.contacts.get({ email });
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

  // Custom contact properties. Each key must already exist as a contact
  // property in Resend (see scripts/setup-resend-properties.mjs) — an
  // unknown key fails the whole create/update call. These are the durable
  // record of a lead: if the internal notification below fails, the
  // details are still on the contact.
  const { firstName, lastName } = splitName(details?.name);
  const properties: Record<string, string | null> = details
    ? {
        source: contactSource,
        company: details.company,
        // A new request replaces the whole set, so a stale role from an
        // earlier request doesn't sit next to a new company.
        role: details.role ?? null,
      }
    : { source: contactSource };

  if (isNewContact) {
    // --- 2a. Create the contact in the Segment ---
    try {
      const { error } = await resend.contacts.create({
        email,
        firstName,
        lastName,
        unsubscribed: false,
        segments: [{ id: segmentId }],
        // No role given: leave the property unset rather than null.
        properties: withoutNulls(properties),
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
  } else if (details) {
    // --- 2b. Existing contact asking to talk: bring the record up to date ---
    // e.g. someone who downloaded a guide and now wants a call. A repeat
    // guide download leaves the contact alone, so it never overwrites a
    // "talk-to-us" source. The unsubscribed flag is never touched here.
    try {
      const { error } = await resend.contacts.update({
        email,
        firstName,
        lastName,
        properties,
      });
      if (error) {
        console.error("[early-access] contacts.update error:", error);
        return json(
          {
            error:
              "We couldn't send your request. Please try again in a moment.",
          },
          502,
        );
      }
    } catch (err) {
      console.error("[early-access] contacts.update threw:", err);
      return json(
        { error: "We couldn't send your request. Please try again in a moment." },
        502,
      );
    }
  }

  if (!isNewContact) {
    // Contacts are global, so an existing contact may not be in this
    // Segment yet. Best-effort: the contact record itself is already right.
    try {
      const { error } = await resend.contacts.segments.add({
        email,
        segmentId,
      });
      if (error) {
        console.error("[early-access] contacts.segments.add error:", error);
      }
    } catch (err) {
      console.error("[early-access] contacts.segments.add threw:", err);
    }
  }

  if (isNewContact) {
    // --- 3. Branded confirmation email to the registrant (best-effort) ---
    try {
      const { subject, html, text, unsubscribeUrl: listUnsubscribe } =
        confirmationEmail(email, {
          kind: details ? "contact" : "list",
          name: details?.name,
        });
      const { error } = await resend.emails.send({
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
      if (error) {
        console.error("[early-access] confirmation email error:", error);
      }
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
  //
  // By this point the contact is saved, so a failure here never reaches the
  // visitor: from their side the submission worked. It is logged under a
  // fixed, searchable tag with the address to look up in Resend, where the
  // contact's properties hold the same details the email would have.
  if (isNewContact || details) {
    const notificationFailed = (reason: unknown) =>
      console.error(
        `[early-access] NOTIFICATION_FAILED — lead not emailed to the team; check Resend contact ${email}:`,
        reason,
      );
    try {
      const { subject, text } = internalNotification({
        email,
        source,
        details,
        existingContact: !isNewContact,
      });
      const { error } = await resend.emails.send({
        from: fromEmail,
        to: internalEmail,
        replyTo: email,
        subject,
        text,
      });
      if (error) notificationFailed(error);
    } catch (err) {
      notificationFailed(err);
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

function withoutNulls(
  properties: Record<string, string | null>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(properties).filter(
      (entry): entry is [string, string] => entry[1] !== null,
    ),
  );
}
