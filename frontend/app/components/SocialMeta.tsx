interface SocialMetaProps {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: 'website' | 'article';
}

export default function SocialMeta({ 
  title, 
  description, 
  image = "https://formalitys.vercel.app/og-default.jpg", 
  url, 
  type = 'website' 
}: SocialMetaProps) {
  return (
    <>
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Formalitys" />
      <meta property="og:locale" content="fr_FR" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={url} />
    </>
  );
}
