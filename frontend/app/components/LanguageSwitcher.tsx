'use client';

import { useEffect, useState } from 'react';

type Locale = 'en' | 'fr' | 'ar';

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState<Locale>('fr');

  useEffect(() => {
    const stored = (typeof window !== 'undefined' && localStorage.getItem('locale')) as Locale | null;
    if (stored === 'en' || stored === 'fr' || stored === 'ar') {
      setLocale(stored);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'fr' || browserLang === 'ar') {
        setLocale(browserLang as Locale);
        localStorage.setItem('locale', browserLang);
      } else {
        // Default to French for Morocco
        setLocale('fr');
        localStorage.setItem('locale', 'fr');
      }
    }
  }, []);

  const cycle = () => {
    const order: Locale[] = ['fr', 'en', 'ar'];
    const idx = order.indexOf(locale);
    const nextLocale: Locale = order[(idx + 1) % order.length];
    localStorage.setItem('locale', nextLocale);
    window.location.reload();
  };

  return (
    <button
      onClick={cycle}
      aria-label="Change language"
      className="ml-2 px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50"
      style={{ fontFamily: 'Satoshi, sans-serif' }}
    >
      {locale === 'fr' ? 'EN' : locale === 'en' ? 'AR' : 'FR'}
    </button>
  );
}


