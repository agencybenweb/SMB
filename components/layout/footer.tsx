import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, ArrowRight, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-transparent pt-0 pb-6 px-4 font-sans">

      {/* Footer Bubble Container - Compact Version */}
      <div className="container mx-auto max-w-6xl bg-slate-900 text-slate-300 rounded-[2.5rem] overflow-hidden relative shadow-2xl shadow-slate-200/50">

        {/* Decorative Gradient Blob Inside Bubble */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none opacity-40" />

        <div className="px-8 py-10 md:p-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Brand Column */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                  M
                </div>
                <span className="text-xl font-bold text-white tracking-tight">My Sculpt</span>
              </Link>
              <p className="text-xs leading-relaxed text-slate-400 max-w-xs">
                La plateforme technologique de référence pour l'esthétique.
              </p>
              <div className="flex gap-3 pt-1">
                {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300 group border border-slate-700 hover:border-indigo-500 hover:-translate-y-1">
                    <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-sm mb-4">Navigation</h3>
              <ul className="space-y-2 text-xs">
                {[
                  { l: "Accueil", h: "/" },
                  { l: "Appareils", h: "/appareils" },
                  { l: "Technologies", h: "/technologies" },
                  { l: "Formation", h: "/formation" },
                  { l: "Contact", h: "/contact" },
                ].map((item, i) => (
                  <li key={i}>
                    <Link href={item.h} className="flex items-center gap-2 hover:text-indigo-400 transition-colors group w-fit">
                      {item.l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-white font-bold text-sm mb-4">Support</h3>
              <ul className="space-y-2 text-xs">
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
              <h3 className="text-white font-bold text-sm mb-4">Contact</h3>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-3 p-2 rounded-xl bg-slate-800/40 border border-slate-800">
                  <MapPin className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                  <span>123 Avenue des Champs-Élysées,<br />75008 Paris, France</span>
                </li>
                <li className="flex items-center gap-3 p-2 rounded-xl bg-slate-800/40 border border-slate-800">
                  <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span className="font-semibold text-white">+33 1 23 45 67 89</span>
                </li>
                <li className="flex items-center gap-3 p-2 rounded-xl bg-slate-800/40 border border-slate-800">
                  <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span className="text-indigo-300">contact@mysculpt.fr</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
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
      </div>
    </footer>
  );
}