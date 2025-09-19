import type { Metadata } from "next";
import StructuredData from "../../components/StructuredData";

export const metadata: Metadata = {
  title: "Création Société SARL au Maroc | Formalitys - 3600 DH | 100% En Ligne",
  description: "Créez votre SARL au Maroc en ligne. Constitution complète, OMPIC, registre commerce, CNSS. Accompagnement expert. Devis gratuit.",
  keywords: "création SARL Maroc, constitution société, OMPIC, registre commerce, CNSS, formalités création entreprise",
  openGraph: {
    title: "Création Société SARL au Maroc | Formalitys",
    description: "Créez votre SARL au Maroc en ligne avec nos experts. Service complet et sécurisé.",
    url: "https://formalitys.vercel.app/dossiers/company",
    type: "website",
  },
  alternates: {
    canonical: "https://formalitys.vercel.app/dossiers/company",
  },
};

const serviceData = {
  name: "Création Société SARL au Maroc",
  description: "Service de création de société SARL au Maroc 100% en ligne avec accompagnement expert",
  offers: {
    price: "3600",
    description: "Création complète SARL avec tous les documents officiels"
  }
};

export default function CompanyDossierPage() {
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
          "name": "Création Société SARL",
          "item": "https://formalitys.vercel.app/dossiers/company"
        }
      ]} />
      
      {/* Your existing company dossier content will go here */}
      <div className="min-h-screen bg-white">
        <h1>Création Société SARL au Maroc - 100% En Ligne</h1>
        <p>Service de création de société SARL au Maroc avec accompagnement expert.</p>
      </div>
    </div>
  );
}