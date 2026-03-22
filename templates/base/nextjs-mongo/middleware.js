import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check for the token in cookies, since localStorage isn't accessible here
  const token = request.cookies.get('token')?.value;

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // Deep verification of JWT is typically done using `jose` or Web Crypto API on Edge.
    // For jsonwebtoken compatibility, we enforce the token presence here, and API routes fully verify it.
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
