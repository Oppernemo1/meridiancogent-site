import { SITE_URL } from "./site";
import { colors, emailColors } from "./tokens";
import { unsubscribeUrl } from "./unsubscribe";

// Sourced from tokens.ts rather than redeclared — mail clients need the
// literal hex values inlined below, but the values themselves come from one
// place.
const NAVY = colors.navy;
const ICE = colors.ice;
const INK = colors.ink;
const MUTED = colors.muted;
const BORDER = colors.hairline;
const PAGE_BG = emailColors.pageBg;
const MUTED_LINK = emailColors.mutedLink;
const CONTACT_EMAIL = "hello@meridiancogent.com";

const SERIF = "Georgia, 'Times New Roman', Times, serif";
const SANS = "Helvetica, Arial, sans-serif";

/**
 * Branded HTML confirmation email sent to a new early access registrant.
 * Table-based layout, inline styles only, capped at 600px so it renders on
 * mobile. Web-safe fonts only (Georgia serif headings, Arial/Helvetica body)
 * to match the site's typographic system.
 */
export function confirmationEmail(email: string): {
  subject: string;
  html: string;
  text: string;
  unsubscribeUrl: string;
} {
  const subject = "You’re on the list — early access updates coming";
  const preheader =
    "Thanks for joining MeridianCogent early access. Here’s what to expect.";
  const unsubscribe = unsubscribeUrl(email);

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light" />
<title>${subject}</title>
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
<td style="background-color:${NAVY}; padding:28px 32px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="vertical-align:middle; padding-right:14px;">
<img src="${SITE_URL}/email/logo-mark.png" width="40" height="40" alt="MeridianCogent" style="display:block; width:40px; height:40px; border:0; border-radius:9px;" />
</td>
<td style="vertical-align:middle;">
<span style="font-family:${SERIF}; font-size:22px; color:#ffffff;">Meridian</span><span style="font-family:${SANS}; font-size:22px; font-weight:bold; color:${ICE};">Cogent</span>
</td>
</tr>
</table>
</td>
</tr>

<!-- Ice accent stripe -->
<tr><td style="background-color:${ICE}; font-size:0; line-height:0; height:4px;">&nbsp;</td></tr>

<!-- Body -->
<tr>
<td style="padding:36px 32px 28px 32px;">
<h1 style="margin:0 0 16px 0; font-family:${SERIF}; font-size:26px; line-height:1.25; color:${NAVY}; font-weight:normal;">
You’re on the list.
</h1>

<p style="margin:0 0 18px 0; font-family:${SANS}; font-size:15px; line-height:1.7; color:${INK};">
Thanks for joining the MeridianCogent early access list. Here is what that
means.
</p>

<p style="margin:0 0 12px 0; font-family:${SANS}; font-size:15px; line-height:1.7; color:${INK};">
A few things worth setting expectations on:
</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px 0;">
<tr>
<td style="padding:0 0 10px 0; font-family:${SANS}; font-size:15px; line-height:1.6; color:${INK};">
<span style="color:${NAVY}; font-weight:bold;">Updates come by email.</span>
Occasional notes as the product takes shape and as access widens &mdash; no
newsletter cadence, no drip sequence.
</td>
</tr>
<tr>
<td style="padding:0; font-family:${SANS}; font-size:15px; line-height:1.6; color:${INK};">
<span style="color:${NAVY}; font-weight:bold;">No launch date is promised.</span>
Access opens in phases, starting with diagnostics. When there is something
concrete to show you, you will hear from us.
</td>
</tr>
</table>

<p style="margin:0 0 16px 0; font-family:${SANS}; font-size:15px; line-height:1.7; color:${INK};">
In the meantime:
</p>

<!-- Button -->
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 14px 0;">
<tr>
<td style="border-radius:6px; background-color:${NAVY};">
<a href="${SITE_URL}/platform" target="_blank" style="display:inline-block; padding:12px 22px; font-family:${SANS}; font-size:14px; font-weight:bold; color:#ffffff; text-decoration:none; border-radius:6px;">
See how the platform works &rarr;
</a>
</td>
</tr>
</table>

<p style="margin:0 0 8px 0; font-family:${SANS}; font-size:14px; line-height:1.6;">
<a href="${SITE_URL}/principles" target="_blank" style="color:${NAVY}; text-decoration:underline;">What the platform will not assert</a>
</p>

<p style="margin:0 0 24px 0; font-family:${SANS}; font-size:14px; line-height:1.6;">
<a href="${SITE_URL}/resources" target="_blank" style="color:${NAVY}; text-decoration:underline;">Practitioner writing on TSAs and carve-out separation</a>
</p>

<p style="margin:26px 0 0 0; font-family:${SANS}; font-size:14px; line-height:1.7; color:${MUTED};">
If you didn’t sign up, you can ignore this email and you won’t hear from us
again.
</p>

<p style="margin:18px 0 0 0; font-family:${SERIF}; font-size:15px; line-height:1.6; color:${NAVY};">
&mdash; The MeridianCogent team
</p>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="background-color:${NAVY}; padding:24px 32px;">
<p style="margin:0 0 8px 0; font-family:${SANS}; font-size:12px; line-height:1.6; color:${ICE};">
MeridianCogent &mdash; execution for M&amp;A separations, carve-outs and integrations.
</p>
<p style="margin:0; font-family:${SANS}; font-size:12px; line-height:1.6; color:${MUTED_LINK};">
<a href="${SITE_URL}/privacy" target="_blank" style="color:${ICE}; text-decoration:underline;">Privacy</a>
&nbsp;&bull;&nbsp;
<a href="mailto:${CONTACT_EMAIL}" style="color:${ICE}; text-decoration:underline;">${CONTACT_EMAIL}</a>
&nbsp;&bull;&nbsp;
<a href="${unsubscribe}" target="_blank" style="color:${ICE}; text-decoration:underline;">Unsubscribe</a>
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
    "You’re on the list.",
    "",
    "Thanks for joining the MeridianCogent early access list. Here is what that means.",
    "",
    "A few things worth setting expectations on:",
    "",
    "- Updates come by email. Occasional notes as the product takes shape and as access widens - no newsletter cadence, no drip sequence.",
    "- No launch date is promised. Access opens in phases, starting with diagnostics. When there is something concrete to show you, you will hear from us.",
    "",
    "In the meantime:",
    `- See how the platform works: ${SITE_URL}/platform`,
    `- What the platform will not assert: ${SITE_URL}/principles`,
    `- Practitioner writing on TSAs and carve-out separation: ${SITE_URL}/resources`,
    "",
    "If you didn’t sign up, you can ignore this email and you won’t hear from us again.",
    "",
    "- The MeridianCogent team",
    "",
    `Privacy: ${SITE_URL}/privacy`,
    `Contact: ${CONTACT_EMAIL}`,
    `Unsubscribe: ${unsubscribe}`,
  ].join("\n");

  return { subject, html, text, unsubscribeUrl: unsubscribe };
}

/** Plain-text internal notification sent to the role address on each signup. */
export function internalNotification(params: {
  email: string;
  source: string;
}): { subject: string; text: string } {
  return {
    subject: `New early access signup: ${params.email}`,
    text: [
      `${params.email} signed up for early access.`,
      "",
      `Source: ${params.source}`,
      `Time: ${new Date().toISOString()}`,
    ].join("\n"),
  };
}
