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

  // Jika token tidak ditemukan atau formatnya tidak valid (JWT harus memiliki 3 bagian dipisahkan oleh titik)
  if (!token || token.split('.').length !== 3) {
    console.error('Token is missing or invalid:'); // Log error untuk debugging

    // Redirect pengguna ke halaman login yang sesuai berdasarkan rute yang diakses
    if (req.nextUrl.pathname.startsWith('/DashboardAdmin')) {
      return NextResponse.redirect(new URL('/LoginAdmin', req.url)); // Redirect ke login admin
    } else if (req.nextUrl.pathname.startsWith('/DashboardPelanggan')) {
      return NextResponse.redirect(new URL('/Login', req.url)); // Redirect ke login pelanggan
    }
      // Jika pengguna mencoba mengakses halaman utama tetapi belum login, biarkan akses
      return NextResponse.next();
  }

  try {
    
    // Membuat secret key menggunakan TextEncoder (berdasarkan JWT_SECRET dari environment)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        // Pastikan `token` adalah string sebelum digunakan
        if (!token) {
          throw new Error('Token is missing');
        }
    // Memverifikasi token menggunakan secret key dan mendapatkan payload dari JWT
    const { payload } = await jwtVerify(token, secret);

    // Mengambil properti 'role' dari payload, diasumsikan bahwa role adalah string
    const role = (payload as { role: string }).role;
    
    // Cegah pengguna yang sudah login mengakses halaman utama atau halaman publik
    if (req.nextUrl.pathname === '/' || req.nextUrl.pathname.startsWith('/public')) {
      if (role === 'ADMIN') {
        return NextResponse.redirect(new URL('/DashboardAdmin', req.url));
      } else if (role === 'PELANGGAN') {
        return NextResponse.redirect(new URL('/DashboardPelanggan', req.url));
      }
    }

    // Redirect ke dashboard admin jika pengguna dengan role 'ADMIN' mencoba mengakses dashboard pelanggan
    if (role === 'ADMIN' && req.nextUrl.pathname.startsWith('/DashboardPelanggan')) {
      return NextResponse.redirect(new URL('/DashboardAdmin', req.url));
    }
    // Redirect ke dashboard pelanggan jika pengguna dengan role 'PELANGGAN' mencoba mengakses dashboard admin
    else if (role === 'PELANGGAN' && req.nextUrl.pathname.startsWith('/DashboardAdmin')) {
      return NextResponse.redirect(new URL('/DashboardPelanggan', req.url));
    }
    // Jika role tidak dikenal (bukan 'ADMIN' atau 'PELANGGAN'), redirect ke halaman forbidden
    else if (!['ADMIN', 'PELANGGAN'].includes(role)) {
      return NextResponse.redirect(new URL('/forbidden', req.url));
    }
  } catch (error) {
    // Jika terjadi error saat memverifikasi token, log error untuk debugging
    console.error('Error verifying token:', error);

    // Redirect ke halaman login yang sesuai berdasarkan rute yang diakses
    if (req.nextUrl.pathname.startsWith('/DashboardAdmin')) {
      return NextResponse.redirect(new URL('/LoginAdmin', req.url)); // Redirect ke login admin
    } else if (req.nextUrl.pathname.startsWith('/DashboardPelanggan')) {
      return NextResponse.redirect(new URL('/Login', req.url)); // Redirect ke login pelanggan
    }
  }

  // Jika semua validasi lolos, lanjutkan ke halaman yang diminta
  return NextResponse.next();
}

// Konfigurasi middleware untuk menentukan rute mana saja yang akan dilindungi
export const config = {
  matcher: [
    '/', //Halaman Utama
    '/DashboardAdmin', // Halaman dashboard admin
    '/DashboardAdmin/:path*', // Semua sub-path di bawah dashboard admin
    '/DashboardPelanggan', // Halaman dashboard pelanggan
    '/DashboardPelanggan/:path*', // Semua sub-path di bawah dashboard pelanggan
    '/DashboardPelanggan/:path*',
  ],
};
