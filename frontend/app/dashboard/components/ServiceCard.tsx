import React from 'react';
import Link from 'next/link';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const isWhiteBackground = service.id === 'tourism';
  
  return (
    <Link href={service.href} className="group relative">
      <div className={`${service.gradient} rounded-3xl p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden h-full`}>
        {/* Decorative Elements */}
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl ${
          isWhiteBackground ? 'bg-[#F66B4C]/10' : 'bg-white/10'
        }`}></div>
        <div className={`absolute bottom-0 left-0 w-24 h-24 rounded-full blur-xl ${
          isWhiteBackground ? 'bg-[#F66B4C]/5' : 'bg-white/5'
        }`}></div>
        
        <div className="relative z-10 h-full flex flex-col">
          {/* Header with Icon */}
          <div className="flex items-start justify-between mb-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ${
              isWhiteBackground ? 'bg-gradient-to-br from-[#F66B4C] to-[#e55a43]' : 'bg-white/20'
            }`}>
              {service.icon}
            </div>
            <div className="text-right">
              {service.hasDiscount && service.originalPrice ? (
                <div className="space-y-1">
                  <div className={`text-lg line-through ${
                    isWhiteBackground ? 'text-gray-400' : 'text-white/60'
                  }`} style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {service.originalPrice}
                  </div>
                  <div className={`text-3xl font-bold ${
                    isWhiteBackground ? 'text-[#F66B4C]' : 'text-white'
                  }`} style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {service.price}
                  </div>
                  <div className={`text-sm font-semibold ${
                    isWhiteBackground ? 'text-green-600' : 'text-green-300'
                  }`} style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    -{service.discountPercentage}% de réduction
                  </div>
                </div>
              ) : (
                <>
                  <div className={`text-3xl font-bold ${
                    isWhiteBackground ? 'text-[#F66B4C]' : 'text-white'
                  }`} style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {service.price}
                  </div>
                  {service.priceNote && (
                    <div className={`text-sm ${
                      isWhiteBackground ? 'text-gray-500' : 'text-white/80'
                    }`} style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {service.priceNote}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          
          <h2 
            className={`text-3xl font-bold mb-4 ${
              isWhiteBackground ? 'text-[#071B1E] group-hover:text-[#F66B4C] transition-colors' : 'text-white'
            }`}
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            {service.title}
          </h2>
          <p 
            className={`text-lg mb-8 leading-relaxed flex-grow ${
              isWhiteBackground ? 'text-gray-600' : 'text-white/90'
            }`}
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            {service.description}
          </p>
          
          {/* Features List */}
          <div className="space-y-3 mb-8">
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  isWhiteBackground ? 'bg-[#F66B4C]' : 'bg-white'
                }`}></div>
                <span className={`${
                  isWhiteBackground ? 'text-gray-700' : 'text-white/90'
                }`} style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
          
          {/* CTA Button */}
          <div className="mt-auto">
            <div className={`${service.buttonStyle} inline-flex items-center justify-center w-full px-6 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group`}>
              <span style={{ fontFamily: 'Satoshi, sans-serif' }}>Commencer maintenant</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
