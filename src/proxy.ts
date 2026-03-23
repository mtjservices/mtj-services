import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = process.env.JWT_SECRET || 'mtj-services-dev-secret-key-32-chars-long';
const key = new TextEncoder().encode(secretKey);

export default async function proxy(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  const path = request.nextUrl.pathname;

  const isDashboard = path.startsWith('/dashboard');
  
  if (isDashboard) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
      const { payload } = await jwtVerify(session, key, {
        algorithms: ['HS256'],
      });
      const user = payload.user as any;

      // Role-based access control
      if (path.startsWith('/dashboard/admin') && user.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', request.url));
      }
      
      if (path.startsWith('/dashboard/client') && user.role !== 'CLIENT' && user.role !== 'ADMIN') {
        return NextResponse.redirect(new URL(user.role === 'WORKER' ? '/dashboard/worker' : '/', request.url));
      }

      if (path.startsWith('/dashboard/worker') && user.role !== 'WORKER' && user.role !== 'ADMIN') {
        return NextResponse.redirect(new URL(user.role === 'CLIENT' ? '/dashboard/client' : '/', request.url));
      }

    } catch (err) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Prevent logged-in users from seeing the auth pages
  if (path.startsWith('/auth/')) {
    if (session) {
      try {
        const { payload } = await jwtVerify(session, key, { algorithms: ['HS256'] });
        const user = payload.user as any;
        if (user.role === 'ADMIN') return NextResponse.redirect(new URL('/dashboard/admin', request.url));
        if (user.role === 'WORKER') return NextResponse.redirect(new URL('/dashboard/worker', request.url));
        return NextResponse.redirect(new URL('/dashboard/client', request.url));
      } catch (e) {
        // Validation fails, let them see auth pages
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};
