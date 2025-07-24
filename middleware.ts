

import { type NextRequest, NextResponse } from "next/server"

const protectedUserPaths = [
  "/cart",
  "/checkout",
  "/orders",
  "/profile",
  "/reviews",
  "/my-orders",
  
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("jwt-token")?.value

  if (!token) {
    const isUserProtected = protectedUserPaths.some((path) =>
      pathname.startsWith(path)
    )

    if (isUserProtected) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  // ✅ Skip actual verification — do that server-side in route
  return NextResponse.next()
}

export const config = {
  matcher: ["/user/:path*", "/checkout", "/auth/:path*", "/admin/:path*", "/"],
}
