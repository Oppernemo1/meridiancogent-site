import { ImageResponse } from "next/og";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { SITE_NAME } from "@/lib/site";
import { colors } from "@/lib/tokens";

export const alt = "MeridianCogent Resources";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export default function ArticleOgImage({
  params,
}: {
  params: { slug: string };
}) {
  let title = "MeridianCogent Resources";
  let tags: string[] = [];
  try {
    const post = getPostBySlug(params.slug);
    title = post.frontmatter.title;
    tags = post.frontmatter.tags ?? [];
  } catch {
    // fall back to defaults
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: colors.graphite,
          padding: "72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <svg
          width="1200"
          height="320"
          viewBox="0 0 1200 320"
          style={{ position: "absolute", left: 0, bottom: 0 }}
        >
          <path
            d="M-20 260 L220 130 L400 200 L600 60 L820 180 L1000 80 L1220 170"
            fill="none"
            stroke={colors.accent}
            strokeOpacity="0.25"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <svg width="48" height="48" viewBox="0 0 200 200">
            <rect width="200" height="200" rx="40" fill={colors.accent} />
            <path
              d="M40 140 L80 78 L100 118 L120 58 L160 140"
              fill="none"
              stroke={colors.graphite}
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ color: colors.onDark.primary, fontSize: 28, fontWeight: 600 }}>
            {SITE_NAME} · Resources
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {tags.length > 0 && (
            <span
              style={{
                color: colors.onDark.secondary,
                fontSize: 24,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {tags.join("  ·  ")}
            </span>
          )}
          <span
            style={{
              color: colors.onDark.primary,
              fontSize: title.length > 60 ? 54 : 64,
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: "1000px",
            }}
          >
            {title}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
