// One-off, idempotent setup for the Resend contact properties the
// /api/early-access route writes. Resend rejects a contact create/update
// that names a property which doesn't exist yet, so run this against an
// account BEFORE deploying code that writes them:
//
//   node --env-file=.env.local scripts/setup-resend-properties.mjs
//
// Existing properties are left alone; only missing ones are created.
import { Resend } from "resend";

const PROPERTIES = ["company", "role", "source"];

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.error("RESEND_API_KEY is not set.");
  process.exit(1);
}

const resend = new Resend(apiKey);

const { data, error } = await resend.contactProperties.list();
if (error) {
  console.error("Couldn't list contact properties:", error);
  process.exit(1);
}

const existing = new Map(data.data.map((p) => [p.key, p]));

for (const key of PROPERTIES) {
  const found = existing.get(key);
  if (found) {
    console.log(`exists   ${key} (${found.type})`);
    if (found.type !== "string") {
      console.error(`  ${key} should be type "string" — fix it in Resend.`);
      process.exitCode = 1;
    }
    continue;
  }
  const { error: createError } = await resend.contactProperties.create({
    key,
    type: "string",
  });
  if (createError) {
    console.error(`failed   ${key}:`, createError);
    process.exitCode = 1;
  } else {
    console.log(`created  ${key} (string)`);
  }
}
