import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Matches by path prefix from the site root, so this covers the PDF
        // files at /guides/*.pdf only. The guide landing pages live at
        // /resources/guides/* — a different prefix — and stay crawlable,
        // which is the whole point: the page is what should rank, not the
        // file. Disallow stops indexing, not access; direct links still work.
        disallow: ["/api/", "/guides/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
