import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const userStatus = (req.auth?.user as any)?.status;
    const userRole = (req.auth?.user as any)?.role;

    const isPublicRoute = nextUrl.pathname === "/" || nextUrl.pathname === "/login" || nextUrl.pathname === "/register";
    const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");

    if (isDashboardRoute) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/login", nextUrl));
        }

        if (userStatus === "PENDING" && nextUrl.pathname !== "/waitlist") {
            return NextResponse.redirect(new URL("/waitlist", nextUrl));
        }

        if (nextUrl.pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
            return NextResponse.redirect(new URL("/dashboard/user", nextUrl));
        }
    }

    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const cspHeader = `
        default-src 'self';
        script-src 'self' 'unsafe-eval' 'unsafe-inline';
        style-src 'self' 'unsafe-inline';
        img-src 'self' blob: data:;
        font-src 'self';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        block-all-mixed-content;
        upgrade-insecure-requests;
    `;

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set('Content-Security-Policy', cspHeader.replace(/\s{2,}/g, ' ').trim());

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    response.headers.set('Content-Security-Policy', cspHeader.replace(/\s{2,}/g, ' ').trim());

    return response;
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
