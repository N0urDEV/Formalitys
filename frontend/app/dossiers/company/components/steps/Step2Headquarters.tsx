import React from 'react';
import { CompanyData, StepErrors } from '../../types';
import { FormSelect } from '../FormSelect';

interface Step2HeadquartersProps {
  companyData: CompanyData;
  setCompanyData: (data: CompanyData) => void;
  stepErrors: StepErrors;
  calculateTotalPrice: () => number;
}

export const Step2Headquarters: React.FC<Step2HeadquartersProps> = ({
  companyData,
  setCompanyData,
  stepErrors,
  calculateTotalPrice
}) => {
  const headquartersOptions = [
    { value: 'domicile', label: 'Domicile (gratuit)' },
    { value: 'contrat_domiciliation', label: 'Contrat de domiciliation (+2100 MAD pour 6 mois)' },
    { value: 'location_local', label: 'Location d\'un local' }
  ];

  const bankOptions = [
    { value: '', label: 'Sélectionner une banque' },
    { value: 'Attijariwafa Bank', label: 'Attijariwafa Bank' },
    { value: 'CIH Bank', label: 'CIH Bank' },
    { value: 'BCP', label: 'Banque Populaire' },
    { value: 'Bank of Africa', label: 'Bank of Africa' },
    { value: 'BMCE Bank', label: 'BMCE Bank' },
    { value: 'Crédit du Maroc', label: 'Crédit du Maroc' }
  ];

  const handleHeadquartersChange = (value: string) => {
    setCompanyData({ ...companyData, headquarters: value });
  };

  const handleBankChange = (value: string) => {
    setCompanyData({ ...companyData, selectedBank: value });
  };

  return (
    <div className="space-y-8">
      {/* Step 2 Error Display */}
      {stepErrors[2] && stepErrors[2].length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <h3 
                className="text-lg font-semibold text-red-800 mb-2"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Veuillez corriger les erreurs suivantes :
              </h3>
              <ul className="space-y-1">
                {stepErrors[2].map((error, index) => (
                  <li 
                    key={index} 
                    className="text-red-700 text-sm"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    • {error}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Headquarters Selection */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#F66B4C]/10 rounded-full blur-xl"></div>
        <div className="relative z-10">
          <h3 
            className="text-xl font-bold text-[#071B1E] mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Sélection du siège social
          </h3>
          <p 
            className="text-gray-600 mb-6"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Choisissez le type de siège social pour votre société
          </p>
          
          <div className="space-y-4">
            {headquartersOptions.map((option) => (
              <label key={option.value} className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                companyData.headquarters === option.value 
                  ? 'border-[#F66B4C] bg-[#F66B4C]/5' 
                  : 'border-gray-200'
              }`}>
                <input
                  type="radio"
                  name="headquarters"
                  value={option.value}
                  checked={companyData.headquarters === option.value}
                  onChange={(e) => handleHeadquartersChange(e.target.value)}
                  className="w-5 h-5 text-[#F66B4C] border-gray-300 focus:ring-[#F66B4C] focus:ring-2"
                />
                <div className="ml-4 flex-1">
                  <div 
                    className="font-medium text-[#071B1E]"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {option.label}
                  </div>
                  {option.value === 'domicile' && (
                    <div 
                      className="text-sm text-gray-600 mt-1"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      Utiliser l'adresse de domicile d'un des associés
                    </div>
                  )}
                  {option.value === 'contrat_domiciliation' && (
                    <div 
                      className="text-sm text-gray-600 mt-1"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      Domiciliation professionnelle avec adresse commerciale
                    </div>
                  )}
                  {option.value === 'location_local' && (
                    <div 
                      className="text-sm text-gray-600 mt-1"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      Vous devez fournir un contrat de location
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Bank Selection - Only show if domiciliation is selected */}
      {companyData.headquarters === 'contrat_domiciliation' && (
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#062A2F]/10 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <h3 
              className="text-xl font-bold text-[#071B1E] mb-6"
              style={{ fontFamily: '"Gascogne Serial", serif' }}
            >
              Banque pour la domiciliation
            </h3>
            <p 
              className="text-gray-600 mb-6"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Sélectionnez la banque pour votre compte domicilié
            </p>
            
            <FormSelect
              label="Banque"
              value={companyData.selectedBank}
              onChange={handleBankChange}
              options={bankOptions}
              error={stepErrors[2]?.includes('selectedBank') ? 'Veuillez sélectionner une banque' : ''}
            />
          </div>
        </div>
      )}

      {/* Price Summary */}
      <div className="bg-gradient-to-r from-[#F66B4C] to-[#e55a43] rounded-3xl p-8 text-white">
        <h3 
          className="text-xl font-bold mb-4"
          style={{ fontFamily: '"Gascogne Serial", serif' }}
        >
          Récapitulatif des coûts
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span 
              className="text-white/90"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Création de société
            </span>
            <span 
              className="font-medium"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              3600 MAD
            </span>
          </div>
          {companyData.headquarters === 'contrat_domiciliation' && (
            <div className="flex justify-between">
              <span 
                className="text-white/90"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Domiciliation (6 mois)
              </span>
              <span 
                className="font-medium"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                +2100 MAD
              </span>
            </div>
          )}
          <div className="border-t border-white/20 pt-2 flex justify-between font-bold text-lg">
            <span 
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Total
            </span>
            <span 
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {calculateTotalPrice()} MAD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
