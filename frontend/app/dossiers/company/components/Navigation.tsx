import React from 'react';
import { useRouter } from 'next/navigation';

interface NavigationProps {
  currentStep: number;
  onPrevious: () => void;
  onNext: () => void;
  loading: boolean;
  canGoBack: boolean;
  totalPrice?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentStep,
  onPrevious,
  onNext,
  loading,
  canGoBack,
  totalPrice = 0
}) => {
  const router = useRouter();

  const getButtonText = () => {
    switch (currentStep) {
      case 1: return 'Continuer →';
      case 2: return 'Continuer vers le paiement →';
      case 3: return `Payer ${totalPrice} MAD →`;
      case 4: return 'Finaliser →';
      case 5: return 'Terminé';
      default: return 'Terminé';
    }
  };

  return (
    <div className="mt-12 flex justify-between items-center">
      <div className="flex space-x-4">
        <button
          onClick={() => router.push('/dashboard')}
          className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-2xl font-semibold hover:border-[#007ea7] hover:text-[#007ea7] transition-all duration-300"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          ← Tableau de bord
        </button>
        
        {canGoBack && currentStep < 5 && (
          <button
            onClick={onPrevious}
            className="px-6 py-3 border-2 border-[#00171f] text-[#00171f] rounded-2xl font-semibold hover:bg-[#00171f] hover:text-white transition-all duration-300"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            ← Précédent
          </button>
        )}
      </div>
      
      {currentStep < 5 && (
        <button
          onClick={onNext}
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-[#007ea7] to-[#00a8e8] text-white rounded-2xl font-semibold text-lg hover:from-[#00a8e8] hover:to-[#007ea7] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          {loading ? (
            <div className="flex items-center">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              Enregistrement...
            </div>
          ) : (
            getButtonText()
          )}
        </button>
      )}
      
      {currentStep === 5 && (
        <button
          onClick={() => router.push('/dashboard')}
          className="px-8 py-3 bg-gradient-to-r from-[#007ea7] to-[#00a8e8] text-white rounded-2xl font-semibold text-lg  transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          Terminer
        </button>
      )}
    </div>
  );
};
