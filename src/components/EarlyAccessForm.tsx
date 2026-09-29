"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { isValidEmail } from "@/lib/validation";

type Status = "idle" | "verifying" | "submitting" | "success" | "error";
type Field = "email" | "name" | "company" | "role";

export function EarlyAccessForm({
  theme = "light",
  source = "unknown",
  buttonLabel = "Talk to Us",
  className = "",
  successMessage,
  download,
  fields = "email",
  urlSources = [],
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
  /**
   * "email" (default): a single email field — guide downloads, and the
   * low-friction "Talk to Us" form in the homepage hero and site footer.
   * "full": name, company, optional role and email — only on the dedicated
   * Talk to Us page, where the visitor has already opted into a conversation.
   * Any form without `download` is a "Talk to Us" request either way.
   */
  fields?: "email" | "full";
  /**
   * `source` values this form accepts from the page's ?source= query string,
   * overriding `source` — e.g. the /pricing "Two ways to start" buttons link
   * to /early-access?source=pricing-pilot. Read at submit time rather than
   * rendered, so the page stays static. Anything not listed is ignored.
   */
  urlSources?: readonly string[];
}) {
  const id = useId();
  const isTalk = !download;
  const collectDetails = fields === "full";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [invalidField, setInvalidField] = useState<Field | null>(null);
  // Honeypot: hidden from people, so anything in it came from a bot.
  const [website, setWebsite] = useState("");
  const [challengeVisible, setChallengeVisible] = useState(false);
  // Read at submit time, where the state above would be stale.
  const challengeShown = useRef(false);

  const dark = theme === "dark";
  const busy = status === "verifying" || status === "submitting";

  // When the form appeared; the server rejects submissions under ~3 seconds.
  const mountedAt = useRef(0);
  const turnstileBox = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const token = useRef<string | null>(null);
  const tokenWaiters = useRef<((t: string | null) => void)[]>([]);

  useEffect(() => {
    mountedAt.current = Date.now();
    return () => {
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, []);

  function settleToken(value: string | null) {
    token.current = value;
    const waiters = tokenWaiters.current;
    tokenWaiters.current = [];
    waiters.forEach((resolve) => resolve(value));
  }

  // The Turnstile script loads on first interaction with the form, not on
  // every page view. It usually passes without the visitor seeing anything;
  // only if Cloudflare wants a check does the widget appear.
  async function ensureWidget() {
    if (widgetId.current || !TURNSTILE_SITE_KEY || !turnstileBox.current) return;
    await loadTurnstile();
    if (widgetId.current || !turnstileBox.current || !window.turnstile) return;
    widgetId.current = window.turnstile.render(turnstileBox.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: dark ? "dark" : "light",
      size: "flexible",
      appearance: "interaction-only",
      callback: (t: string) => settleToken(t),
      "expired-callback": () => (token.current = null),
      "error-callback": () => settleToken(null),
      "before-interactive-callback": () => {
        challengeShown.current = true;
        setChallengeVisible(true);
      },
      "after-interactive-callback": () => {
        challengeShown.current = false;
        setChallengeVisible(false);
      },
    });
  }

  async function getToken(): Promise<string | null> {
    if (token.current) return token.current;
    try {
      await ensureWidget();
    } catch {
      return null;
    }
    if (token.current) return token.current;
    return new Promise((resolve) => {
      tokenWaiters.current.push(resolve);
      // Long enough for a visitor to complete an interactive check.
      setTimeout(() => resolve(token.current), 60_000);
    });
  }

  // Tokens are single-use: after any submission, get a fresh one.
  function resetToken() {
    token.current = null;
    if (widgetId.current) window.turnstile?.reset(widgetId.current);
  }

  function fail(field: Field | null, text: string) {
    setStatus("error");
    setInvalidField(field);
    setMessage(text);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();

    if (collectDetails && !name.trim()) {
      fail("name", "Enter your name.");
      return;
    }
    if (collectDetails && !company.trim()) {
      fail("company", "Enter your company.");
      return;
    }
    if (!isValidEmail(trimmed)) {
      fail("email", "Enter a valid email address.");
      return;
    }

    setStatus("verifying");
    setInvalidField(null);
    setMessage("");

    const turnstileToken = await getToken();
    if (!turnstileToken) {
      if (challengeShown.current) {
        // The checkbox is showing but wasn't ticked in time. Leave it on
        // screen (no reset: no token was used) so it can be ticked now.
        fail(null, "Tick the box above and try again.");
      } else {
        // Turnstile didn't load or errored; there's nothing to tick.
        fail(
          null,
          "We couldn't confirm you're not a bot. Reload the page and try again.",
        );
        resetToken();
      }
      return;
    }
    setStatus("submitting");
    const botChecks = {
      turnstileToken,
      website,
      elapsedMs: Date.now() - mountedAt.current,
    };

    const urlSource = new URLSearchParams(window.location.search).get("source");
    const submitSource =
      urlSource && urlSources.includes(urlSource) ? urlSource : source;

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          collectDetails
            ? {
                intent: "talk",
                form: "full",
                email: trimmed,
                name: name.trim(),
                company: company.trim(),
                role: role.trim(),
                source: submitSource,
                ...botChecks,
              }
            : isTalk
              ? { intent: "talk", email: trimmed, source: submitSource, ...botChecks }
              : { email: trimmed, source: submitSource, ...botChecks },
        ),
      });
      resetToken();

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
        fail(
          null,
          data.error || "Something went wrong. Please try again in a moment.",
        );
        return;
      }

      setStatus("success");
      setMessage(
        successMessage ??
          "Thanks — we'll be in touch by email to find a time to talk.",
      );
      setEmail("");
      setName("");
      setCompany("");
      setRole("");
    } catch {
      resetToken();
      fail(
        null,
        "We couldn't reach the server. Check your connection and try again.",
      );
    }
  }

  function clearError() {
    if (status === "error") {
      setStatus("idle");
      setInvalidField(null);
    }
  }

  const inputBase =
    "w-full border px-4 py-3 text-body outline-none transition-colors focus:ring-2 focus:ring-offset-2";
  const inputTheme = dark
    ? "border-white/20 bg-white/10 text-on-dark-primary placeholder:text-white/50 focus:border-accent focus:ring-accent/50 focus:ring-offset-graphite"
    : "border-black/15 bg-white text-ink placeholder:text-muted/70 focus:border-graphite focus:ring-graphite/30 focus:ring-offset-white";
  const labelTheme = dark ? "text-on-dark-secondary" : "text-graphite";
  const buttonTheme = dark
    ? "bg-white text-graphite hover:bg-on-dark-secondary"
    : "bg-graphite text-on-dark-primary hover:bg-graphite/90";

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={() => void ensureWidget().catch(() => {})}
      noValidate
      className={`w-full ${className}`}
      aria-describedby={`${id}-status`}
    >
      {collectDetails ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <TextField
            id={`${id}-name`}
            label="Name"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(v) => {
              setName(v);
              clearError();
            }}
            disabled={busy}
            invalid={invalidField === "name"}
            className={`${inputBase} ${inputTheme}`}
            labelClassName={labelTheme}
          />
          <TextField
            id={`${id}-company`}
            label="Company"
            name="company"
            autoComplete="organization"
            required
            value={company}
            onChange={(v) => {
              setCompany(v);
              clearError();
            }}
            disabled={busy}
            invalid={invalidField === "company"}
            className={`${inputBase} ${inputTheme}`}
            labelClassName={labelTheme}
          />
          <TextField
            id={`${id}-role`}
            label="Role"
            optional
            name="role"
            autoComplete="organization-title"
            value={role}
            onChange={(v) => {
              setRole(v);
              clearError();
            }}
            disabled={busy}
            invalid={false}
            className={`${inputBase} ${inputTheme}`}
            labelClassName={labelTheme}
          />
          <TextField
            id={`${id}-email`}
            label="Work email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(v) => {
              setEmail(v);
              clearError();
            }}
            disabled={busy}
            invalid={invalidField === "email"}
            className={`${inputBase} ${inputTheme}`}
            labelClassName={labelTheme}
          />
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={busy}
              className={`px-5 py-3 text-body font-semibold transition-colors disabled:opacity-60 ${buttonTheme}`}
            >
              {status === "verifying" ? "Verifying…" : status === "submitting" ? "Sending…" : buttonLabel}
            </button>
          </div>
        </div>
      ) : (
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
              clearError();
            }}
            disabled={busy}
            aria-invalid={status === "error"}
            className={`${inputBase} ${inputTheme} sm:flex-1`}
          />
          <button
            type="submit"
            disabled={busy}
            className={`shrink-0 px-5 py-3 text-body font-semibold transition-colors disabled:opacity-60 ${buttonTheme}`}
          >
            {status === "verifying" ? "Verifying…" : status === "submitting" ? "Sending…" : buttonLabel}
          </button>
        </div>
      )}

      {/* Honeypot. Off-screen rather than display:none, which some bots skip;
          hidden from screen readers and the tab order. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div ref={turnstileBox} className={challengeVisible ? "mt-3" : ""} />

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

function TextField({
  id,
  label,
  optional = false,
  invalid,
  onChange,
  className,
  labelClassName,
  ...input
}: {
  id: string;
  label: string;
  optional?: boolean;
  invalid: boolean;
  onChange: (value: string) => void;
  className: string;
  labelClassName: string;
  name: string;
  value: string;
  disabled: boolean;
  required?: boolean;
  type?: string;
  inputMode?: "email" | "text";
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className={`mb-1 block text-small font-medium ${labelClassName}`}
      >
        {label}
        {optional && <span className="font-normal opacity-70"> (optional)</span>}
      </label>
      <input
        id={id}
        type={input.type ?? "text"}
        {...input}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid}
        className={className}
      />
    </div>
  );
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const TURNSTILE_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

// One script for every form on the page.
let turnstileScript: Promise<void> | null = null;

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (!turnstileScript) {
    turnstileScript = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = TURNSTILE_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        turnstileScript = null;
        reject(new Error("Turnstile failed to load"));
      };
      document.head.appendChild(script);
    });
  }
  return turnstileScript;
}
