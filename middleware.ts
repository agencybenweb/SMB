import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin");
    const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");

    // Redirection si accès admin sans rôle admin
    if (isAdminPage && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Redirection si accès dashboard sans authentification
    if (isDashboardPage && !isAuth) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAdminPage = req.nextUrl.pathname.startsWith("/admin");
        const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");

        // Pages publiques autorisées
        if (!isAdminPage && !isDashboardPage) {
          return true;
        }

        // Pages admin nécessitent authentification
        if (isAdminPage) {
          return token?.role === "ADMIN";
        }

        // Pages dashboard nécessitent authentification
        if (isDashboardPage) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};