import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";
import WhatsAppWidget from "./components/WhatsAppWidget";
import { NextIntlClientProvider } from "next-intl";
import en from "../messages/en.json";
import Script from "next/script";
import Analytics from "@/app/components/Analytics";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import MessagesProvider from "@/app/components/MessagesProvider";

export const metadata: Metadata = {
  title: "Formalitys - Company Formation & Tourist Accommodation in Morocco | 100% Online",
  description: "Create your LLC in Morocco | Legal formalities for tourist rentals online. Expert support.",
  keywords: "company formation Morocco, LLC Morocco, tourist accommodation, Airbnb Morocco, legal formalities, OMPIC, commercial register, tourist rental formalities",
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
  return (
    <html lang="en">
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
