'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#062A2F] via-[#071B1E] to-[#0a3b42] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <img 
                src="/SVG/Asset 1.svg" 
                alt="Formalitys" 
                className="h-13 w-auto mb-4 filter brightness-0 invert"
              />
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-[#F66B4C] rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <span 
                  className="text-white/80"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  info@formalitys.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-[#F66B4C] rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <span 
                  className="text-white/80"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  +212 6 20 26 9000
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 
                className="text-lg font-semibold mb-4"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Suivez-nous
              </h4>
              <div className="flex space-x-4">
                <a
                  href="https://wa.me/212620269000?text=Bonjour!%20Je%20souhaite%20obtenir%20des%20informations%20sur%20vos%20services%20Formalitys."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center hover:bg-[#20BA5A] hover:scale-110 transition-all duration-300"
                  title="Contactez-nous sur WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#F66B4C] hover:scale-110 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com/formalitys.maroc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#F66B4C] hover:scale-110 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 
              className="text-lg font-semibold mb-6"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/dossiers/company"
                  className="text-white/80 hover:text-[#F66B4C] transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Création de société
                </Link>
              </li>
              <li>
                <Link
                  href="/dossiers/tourism"
                  className="text-white/80 hover:text-[#F66B4C] transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Formalités pour hébergements touristiques
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-white/80 hover:text-[#F66B4C] transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Mon espace client
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Legal */}
          <div>
            <h4 
              className="text-lg font-semibold mb-6"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Ressources
            </h4>
            <ul className="space-y-3 mb-8">
              <li>
                <Link
                  href="/blog"
                  className="text-white/80 hover:text-[#F66B4C] transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Blog & Actualités
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-white/80 hover:text-[#F66B4C] transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Guide juridique
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-white/80 hover:text-[#F66B4C] transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  FAQ
                </Link>
              </li>
            </ul>

            <h4 
              className="text-lg font-semibold mb-6"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Légal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/legal"
                  className="text-white/80 hover:text-[#F66B4C] transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-white/80 hover:text-[#F66B4C] transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-white/80 hover:text-[#F66B4C] transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  CGV
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="bg-white/5 rounded-3xl p-8 backdrop-blur-sm">
            <div className="text-center max-w-2xl mx-auto">
              <h3 
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: '"Gascogne Serial", serif' }}
              >
                Restez informé
              </h3>
              <p 
                className="text-white/80 mb-8"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Recevez nos dernières actualités et conseils juridiques directement dans votre boîte mail.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-6 py-4 rounded-2xl border-0 bg-white/10 text-white placeholder-white/60 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#F66B4C] transition-all duration-300"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
                <button
                  className="bg-[#F66B4C] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#e55a43] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  S&apos;abonner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p 
                className="text-white/60"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                © {currentYear} Formalitys. Tous droits réservés.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span 
                  className="text-white/60 text-sm"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Service disponible 24/7
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-[#F66B4C]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span 
                  className="text-white/60 text-sm"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Paiement sécurisé
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}