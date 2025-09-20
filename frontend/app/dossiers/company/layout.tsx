import type { Metadata } from "next";

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

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
