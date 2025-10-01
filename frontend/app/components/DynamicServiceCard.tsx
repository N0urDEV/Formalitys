'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface DynamicServiceCardProps {
  serviceType: 'company' | 'tourism';
  discountInfo?: {
    originalPrice: number;
    finalPrice: number;
    discountPercentage: number;
    discountAmount: number;
  } | null;
}

export default function DynamicServiceCard({ serviceType, discountInfo }: DynamicServiceCardProps) {
  const t = useTranslations('Home.services');
  
  const isCompany = serviceType === 'company';
  const basePrice = isCompany ? '3 300 DH' : '1 600 DH';
  const basePriceEuro = isCompany ? '(314€)' : '(152€)';
  
  const hasDiscount = discountInfo && discountInfo.discountPercentage > 0;
  
  const displayPrice = hasDiscount 
    ? `${(discountInfo!.finalPrice / 100).toLocaleString()} DH`
    : basePrice;
    
  const displayPriceEuro = hasDiscount
    ? `(${Math.round((discountInfo!.finalPrice / 100) / 10.5)}€)`
    : basePriceEuro;
    
  const originalPrice = hasDiscount 
    ? `${(discountInfo!.originalPrice / 100).toLocaleString()} DH`
    : null;
    
  const originalPriceEuro = hasDiscount
    ? `(${Math.round((discountInfo!.originalPrice / 100) / 10.5)}€)`
    : null;

  if (isCompany) {
    return (
      <div className="service-card group relative">
        <div className="bg-gradient-to-br from-[#007ea7] to-[#00a8e8] rounded-3xl p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden h-full">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
          
          <div className="relative z-10 h-full flex flex-col">
            {/* Header with Icon */}
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="text-right">
                {hasDiscount ? (
                  <div className="space-y-1">
                    <div className="text-lg line-through text-white/60" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {originalPrice}
                    </div>
                    <div className="text-3xl font-bold text-white" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {displayPrice}
                    </div>
                    <div className="text-sm text-white/80" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {displayPriceEuro}
                    </div>
                    <div className="text-sm font-semibold text-green-300" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      -{discountInfo!.discountPercentage}% {t('discount')}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-3xl font-bold text-white" style={{ fontFamily: 'Satoshi, sans-serif' }}>{displayPrice}</div>
                    <div className="text-sm text-white/80" style={{ fontFamily: 'Satoshi, sans-serif' }}>{displayPriceEuro}</div>
                  </>
                )}
              </div>
            </div>
            
            <h3 
              className="text-3xl font-bold text-white mb-4"
              style={{ fontFamily: '"Gascogne Serial", serif' }}
            >
              {t('company.title')}
            </h3>
            <p 
              className="text-white/90 text-lg mb-8 leading-relaxed flex-grow"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {t('company.desc')}
            </p>
            
            {/* Features */}
            <div className="space-y-3 mb-8">
              {[
                t('company.features.f1'),
                t('company.features.f2'),
                t('company.features.f3'),
                t('company.features.f4'),
                t('company.features.f5')
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white/60 rounded-full flex-shrink-0"></div>
                  <span className="text-white/90" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
            
            <Link 
              href="/dossiers/company"
              className="mt-auto bg-white text-[#007ea7] hover:bg-white/90 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {t('company.button')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="service-card group relative">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden h-full border border-white/20 hover:border-[#007ea7]/20">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#007ea7]/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#00a8e8]/5 rounded-full blur-xl"></div>
        
        <div className="relative z-10 h-full flex flex-col">
          {/* Header with Icon */}
          <div className="flex items-start justify-between mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#007ea7] to-[#00a8e8] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="text-right">
              {hasDiscount ? (
                <div className="space-y-1">
                  <div className="text-lg line-through text-gray-400" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {originalPrice}
                  </div>
                  <div className="text-3xl font-bold text-[#007ea7]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {displayPrice}
                  </div>
                  <div className="text-sm text-[#007ea7]/80" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {displayPriceEuro}
                  </div>
                  <div className="text-sm font-semibold text-green-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    -{discountInfo!.discountPercentage}% {t('discount')}
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-3xl font-bold text-[#007ea7]" style={{ fontFamily: 'Satoshi, sans-serif' }}>{displayPrice}</div>
                  <div className="text-sm text-[#007ea7]/80" style={{ fontFamily: 'Satoshi, sans-serif' }}>{displayPriceEuro}</div>
                </>
              )}
            </div>
          </div>
          
          <h3 
            className="text-3xl font-bold text-[#00171f] mb-4 group-hover:text-[#007ea7] transition-colors"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            {t('tourism.title')}
          </h3>
          <p 
            className="text-gray-600 text-lg mb-8 leading-relaxed flex-grow"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            {t('tourism.desc')}
          </p>
          
          {/* Features */}
          <div className="space-y-3 mb-8">
            {[
              t('tourism.features.f1'),
              t('tourism.features.f2'),
              t('tourism.features.f3'),
              t('tourism.features.f4'),
              t('tourism.features.f5')
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#007ea7] rounded-full flex-shrink-0"></div>
                <span className="text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
          
          <Link 
            href="/dossiers/tourism"
            className="mt-auto bg-[#007ea7] text-white hover:bg-[#00a8e8] px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            {t('tourism.button')}
          </Link>
        </div>
      </div>
    </div>
  );
}
