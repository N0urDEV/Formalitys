'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function ServicesSection() {
  const t = useTranslations('Home');

  return (
    <section id="services" className="services-section py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            className="section-title text-4xl lg:text-5xl font-bold text-[#00171f] mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Nos Services
          </h2>
          <p 
            className="section-subtitle text-xl text-gray-600 max-w-3xl mx-auto"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Choisissez le service qui correspond à vos besoins. Prix transparents, délais garantis.
          </p>
        </div>
        
        <div className="services-grid grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          
          {/* Company Creation Service - Enhanced */}
          <div className="service-card group relative">
            {/* Most Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
              <div className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                Le plus populaire
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#007ea7] to-[#00a8e8] rounded-3xl p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden h-full">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
              
              <div className="relative z-10 h-full flex flex-col">
                {/* Header with Icon */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-white" style={{ fontFamily: 'Satoshi, sans-serif' }}>À partir de 3,300 DH</div>
                    <div className="text-sm text-white/80" style={{ fontFamily: 'Satoshi, sans-serif' }}>(314€) • Tout inclus</div>
                    <div className="text-xs text-white/70 mt-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>Délai : 5 jours max</div>
                  </div>
                </div>
                
                <h3 
                  className="text-3xl font-bold text-white mb-4"
                  style={{ fontFamily: '"Gascogne Serial", serif' }}
                >
                  Création SARL au Maroc
                </h3>
                <p 
                  className="text-white/90 text-lg mb-8 leading-relaxed flex-grow"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Créez votre société SARL en 5 jours maximum. Tous les documents officiels inclus : statuts, immatriculation, comptes bancaires, et accompagnement expert.
                </p>
                
                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {[
                    "Statuts personnalisés rédigés par nos experts",
                    "Immatriculation au registre du commerce",
                    "Certificat négatif OMPIC inclus",
                    "Introduction bancaire facilitée",
                    "Accompagnement juridique 30min inclus"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-white/90 text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Button */}
                <div className="mt-auto">
                  <Link 
                    href="/register"
                    className="inline-flex items-center justify-center w-full bg-white text-[#007ea7] px-6 py-4 rounded-2xl font-bold text-lg hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Créer ma SARL maintenant
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Tourism Regulation Service - Enhanced */}
          <div className="service-card group relative">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-[#007ea7]/20 relative overflow-hidden h-full">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#007ea7]/0 to-[#007ea7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              <div className="relative z-10 h-full flex flex-col">
                {/* Header with Icon */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#007ea7] to-[#00a8e8] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-[#007ea7]" style={{ fontFamily: 'Satoshi, sans-serif' }}>À partir de 1,600 DH</div>
                    <div className="text-sm text-[#007ea7]/80" style={{ fontFamily: 'Satoshi, sans-serif' }}>(152€) • Régularisation complète</div>
                    <div className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>Délai : 7 jours max</div>
                  </div>
                </div>
                
                <h3 
                  className="text-3xl font-bold text-[#00171f] mb-4 group-hover:text-[#007ea7] transition-colors"
                  style={{ fontFamily: '"Gascogne Serial", serif' }}
                >
                  Régularisation Airbnb/Riad
                </h3>
                <p 
                  className="text-gray-600 text-lg mb-8 leading-relaxed flex-grow"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Régularisez votre location touristique en toute légalité. Obtenez toutes les autorisations nécessaires pour louer votre riad ou maison d'hôtes sans risque.
                </p>
                
                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {[
                    "Autorisation d'exploitation touristique",
                    "Classement et homologation",
                    "Registre de police automatisé",
                    "Déclaration fiscale simplifiée",
                    "Gestion des taxes de séjour"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#007ea7] rounded-full"></div>
                      <span className="text-gray-700 text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Button */}
                <div className="mt-auto">
                  <Link 
                    href="/register"
                    className="inline-flex items-center justify-center w-full bg-[#007ea7] text-white px-6 py-4 rounded-2xl font-bold text-lg hover:bg-[#00a8e8] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Régulariser mes locations
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
