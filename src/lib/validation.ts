import { z } from "zod";

// Shared, deliberately conservative email check. Used client-side for the
// inline hint and server-side as the authoritative gate.
export const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const emailField = z
  .string({ required_error: "Enter your email address." })
  .trim()
  .min(1, "Enter your email address.")
  .max(254, "That email address is too long.")
  .regex(EMAIL_REGEX, "Enter a valid email address.");

/** Guide downloads: email only, deliberately low-friction. */
export const earlyAccessSchema = z.object({
  email: emailField,
});

/**
 * "Talk to Us": a request for a conversation, so whoever picks up the lead
 * needs to know who they're calling. Name and company are required; role is
 * optional.
 */
export const contactRequestSchema = z.object({
  email: emailField,
  name: z
    .string({ required_error: "Enter your name." })
    .trim()
    .min(1, "Enter your name.")
    .max(120, "That name is too long."),
  company: z
    .string({ required_error: "Enter your company." })
    .trim()
    .min(1, "Enter your company.")
    .max(160, "That company name is too long."),
  role: z
    .string()
    .trim()
    .max(120, "That role is too long.")
    .optional()
    .transform((v) => v || undefined),
});

export type EarlyAccessInput = z.infer<typeof earlyAccessSchema>;
export type ContactRequestInput = z.infer<typeof contactRequestSchema>;

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}
