"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
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
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if scrolled significantly
      setScrolled(currentScrollY > 20);

      // Determine visibility based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & passed threshold -> Hide
        setVisible(false);
      } else {
        // Scrolling up -> Show
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Définition du style flottant "Bulle" avec contraste renforcé (Dark Luxury Mode)
  // Ajout de la logique de masquage au scroll (translate-y)
  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-transform duration-300 px-4 ${visible ? "translate-y-0" : "-translate-y-full"
    } ${scrolled ? "pt-4" : "pt-6"}`;

  const navContainerClasses = "bg-slate-950/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 rounded-full py-2 px-6 max-w-7xl mx-auto flex items-center justify-between transition-all duration-300 relative z-50 ring-1 ring-white/5";

  return (
    <header className={headerClasses}>
      <div className={navContainerClasses}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-md shadow-gold-500/20 group-hover:scale-105 transition-transform border border-gold-500/20">
            <Image
              src="/logo.png"
              alt="My Sculpt Logo"
              fill
              className="object-cover"
            />
          </div>
        </Link>

        {/* Desktop Nav - Centered Pills */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/5 shadow-inner mx-4">
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
              className="px-5 py-2 rounded-full text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-gold-400 hover:shadow-sm transition-all duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions - Right */}
        <div className="flex items-center gap-2">

          {/* Cart */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="rounded-full text-slate-300 hover:bg-slate-800 hover:text-gold-400 relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-gold-500 text-slate-950 border-2 border-slate-900 font-bold">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Auth Buttons */}
          {status === "loading" ? (
            <div className="w-24 h-9 bg-slate-800 animate-pulse rounded-full" />
          ) : session ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="rounded-full gap-2 font-medium text-slate-300 hover:bg-slate-800 hover:text-gold-400">
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden xl:inline">Pro Dashboard</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => signOut({ callbackUrl: '/' })}
                className="rounded-full text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                title="Déconnexion"
              >
                <LogOut className="w-4 h-4" />
              </Button>
              {session.user?.role === "ADMIN" && (
                <Link href="/admin">
                  <Button size="icon" variant="ghost" className="rounded-full text-gold-500 hover:bg-slate-800">
                    <Shield className="w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <Link href="/auth/login" className="hidden md:block">
              <Button className="rounded-full bg-gold-400 text-slate-950 hover:bg-gold-300 transition-colors font-bold px-6 shadow-lg shadow-gold-900/20">
                Espace Pro
              </Button>
            </Link>
          )}

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-slate-300 hover:bg-slate-800 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Floating Card */}
      {mobileMenuOpen && (
        <div className="absolute top-24 left-4 right-4 bg-slate-900/95 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl border border-white/10 animate-in slide-in-from-top-4 z-40 flex flex-col gap-6">
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
                className="text-lg font-bold text-slate-200 py-3 px-4 hover:bg-slate-800 hover:text-gold-400 rounded-2xl transition-colors flex justify-between items-center group"
              >
                {label}
                <span className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-gold-400 transition-colors"></span>
              </Link>
            ))}
          </nav>

          <div className="h-px bg-slate-800" />

          {!session ? (
            <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 py-6 text-lg font-bold shadow-xl shadow-gold-900/20">
                Connexion Espace Pro
              </Button>
            </Link>
          ) : (
            <div className="flex flex-col gap-3">
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full rounded-xl bg-slate-800 text-white hover:bg-slate-700 py-6 border border-white/10">
                  Mon Tableau de Bord
                </Button>
              </Link>
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut({ callbackUrl: '/' });
                }}
                className="w-full rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 py-6 border border-red-500/20 font-bold"
              >
                Déconnexion
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}