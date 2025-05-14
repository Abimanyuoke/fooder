import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Ambil dari .env.local
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret });
    const { pathname } = request.nextUrl;

    console.log("Middleware running on:", pathname);
    console.log("Token:", token);

    // Jika user belum login dan akses root, redirect ke login
    if (pathname === "/" && !token) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/login";
        return NextResponse.redirect(redirectUrl);
    }

    // Jika user akses /manager
    if (pathname.startsWith("/manager")) {
        if (!token || token.role !== "MANAGER") {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = "/login";
            return NextResponse.redirect(redirectUrl);
        }
    }

    // Jika user akses /cashier
    if (pathname.startsWith("/cashier")) {
        if (!token || token.role !== "CASHIER") {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = "/login";
            return NextResponse.redirect(redirectUrl);
        }
    }

    // Jika semua lolos, lanjutkan
    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/manager/:path*", "/cashier/:path*"],
};
