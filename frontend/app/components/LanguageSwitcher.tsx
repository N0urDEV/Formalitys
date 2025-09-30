'use client';

import { useEffect, useState } from 'react';

type Locale = 'en' | 'fr' | 'ar';

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const stored = (typeof window !== 'undefined' && localStorage.getItem('locale')) as Locale | null;
    if (stored === 'en' || stored === 'fr' || stored === 'ar') setLocale(stored);
  }, []);

  const cycle = () => {
    const order: Locale[] = ['en', 'fr', 'ar'];
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
      {locale === 'en' ? 'FR' : locale === 'fr' ? 'AR' : 'EN'}
    </button>
  );
}


