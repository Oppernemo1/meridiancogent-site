export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.meridiancogent.com"
).replace(/\/$/, "");

export const SITE_NAME = "MeridianCogent";

export const SITE_DESCRIPTION =
  "MeridianCogent is a control environment for separation offices and integration teams — track obligations, manage TSAs, measure Day 1 readiness, and hold the plan to the commitments made.";

export const CONTACT_EMAIL = "hello@meridiancogent.com";

/** The four topic tags used to filter /resources. */
export const TOPIC_TAGS = ["TSA", "Integration", "Carve-out", "Playbooks"] as const;
export type TopicTag = (typeof TOPIC_TAGS)[number];

export const NAV_LINKS = [
  { label: "Platform", href: "/platform" },
  { label: "Principles", href: "/principles" },
  { label: "Security", href: "/security" },
  { label: "Resources", href: "/resources" },
  { label: "Join the Program", href: "/early-access" },
];
