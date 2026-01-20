import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="font-bold text-2xl leading-none">MY SCULPT</span>
              <span className="text-xs tracking-[0.3em] text-primary uppercase mt-1">Technology</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Le partenaire de référence pour les professionnels de l'esthétique.
              Technologies de pointe, formation expert et SAV réactif.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-primary">Navigation</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link href="/appareils" className="hover:text-white transition-colors">Nos Appareils</Link></li>
              <li><Link href="/technologies" className="hover:text-white transition-colors">Technologies</Link></li>
              <li><Link href="/formation" className="hover:text-white transition-colors">Formation & Académie</Link></li>
              <li><Link href="/sav" className="hover:text-white transition-colors">Support & SAV</Link></li>
              <li><Link href="/a-propos" className="hover:text-white transition-colors">À propos de nous</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-primary">Informations</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions Légales</Link></li>
              <li><Link href="/cgv" className="hover:text-white transition-colors">CGV</Link></li>
              <li><Link href="/politique-confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link></li>
              <li><Link href="/financement" className="hover:text-white transition-colors">Solutions de financement</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-primary">Contactez-nous</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>123 Avenue de l'Esthétique<br />69000 Lyon, France</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+33 4 78 00 00 00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:contact@mysculpt.tech" className="hover:text-white transition-colors">contact@mysculpt.tech</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} My Sculpt Technology. Tous droits réservés.</p>
          <p>Conçu pour l'excellence esthétique.</p>
        </div>
      </div>
    </footer>
  );
}