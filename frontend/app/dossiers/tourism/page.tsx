import type { Metadata } from "next";
import StructuredData from "../../components/StructuredData";

export const metadata: Metadata = {
  title: "Régularisation Hébergement Touristique Maroc | Formalitys - 1600 DH | 100% En Ligne",
  description: "Régularisez votre Airbnb, Riad ou location touristique au Maroc. Autorisations, classement touristique, taxes de séjour. Service complet 1600 DH.",
  keywords: "hébergement touristique Maroc, Airbnb Maroc, Riad Maroc, location touristique, classement touristique, taxes séjour",
  openGraph: {
    title: "Régularisation Hébergement Touristique Maroc | Formalitys",
    description: "Régularisez votre location touristique au Maroc avec nos experts. Service complet et sécurisé.",
    url: "https://formalitys.vercel.app/dossiers/tourism",
    type: "website",
  },
  alternates: {
    canonical: "https://formalitys.vercel.app/dossiers/tourism",
  },
};

const serviceData = {
  name: "Régularisation Hébergement Touristique Maroc",
  description: "Service de régularisation d'hébergements touristiques au Maroc 100% en ligne avec accompagnement expert",
  offers: {
    price: "1600",
    description: "Régularisation complète avec toutes les autorisations nécessaires"
  }
};

export default function TourismDossierPage() {
  return (
    <div>
      <StructuredData type="service" data={serviceData} />
      <StructuredData type="breadcrumb" data={[
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": "https://formalitys.vercel.app"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Hébergement Touristique",
          "item": "https://formalitys.vercel.app/dossiers/tourism"
        }
      ]} />
      
      {/* Your existing tourism dossier content will go here */}
      <div className="min-h-screen bg-white">
        <h1>Régularisation Hébergement Touristique Maroc - 100% En Ligne</h1>
        <p>Service de régularisation d'hébergements touristiques au Maroc avec accompagnement expert.</p>
      </div>
    </div>
  );
}