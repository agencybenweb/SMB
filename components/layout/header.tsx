"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useCart } from "@/context/cart-context";
import { Menu, X, User, LogOut, LayoutDashboard, Shield, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Pages where valid transparent header (Hero section exists)
  // Logic: Only top level pages have the dark hero section. Subpages (like product details) are usually light.
  const darkHeroRoutes = ["/", "/appareils", "/technologies", "/formation", "/sav", "/contact"];
  // We use strict inclusion, but we can handle valid query params or trailing slashes potentially (Next.js pathname usually clean)
  const isDarkHeroPage = pathname ? darkHeroRoutes.includes(pathname) : false;

  // If we are NOT on a dark hero page (e.g. Dashboard, Admin, Product Detail), we force the "scrolled" look (dark text)
  // or simply ensuring text is visible on white background.
  const isLightPage = !isDarkHeroPage;

  // Effective state to decide colors: Scrolled OR Light Page
  const forceDarkText = scrolled || isLightPage;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isLightPage ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className={`w-10 h-10 ${forceDarkText ? 'bg-primary/10 border-primary/20' : 'bg-white/10 border-white/20'} rounded-full flex items-center justify-center border group-hover:border-primary/50 transition-colors`}>
              <span className={`text-xl font-bold ${forceDarkText ? 'text-primary' : 'text-white'}`}>M</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-lg leading-none tracking-tight ${forceDarkText ? 'text-foreground' : 'text-white'}`}>MY SCULPT</span>
              <span className={`text-[10px] tracking-[0.2em] uppercase ${forceDarkText ? 'text-muted-foreground' : 'text-slate-300'}`}>Technology</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              ['Appareils', '/appareils'],
              ['Technologies', '/technologies'],
              ['Formation', '/formation'],
              ['SAV', '/sav'],
              ['Contact', '/contact']
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors relative group ${forceDarkText ? 'text-muted-foreground hover:text-primary' : 'text-slate-300 hover:text-white'
                  }`}
              >
                {label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full opacity-0 group-hover:opacity-100 ${forceDarkText ? 'bg-primary' : 'bg-white'}`} />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">

            {/* Cart Button */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className={`relative ${!forceDarkText && 'text-white hover:text-white hover:bg-white/10'}`}>
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-[10px] bg-primary text-white border-white dark:border-slate-900">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {status === "loading" ? (
              <div className="w-24 h-9 bg-muted animate-pulse rounded-md" />
            ) : session ? (
              <div className="flex items-center gap-2">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className={`gap-2 ${!forceDarkText && 'text-white hover:text-white hover:bg-white/10'}`}>
                    <LayoutDashboard className="w-4 h-4" />
                    <span className="hidden lg:inline">Espace Pro</span>
                  </Button>
                </Link>
                {session.user?.role === "ADMIN" && (
                  <Link href="/admin">
                    <Button variant="ghost" size="sm" className="text-amber-600 gap-2">
                      <Shield className="w-4 h-4" />
                      <span className="hidden lg:inline">Admin</span>
                    </Button>
                  </Link>
                )}
                <Link href="/auth/signout">
                  <Button variant="outline" size="sm" className={`gap-2 ${!forceDarkText && 'bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white'}`}>
                    <LogOut className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm" className={!forceDarkText ? "text-white hover:text-white hover:bg-white/10" : ""}>Connexion</Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                    Espace Pro
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden p-2 ${forceDarkText ? 'text-foreground' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-2">
            {[
              ['Appareils', '/appareils'],
              ['Technologies', '/technologies'],
              ['Formation', '/formation'],
              ['SAV', '/sav'],
              ['Contact', '/contact']
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium py-2 px-4 hover:bg-muted rounded-md transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="h-px bg-border my-2" />
          <div className="flex flex-col gap-2">
            {!session ? (
              <>
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Connexion</Button>
                </Link>
                <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Créer un compte pro</Button>
                </Link>
              </>
            ) : (
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Accéder à mon espace</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}