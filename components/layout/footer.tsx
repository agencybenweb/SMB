import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="relative bg-obsidian-950 text-neutral-300 border-t border-white/5 overflow-hidden">

      {/* Glow Effect Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent blur-sm" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg shadow-gold-500/20">
                M
              </div>
              <span className="text-2xl font-serif text-white tracking-wide">My Sculpt</span>
            </div>
            <p className="text-sm leading-relaxed text-neutral-400 max-w-xs">
              L'excellence technologique au service des professionnels de l'esthétique. Innovation, performance et rentabilité.
            </p>
            <div className="flex gap-4 pt-2">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold-500 hover:text-white transition-all duration-300 group border border-white/5 hover:border-gold-400">
                  <Icon className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-serif text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-gold-500"></span> Navigation
            </h3>
            <ul className="space-y-4 text-sm">
              {[
                { l: "Accueil", h: "/" },
                { l: "Nos Appareils", h: "/appareils" },
                { l: "Technologies", h: "/technologies" },
                { l: "Formation", h: "/formation" },
                { l: "Contact", h: "/contact" },
              ].map((item, i) => (
                <li key={i}>
                  <Link href={item.h} className="flex items-center gap-2 hover:text-gold-400 transition-colors group">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-gold-500" />
                    {item.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-serif text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-gold-500"></span> Informations
            </h3>
            <ul className="space-y-4 text-sm">
              {[
                { l: "Mentions Légales", h: "/mentions-legales" },
                { l: "CGV", h: "/cgv" },
                { l: "Politique de Confidentialité", h: "/politique-confidentialite" },
                { l: "FAQ", h: "/faq" },
                { l: "SAV & Support", h: "/sav" },
              ].map((item, i) => (
                <li key={i}>
                  <Link href={item.h} className="hover:text-gold-400 transition-colors">
                    {item.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-serif text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-gold-500"></span> Contact
            </h3>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                <span>123 Avenue des Champs-Élysées,<br />75008 Paris, France</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold-500 shrink-0" />
                <span className="font-medium text-white">+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold-500 shrink-0" />
                <span className="text-gold-400">contact@mysculpt.fr</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter / Bottom */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} My Sculpt Technology. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-neutral-500 uppercase tracking-widest hidden md:block">Made with Excellence</span>
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-900/5 rounded-full blur-[80px] pointer-events-none" />
    </footer>
  );
}