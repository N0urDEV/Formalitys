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
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold shadow-lg transition-all duration-300 ${
              step <= currentStep 
                ? 'bg-gradient-to-br from-[#F66B4C] to-[#e55a43] text-white scale-110' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {step}
            </div>
            {step < totalSteps && (
              <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                step < currentStep ? 'bg-gradient-to-r from-[#F66B4C] to-[#e55a43]' : 'bg-gray-200'
              }`}></div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <h2 
          className="text-xl font-bold text-[#071B1E] mb-2"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          Étape {currentStep}: {getStepTitle(currentStep)}
        </h2>
        <p 
          className="text-gray-600"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          {getStepDescription(currentStep)}
        </p>
      </div>
    </div>
  );
};
