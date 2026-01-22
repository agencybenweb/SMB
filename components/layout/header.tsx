"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useCart } from "@/context/cart-context";
import { Menu, X, ShoppingCart, LayoutDashboard, Shield, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const { data: session, status } = useSession();
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Définition du style flottant "Bulle" avec contraste renforcé
  const headerClasses = scrolled
    ? "fixed top-4 left-0 right-0 z-50 transition-all duration-300 px-4"
    : "fixed top-6 left-0 right-0 z-50 transition-all duration-300 px-4";

  const navContainerClasses = "bg-white/80 backdrop-blur-2xl border border-indigo-100/80 shadow-2xl shadow-indigo-900/10 rounded-full py-3 px-6 max-w-7xl mx-auto flex items-center justify-between transition-all duration-300 relative z-50";

  return (
    <header className={headerClasses}>
      <div className={navContainerClasses}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform">
            M
          </div>
          <span className="font-bold text-lg text-slate-800 tracking-tight hidden sm:block group-hover:text-indigo-600 transition-colors">
            My Sculpt
          </span>
        </Link>

        {/* Desktop Nav - Centered Pills */}
        <nav className="hidden lg:flex items-center gap-1 bg-white p-1.5 rounded-full border border-indigo-50 shadow-inner mx-4">
          {[
            ['Appareils', '/appareils'],
            ['Technologies', '/technologies'],
            ['Formation', '/formation'],
            ['Experts', '/sav'],
            ['Contact', '/contact']
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="px-5 py-2 rounded-full text-sm font-semibold text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm transition-all duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions - Right */}
        <div className="flex items-center gap-2">

          {/* Cart */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-indigo-50 hover:text-indigo-600 relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-pink-500 text-white border-2 border-white">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Auth Buttons */}
          {status === "loading" ? (
            <div className="w-24 h-9 bg-slate-100 animate-pulse rounded-full" />
          ) : session ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="rounded-full gap-2 font-medium hover:bg-indigo-50 hover:text-indigo-600">
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden xl:inline">Pro Dashboard</span>
                </Button>
              </Link>
              {session.user?.role === "ADMIN" && (
                <Link href="/admin">
                  <Button size="icon" variant="ghost" className="rounded-full text-amber-600 hover:bg-amber-50">
                    <Shield className="w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <Link href="/auth/login" className="hidden md:block">
              <Button className="rounded-full bg-slate-900 text-white hover:bg-indigo-600 transition-colors font-medium px-6 shadow-lg shadow-indigo-500/20">
                Espace Pro
              </Button>
            </Link>
          )}

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Floating Card */}
      {mobileMenuOpen && (
        <div className="absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl border border-white/50 animate-in slide-in-from-top-4 z-40 flex flex-col gap-6">
          <nav className="flex flex-col gap-2">
            {[
              ['Catalogue Appareils', '/appareils'],
              ['Nos Technologies', '/technologies'],
              ['Formation & Academy', '/formation'],
              ['SAV & Support', '/sav'],
              ['Contact', '/contact']
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-bold text-slate-800 py-3 px-4 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-colors flex justify-between items-center group"
              >
                {label}
                <span className="w-2 h-2 rounded-full bg-indigo-200 group-hover:bg-indigo-600 transition-colors"></span>
              </Link>
            ))}
          </nav>

          <div className="h-px bg-slate-100" />

          {!session ? (
            <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg font-bold shadow-xl shadow-indigo-200">
                Connexion Espace Pro
              </Button>
            </Link>
          ) : (
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full rounded-xl bg-slate-900 text-white py-6">
                Mon Tableau de Bord
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}