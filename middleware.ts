import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Only run auth middleware on routes that need it
    "/dashboard/:path*",
    "/messages/:path*",
    "/preferences/:path*",
    "/exploring/:path*",
    "/provider-dashboard/:path*",
    "/provider-inbox/:path*",
    "/provider-profile/:path*",
    "/sign-in/:path*",
    "/provider-sign-in/:path*",
    "/provider-apply/:path*",
    "/auth/callback/:path*",
  ],
};
