import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

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

  // Only protect admin routes
  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin";
  const isAdminAPI = pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/auth/login");

  if (!isAdminPage && !isAdminAPI) {
    return NextResponse.next();
  }

  // Check session cookie
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    if (isAdminAPI) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // Redirect to login for page requests
    const loginUrl = new URL("/admin", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Verify JWT
  try {
    const { payload } = await jwtVerify(token, getJWTSecret());

    // Attach user info via headers for downstream routes
    const response = NextResponse.next();
    response.headers.set("x-admin-user-id", String(payload.userId));
    response.headers.set("x-admin-username", String(payload.username));
    response.headers.set("x-admin-role", String(payload.role));
    response.headers.set("x-admin-display-name", String(payload.displayName));
    return response;
  } catch {
    // Invalid or expired token
    if (isAdminAPI) {
      return NextResponse.json(
        { message: "Session expired. Please log in again." },
        { status: 401 }
      );
    }
    const loginUrl = new URL("/admin", request.url);
    const response = NextResponse.redirect(loginUrl);
    // Clear the invalid cookie
    response.cookies.delete(COOKIE_NAME);
    return response;
  }
}

export const config = {
  matcher: ["/admin/:path+", "/api/admin/:path+"],
};
