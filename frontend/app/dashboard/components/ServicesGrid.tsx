import React from 'react';
import { useTranslations } from 'next-intl';
import { ServiceCard } from './ServiceCard';
import { Service, UserDiscountStatus } from '../types';

interface ServicesGridProps {
  discountStatus?: UserDiscountStatus | null;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ discountStatus }) => {
  const t = useTranslations('Home.services');

  const services: Service[] = [
    {
      id: 'company',
      title: t('company.title'),
      description: t('company.desc'),
      price: t('company.price'),
      priceNote: t('company.priceEuro'),
      features: [
        t('company.features.f1'),
        t('company.features.f2'),
        t('company.features.f3'),
        t('company.features.f4'),
        t('company.features.f5')
      ],
      href: '/dossiers/company',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      gradient: 'bg-gradient-to-br from-[#007ea7] to-[#00a8e8]',
      buttonStyle: 'bg-white text-[#007ea7] hover:bg-white/90'
    },
    {
      id: 'tourism',
      title: t('tourism.title'),
      description: t('tourism.desc'),
      price: t('tourism.price'),
      priceNote: t('tourism.priceEuro'),
      features: [
        t('tourism.features.f1'),
        t('tourism.features.f2'),
        t('tourism.features.f3'),
        t('tourism.features.f4'),
        t('tourism.features.f5')
      ],
      href: '/dossiers/tourism',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      gradient: 'bg-white/90 backdrop-blur-sm border border-white/20 hover:border-[#007ea7]/20',
      buttonStyle: 'bg-[#007ea7] text-white hover:bg-[#00a8e8]'
    }
  ];
  // Update services with discount information for both company and tourism
  const servicesWithDiscounts = services.map(service => {
    if (!discountStatus) return service;
    
    const discount = service.id === 'company' 
      ? discountStatus.availableDiscounts.company 
      : discountStatus.availableDiscounts.tourism;
    
    if (!discount || discount.discountPercentage === 0) return service;
    
    return {
      ...service,
      price: `${(discount.finalPrice / 100).toLocaleString()} DH`,
      priceNote: `(${Math.round((discount.finalPrice / 100) / 10.5)}€)`,
      originalPrice: `${(discount.originalPrice / 100).toLocaleString()} DH`,
      originalPriceNote: `(${Math.round((discount.originalPrice / 100) / 10.5)}€)`,
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
