import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Forward the current path to server components via a custom header
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-pathname', pathname);

  if (!pathname.startsWith('/admin') || pathname.startsWith('/admin/login')) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const token = req.cookies.get('sac_admin')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  const payload = await verifyToken(token);
  if (!payload || payload.role !== 'sac_admin') {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

// Explicitly match /admin and every sub-path
export const config = { matcher: ['/admin', '/admin/:path*'] };
