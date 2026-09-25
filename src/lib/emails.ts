import { SITE_URL } from "./site";
import { colors, emailColors } from "./tokens";
import { unsubscribeUrl } from "./unsubscribe";

// Sourced from tokens.ts rather than redeclared — mail clients need the
// literal hex values inlined below, but the values themselves come from one
// place.
const GRAPHITE = colors.graphite;
const ACCENT = colors.accent;
const ACCENT_DARK = colors.accentDark;
const ACCENT_LIGHT = colors.accentLight;
const INK = colors.ink;
const MUTED = colors.muted;
const BORDER = colors.hairline;
const PAGE_BG = emailColors.pageBg;
const ON_DARK_SECONDARY = colors.onDark.secondary;
const CONTACT_EMAIL = "hello@meridiancogent.com";

const SERIF = "Georgia, 'Times New Roman', Times, serif";
const SANS = "Helvetica, Arial, sans-serif";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type ConfirmationCopy = {
  subject: string;
  preheader: string;
  heading: string;
  intro: string;
  points: { lead: string; body: string }[];
  notYou: string;
};

function confirmationCopy(kind: "contact" | "list", name?: string): ConfirmationCopy {
  if (kind === "contact") {
    const firstName = name?.split(/\s+/)[0];
    return {
      subject: "Thanks — we’ll be in touch to set up a call",
      preheader:
        "We’ve got your request to talk to MeridianCogent. Here’s what happens next.",
      heading: firstName ? `Thanks, ${firstName}.` : "Thanks for getting in touch.",
      intro:
        "We’ve got your request to talk to MeridianCogent. Here is what happens next.",
      points: [
        {
          lead: "We’ll reply by email.",
          body: `Someone from the team will write from ${CONTACT_EMAIL} to find a time for a call.`,
        },
        {
          lead: "The call starts with your programme.",
          body: "Tell us about the deal and where it’s hard, and we’ll show you how the platform handles it — including which parts are live today and which are still in build.",
        },
        {
          lead: "Occasional updates by email.",
          body: "You’ll also get the odd product update. Every one has a one-click unsubscribe link.",
        },
      ],
      notYou:
        "If you didn’t make this request, you can ignore this email and you won’t hear from us again.",
    };
  }
  return {
    subject: "You’re on the MeridianCogent list",
    preheader: "Thanks for signing up for updates from MeridianCogent.",
    heading: "You’re on the list.",
    intro: "Thanks for signing up for updates from MeridianCogent.",
    points: [
      {
        lead: "Updates come by email.",
        body: "Occasional notes on the platform and on practitioner writing — no newsletter cadence, no drip sequence.",
      },
      {
        lead: "Want to see it?",
        body: `MeridianCogent is ready to demo. Reply to this email or talk to us at ${SITE_URL}/early-access and we’ll show you how it works.`,
      },
    ],
    notYou:
      "If you didn’t sign up, you can ignore this email and you won’t hear from us again.",
  };
}

/**
 * Branded HTML confirmation email sent to a new contact: either a "Talk to
 * Us" request ("contact") or a guide download ("list").
 * Table-based layout, inline styles only, capped at 600px so it renders on
 * mobile. Web-safe fonts only (Georgia serif headings, Arial/Helvetica body)
 * to match the site's typographic system.
 */
export function confirmationEmail(
  email: string,
  { kind, name }: { kind: "contact" | "list"; name?: string },
): {
  subject: string;
  html: string;
  text: string;
  unsubscribeUrl: string;
} {
  const copy = confirmationCopy(kind, name);
  const subject = copy.subject;
  const preheader = copy.preheader;
  const unsubscribe = unsubscribeUrl(email);
  const pointsHtml = copy.points
    .map(
      (p, i) => `<tr>
<td style="padding:0${i < copy.points.length - 1 ? " 0 10px 0" : ""}; font-family:${SANS}; font-size:15px; line-height:1.6; color:${INK};">
<span style="color:${GRAPHITE}; font-weight:bold;">${escapeHtml(p.lead)}</span>
${escapeHtml(p.body)}
</td>
</tr>`,
    )
    .join("\n");

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light" />
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0; padding:0; background-color:${PAGE_BG}; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;">
<div style="display:none; font-size:1px; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden; mso-hide:all;">
${preheader}
</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${PAGE_BG};">
<tr>
<td align="center" style="padding:24px 12px;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:12px; overflow:hidden; border:1px solid ${BORDER};">

<!-- Header -->
<tr>
<td style="background-color:${GRAPHITE}; padding:28px 32px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="vertical-align:middle; padding-right:14px;">
<img src="${SITE_URL}/email/logo-mark.png" width="40" height="40" alt="MeridianCogent" style="display:block; width:40px; height:40px; border:0; border-radius:9px;" />
</td>
<td style="vertical-align:middle;">
<span style="font-family:${SERIF}; font-size:22px; color:#ffffff;">Meridian</span><span style="font-family:${SANS}; font-size:22px; font-weight:bold; color:${ACCENT};">Cogent</span>
</td>
</tr>
</table>
</td>
</tr>

<!-- Accent stripe -->
<tr><td style="background-color:${ACCENT}; font-size:0; line-height:0; height:4px;">&nbsp;</td></tr>

<!-- Body -->
<tr>
<td style="padding:36px 32px 28px 32px;">
<h1 style="margin:0 0 16px 0; font-family:${SERIF}; font-size:26px; line-height:1.25; color:${GRAPHITE}; font-weight:normal;">
${escapeHtml(copy.heading)}
</h1>

<p style="margin:0 0 18px 0; font-family:${SANS}; font-size:15px; line-height:1.7; color:${INK};">
${escapeHtml(copy.intro)}
</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px 0;">
${pointsHtml}
</table>

<p style="margin:0 0 16px 0; font-family:${SANS}; font-size:15px; line-height:1.7; color:${INK};">
In the meantime:
</p>

<!-- Button -->
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 14px 0;">
<tr>
<td style="border-radius:6px; background-color:${GRAPHITE};">
<a href="${SITE_URL}/platform" target="_blank" style="display:inline-block; padding:12px 22px; font-family:${SANS}; font-size:14px; font-weight:bold; color:#ffffff; text-decoration:none; border-radius:6px;">
See how the platform works &rarr;
</a>
</td>
</tr>
</table>

<p style="margin:0 0 8px 0; font-family:${SANS}; font-size:14px; line-height:1.6;">
<a href="${SITE_URL}/principles" target="_blank" style="color:${ACCENT_DARK}; text-decoration:underline;">What the platform will not assert</a>
</p>

<p style="margin:0 0 24px 0; font-family:${SANS}; font-size:14px; line-height:1.6;">
<a href="${SITE_URL}/resources" target="_blank" style="color:${ACCENT_DARK}; text-decoration:underline;">Practitioner writing on TSAs and carve-out separation</a>
</p>

<p style="margin:26px 0 0 0; font-family:${SANS}; font-size:14px; line-height:1.7; color:${MUTED};">
${escapeHtml(copy.notYou)}
</p>

<p style="margin:18px 0 0 0; font-family:${SERIF}; font-size:15px; line-height:1.6; color:${GRAPHITE};">
&mdash; The MeridianCogent team
</p>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="background-color:${GRAPHITE}; padding:24px 32px;">
<p style="margin:0 0 8px 0; font-family:${SANS}; font-size:12px; line-height:1.6; color:${ON_DARK_SECONDARY};">
MeridianCogent &mdash; execution for M&amp;A separations, carve-outs and integrations.
</p>
<p style="margin:0; font-family:${SANS}; font-size:12px; line-height:1.6; color:${ON_DARK_SECONDARY};">
<a href="${SITE_URL}/privacy" target="_blank" style="color:${ACCENT_LIGHT}; text-decoration:underline;">Privacy</a>
&nbsp;&bull;&nbsp;
<a href="mailto:${CONTACT_EMAIL}" style="color:${ACCENT_LIGHT}; text-decoration:underline;">${CONTACT_EMAIL}</a>
&nbsp;&bull;&nbsp;
<a href="${unsubscribe}" target="_blank" style="color:${ACCENT_LIGHT}; text-decoration:underline;">Unsubscribe</a>
</p>
</td>
</tr>

</table>

</td>
</tr>
</table>
</body>
</html>`;

  const text = [
    copy.heading,
    "",
    copy.intro,
    "",
    ...copy.points.map((p) => `- ${p.lead} ${p.body}`),
    "",
    "In the meantime:",
    `- See how the platform works: ${SITE_URL}/platform`,
    `- What the platform will not assert: ${SITE_URL}/principles`,
    `- Practitioner writing on TSAs and carve-out separation: ${SITE_URL}/resources`,
    "",
    copy.notYou,
    "",
    "- The MeridianCogent team",
    "",
    `Privacy: ${SITE_URL}/privacy`,
    `Contact: ${CONTACT_EMAIL}`,
    `Unsubscribe: ${unsubscribe}`,
  ].join("\n");

  return { subject, html, text, unsubscribeUrl: unsubscribe };
}

/**
 * Plain-text internal notification sent to the role address. For a "Talk to
 * Us" request it carries everything the person picking up the lead needs to
 * make the call; reply-to is set to the requester by the caller.
 */
export function internalNotification(params: {
  email: string;
  source: string;
  details?: { name: string; company: string; role?: string };
  existingContact?: boolean;
}): { subject: string; text: string } {
  const { email, source, details, existingContact } = params;
  const time = `Time: ${new Date().toISOString()}`;

  if (details) {
    return {
      subject: `Talk to Us request: ${details.name}, ${details.company}`,
      text: [
        `${details.name} at ${details.company} has asked to talk.`,
        "",
        `Name: ${details.name}`,
        `Company: ${details.company}`,
        `Role: ${details.role ?? "(not given)"}`,
        `Email: ${email}`,
        "",
        `Source: ${source}`,
        existingContact
          ? "Contact: already on the list (earlier request or guide download) — no confirmation email sent this time."
          : "Contact: new — confirmation email sent.",
        time,
        "",
        "Reply to this email to reach them directly.",
      ].join("\n"),
    };
  }

  return {
    subject: `New list signup: ${email}`,
    text: [`${email} signed up for updates.`, "", `Source: ${source}`, time].join(
      "\n",
    ),
  };
}
