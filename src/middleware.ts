
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getDashboardPath, getToken, getUserFromToken, isTokenExpired } from '@/lib/auth';

// Define protected paths that require authentication
const protectedPaths = ['/dashboard'];

// Define role-specific paths
const roleSpecificPaths: Record<string, string[]> = {
  admin: ['/dashboard/admin'],
  doctor: ['/dashboard/doctor'],
  receptionist: ['/dashboard/receptionist'],
  patient: ['/dashboard/patient']
};

// Middleware function
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for API routes, static files, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Allow access to login page
  if (pathname === '/login') {
    // If user already logged in, redirect to their dashboard
    const token = getToken();
    if (token && !isTokenExpired(token)) {
      const user = getUserFromToken(token);
      if (user) {
        return NextResponse.redirect(new URL(getDashboardPath(user.role), request.url));
      }
    }
    return NextResponse.next();
  }

  // Handle protected paths
  if (pathname.startsWith('/dashboard')) {
    const token = getToken();
    
    // If no token or expired token, redirect to login
    if (!token || isTokenExpired(token)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    const user = getUserFromToken(token);
    
    // If token is invalid, redirect to login
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Root dashboard should redirect to role-specific dashboard
    if (pathname === '/dashboard') {
      return NextResponse.redirect(new URL(getDashboardPath(user.role), request.url));
    }
    
    // Check if user can access the specific dashboard
    const targetRole = pathname.split('/').pop();
    if (targetRole && user.role !== targetRole) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
