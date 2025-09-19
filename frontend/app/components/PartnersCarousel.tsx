'use client';

import { useEffect, useRef } from 'react';
import OptimizedImage from './OptimizedImage';

const PartnersCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // List of partner logos with SEO-optimized alt text
  const partners = [
    { 
      name: 'CDM', 
      logo: '/logos/cdm.png',
      alt: 'CDM - Partenaire bancaire Formalitys pour les démarches juridiques au Maroc'
    },
    { 
      name: 'Mastercard', 
      logo: '/logos/master1.png',
      alt: 'Mastercard - Solution de paiement sécurisée pour Formalitys'
    },
    { 
      name: 'CIH', 
      logo: '/logos/CIH.png',
      alt: 'CIH Bank - Partenaire financier Formalitys pour création société Maroc'
    },
    { 
      name: 'Sanlam', 
      logo: '/logos/sanlam.png',
      alt: 'Sanlam - Assurance et services financiers partenaires Formalitys'
    },
    { 
      name: 'Mastercard', 
      logo: '/logos/master2.png',
      alt: 'Mastercard - Paiement sécurisé pour démarches juridiques Maroc'
    },
    { 
      name: 'Tijari', 
      logo: '/logos/TIJARI.png',
      alt: 'Tijari Bank - Partenaire bancaire Formalitys pour formalités Maroc'
    },
  ];

  // Duplicate partners multiple times for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners, ...partners];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 1; // pixels per frame
    const logoWidth = 200; // approximate width of each logo container

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset position when we've scrolled through one complete set
      if (scrollPosition >= logoWidth * partners.length) {
        scrollPosition = 0;
      }
      
      scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [partners.length]);

  return (
    <div className="relative overflow-hidden  w-full border-t border-white/20">
      <div 
        ref={scrollRef}
        className="flex space-x-12 items-center"
        style={{ width: 'max-content' }}
      >
        {duplicatedPartners.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="flex-shrink-0"
          >
            <div className="group relative">
              <OptimizedImage
                src={partner.logo}
                alt={partner.alt}
                width={180}
                height={60}
                className="h-30 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                sizes="(max-width: 768px) 120px, 180px"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersCarousel;
