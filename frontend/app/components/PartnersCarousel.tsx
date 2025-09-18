'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const PartnersCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // List of partner logos
  const partners = [
    { name: 'CDM', logo: '/logos/cdm.png' },
    { name: 'Mastercard 1', logo: '/logos/master1.png' },
    { name: 'CIH', logo: '/logos/CIH.png' },
    { name: 'Sanlam', logo: '/logos/sanlam.png' },
    { name: 'Mastercard 2', logo: '/logos/master2.png' },
    { name: 'Tijari', logo: '/logos/TIJARI.png' },
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
              <Image
                src={partner.logo}
                alt={`Logo ${partner.name}`}
                width={180}
                height={60}
                className="h-30 w-auto object-contain  opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersCarousel;
