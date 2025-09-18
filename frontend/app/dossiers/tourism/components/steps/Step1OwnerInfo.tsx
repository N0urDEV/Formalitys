import React from 'react';
import { OwnerInfo, FormErrors, StepErrors } from '../../types';
import { FormInput } from '../FormInput';
import { FormSelect } from '../FormSelect';

interface Step1OwnerInfoProps {
  ownerInfo: OwnerInfo;
  setOwnerInfo: (info: OwnerInfo) => void;
  errors: FormErrors;
  stepErrors: StepErrors;
  clearFieldError: (field: string) => void;
}

export const Step1OwnerInfo: React.FC<Step1OwnerInfoProps> = ({
  ownerInfo,
  setOwnerInfo,
  errors,
  stepErrors,
  clearFieldError
}) => {
  const updateOwnerInfo = (field: string, value: string) => {
    setOwnerInfo({ ...ownerInfo, [field]: value });
    if (errors[field]) {
      clearFieldError(field);
    }
  };

  const typePieceOptions = [
    { value: 'CNI', label: 'CNI' },
    { value: 'Passeport', label: 'Passeport' },
    { value: 'Carte de résident', label: 'Carte de résident' }
  ];

  const qualiteOptions = [
    { value: 'Investisseur', label: 'Investisseur' },
    { value: 'Conciergerie', label: 'Conciergerie' },
    { value: 'Représentant légal', label: 'Représentant légal' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 
          className="text-2xl font-bold text-[#071B1E] mb-4"
          style={{ fontFamily: '"Gascogne Serial", serif' }}
        >
          Informations du propriétaire
        </h2>
        <p 
          className="text-gray-600"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          Renseignez vos informations personnelles pour la régularisation
        </p>
      </div>

      {/* Step 1 Error Display */}
      {stepErrors[1] && stepErrors[1].length > 0 && (
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
                {stepErrors[1].map((error, index) => (
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
      
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#F66B4C]/10 rounded-full blur-xl"></div>
        
        <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Nom"
              placeholder="Nom de famille"
              value={ownerInfo.nom}
              onChange={(value) => updateOwnerInfo('nom', value)}
              error={errors['nom']}
              required
            />
            
            <FormInput
              label="Prénom"
              placeholder="Prénom"
              value={ownerInfo.prenom}
              onChange={(value) => updateOwnerInfo('prenom', value)}
              error={errors['prenom']}
              required
            />
            
            <FormSelect
              label="Type de pièce"
              value={ownerInfo.typePiece}
              onChange={(value) => updateOwnerInfo('typePiece', value)}
              options={typePieceOptions}
            />
            
            <FormInput
              label="Numéro de pièce"
              placeholder="Numéro de pièce"
              value={ownerInfo.numero}
              onChange={(value) => updateOwnerInfo('numero', value)}
              error={errors['numero']}
              required
            />
            
            <FormInput
              label="Téléphone"
              placeholder="+212 6 12 34 56 78"
              value={ownerInfo.telephone}
              onChange={(value) => updateOwnerInfo('telephone', value)}
              error={errors['telephone']}
              required
            />
            
            <FormInput
              label="Email"
              type="email"
              placeholder="email@exemple.com"
              value={ownerInfo.email}
              onChange={(value) => updateOwnerInfo('email', value)}
              error={errors['email']}
              required
            />
            
            <FormSelect
              label="Qualité"
              value={ownerInfo.qualite}
              onChange={(value) => updateOwnerInfo('qualite', value)}
              options={qualiteOptions}
              error={errors['qualite']}
              required
            />
            
            <FormInput
              label="N° de registre de commerce"
              placeholder="Numéro de registre de commerce (pour personne morale)"
              value={ownerInfo.registreCommerce || ''}
              onChange={(value) => updateOwnerInfo('registreCommerce', value)}
              error={errors['registreCommerce']}
              required={ownerInfo.qualite === 'Représentant légal'}
            />
            
            <div className="md:col-span-2">
              <FormInput
                label="Adresse complète"
                placeholder="Adresse complète de la propriété"
                value={ownerInfo.adresse}
                onChange={(value) => updateOwnerInfo('adresse', value)}
                error={errors['adresse']}
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
