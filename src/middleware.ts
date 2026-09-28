import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  CURRENCY_VARIANT_PATHS,
  USD_COUNTRIES,
  USD_VARIANT_PREFIX,
} from "@/lib/pricing";

const PRODUCTION_HOSTS = new Set(["www.meridiancogent.com", "meridiancogent.com"]);

/**
 * Default currency without on-demand rendering: / and /pricing each exist as
 * two statically built pages, EUR at the public path and USD under /usd.
 * Visitors whose x-vercel-ip-country is in USD_COUNTRIES are rewritten (not
 * redirected) to the USD page, so the URL stays / or /pricing and each
 * variant stays cacheable. A missing header means EUR. The country is read
 * here only — never stored, never set as a cookie.
 */
function currencyResponse(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // The USD pages are only ever reached through the rewrite below (a rewrite
  // does not run middleware again). A direct request goes to the public URL.
  if (pathname === USD_VARIANT_PREFIX || pathname.startsWith(`${USD_VARIANT_PREFIX}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(USD_VARIANT_PREFIX.length) || "/";
    return NextResponse.redirect(url, 307);
  }

  const country = request.headers.get("x-vercel-ip-country")?.toUpperCase();
  if (
    country &&
    USD_COUNTRIES.has(country) &&
    (CURRENCY_VARIANT_PATHS as readonly string[]).includes(pathname)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? USD_VARIANT_PREFIX : `${USD_VARIANT_PREFIX}${pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const isPreview = !PRODUCTION_HOSTS.has(host) && host.endsWith(".vercel.app");

  if (isPreview && request.nextUrl.pathname === "/robots.txt") {
    return new NextResponse("User-agent: *\nDisallow: /\n", {
      headers: { "Content-Type": "text/plain" },
    });
  }

  const response = currencyResponse(request);
  if (isPreview) response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  // .well-known/ (security.txt) is served as a plain static file, untouched.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|\\.well-known/).*)"],
};
