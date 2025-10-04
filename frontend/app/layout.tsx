import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";
import WhatsAppWidget from "./components/WhatsAppWidget";
import { NextIntlClientProvider } from "next-intl";
import en from "../messages/en.json";
import ar from "../messages/ar.json";
import Script from "next/script";
import Analytics from "@/app/components/Analytics";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import MessagesProvider from "@/app/components/MessagesProvider";

export const metadata: Metadata = {
  title: "Formalitys - Création Société & Hébergement Touristique au Maroc | 100% En Ligne",
  description: "Créez votre SARL au Maroc | Formalités légales pour locations touristiques en ligne. Accompagnement expert.",
  keywords: "création société Maroc, SARL Maroc, hébergement touristique, Airbnb Maroc, formalités légales, OMPIC, registre commerce, locations touristiques, société au Maroc, démarches juridiques Maroc",
  openGraph: {
    title: "Formalitys - Legal Procedures in Morocco | 100% Online",
    description: "Simplify your legal procedures in Morocco. LLC formation and tourist accommodation compliance with our experts.",
    url: "https://formalitys.com",
    siteName: "Formalitys",
    images: [
      {
        url: "https://formalitys.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Formalitys - Démarches Juridiques au Maroc",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formalitys - Legal Procedures in Morocco",
    description: "Create your company or regularize your tourist accommodation online in Morocco.",
    images: ["https://formalitys.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://formalitys.com",
    languages: {
      'fr': 'https://formalitys.com/fr',
      'en': 'https://formalitys.com/en', 
      'ar': 'https://formalitys.com/ar',
    },
  },
  icons: {
    icon: [
      { url: "/SVG/Asset 2.svg", type: "image/svg+xml" },
      { url: "/SVG/Asset 2.svg", sizes: "32x32", type: "image/svg+xml" },
      { url: "/SVG/Asset 2.svg", sizes: "16x16", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/SVG/Asset 2.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
  other: {
    "google-site-verification": "wuDPl3uS3DYQCc_gsw4LbKxDYX1ieVmR2SUuX6m3bxc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = typeof window !== 'undefined' ? (localStorage.getItem('locale') || 'en') : 'en';
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  return (
    <html lang={locale === 'ar' ? 'ar' : locale === 'fr' ? 'fr' : 'en'} dir={dir}>
      <head>
        <link rel="stylesheet" href="/fonts/satoshi.css" />
        {/* Site icons */}
        <link rel="icon" type="image/svg+xml" href="/SVG/Asset 2.svg" />
        <link rel="apple-touch-icon" href="/SVG/Asset 2.svg" />
        <meta name="theme-color" content="#00171f" />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9KS5C9ZR0M"
          strategy="afterInteractive"
        />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
<Script id="gtag-init" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);} 
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
  `}
</Script>

      </head>
      <body className="font-sans antialiased" style={{ fontFamily: 'Satoshi, sans-serif' }}>
        <MessagesProvider>
          <div className="fixed top-4 right-4 z-50">
            <LanguageSwitcher />
          </div>
          <Analytics />
          {children}
          
          {/* WhatsApp Chat Widget */}
          <WhatsAppWidget 
            phoneNumber="+212620269000"
            position="bottom-right"
            hideOnPages={['/admin']}
          />
          
          
        </MessagesProvider>
      </body>
    </html>
  );
}
