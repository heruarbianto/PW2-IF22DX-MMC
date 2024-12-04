import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import {jwtVerify, type JWTPayload} from "jose"

// Role yang diizinkan untuk setiap halaman
const routePermissions: Record<string, string[]> = {
  '/DashboardAdmin': ['ADMIN'], // Hanya admin
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value;
  // console.log('Auth Token:', req.cookies.get('authToken')?.value);


  if (!token) {
 
    return NextResponse.redirect(new URL('/LoginAdmin', req.url));
    // return alert("Token Kosong")
  }

  try {
     // Decode dan validasi token menggunakan jose
     const secret = new TextEncoder().encode(process.env.JWT_SECRET);
     const { payload } = await jwtVerify(token, secret);
     const role = (payload as { role: string }).role;


    // Periksa role berdasarkan rute
    const allowedRoles = routePermissions[req.nextUrl.pathname];
    if (allowedRoles && !allowedRoles.includes(role)) {
      // Jika role tidak diizinkan, redirect ke halaman forbidden
      return NextResponse.redirect(new URL('/forbidden', req.url));
    }
  } catch (error) {
    // Token tidak valid atau expired
    // return NextResponse.redirect(new URL('/LoginAdmin', req.url));
    console.log("Ini Errornya "+error)
    return;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/DashboardAdmin', '/DashboardAdmin/:path*'] // Proteksi halaman berdasarkan role
};
