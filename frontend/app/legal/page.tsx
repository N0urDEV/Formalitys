'use client';

import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/sections/Footer';
import { useTranslations } from 'next-intl';

export default function LegalPage() {
  const t = useTranslations('Legal');
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
              <h2 className="text-xl font-bold text-[#00171f]">{t('sections.publisherTitle')}</h2>
              <p>{t('sections.publisherBody')}</p>

              <h2 className="text-xl font-bold text-[#00171f] mt-8">{t('sections.hostingTitle')}</h2>
              <p>{t('sections.hostingBody')}</p>

              <h2 className="text-xl font-bold text-[#00171f] mt-8">{t('sections.contactTitle')}</h2>
              <p>
                {t('sections.contactBody', { email: 'info@formalitys.com' })}
              </p>
            </div>

            <div className="mt-10">
              <Link href="/" className="inline-flex items-center text-[#007ea7] font-semibold hover:text-[#00a8e8]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('sections.backHome')}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


