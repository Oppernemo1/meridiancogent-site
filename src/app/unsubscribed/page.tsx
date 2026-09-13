import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
};

const COPY: Record<string, { heading: string; body: string }> = {
  ok: {
    heading: "You’re unsubscribed.",
    body: "You won’t get any more early access emails from MeridianCogent. If that was a mistake, join the list again from the early access page at any time.",
  },
  invalid: {
    heading: "That link isn’t valid.",
    body: "This unsubscribe link is broken or has expired. Email us and we’ll take you off the list directly.",
  },
  error: {
    heading: "Something went wrong.",
    body: "We couldn’t process the unsubscribe request just now. Email us and we’ll take you off the list directly.",
  },
};

export default function UnsubscribedPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const copy = COPY[searchParams.status ?? ""] ?? COPY.error;

  return (
    <div className="py-12 md:py-16">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-h1-sm md:text-h1">
            {copy.heading}
          </h1>
          <p className="mt-4 text-body-sm leading-relaxed text-muted md:text-body">
            {copy.body}
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/"
              className="bg-graphite px-5 py-3 text-body font-semibold text-on-dark-primary transition-colors hover:bg-graphite/90"
            >
              Back to home
            </Link>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-body font-medium text-accent-dark underline underline-offset-4 hover:text-muted"
            >
              Email us
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
