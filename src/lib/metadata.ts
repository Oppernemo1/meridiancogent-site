import type { Metadata } from "next";
import {
  SITE_NAME,
  SITE_SHARE_IMAGE_ALT,
  SITE_SHARE_IMAGE_PATH,
} from "@/lib/site";

/**
 * Open Graph / Twitter metadata for a page that sets its own share title and
 * description.
 *
 * Next.js replaces (not merges) the root layout's `openGraph` and `twitter`
 * objects when a page defines its own, so a page that only sets url/title/
 * description silently loses the site-wide image from
 * src/app/opengraph-image.tsx and twitter-image.tsx, plus og:type,
 * og:site_name and the large-image card. Build both objects here so they
 * always carry them.
 *
 * Routes with their own opengraph-image.tsx / twitter-image.tsx
 * (resources/[slug]) pass `ownImage` so the site-wide image is left out and
 * the route's file-based image is used.
 */
export function shareMetadata({
  url,
  title,
  description,
  type = "website",
  publishedTime,
  ownImage = false,
}: {
  url: string;
  title: string;
  description: string;
  type?: "website" | "article";
  publishedTime?: string;
  ownImage?: boolean;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const image = { width: 1200, height: 630, alt: SITE_SHARE_IMAGE_ALT, type: "image/png" };
  const openGraph = {
    siteName: SITE_NAME,
    url,
    title,
    description,
    ...(ownImage ? {} : { images: [{ url: SITE_SHARE_IMAGE_PATH, ...image }] }),
  };
  return {
    openGraph:
      type === "article"
        ? { ...openGraph, type, ...(publishedTime ? { publishedTime } : {}) }
        : { ...openGraph, type },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ownImage ? {} : { images: [{ url: "/twitter-image", ...image }] }),
    },
  };
}
