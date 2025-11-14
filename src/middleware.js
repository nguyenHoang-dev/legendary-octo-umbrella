import { NextResponse } from "next/server";

export default function middleware(request) {
  const pathName = request.nextUrl.pathname;

  if (pathName === '/') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};