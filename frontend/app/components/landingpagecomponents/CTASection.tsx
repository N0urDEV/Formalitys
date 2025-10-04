'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function CTASection() {
  const t = useTranslations('Home');

  return (
    <section className="cta-section py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#007ea7]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00171f]/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#007ea7]/3 rounded-full blur-2xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-4xl">
          {/* Gradient Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#007ea7] via-[#00a8e8] to-[#007ea7] p-[2px] rounded-4xl">
            <div className="w-full h-full bg-gradient-to-br from-[#00171f] via-[#003459] to-[#00171f] rounded-4xl"></div>
          </div>
          
          {/* Main Content */}
          <div className="relative px-6 lg:px-16 py-16 lg:py-20 text-center">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#007ea7]/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#007ea7]/5 to-transparent rounded-full blur-3xl"></div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
                <div className="w-2 h-2 bg-[#007ea7] rounded-full animate-pulse"></div>
                <span className="text-white/90 font-semibold" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  {t('ctaSection.badge')}
                </span>
              </div>
              
              <h2 
                className="section-title text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight"
                style={{ fontFamily: '"Gascogne Serial", serif' }}
              >
                {t('ctaSection.titleLine1')}
                <span className="block text-[#007ea7]">{t('ctaSection.titleLine2')}</span>
              </h2>
              
              <p 
                className="section-subtitle text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {t('ctaSection.subtitle')}
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <Link
                  href="/register"
                  className="group relative bg-gradient-to-r from-[#007ea7] to-[#00a8e8] text-white px-10 py-5 rounded-2xl font-bold text-xl hover:from-[#00a8e8] hover:to-[#007ea7] transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 overflow-hidden"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative flex items-center space-x-3">
                    <span>{t('ctaSection.join')}</span>
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                
                <Link
                  href="#services"
                  className="group flex items-center space-x-3 text-white/90 hover:text-white transition-colors duration-300"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  <span className="text-lg font-semibold">{t('ctaSection.discover')}</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="flex items-center justify-center space-x-3 text-white/80">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#007ea7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('ctaSection.t1Title')}</div>
                    <div className="text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('ctaSection.t1Sub')}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-3 text-white/80">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#007ea7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('ctaSection.t2Title')}</div>
                    <div className="text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('ctaSection.t2Sub')}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-3 text-white/80">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#007ea7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('ctaSection.t3Title')}</div>
                    <div className="text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('ctaSection.t3Sub')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
