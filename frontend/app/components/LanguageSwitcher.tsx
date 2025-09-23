'use client';

import { useEffect, useState } from 'react';

type Locale = 'en' | 'fr';

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const stored = (typeof window !== 'undefined' && localStorage.getItem('locale')) as Locale | null;
    if (stored === 'en' || stored === 'fr') setLocale(stored);
  }, []);

  const toggle = () => {
    const nextLocale: Locale = locale === 'en' ? 'fr' : 'en';
    localStorage.setItem('locale', nextLocale);
    // Hard reload to reinitialize messages (simple approach without route locales)
    window.location.reload();
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="ml-2 px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50"
      style={{ fontFamily: 'Satoshi, sans-serif' }}
    >
      {locale === 'en' ? 'FR' : 'EN'}
    </button>
  );
}


