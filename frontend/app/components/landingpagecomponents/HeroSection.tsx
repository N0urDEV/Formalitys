'use client';

import Link from 'next/link';
import Image from 'next/image';
import PartnersCarousel from '../PartnersCarousel';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('Home');

  return (
    <section className="hero-section relative overflow-hidden pointer-events-auto min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/herobg2.jpg"
          alt="Hero background"
          fill
          priority
          className="object-cover"
          style={{ transform: 'scaleX(-1)' }}
          sizes="100vw"
          quality={90}
        />
      </div>
      
      {/* Dark Gradient Overlay from Left */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00171f]/90 via-[#00171f]/70 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-22 z-10">
        <div className="text-center lg:text-left max-w-4xl relative z-20">
          {/* Main Headline - CRO Optimized */}
          <h1 
            className="hero-title text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Créez votre société au Maroc <span className="text-[#00a8e8]">en 5 jours</span>
            <span className="block text-white/80 text-2xl lg:text-3xl font-light mt-2">– sans paperasse</span>
          </h1>
          
          {/* Benefit-driven Subheadline */}
          <p className="hero-subtitle text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl font-light" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            Création SARL 100% en ligne • Accompagnement expert inclus • Documents officiels livrés rapidement
          </p>

          {/* Key Benefits - Simplified */}
          <div className="hero-chips flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-6 mb-10">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <svg className="w-5 h-5 text-[#007ea7]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-semibold text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                100% en ligne
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <svg className="w-5 h-5 text-[#007ea7]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-semibold text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                5 jours max
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <svg className="w-5 h-5 text-[#007ea7]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-semibold text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                Sécurisé & Garanti
              </span>
            </div>
          </div>

          {/* CTA Buttons - Benefit-driven */}
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start relative z-10 mb-8">
            <Link 
              href="/register" 
              className="bg-[#007ea7] text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-[#00a8e8] transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 relative z-20 cursor-pointer pointer-events-auto"
              style={{ fontFamily: 'Satoshi, sans-serif', pointerEvents: 'auto' }}
            >
              Commencer mon projet →
            </Link>
            <Link 
              href="#services" 
              className="border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-semibold text-xl hover:bg-white/10 transition-all duration-300 relative z-20 cursor-pointer"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Parler à un expert
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="trust-badges flex flex-wrap items-center justify-center lg:justify-start gap-6 text-white/80">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-[#007ea7]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                +210 sociétés créées
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-[#007ea7]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                Accompagnement inclus
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-[#007ea7]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                Garantie satisfaction
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Partners Carousel - Full Width */}
      <div className="relative z-10">
        <PartnersCarousel />
      </div>
      
      {/* Subtle Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-[#007ea7]/5 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/3 rounded-full blur-3xl z-0"></div>
    </section>
  );
}
