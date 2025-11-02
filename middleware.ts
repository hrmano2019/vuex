import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const notAuthenticatedRoutes = ['/login', '/register'];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isLoggedIn = !!token;
  const isAdmin = token?.role === 'admin';

  const { pathname } = req.nextUrl;

  // Example: redirect unauthenticated users away from protected routes
  if (!isLoggedIn && !notAuthenticatedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Optionally set headers to pass user info downstream
  const response = NextResponse.next();
  if (isLoggedIn && token) {
    response.headers.set('x-user-name', token.name || '');
    response.headers.set('x-user-email', token.email || '');
    response.headers.set('x-user-role', token.role || '');
  }

  return response;
}
