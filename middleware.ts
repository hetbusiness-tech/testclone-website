import { NextResponse, type NextRequest } from "next/server";
import { LEGACY_REDIRECT_MAP } from "./lib/seo-redirects";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/$/, "") || "/";
  const destination = LEGACY_REDIRECT_MAP[pathname];

  if (destination && destination !== pathname) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = destination;
    return NextResponse.redirect(redirectUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_vinext|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|xml|txt|ico)$).*)",
  ],
};

