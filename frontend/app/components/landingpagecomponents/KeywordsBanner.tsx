'use client';

import { useTranslations } from 'next-intl';

export default function KeywordsBanner() {
  const t = useTranslations('Home');

  return (
    <section className="keywords-banner py-8 bg-gradient-to-r from-[#007ea7] via-[#00a8e8] to-[#007ea7] relative overflow-hidden">
      {/* Bright Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '80px 80px'
        }}></div>
      </div>
      
      {/* Bright Floating Elements */}
      <div className="absolute top-0 left-1/4 w-40 h-40 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-white/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-6">
          {[
            t('keywords.k1'),
            t('keywords.k2'),
            t('keywords.k3'),
            t('keywords.k4'),
            t('keywords.k5')
          ].map((keyword, index) => (
            <div key={index} className="group">
              <div className="bg-white/25 backdrop-blur-sm rounded-full px-6 py-3 border border-white/40 hover:bg-white/35 hover:border-white/60 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl">
                <span 
                  className="text-white font-bold text-lg tracking-wide drop-shadow-lg"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {keyword}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
