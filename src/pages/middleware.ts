import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log(request, 'Request ');
  return NextResponse.redirect(new URL('/admin', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
};
