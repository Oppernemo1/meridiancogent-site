// Tests for the bot checks on /api/early-access. Resend is mocked so every
// contact and email call can be counted; Turnstile is verified for real
// against Cloudflare using its documented test keys:
// https://developers.cloudflare.com/turnstile/troubleshooting/testing/
import { existsSync } from "node:fs";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GUIDES } from "@/lib/guides";

const TURNSTILE_PASS_SECRET = "1x0000000000000000000000000000000AA";
const TURNSTILE_FAIL_SECRET = "2x0000000000000000000000000000000AA";
const TURNSTILE_SPENT_SECRET = "3x0000000000000000000000000000000AA";
// What Cloudflare's test site keys hand the browser.
const DUMMY_TOKEN = "XXXX.DUMMY.TOKEN.XXXX";

const resend = vi.hoisted(() => ({
  contactsGet: vi.fn(),
  contactsCreate: vi.fn(),
  contactsUpdate: vi.fn(),
  segmentsAdd: vi.fn(),
  emailsSend: vi.fn(),
}));

vi.mock("resend", () => ({
  Resend: class {
    contacts = {
      get: resend.contactsGet,
      create: resend.contactsCreate,
      update: resend.contactsUpdate,
      segments: { add: resend.segmentsAdd },
    };
    emails = { send: resend.emailsSend };
  },
}));

const { POST } = await import("./route");

let ip = 0;
function post(body: Record<string, unknown>, fromIp = `203.0.113.${++ip}`) {
  return POST(
    new Request("http://localhost/api/early-access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": fromIp,
      },
      body: JSON.stringify(body),
    }),
  );
}

const fullForm = {
  intent: "talk",
  form: "full",
  name: "Ada Lovelace",
  company: "Analytical Engines Ltd",
  role: "Integration lead",
  email: "ada@example.com",
  source: "early-access-page",
  turnstileToken: DUMMY_TOKEN,
  website: "",
  elapsedMs: 12_000,
};

function resendCalls() {
  return (
    resend.contactsGet.mock.calls.length +
    resend.contactsCreate.mock.calls.length +
    resend.contactsUpdate.mock.calls.length +
    resend.segmentsAdd.mock.calls.length +
    resend.emailsSend.mock.calls.length
  );
}

let warn: ReturnType<typeof vi.spyOn>;
let fetchSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "re_test_key");
  vi.stubEnv("RESEND_SEGMENT_ID", "seg_test");
  vi.stubEnv("UNSUBSCRIBE_SECRET", "test-secret");
  vi.stubEnv("TURNSTILE_SECRET_KEY", TURNSTILE_PASS_SECRET);
  resend.contactsGet.mockResolvedValue({ data: null, error: { name: "not_found" } });
  resend.contactsCreate.mockResolvedValue({ data: { id: "c_1" }, error: null });
  resend.contactsUpdate.mockResolvedValue({ data: { id: "c_1" }, error: null });
  resend.segmentsAdd.mockResolvedValue({ data: {}, error: null });
  resend.emailsSend.mockResolvedValue({ data: { id: "e_1" }, error: null });
  warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  fetchSpy = vi.spyOn(globalThis, "fetch");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

function siteverifyCalls() {
  return fetchSpy.mock.calls.filter(([url]) =>
    String(url).includes("challenges.cloudflare.com"),
  ).length;
}

function lastRejectionLog(): string {
  return String(warn.mock.calls.at(-1)?.[0] ?? "");
}

describe("valid submission", () => {
  it("creates the contact and sends confirmation + notification", async () => {
    const res = await post(fullForm);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(siteverifyCalls()).toBe(1);
    expect(resend.contactsCreate).toHaveBeenCalledTimes(1);
    expect(resend.contactsCreate.mock.calls[0][0]).toMatchObject({
      email: "ada@example.com",
      firstName: "Ada",
      properties: { source: "talk-to-us", company: "Analytical Engines Ltd" },
    });
    expect(resend.emailsSend).toHaveBeenCalledTimes(2);
    expect(resend.emailsSend.mock.calls.map(([m]) => m.to)).toEqual([
      "ada@example.com",
      "hello@meridiancogent.com",
    ]);
  });

  it("works for the short homepage/footer form", async () => {
    const res = await post({
      intent: "talk",
      email: "grace@example.com",
      source: "footer",
      turnstileToken: DUMMY_TOKEN,
      website: "",
      elapsedMs: 5_000,
    });
    expect(res.status).toBe(200);
    expect(resend.contactsCreate).toHaveBeenCalledTimes(1);
    expect(resend.emailsSend).toHaveBeenCalledTimes(2);
  });
});

describe("Turnstile", () => {
  it("rejects a missing token: no contact, no email, no Cloudflare call", async () => {
    const { turnstileToken: _omit, ...noToken } = fullForm;
    const res = await post(noToken);
    expect(res.status).toBe(403);
    expect((await res.json()).error).toMatch(/couldn't verify/i);
    expect(resendCalls()).toBe(0);
    expect(siteverifyCalls()).toBe(0);
    expect(lastRejectionLog()).toContain("reason=turnstile_missing");
  });

  it("rejects an empty token", async () => {
    const res = await post({ ...fullForm, turnstileToken: "" });
    expect(res.status).toBe(403);
    expect(resendCalls()).toBe(0);
  });

  it("rejects a token Cloudflare says is invalid: no contact, no email", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", TURNSTILE_FAIL_SECRET);
    const res = await post(fullForm);
    expect(res.status).toBe(403);
    expect(siteverifyCalls()).toBe(1);
    expect(resendCalls()).toBe(0);
    expect(lastRejectionLog()).toContain("reason=turnstile_invalid");
  });

  it("rejects an already-spent token", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", TURNSTILE_SPENT_SECRET);
    const res = await post(fullForm);
    expect(res.status).toBe(403);
    expect(resendCalls()).toBe(0);
    expect(lastRejectionLog()).toContain("timeout-or-duplicate");
  });

  it("fails closed when the secret isn't configured", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await post(fullForm);
    expect(res.status).toBe(500);
    expect(resendCalls()).toBe(0);
  });

  it("fails closed when Cloudflare is unreachable", async () => {
    fetchSpy.mockRejectedValueOnce(new Error("network down"));
    const res = await post(fullForm);
    expect(res.status).toBe(503);
    expect(resendCalls()).toBe(0);
    expect(lastRejectionLog()).toContain("reason=turnstile_unavailable");
  });
});

describe("silent checks", () => {
  it("honeypot filled: fake success, nothing created or sent", async () => {
    const res = await post({ ...fullForm, website: "http://spam.example" });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(resendCalls()).toBe(0);
    expect(siteverifyCalls()).toBe(0);
    expect(lastRejectionLog()).toContain("reason=honeypot");
  });

  it("submitted under 3 seconds: fake success, nothing created or sent", async () => {
    const res = await post({ ...fullForm, elapsedMs: 900 });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(resendCalls()).toBe(0);
    expect(lastRejectionLog()).toContain("reason=too_fast");
  });

  it("no elapsed time at all (not from the form) counts as too fast", async () => {
    const { elapsedMs: _omit, ...noTiming } = fullForm;
    const res = await post(noTiming);
    expect(res.status).toBe(200);
    expect(resendCalls()).toBe(0);
    expect(lastRejectionLog()).toContain("reason=too_fast");
  });

  it("just over 3 seconds is accepted", async () => {
    const res = await post({ ...fullForm, elapsedMs: 3_100 });
    expect(res.status).toBe(200);
    expect(resend.contactsCreate).toHaveBeenCalledTimes(1);
  });
});

describe("existing protections still hold", () => {
  it("validation still rejects a bad email with nothing created", async () => {
    const res = await post({ ...fullForm, email: "not-an-email" });
    expect(res.status).toBe(400);
    expect(resendCalls()).toBe(0);
  });

  it("validation still requires name and company on the full form", async () => {
    const res = await post({ ...fullForm, name: "" });
    expect(res.status).toBe(400);
    expect(resendCalls()).toBe(0);
  });

  it("rate limit still returns 429 after 5 requests from one IP", async () => {
    const statuses = [];
    for (let i = 0; i < 6; i++) {
      statuses.push((await post({ ...fullForm, website: "x" }, "198.51.100.7")).status);
    }
    expect(statuses).toEqual([200, 200, 200, 200, 200, 429]);
    expect(lastRejectionLog()).toContain("reason=rate_limited");
  });
});

describe("rejection logging", () => {
  it("logs the reason and counts, never the personal data", async () => {
    await post({ ...fullForm, website: "filled" });
    await post({ ...fullForm, elapsedMs: 10 });
    const lines = warn.mock.calls.map(([l]) => String(l));
    for (const line of lines) {
      expect(line).not.toContain("ada@example.com");
      expect(line).not.toContain("Ada");
      expect(line).not.toContain("Analytical");
      expect(line).not.toMatch(/203\.0\.113/);
    }
    expect(lines.at(-1)).toMatch(/honeypot=\d+ too_fast=\d+/);
  });
});

describe("guide downloads", () => {
  for (const guide of GUIDES) {
    it(`${guide.slug}: accepted, welcome email sent, PDF on disk`, async () => {
      const res = await post({
        email: `reader-${guide.slug}@example.com`,
        source: `guide-${guide.slug}`,
        turnstileToken: DUMMY_TOKEN,
        website: "",
        elapsedMs: 8_000,
      });
      // 200 is what reveals the download link in the form.
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ ok: true });
      expect(resend.contactsCreate.mock.calls[0][0].properties).toEqual({
        source: `guide-${guide.slug}`,
      });
      expect(existsSync(join(process.cwd(), "public", guide.pdf))).toBe(true);
    });
  }
});
