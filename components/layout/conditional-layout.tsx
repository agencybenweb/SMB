"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Routes qui n'ont PAS besoin du header/footer public (dashboard, admin, auth)
    const noLayoutRoutes = ["/dashboard", "/admin", "/auth"];
    const needsPublicLayout = !noLayoutRoutes.some(route => pathname?.startsWith(route));

    if (!needsPublicLayout) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
        </>
    );
}
