interface StructuredDataProps {
  type: 'organization' | 'service' | 'faq' | 'breadcrumb';
  data?: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getSchema = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Formalitys",
          "url": "https://formalitys.vercel.app",
          "logo": "https://formalitys.vercel.app/SVG/Asset%201.svg",
          "description": "Formalitys simplifie vos démarches juridiques au Maroc. Création de société SARL et régularisation d'hébergements touristiques 100% en ligne.",
          "foundingDate": "2024",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "MA",
            "addressRegion": "Maroc"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+212620269000",
            "contactType": "customer service",
            "availableLanguage": "French"
          },
          "sameAs": [
            "https://www.linkedin.com/company/formalitys",
            "https://www.facebook.com/formalitys"
          ],
          "serviceArea": {
            "@type": "Country",
            "name": "Morocco"
          }
        };

      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": data?.name || "Services Juridiques au Maroc",
          "description": data?.description || "Service de démarches juridiques au Maroc 100% en ligne avec accompagnement expert",
          "provider": {
            "@type": "Organization",
            "name": "Formalitys"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Morocco"
          },
          "offers": data?.offers ? {
            "@type": "Offer",
            "price": data.offers.price,
            "priceCurrency": "MAD",
            "description": data.offers.description
          } : undefined,
          "category": "Legal Services"
        };

      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data || [
            {
              "@type": "Question",
              "name": "Combien coûte la création d'une SARL au Maroc ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "La création d'une SARL au Maroc coûte 3600 DH avec Formalitys, incluant tous les documents officiels et l'accompagnement expert."
              }
            },
            {
              "@type": "Question",
              "name": "Quels sont les délais pour créer une société au Maroc ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Les délais varient entre 15 à 30 jours selon la complexité du dossier et les délais administratifs."
              }
            },
            {
              "@type": "Question",
              "name": "Comment régulariser mon Airbnb au Maroc ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nous vous accompagnons pour régulariser votre location touristique avec toutes les autorisations nécessaires : classement touristique, déclaration nuitées, taxes de séjour."
              }
            }
          ]
        };

      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data || [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Accueil",
              "item": "https://formalitys.vercel.app"
            }
          ]
        };

      default:
        return null;
    }
  };

  const schema = getSchema();
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
