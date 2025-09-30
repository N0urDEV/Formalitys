'use client';

import { useEffect, useMemo, useState } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import en from '@/messages/en.json';
import fr from '@/messages/fr.json';
import ar from '@/messages/ar.json';

type Locale = 'en' | 'fr' | 'ar';

export default function MessagesProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = (typeof window !== 'undefined' && localStorage.getItem('locale')) as Locale | null;
      if (stored === 'en' || stored === 'fr' || stored === 'ar') {
        setLocale(stored);
      } else {
        const nav = typeof navigator !== 'undefined' ? navigator.language : 'en';
        if (nav.toLowerCase().startsWith('fr')) setLocale('fr');
        else if (nav.toLowerCase().startsWith('ar')) setLocale('ar');
        else setLocale('en');
      }
    } catch {
      setLocale('en');
    } finally {
      setReady(true);
    }
  }, []);

  const deepMerge = (base: any, override: any): any => {
    if (typeof base !== 'object' || base === null) return override ?? base;
    const out: any = Array.isArray(base) ? [...base] : { ...base };
    for (const key of Object.keys(override || {})) {
      const b = (base as any)[key];
      const o = (override as any)[key];
      if (b && typeof b === 'object' && o && typeof o === 'object' && !Array.isArray(b) && !Array.isArray(o)) {
        out[key] = deepMerge(b, o);
      } else {
        out[key] = o;
      }
    }
    return out;
  };

  const messages = useMemo(() => {
    if (locale === 'fr') return deepMerge(en, fr);
    if (locale === 'ar') return deepMerge(en, ar);
    return en;
  }, [locale]);

  if (!ready) return null;

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}


