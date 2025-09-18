import React from 'react';
import { UserDiscountStatus } from '../types';

interface DiscountStatusProps {
  discountStatus: UserDiscountStatus;
}

export const DiscountStatus: React.FC<DiscountStatusProps> = ({ discountStatus }) => {
  const { completedDossiers, currentTier, nextTier, dossiersToNextTier, availableDiscounts } = discountStatus;
  
  // Only show if there are tourism discounts available
  if (!availableDiscounts.tourism || availableDiscounts.tourism.discountPercentage === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-[#062A2F] to-[#071B1E] rounded-3xl p-6 text-white mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div>
            <h3 
              className="text-xl font-bold"
              style={{ fontFamily: '"Gascogne Serial", serif' }}
            >
              Programme de fidélité
            </h3>
            <p 
              className="text-white/90"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {currentTier.description}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            {completedDossiers}
          </div>
          <div className="text-white/80 text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            Dossiers terminés
          </div>
        </div>
      </div>

      {nextTier && dossiersToNextTier > 0 && (
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p 
                className="text-sm text-white/90"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Prochain niveau: {nextTier.description}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(completedDossiers / nextTier.minDossiers) * 100}%` }}
                ></div>
              </div>
              <span 
                className="text-sm font-semibold"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {dossiersToNextTier} de plus
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
