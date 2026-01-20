import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Sculpt Technology - Appareils Esthétiques Professionnels B2B",
  description: "Plateforme B2B premium pour professionnels de l'esthétique. Appareils esthétiques haut de gamme, formation et SAV dédiés.",
  keywords: ["appareils esthétiques", "B2B", "esthétique professionnelle", "technologie esthétique"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}