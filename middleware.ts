import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // For now, just pass through to the client-side protection
  // The ProtectedLayout component will handle session verification
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

