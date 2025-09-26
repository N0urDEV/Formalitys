'use client';

import Navigation from '../components/Navigation';
import Footer from '../components/sections/Footer';
import { useTranslations } from 'next-intl';

export default function PrivacyPage() {
  const t = useTranslations('Privacy');
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] via-white to-[#E8F4F8]">
      <Navigation />

      <section className="bg-gradient-to-r from-[#00171f] to-[#00171f] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1
            className="text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            {t('title')}
          </h1>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-[#007ea7]/10 to-[#00a8e8]/10 border-l-4 border-[#007ea7]">
              <p className="text-[#00171f]" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('notice')}</p>
            </div>

            <div className="prose max-w-none text-gray-700" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              <h2 className="text-xl font-bold text-[#00171f]">{t('sections.useTitle')}</h2>
              <p>{t('sections.useBody')}</p>

              <h2 className="text-xl font-bold text-[#00171f] mt-8">{t('sections.shareTitle')}</h2>
              <p>{t('sections.shareBody')}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


