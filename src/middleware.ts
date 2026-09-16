import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRODUCTION_HOSTS = new Set(["www.meridiancogent.com", "meridiancogent.com"]);

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (PRODUCTION_HOSTS.has(host) || !host.endsWith(".vercel.app")) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/robots.txt") {
    return new NextResponse("User-agent: *\nDisallow: /\n", {
      headers: { "Content-Type": "text/plain" },
    });
  }

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
