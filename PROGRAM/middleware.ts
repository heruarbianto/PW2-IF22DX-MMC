// Mengimpor NextResponse untuk membuat respon di middleware
// Mengimpor NextRequest untuk menangani request dari pengguna
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Mengimpor fungsi jwtVerify dari library 'jose' untuk memverifikasi JSON Web Token (JWT)
import { jwtVerify } from 'jose';

// Middleware utama untuk memproses permintaan berdasarkan token autentikasi
export async function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value;

  // Jika token tidak ditemukan atau formatnya tidak valid
  if (!token || token.split('.').length !== 3) {
    if (req.nextUrl.pathname === '/' || req.nextUrl.pathname === '/login') {
      return NextResponse.next();
    }
    console.error('Token is missing or invalid');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const exp = (payload as { exp?: number }).exp;

    if (!exp || Date.now() >= exp * 1000) {
      console.error('Token has expired');
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const role = (payload as { role: string }).role;

    if (req.nextUrl.pathname === '/'|| req.nextUrl.pathname === '/') {
      if (role === 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboardadmin', req.url));
      } else if (role === 'PELANGGAN') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    }

    // Admin hanya bisa mengakses sub-path dashboard admin
    if (role === 'ADMIN' && req.nextUrl.pathname.startsWith('/dashboardadmin')) {
      return NextResponse.next();
    }

    // Pelanggan hanya bisa mengakses sub-path dashboard pelanggan
    if (role === 'PELANGGAN' && req.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.next();
    }

    // Redirect admin ke dashboard admin jika mereka mencoba mengakses dashboard pelanggan
    if (role === 'ADMIN' && req.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/dashboardadmin', req.url));
    }

    // Redirect pelanggan ke dashboard jika mereka mencoba mengakses dashboard admin
    if (role === 'PELANGGAN' && req.nextUrl.pathname.startsWith('/dashboardadmin')) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Jika role tidak valid atau tidak dikenali, redirect ke halaman forbidden
    else if (!['ADMIN', 'PELANGGAN'].includes(role)) {
      return NextResponse.redirect(new URL('/forbidden', req.url));
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/', 
    '/dashboardadmin', 
    '/dashboardadmin/:path*', 
    '/dashboard', 
    '/dashboard/:path*', 
    '/modal', 
    '/login',
  ],
};
