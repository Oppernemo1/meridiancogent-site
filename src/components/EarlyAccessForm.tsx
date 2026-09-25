"use client";

import { useId, useState, type FormEvent } from "react";
import { isValidEmail } from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";
type Field = "email" | "name" | "company" | "role";

export function EarlyAccessForm({
  theme = "light",
  source = "unknown",
  buttonLabel = "Talk to Us",
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
   *
   * A download form stays email-only. Every other use of this form is a
   * "Talk to Us" request and also asks for name, company and (optionally)
   * role, so whoever picks up the lead knows who they're calling.
   */
  download?: { href: string; label: string };
}) {
  const id = useId();
  const collectDetails = !download;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [invalidField, setInvalidField] = useState<Field | null>(null);

  const dark = theme === "dark";

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

    setStatus("submitting");
    setInvalidField(null);
    setMessage("");

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          collectDetails
            ? {
                intent: "talk",
                email: trimmed,
                name: name.trim(),
                company: company.trim(),
                role: role.trim(),
                source,
              }
            : { email: trimmed, source },
        ),
      });

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
            disabled={status === "submitting"}
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
            disabled={status === "submitting"}
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
            disabled={status === "submitting"}
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
            disabled={status === "submitting"}
            invalid={invalidField === "email"}
            className={`${inputBase} ${inputTheme}`}
            labelClassName={labelTheme}
          />
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={status === "submitting"}
              className={`px-5 py-3 text-body font-semibold transition-colors disabled:opacity-60 ${buttonTheme}`}
            >
              {status === "submitting" ? "Sending…" : buttonLabel}
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
      )}

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
