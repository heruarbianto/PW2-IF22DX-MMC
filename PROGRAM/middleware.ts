import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value;

  // Validasi token sebelum memverifikasi
  if (!token || token.split('.').length !== 3) {
    console.error('Invalid token format:', token);
    return NextResponse.redirect(new URL('/LoginAdmin', req.url));
  }

  try {
    // Validasi token menggunakan secret key
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const role = (payload as { role: string }).role;

    // Redirect sesuai role
    if (role === 'ADMIN' && req.nextUrl.pathname !== '/DashboardAdmin') {
      return NextResponse.redirect(new URL('/DashboardAdmin', req.url));
    } else if (role === 'PELANGGAN' && req.nextUrl.pathname !== '/DashboardPelanggan/:path*') {
      return NextResponse.redirect(new URL('/DashboardPelanggan', req.url));
    } else if (!['ADMIN', 'PELANGGAN'].includes(role)) {
      return NextResponse.redirect(new URL('/forbidden', req.url));
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.redirect(new URL('/LoginAdmin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/DashboardAdmin', '/DashboardAdmin/:path*', '/DashboardPelanggan', '/DashboardPelanggan/:path*'],
};
