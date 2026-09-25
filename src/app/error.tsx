"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Container } from "@/components/Container";
import { LineGraphMotif } from "@/components/LineGraphMotif";
import { useNoindex } from "@/lib/noindex";

/**
 * Error boundary for every page under the root layout. Replaces Next's bare
 * "Application error: a client-side exception has occurred" screen with one
 * that keeps the header and footer, and marks the page noindex (see
 * useNoindex for why the status can't be changed). A server-side render
 * error still returns HTTP 500; this is only the UI.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useNoindex();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="py-12 md:py-16">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <LineGraphMotif
            variant="advisory"
            tone="faint"
            strokeWidth={5}
            className="mx-auto h-20 w-40"
          />
          <p className="mt-6 text-small font-semibold uppercase tracking-wider text-muted">
            Error
          </p>
          <h1 className="mt-2 text-h1-sm md:text-h1">
            Something went wrong on this page.
          </h1>
          <p className="mt-4 text-body-sm leading-relaxed text-muted md:text-body">
            Try loading it again. If it keeps happening, head back to the
            homepage or email us and we&apos;ll look into it.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={reset}
              className="bg-graphite px-5 py-3 text-body font-semibold text-on-dark-primary transition-colors hover:bg-graphite/90"
            >
              Try again
            </button>
            <Link
              href="/"
              className="text-body font-medium text-accent-dark underline underline-offset-4 hover:text-muted"
            >
              Back to home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
