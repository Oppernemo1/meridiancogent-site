"use client";

import { useId, useState, type FormEvent } from "react";
import { isValidEmail } from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

export function EarlyAccessForm({
  theme = "light",
  source = "unknown",
  buttonLabel = "Join the Program",
  className = "",
  successMessage,
  download,
}: {
  theme?: "light" | "dark";
  source?: string;
  buttonLabel?: string;
  className?: string;
  /** Overrides the default confirmation line. */
  successMessage?: string;
  /**
   * Guide downloads: on success the file is revealed here rather than gated
   * behind a confirmation link. The submission itself goes through the same
   * /api/early-access route, so there is one contact list and one welcome
   * email — a repeat submitter gets the same 200 and the same download, with
   * no second contact record and no second email.
   */
  download?: { href: string; label: string };
}) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const dark = theme === "dark";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();

    if (!isValidEmail(trimmed)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
        setStatus("error");
        setMessage(
          data.error ||
            "Something went wrong. Please try again in a moment.",
        );
        return;
      }

      setStatus("success");
      setMessage(
        successMessage ??
          "You're on the list — we'll email you as we get closer to launch.",
      );
      setEmail("");
    } catch {
      setStatus("error");
      setMessage(
        "We couldn't reach the server. Check your connection and try again.",
      );
    }
  }

  const inputBase =
    "w-full border px-4 py-3 text-body outline-none transition-colors focus:ring-2 focus:ring-offset-2";
  const inputTheme = dark
    ? "border-white/20 bg-white/10 text-on-dark-primary placeholder:text-white/50 focus:border-accent focus:ring-accent/50 focus:ring-offset-graphite"
    : "border-black/15 bg-white text-ink placeholder:text-muted/70 focus:border-graphite focus:ring-graphite/30 focus:ring-offset-white";
  const buttonTheme = dark
    ? "bg-white text-graphite hover:bg-on-dark-secondary"
    : "bg-graphite text-on-dark-primary hover:bg-graphite/90";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`w-full ${className}`}
      aria-describedby={`${id}-status`}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          disabled={status === "submitting"}
          aria-invalid={status === "error"}
          className={`${inputBase} ${inputTheme} sm:flex-1`}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className={`shrink-0 px-5 py-3 text-body font-semibold transition-colors disabled:opacity-60 ${buttonTheme}`}
        >
          {status === "submitting" ? "Sending…" : buttonLabel}
        </button>
      </div>

      <p
        id={`${id}-status`}
        role="status"
        aria-live="polite"
        className={`mt-2 min-h-[1.25rem] text-small ${
          dark
            ? "text-on-dark-primary"
            : status === "error"
              ? "text-status-red"
              : "text-status-green"
        }`}
      >
        {message}
      </p>

      {download && status === "success" && (
        <p className="mt-3">
          <a
            href={download.href}
            download
            className="inline-block bg-graphite px-5 py-3 text-body font-semibold text-on-dark-primary transition-colors hover:bg-graphite/90"
          >
            {download.label}
          </a>
        </p>
      )}
    </form>
  );
}
