import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose/jwt/verify";

const SESSION_COOKIE_NAME = "aether_session";
const JWT_SECRET = new TextEncoder().encode(
  process.env.AETHER_JWT_SECRET || "aethergrid-production-grade-master-secret-key-2026-launch"
);

/**
 * Attaches standard defensive security headers to all HTTP responses.
 * Enforces clickjacking defense, MIME sniffing prevention, referrer leakage protection,
 * restrictive permissions policy, and content security policy across all routes.
 */
function applySecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("X-XSS-Protection", "0");
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' http: https: ws: wss:; frame-ancestors 'none';"
  );
  if (process.env.NODE_ENV === "production") {
    response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  }
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let public auth, heartbeat, webhook, waitlist, feedback, and public landing/login routes pass with security headers
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/nodes/heartbeat") ||
    pathname.startsWith("/api/payment/webhook") ||
    pathname.startsWith("/api/waitlist") ||
    pathname.startsWith("/api/feedback") ||
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname === "/admin/access-denied"
  ) {
    return applySecurityHeaders(NextResponse.next());
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
      return applySecurityHeaders(
        NextResponse.json({ error: "Unauthorized: Admin session required." }, { status: 401 })
      );
    }
    if (isAdminRoute || isDashboardRoute) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return applySecurityHeaders(NextResponse.redirect(loginUrl));
    }
    return applySecurityHeaders(NextResponse.next());
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // Strict Server-Side Admin Authorization
    if (isAdminRoute) {
      const roles = String(payload.roles || "");
      if (!roles.includes("ADMIN")) {
        if (pathname.startsWith("/api/")) {
          return applySecurityHeaders(
            NextResponse.json({ error: "Forbidden: Admin privileges required." }, { status: 403 })
          );
        }
        return applySecurityHeaders(NextResponse.redirect(new URL("/admin/access-denied", request.url)));
      }
    }
  } catch {
    if (isAdminRoute || isDashboardRoute) {
      const response = NextResponse.redirect(new URL("/login?expired=1", request.url));
      response.cookies.delete(SESSION_COOKIE_NAME);
      return applySecurityHeaders(response);
    }
  }

  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt)$).*)",
  ],
};
