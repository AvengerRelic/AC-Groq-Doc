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

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
