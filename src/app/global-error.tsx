"use client";

import { useEffect } from "react";
import { useNoindex } from "@/lib/noindex";
import { colors } from "@/lib/tokens";

/**
 * Last-resort boundary for an error in the root layout itself (header,
 * footer), where error.tsx can't help because the layout is what failed. It
 * replaces the whole document, so it carries its own <html>/<body>, a
 * noindex tag in the markup, and inline styles rather than relying on the
 * layout's stylesheet.
 */
export default function GlobalError({
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
    <html lang="en">
      <head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Something went wrong — MeridianCogent</title>
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: "Helvetica, Arial, sans-serif",
          color: colors.ink,
          background: "#FBFAF8",
        }}
      >
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "96px 16px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400, color: colors.graphite }}>
            Something went wrong.
          </h1>
          <p style={{ color: colors.muted, lineHeight: 1.6 }}>
            Try loading the page again. If it keeps happening, email{" "}
            <a href="mailto:hello@meridiancogent.com" style={{ color: colors.accentDark }}>
              hello@meridiancogent.com
            </a>
            .
          </p>
          <p style={{ marginTop: 32 }}>
            <button
              type="button"
              onClick={reset}
              style={{
                background: colors.graphite,
                color: "#fff",
                border: 0,
                padding: "12px 20px",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
          </p>
        </div>
      </body>
    </html>
  );
}
