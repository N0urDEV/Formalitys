import React from 'react';
import { ServiceCard } from './ServiceCard';
import { Service, UserDiscountStatus } from '../types';

const services: Service[] = [
  {
    id: 'company',
    title: 'Création de société SARL',
    description: 'Créez votre société en ligne au Maroc avec un accompagnement complet. De la constitution des dossiers à l\'obtention de tous les documents officiels.',
    price: '3 600 DH',
    priceNote: '',
    features: [
      'Constitution complète de votre SARL',
      'Obtention certificat négatif OMPIC',
      'Immatriculation au registre du commerce, Patente/TP, impôts et CNSS',
      'Accompagnement juridique expert',
      'Introduction compte bancaire'
    ],
    href: '/dossiers/company',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    gradient: 'bg-gradient-to-br from-[#F66B4C] to-[#e55a43]',
    buttonStyle: 'bg-white text-[#F66B4C] hover:bg-white/90'
  },
  {
    id: 'tourism',
    title: 'Formalités pour hébergements touristiques',
    description: 'Régularisez votre Airbnb, Riad ou location touristique. Obtenez toutes les autorisations nécessaires pour louer en toute légalité.',
    price: '1 600 DH',
    priceNote: '',
    features: [
      'Validation complète des documents',
      'Autorisations administratives',
      'Classement touristique',
      'Conformité réglementaire',
      'Déclaration nuitées / registre de Police / Taxes de séjour / Impôts'
    ],
    href: '/dossiers/tourism',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    gradient: 'bg-white/90 backdrop-blur-sm border border-white/20 hover:border-[#F66B4C]/20',
    buttonStyle: 'bg-[#F66B4C] text-white hover:bg-[#e55a43]'
  }
];

interface ServicesGridProps {
  discountStatus?: UserDiscountStatus | null;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ discountStatus }) => {
  // Update services with discount information (only for tourism)
  const servicesWithDiscounts = services.map(service => {
    if (!discountStatus) return service;
    
    // Only apply discounts to tourism service
    if (service.id !== 'tourism') return service;
    
    const discount = discountStatus.availableDiscounts.tourism;
    if (!discount || discount.discountPercentage === 0) return service;
    
    return {
      ...service,
      price: `${(discount.finalPrice / 100).toLocaleString()} DH`,
      originalPrice: `${(discount.originalPrice / 100).toLocaleString()} DH`,
      discountPercentage: discount.discountPercentage,
      discountAmount: discount.discountAmount,
      hasDiscount: true
    };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
      {servicesWithDiscounts.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};
