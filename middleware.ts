import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose/jwt/verify";

const SESSION_COOKIE_NAME = "aether_session";
const JWT_SECRET = new TextEncoder().encode(
  process.env.AETHER_JWT_SECRET || "aethergrid-production-grade-master-secret-key-2026-launch"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let public auth and heartbeat routes pass
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/nodes/heartbeat") ||
    pathname.startsWith("/api/payment/webhook") ||
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname === "/admin/access-denied"
  ) {
    return NextResponse.next();
  }

  // Extract session token
  let token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const authHeader = request.headers.get("authorization");
  if (!token && authHeader?.startsWith("Bearer ")) {
    token = authHeader.slice(7);
  }

  const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  const isDashboardRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/giver") ||
    pathname.startsWith("/mobile-simulator");

  if (!token) {
    if (isAdminRoute && pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized: Admin session required." }, { status: 401 });
    }
    if (isAdminRoute || isDashboardRoute) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // Strict Server-Side Admin Authorization
    if (isAdminRoute) {
      const roles = String(payload.roles || "");
      if (!roles.includes("ADMIN")) {
        if (pathname.startsWith("/api/")) {
          return NextResponse.json({ error: "Forbidden: Admin privileges required." }, { status: 403 });
        }
        return NextResponse.redirect(new URL("/admin/access-denied", request.url));
      }
    }
  } catch {
    if (isAdminRoute || isDashboardRoute) {
      const response = NextResponse.redirect(new URL("/login?expired=1", request.url));
      response.cookies.delete(SESSION_COOKIE_NAME);
      return response;
    }
  }

  const response = NextResponse.next();

  // Add security headers to prevent clickjacking, MIME-sniffing, and XSS
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/dashboard/:path*",
    "/giver/:path*",
    "/mobile-simulator/:path*",
    "/api/taker/:path*",
    "/api/giver/:path*",
    "/api/payment/:path*",
  ],
};
