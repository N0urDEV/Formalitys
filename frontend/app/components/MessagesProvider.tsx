'use client';

import { useEffect, useMemo, useState } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import en from '@/messages/en.json';
import fr from '@/messages/fr.json';

type Locale = 'en' | 'fr';

export default function MessagesProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = (typeof window !== 'undefined' && localStorage.getItem('locale')) as Locale | null;
      if (stored === 'en' || stored === 'fr') {
        setLocale(stored);
      } else {
        const nav = typeof navigator !== 'undefined' ? navigator.language : 'en';
        setLocale(nav.toLowerCase().startsWith('fr') ? 'fr' as Locale : 'en');
      }
    } catch {
      setLocale('en');
    } finally {
      setReady(true);
    }
  }, []);

  const messages = useMemo(() => (locale === 'fr' ? fr : en), [locale]);

  if (!ready) return null;

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}


