import { z } from "zod";

// Shared, deliberately conservative email check. Used client-side for the
// inline hint and server-side as the authoritative gate.
export const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const earlyAccessSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .max(254, "That email address is too long.")
    .regex(EMAIL_REGEX, "Enter a valid email address."),
});

export type EarlyAccessInput = z.infer<typeof earlyAccessSchema>;

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}
