import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  
  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return 'Informations associés';
      case 2: return 'Siège social';
      case 3: return 'Paiement';
      case 4: return 'Détails de l\'entreprise';
      case 5: return 'Terminé';
      default: return 'Terminé';
    }
  };

  const getStepDescription = (step: number) => {
    switch (step) {
      case 1: return 'Renseignez les informations des associés de votre société';
      case 2: return 'Sélectionnez le type de siège social pour votre société';
      case 3: return 'Effectuez le paiement pour finaliser';
      case 4: return 'Complétez les détails et options de votre société';
      case 5: return 'Votre dossier est en cours de traitement';
      default: return 'Dossier terminé';
    }
  };

  return (
    <div className="mb-8">
      {/* Mobile Progress Bar */}
      <div className="block md:hidden">
        <div className="flex items-center justify-between mb-6 px-2">
          {steps.map((step) => (
            <div key={step} className="flex flex-col items-center relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                step <= currentStep 
                  ? 'bg-gradient-to-br from-[#F66B4C] to-[#e55a43] text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step}
              </div>
              {step < totalSteps && (
                <div className={`absolute top-4 left-1/2 w-full h-0.5 -translate-y-1/2 ${
                  step < currentStep ? 'bg-gradient-to-r from-[#F66B4C] to-[#e55a43]' : 'bg-gray-200'
                }`} style={{ width: 'calc(100% + 2rem)', marginLeft: '1rem' }}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Progress Bar */}
      <div className="hidden md:block">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center">
            {steps.map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold shadow-lg transition-all duration-300 ${
                  step <= currentStep 
                    ? 'bg-gradient-to-br from-[#F66B4C] to-[#e55a43] text-white scale-105' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < totalSteps && (
                  <div className={`w-16 h-1 mx-3 rounded-full transition-all duration-300 ${
                    step < currentStep ? 'bg-gradient-to-r from-[#F66B4C] to-[#e55a43]' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Info */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-[#F66B4C] rounded-full"></div>
          <span className="text-sm font-medium text-[#F66B4C] uppercase tracking-wide">
            Étape {currentStep} sur {totalSteps}
          </span>
        </div>
        <h2 
          className="text-lg md:text-xl font-bold text-[#071B1E] mb-2"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          {getStepTitle(currentStep)}
        </h2>
        <p 
          className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          {getStepDescription(currentStep)}
        </p>
      </div>
    </div>
  );
};
