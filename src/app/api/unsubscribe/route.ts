import { NextResponse } from "next/server";
import { Resend } from "resend";
import { verifyUnsubscribeToken } from "@/lib/unsubscribe";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Result = "ok" | "invalid" | "error";

async function unsubscribe(request: Request): Promise<Result> {
  const url = new URL(request.url);
  const email = url.searchParams.get("email")?.trim().toLowerCase() ?? "";
  const token = url.searchParams.get("token") ?? "";

  if (!email || !verifyUnsubscribeToken(email, token)) {
    return "invalid";
  }

  const apiKey = process.env.RESEND_API_KEY;
  const segmentId =
    process.env.RESEND_SEGMENT_ID || process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !segmentId) {
    console.error(
      "[unsubscribe] Missing RESEND_API_KEY or RESEND_SEGMENT_ID env var.",
    );
    return "error";
  }

  const resend = new Resend(apiKey);
  try {
    const { error } = await resend.contacts.update({
      audienceId: segmentId,
      email,
      unsubscribed: true,
    });
    if (error) {
      console.error("[unsubscribe] contacts.update error:", error);
      return "error";
    }
  } catch (err) {
    console.error("[unsubscribe] contacts.update threw:", err);
    return "error";
  }

  return "ok";
}

// A person clicking the visible "Unsubscribe" link in the email footer —
// unsubscribe them, then send them to a page that confirms it.
export async function GET(request: Request) {
  const result = await unsubscribe(request);
  return NextResponse.redirect(`${SITE_URL}/unsubscribed?status=${result}`, {
    status: 303,
  });
}

// RFC 8058 one-click unsubscribe: mail clients (Gmail, Outlook, etc.) POST to
// the exact List-Unsubscribe URL with no body and expect a blank 200/202 —
// no redirect, no page.
export async function POST(request: Request) {
  const result = await unsubscribe(request);
  return new NextResponse(null, { status: result === "ok" ? 200 : 400 });
}
