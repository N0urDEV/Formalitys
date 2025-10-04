'use client';

import { useTranslations } from 'next-intl';

export default function BenefitsSection() {
  const t = useTranslations('Home');

  return (
    <section className="why-choose-us-section py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 
            className="section-title text-4xl lg:text-5xl font-bold text-[#00171f] mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            {t('benefits.title')}
          </h2>
          <p 
            className="section-subtitle text-xl text-gray-600 max-w-3xl mx-auto"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            {t('benefits.subtitle')}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Large Feature Card - Rapidité & simplicité */}
          <div className="feature-card group relative lg:col-span-2 lg:row-span-1">
            <div className="bg-gradient-to-br from-[#007ea7] to-[#00a8e8] rounded-3xl p-8 h-full shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  
                  <h3 
                    className="text-3xl font-bold text-white mb-4 group-hover:text-white/90 transition-colors"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('benefits.rapid.title')}
                  </h3>
                  <p 
                    className="text-white/90 text-lg leading-relaxed"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('benefits.rapid.desc')}
                  </p>
                </div>
                
                <div className="mt-8">
                  <div className="inline-flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('benefits.rapid.badge')}</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Medium Card - Transparence des coûts */}
          <div className="feature-card group relative">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 h-full shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-[#007ea7]/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#007ea7]/0 to-[#007ea7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-br from-[#007ea7] to-[#00a8e8] rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                
                <h3 
                  className="text-xl font-bold text-[#00171f] mb-3 group-hover:text-[#007ea7] transition-colors"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {t('benefits.costs.title')}
                </h3>
                <p 
                  className="text-gray-600 text-sm leading-relaxed flex-grow"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {t('benefits.costs.desc')}
                </p>
                
                <div className="mt-4">
                  <div className="inline-flex items-center text-[#007ea7] font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                    <span style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('benefits.costs.badge')}</span>
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Medium Card - Sécurité des paiements */}
          <div className="feature-card group relative">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 h-full shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-[#007ea7]/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#007ea7]/0 to-[#007ea7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-br from-[#007ea7] to-[#00a8e8] rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                
                <h3 
                  className="text-xl font-bold text-[#00171f] mb-3 group-hover:text-[#007ea7] transition-colors"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {t('benefits.security.title')}
                </h3>
                <p 
                  className="text-gray-600 text-sm leading-relaxed flex-grow"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {t('benefits.security.desc')}
                </p>
                
                <div className="mt-4">
                  <div className="inline-flex items-center text-[#007ea7] font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                    <span style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('benefits.security.badge')}</span>
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wide Card - Accompagnement expert */}
          <div className="feature-card group relative lg:col-span-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 h-full shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-[#007ea7]/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#007ea7]/0 to-[#007ea7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              <div className="relative z-10 h-full flex md:flex-row flex-col md:items-center items-start ">
                <div className="w-16 h-16 bg-gradient-to-br from-[#007ea7] to-[#00a8e8] rounded-2xl flex items-center justify-center mr-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                
                <div className="flex-grow">
                  <h3 
                    className="text-2xl font-bold text-[#00171f] mb-2 group-hover:text-[#007ea7] transition-colors"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                  {t('benefits.expert.title')}
                  </h3>
                  <p 
                    className="text-gray-600 leading-relaxed"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('benefits.expert.desc')}
                  </p>
                </div>
                
                <div>
                  <div className="inline-flex items-center text-[#007ea7] font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('benefits.expert.badge')}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Small Card - Expérience reconnue */}
          <div className="feature-card group relative">
            <div className="bg-gradient-to-br from-[#00171f] to-[#003459] rounded-3xl p-6 h-full shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-center text-left">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                
                <h3 
                  className="text-xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {t('benefits.experience.title')}
                </h3>
                <p 
                  className="text-white/80 text-sm leading-relaxed mb-4"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {t('benefits.experience.desc')}
                </p>
                
                <div className="inline-flex items-center text-white font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                  <span style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('benefits.experience.badge')}</span>
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#007ea7] to-[#00a8e8] text-white px-8 py-3 rounded-full font-semibold shadow-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('benefits.bottomCtaBadge')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
