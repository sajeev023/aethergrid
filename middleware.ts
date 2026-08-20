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
  const isAdminAPI = pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/auth/login");

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

    // Attach user info via headers for downstream routes
    const response = NextResponse.next();
    response.headers.set("x-admin-user-id", String(payload.userId));
    response.headers.set("x-admin-username", String(payload.username));
    response.headers.set("x-admin-role", String(payload.role));
    response.headers.set("x-admin-display-name", String(payload.displayName));
    return response;
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
