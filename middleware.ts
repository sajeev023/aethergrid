import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose/jwt/verify";

const COOKIE_NAME = "lfjc_admin_session";

function getJWTSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("CRITICAL SECURITY ERROR: ADMIN_JWT_SECRET environment variable must be set in production.");
    }
    return new TextEncoder().encode("lfjc-local-dev-jwt-secret-key-change-in-production-2026");
  }
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all admin page routes and admin API routes
  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");
  const isPublicAdminRoute =
    pathname.startsWith("/api/admin/auth/login") ||
    pathname.startsWith("/api/admin/alumni-upload");
  const isAdminAPI = pathname.startsWith("/api/admin") && !isPublicAdminRoute;

  if (!isAdminPage && !isAdminAPI) {
    return NextResponse.next();
  }

  // Check session cookie
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    if (isAdminAPI) {
      return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
    }
    // Redirect unauthenticated /admin traffic to home (302) to prevent public enumeration
    const homeUrl = new URL("/?auth=admin_required", request.url);
    return NextResponse.redirect(homeUrl);
  }

  // Verify JWT
  try {
    const { payload } = await jwtVerify(token, getJWTSecret());

    // If authenticated user hits bare /admin, redirect to dashboard
    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    // Forward user info via request headers internally for downstream routes (without leaking to browser)
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-admin-user-id", String(payload.userId));
    requestHeaders.set("x-admin-username", String(payload.username));
    requestHeaders.set("x-admin-role", String(payload.role));
    requestHeaders.set("x-admin-display-name", String(payload.displayName));
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch {
    if (isAdminAPI) {
      return NextResponse.json(
        { message: "Session expired. Please log in again." },
        { status: 401 }
      );
    }
    const homeUrl = new URL("/?auth=session_expired", request.url);
    const response = NextResponse.redirect(homeUrl);
    response.cookies.delete(COOKIE_NAME);
    return response;
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
