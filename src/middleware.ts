import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL('/home', request.url));

  const isLogin = true;
  //   const cookies = parse(request?.headers?.cookie || '');
  // const isLoginCookie = cookies.isLogin;

  // const isLoginCookie = document?.cookie?.split('=')?.[1];

  const currentURL = request.nextUrl.clone();

  if (isLogin) {
    if (request.nextUrl.pathname === '/admin/:path*') {
      return NextResponse.redirect(currentURL);
    }
  } else {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: '/admin/:path*',
};
