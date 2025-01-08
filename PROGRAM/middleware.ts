// Mengimpor NextResponse untuk membuat respon di middleware
// Mengimpor NextRequest untuk menangani request dari pengguna
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Mengimpor fungsi jwtVerify dari library 'jose' untuk memverifikasi JSON Web Token (JWT)
import { jwtVerify } from 'jose';

// Middleware utama untuk memproses permintaan berdasarkan token autentikasi
export async function middleware(req: NextRequest) {
  // Mengambil token autentikasi dari cookie bernama 'authToken'
  const token = req.cookies.get('authToken')?.value;

  // Jika token tidak ditemukan atau formatnya tidak valid
  if (!token || token.split('.').length !== 3) {
    if (req.nextUrl.pathname === '/' || req.nextUrl.pathname === '/login') {
      return NextResponse.next();
    }
    console.error('Token is missing or invalid'); // Log error untuk debugging
    return NextResponse.redirect(new URL('/login', req.url)); // Redirect ke halaman login
  }

  try {
    // Membuat secret key menggunakan TextEncoder (berdasarkan JWT_SECRET dari environment)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    // Memverifikasi token menggunakan secret key dan mendapatkan payload dari JWT
    const { payload } = await jwtVerify(token, secret);

    // Mengecek waktu kadaluarsa token (dari properti 'exp' di payload)
    const exp = (payload as { exp?: number }).exp;

    if (!exp || Date.now() >= exp * 1000) {
      // Jika token sudah kadaluarsa, redirect ke halaman login
      console.error('Token has expired');
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Mengambil properti 'role' dari payload, diasumsikan bahwa role adalah string
    const role = (payload as { role: string }).role;

    // Cegah pengguna yang sudah login mengakses halaman utama
    if (req.nextUrl.pathname === '/' ) {
      if (role === 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboardadmin', req.url)); // Redirect ke dashboard admin
      } else if (role === 'PELANGGAN') {
        return NextResponse.redirect(new URL('/dashboard', req.url)); // Redirect ke dashboard pelanggan
      }
    }
    if (role === 'ADMIN' && req.nextUrl.pathname === '/dashboardadmin') {
      return NextResponse.next(); // Jangan redirect jika sudah di halaman dashboardadmin
    }
    if (role === 'PELANGGAN' && req.nextUrl.pathname === '/dashboard') {
      return NextResponse.next(); // Jangan redirect jika sudah di halaman dashboard
    }
    // Redirect ke dashboard admin jika pengguna dengan role 'ADMIN' mencoba mengakses dashboard pelanggan
    if (role === 'ADMIN' && req.nextUrl.pathname.startsWith('/dashboard')&&req.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/dashboardadmin', req.url));
    }
    // Redirect ke dashboard pelanggan jika pengguna dengan role 'PELANGGAN' mencoba mengakses dashboard admin
    else if (role === 'PELANGGAN' && req.nextUrl.pathname.startsWith('/dashboardadmin')||req.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    // Jika role tidak valid atau tidak dikenali, redirect ke halaman forbidden
    else if (!['ADMIN', 'PELANGGAN'].includes(role)) {
      return NextResponse.redirect(new URL('/forbidden', req.url));
    }
  } catch (error) {
    // Jika terjadi error saat memverifikasi token, log error untuk debugging
    console.error('Error verifying token:', error);
    return NextResponse.redirect(new URL('/login', req.url)); // Redirect ke halaman login
  }

  // Jika semua validasi lolos, lanjutkan ke halaman yang diminta
  return NextResponse.next();
}

// Konfigurasi middleware untuk menentukan rute mana saja yang akan dilindungi
export const config = {
  matcher: [
    '/', // Halaman utama
    '/dashboardadmin', // Halaman dashboard admin
    '/dashboardadmin/:path*', // Semua sub-path di bawah dashboard admin
    '/dashboard', // Halaman dashboard pelanggan
    '/dashboard/:path*', // Semua sub-path di bawah dashboard pelanggan
    '/modal', // Rute Modal (contoh rute tambahan)
    '/login',
  ],
};
