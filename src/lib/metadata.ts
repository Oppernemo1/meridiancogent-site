import type { Metadata } from "next";
import { SITE_NAME, SITE_SHARE_IMAGE_ALT } from "@/lib/site";

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
 * Routes with their own opengraph-image.tsx (resources/[slug]) don't need
 * this: a file-based image in the route's own segment takes precedence.
 */
export function shareMetadata({
  url,
  title,
  description,
  type = "website",
}: {
  url: string;
  title: string;
  description: string;
  type?: "website" | "article";
}): Pick<Metadata, "openGraph" | "twitter"> {
  const image = { width: 1200, height: 630, alt: SITE_SHARE_IMAGE_ALT, type: "image/png" };
  return {
    openGraph: {
      type,
      siteName: SITE_NAME,
      url,
      title,
      description,
      images: [{ url: "/opengraph-image", ...image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: "/twitter-image", ...image }],
    },
  };
}
