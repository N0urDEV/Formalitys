import React from 'react';
import { CompanyData, StepErrors } from '../../types';
import { FormSelect } from '../FormSelect';

interface Step2HeadquartersProps {
  companyData: CompanyData;
  setCompanyData: (data: CompanyData) => void;
  stepErrors: StepErrors;
}

export const Step2Headquarters: React.FC<Step2HeadquartersProps> = ({
  companyData,
  setCompanyData,
  stepErrors
}) => {
  const headquartersOptions = [
    { value: 'domicile', label: 'Domicile (gratuit)' },
		{ value: 'contrat_domiciliation', label: 'Contrat de domiciliation (+900 MAD pour 12 mois : 6 payés + 6 offerts)' },
    { value: 'location_local', label: 'Location d\'un local' }
  ];

  const bankOptions = [
    { value: '', label: 'Sélectionner une banque' },
    { value: 'Attijariwafa Bank', label: 'Attijariwafa Bank' },
    { value: 'CIH Bank', label: 'CIH Bank' },
    { value: 'BCP', label: 'Banque Populaire' },
    { value: 'Bank of Africa', label: 'Bank of Africa' },
    { value: 'BMCE Bank', label: 'BMCE Bank' },
		{ value: 'Saham Bank', label: 'Saham Bank' },
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

      {/* Step 2 Warning Card */}
      <div className="bg-[#007ea7]/10 border border-[#007ea7]/30 rounded-2xl p-6 mb-6">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-[#007ea7] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 
              className="text-lg font-semibold text-[#00171f] mb-2"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Sélection requise
            </h3>
            <p 
              className="text-[#00171f]/80"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Vous devez choisir un type de siège social et sélectionner une banque avant de pouvoir continuer à l'étape suivante.
            </p>
          </div>
        </div>
      </div>

      {/* Headquarters Selection */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#007ea7]/10 rounded-full blur-xl"></div>
        <div className="relative z-10">
          <h3 
            className="text-xl font-bold text-[#00171f] mb-6"
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
                  ? 'border-[#007ea7] bg-[#007ea7]/5' 
                  : 'border-gray-200'
              }`}>
                <input
                  type="radio"
                  name="headquarters"
                  value={option.value}
                  checked={companyData.headquarters === option.value}
                  onChange={(e) => handleHeadquartersChange(e.target.value)}
                  className="w-5 h-5 border-gray-300 focus:ring-2 focus:ring-[#007ea7]"
                  style={{ accentColor: '#007ea7' }}
                />
                <div className="ml-4 flex-1">
                  <div 
                    className="font-medium text-[#00171f]"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {option.label}
                  </div>
                  {option.value === 'contrat_domiciliation' && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-green-100 text-green-800 px-2.5 py-0.5 text-xs font-medium border border-green-200">
                        6 mois offerts
                      </span>
                      <span className="text-xs text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        Payez 6 mois et bénéficiez de 12 mois au total
                      </span>
                    </div>
                  )}
                  {option.value === 'domicile' && (
                    <div 
                      className="text-sm text-gray-600 mt-1"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      Domicile du gérant
                    </div>
                  )}
                  {option.value === 'contrat_domiciliation' && (
                    <div 
                      className="text-sm text-gray-600 mt-1"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      Domiciliation professionnelle avec adresse commerciale. Offre spéciale : 12 mois pour le prix de 6.
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

      {/* Bank Selection - Always show */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#00171f]/10 rounded-full blur-xl"></div>
        <div className="relative z-10">
          <h3 
            className="text-xl font-bold text-[#00171f] mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Banque souhaitée
          </h3>
          <p 
            className="text-gray-600 mb-6"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Choisissez la banque pour votre société
          </p>
          
          <FormSelect
            name="selectedBank"
            label="Banque"
            value={companyData.selectedBank}
            onChange={handleBankChange}
            options={bankOptions}
            error={stepErrors[2]?.includes('selectedBank') ? 'Veuillez sélectionner une banque' : ''}
          />
        </div>
      </div>

    </div>
  );
};
