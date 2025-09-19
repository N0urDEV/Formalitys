import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";
import WhatsAppWidget from "./components/WhatsAppWidget";

export const metadata: Metadata = {
  title: "Formalitys - Création Société & Hébergement Touristique au Maroc | 100% En Ligne",
  description: "Créez votre SARL au Maroc ou régularisez votre Airbnb/Riad en ligne. Service juridique rapide, sécurisé avec accompagnement expert. Devis gratuit.",
  keywords: "création société Maroc, SARL Maroc, hébergement touristique, Airbnb Maroc, formalités juridiques, OMPIC, registre commerce",
  openGraph: {
    title: "Formalitys - Démarches Juridiques au Maroc | 100% En Ligne",
    description: "Simplifiez vos démarches juridiques au Maroc. Création société SARL et régularisation hébergement touristique avec nos experts.",
    url: "https://formalitys.vercel.app",
    siteName: "Formalitys",
    images: [
      {
        url: "https://formalitys.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Formalitys - Démarches Juridiques au Maroc",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formalitys - Démarches Juridiques au Maroc",
    description: "Créez votre société ou régularisez votre hébergement touristique en ligne au Maroc.",
    images: ["https://formalitys.vercel.app/og-image.jpg"],
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
    canonical: "https://formalitys.vercel.app",
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
    <html lang="fr">
      <head>
        <link rel="stylesheet" href="/fonts/satoshi.css" />
      </head>
      <body className="font-sans antialiased" style={{ fontFamily: 'Satoshi, sans-serif' }}>
        {children}
        
        {/* WhatsApp Chat Widget */}
        <WhatsAppWidget 
          phoneNumber="+212620269000"
          position="bottom-right"
          hideOnPages={['/admin']}
        />
        
        {/* Alternative: WhatsApp Button (uncomment to use instead of widget) */}
        {/* <WhatsAppButton 
          phoneNumber="+212620269000"
          message="Bonjour! Je souhaite obtenir des informations sur vos services Formalitys."
          position="bottom-right"
          showAfterDelay={3000}
          hideOnPages={['/admin']}
        /> */}
      </body>
    </html>
  );
}
