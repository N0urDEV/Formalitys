import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";
import WhatsAppWidget from "./components/WhatsAppWidget";

export const metadata: Metadata = {
  title: "Formalitys - Simplifiez vos démarches juridiques au Maroc",
  description: "Création de société et régularisation de location touristique 100% en ligne. Rapide, sécurisé, et accompagné par des experts.",
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
