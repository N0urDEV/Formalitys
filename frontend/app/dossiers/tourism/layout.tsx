import type { Metadata } from "next";

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

export default function TourismLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
