import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

/**
 * Fast first gate for private pages: no session cookie -> sign-in page.
 * (The pages themselves also verify the session on the server.)
 * Product pages are guarded inside the page so an unknown slug can still show a 404.
 */
export function proxy(request: NextRequest) {
  if (getSessionCookie(request)) return NextResponse.next();

  const url = new URL("/signin", request.url);
  url.searchParams.set("redirect", request.nextUrl.pathname + request.nextUrl.search);
  url.searchParams.set("reason", "auth");
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/profile/:path*"],
};
