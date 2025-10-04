'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function HowItWorksSection() {
  const t = useTranslations('Home');

  return (
    <section className="how-it-works-section py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#007ea7]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00171f]/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00171f]/3 rounded-full blur-2xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 
            className="section-title text-4xl lg:text-5xl font-bold text-[#00171f] mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            {t('how.title')}
          </h2>
          <p 
            className="section-subtitle text-xl text-gray-600 max-w-3xl mx-auto"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            {t('how.subtitleLine1')}<br />
            {t('how.subtitleLine2')}
          </p>
        </div>

        {/* Steps Grid - Simplified to 3 steps */}
        <div className="steps-grid grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              step: "01",
              title: "Remplissez le formulaire",
              description: "Complétez vos informations en 5 minutes depuis votre ordinateur ou mobile.",
              icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              ),
              gradient: "from-[#007ea7] to-[#00a8e8]",
              bgGradient: "from-white to-gray-50"
            },
            {
              step: "02", 
              title: "Nous gérons tout",
              description: "Nos experts s'occupent de toutes les démarches administratives et juridiques.",
              icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              gradient: "from-[#00171f] to-[#003459]",
              bgGradient: "from-[#00171f] to-[#003459]"
            },
            {
              step: "03",
              title: "Recevez vos documents",
              description: "Téléchargez vos documents officiels dans votre espace client en 5 jours maximum.",
              icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ),
              gradient: "from-[#007ea7] to-[#00a8e8]",
              bgGradient: "from-white to-gray-50"
            }
          ].map((step, index) => (
            <div key={index} className="step-card group relative">
              <div className={`bg-gradient-to-br ${step.bgGradient} backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-[#007ea7]/20 relative overflow-hidden h-full`}>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#007ea7]/10 rounded-full blur-lg"></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  {/* Step Number */}
                  <div className="relative">
                    <div className={`w-12 h-12  text-[#007ea7] rounded-2xl flex items-center justify-center font-bold text-lg  group-hover:scale-110 transition-transform duration-300`}>
                      {step.step}
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mb-6 mt-3 shadow-lg group-hover:scale-110 transition-all duration-300`}>
                    <div className="text-white">
                      {step.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 
                    className={`text-xl font-bold mb-4 group-hover:text-[#007ea7] transition-colors ${
                      step.bgGradient.includes('[#00171f]') ? 'text-white' : 'text-[#00171f]'
                    }`}
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className={`leading-relaxed flex-grow ${
                      step.bgGradient.includes('[#00171f]') ? 'text-white/90' : 'text-gray-600'
                    }`}
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {step.description}
                  </p>
                  
                  {/* Progress Indicator */}
                  <div className="mt-6 flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            i <= index ? `bg-[#007ea7] ${step.gradient}` : 'bg-gray-300'
                          }`}
                        ></div>
                      ))}
                    </div>
                    <span className={`text-sm font-medium ${
                      step.bgGradient.includes('[#00171f]') ? 'text-white/80' : 'text-gray-500'
                    }`} style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      Étape {index + 1}/3
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="cta-section text-center mt-16">
          <p 
            className="text-xl text-gray-600 mb-8"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Prêt à créer votre société en 5 jours ?
          </p>
        <Link 
          href="/register"
          className="cta-button inline-block bg-gradient-to-r from-[#007ea7] to-[#00a8e8] text-white px-12 py-5 rounded-2xl font-bold text-xl hover:from-[#00a8e8] hover:to-[#007ea7] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          Créer ma SARL maintenant →
        </Link>
        </div>
      </div>
    </section>
  );
}
