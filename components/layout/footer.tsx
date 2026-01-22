import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="relative bg-slate-900 text-slate-300 overflow-hidden font-sans">

      {/* Decorative Gradient Blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                M
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">My Sculpt</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              La plateforme technologique de référence pour les professionnels de l'esthétique. Innovation et Rentabilité.
            </p>
            <div className="flex gap-4 pt-2">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300 group border border-slate-700 hover:border-indigo-500 hover:-translate-y-1">
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Navigation</h3>
            <ul className="space-y-3 text-sm">
              {[
                { l: "Accueil", h: "/" },
                { l: "Appareils", h: "/appareils" },
                { l: "Technologies", h: "/technologies" },
                { l: "Formation", h: "/formation" },
                { l: "Contact", h: "/contact" },
              ].map((item, i) => (
                <li key={i}>
                  <Link href={item.h} className="flex items-center gap-2 hover:text-indigo-400 transition-colors group w-fit">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-indigo-500" />
                    {item.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-3 text-sm">
              {[
                { l: "Mentions Légales", h: "/mentions-legales" },
                { l: "CGV", h: "/cgv" },
                { l: "Politique de Confidentialité", h: "/politique-confidentialite" },
                { l: "FAQ", h: "/faq" },
                { l: "Espace Client", h: "/dashboard" },
              ].map((item, i) => (
                <li key={i}>
                  <Link href={item.h} className="hover:text-indigo-400 transition-colors block w-fit">
                    {item.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-4 p-3 rounded-xl bg-slate-800/50 border border-slate-800 hover:border-indigo-500/30 transition-colors">
                <MapPin className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" />
                <span>123 Avenue des Champs-Élysées,<br />75008 Paris, France</span>
              </li>
              <li className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/50 border border-slate-800 hover:border-indigo-500/30 transition-colors">
                <Phone className="w-5 h-5 text-indigo-500 shrink-0" />
                <span className="font-semibold text-white">+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/50 border border-slate-800 hover:border-indigo-500/30 transition-colors">
                <Mail className="w-5 h-5 text-indigo-500 shrink-0" />
                <span className="text-indigo-300">contact@mysculpt.fr</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} My Sculpt Technology. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-3 h-3" />
              <span>Secure SSL Encryption</span>
            </div>
            <span className="text-xs text-slate-600 hidden md:block">|</span>
            <span className="text-xs text-slate-500">Made for Excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
}