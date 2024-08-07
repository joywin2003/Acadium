import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  if (token && url.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (!token && url.pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (url.pathname === "/dashboard/faculty/new" || url.pathname ==="/dashboard/student/new") {
    if (token?.role !== "admin") {
      return NextResponse.redirect(new URL("/404", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
