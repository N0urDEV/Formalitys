import React from 'react';
import { EstablishmentInfo, FormErrors, StepErrors } from '../../types';
import { FormInput } from '../FormInput';
import { FormSelect } from '../FormSelect';

interface Step2EstablishmentInfoProps {
  establishmentInfo: EstablishmentInfo;
  setEstablishmentInfo: (info: EstablishmentInfo) => void;
  errors: FormErrors;
  stepErrors: StepErrors;
  clearFieldError: (field: string) => void;
}

export const Step2EstablishmentInfo: React.FC<Step2EstablishmentInfoProps> = ({
  establishmentInfo,
  setEstablishmentInfo,
  errors,
  stepErrors,
  clearFieldError
}) => {
  const updateEstablishmentInfo = (field: string, value: string) => {
    setEstablishmentInfo({ ...establishmentInfo, [field]: value });
    if (errors[field]) {
      clearFieldError(field);
    }
  };

  const typeOptions = [
    { value: '', label: 'Sélectionnez le type' },
    { value: 'Hotel', label: 'Hôtel' },
    { value: 'HotelClub', label: 'Hôtel club' },
    { value: 'ResidenceTourisme', label: 'Résidence de tourisme' },
    { value: 'ResidenceImmobiliere', label: 'Résidence Immobilière de Promotion Touristique' },
    { value: 'MaisonHotes', label: 'Maison d&apos;hôtes' },
    { value: 'Riad', label: 'Riad' },
    { value: 'Kasbah', label: 'Kasbah' },
    { value: 'Camping', label: 'Camping' },
    { value: 'Gite', label: 'Gîte' },
    { value: 'Pension', label: 'Pension' }
  ];

  const categorieOptions = [
    { value: '', label: 'Sélectionnez la catégorie' },
    { value: 'luxe', label: 'Luxe' },
    { value: '5etoiles', label: 'Cinq étoiles' },
    { value: '4etoiles', label: 'Quatre étoiles' },
    { value: '3etoiles', label: 'Trois étoiles' },
    { value: '2etoiles', label: 'Deux étoiles' },
    { value: '1etoile', label: 'Une étoile' },
    { value: 'categorieUnique', label: 'Catégorie unique' }
  ];

  const regionOptions = [
    { value: '', label: 'Sélectionnez la région' },
    { value: 'Casablanca-Settat', label: 'Casablanca-Settat' },
    { value: 'Rabat-Salé-Kénitra', label: 'Rabat-Salé-Kénitra' },
    { value: 'Marrakech-Safi', label: 'Marrakech-Safi' },
    { value: 'Fès-Meknès', label: 'Fès-Meknès' },
    { value: 'Tanger-Tétouan-Al Hoceïma', label: 'Tanger-Tétouan-Al Hoceïma' },
    { value: 'Oriental', label: 'Oriental' },
    { value: 'Béni Mellal-Khénifra', label: 'Béni Mellal-Khénifra' },
    { value: 'Souss-Massa', label: 'Souss-Massa' },
    { value: 'Guelmim-Oued Noun', label: 'Guelmim-Oued Noun' },
    { value: 'Laâyoune-Sakia El Hamra', label: 'Laâyoune-Sakia El Hamra' },
    { value: 'Dakhla-Oued Ed-Dahab', label: 'Dakhla-Oued Ed-Dahab' },
    { value: 'Drâa-Tafilalet', label: 'Drâa-Tafilalet' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 
          className="text-2xl font-bold text-[#071B1E] mb-4"
          style={{ fontFamily: '"Gascogne Serial", serif' }}
        >
          Informations de l<span style={{ fontFamily: 'Times New Roman, serif' }}>'</span>établissement
        </h2>
        <p 
          className="text-gray-600"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          Renseignez les informations de votre établissement d'hébergement touristique
        </p>
      </div>

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
      
      {/* Type et catégorie d'établissement */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#F66B4C]/10 rounded-full blur-xl"></div>
        
        <div className="relative z-10">
          <h3 
            className="text-xl font-bold text-[#071B1E] mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Type et catégorie de l<span style={{ fontFamily: 'Times New Roman, serif' }}>'</span>établissement
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              label="Type d&apos;établissement"
              value={establishmentInfo.type}
              onChange={(value) => updateEstablishmentInfo('type', value)}
              options={typeOptions}
              error={errors['type']}
              required
            />
            
            <FormSelect
              label="Catégorie d&apos;établissement"
              value={establishmentInfo.categorie}
              onChange={(value) => updateEstablishmentInfo('categorie', value)}
              options={categorieOptions}
              error={errors['categorie']}
              required
            />
          </div>
        </div>
      </div>

      {/* Données générales */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#062A2F]/10 rounded-full blur-xl"></div>
        
        <div className="relative z-10">
          <h3 
            className="text-xl font-bold text-[#071B1E] mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Données générales
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Enseigne commerciale"
              placeholder="Nom commercial de l&apos;établissement"
              value={establishmentInfo.enseigneCommerciale}
              onChange={(value) => updateEstablishmentInfo('enseigneCommerciale', value)}
              error={errors['enseigneCommerciale']}
              required
            />
            
            <FormInput
              label="Date d&apos;ouverture prévue"
              type="date"
              value={establishmentInfo.dateOuverturePrevue}
              onChange={(value) => updateEstablishmentInfo('dateOuverturePrevue', value)}
              error={errors['dateOuverturePrevue']}
              required
            />
            
            <FormInput
              label="N° de registre de commerce"
              placeholder="Numéro de registre de commerce"
              value={establishmentInfo.registreCommerce}
              onChange={(value) => updateEstablishmentInfo('registreCommerce', value)}
              error={errors['registreCommerce']}
              required
            />
            
            <FormInput
              label="ICE (Identifiant commun de l&apos;entreprise)"
              placeholder="ICE de l&apos;entreprise"
              value={establishmentInfo.ice}
              onChange={(value) => updateEstablishmentInfo('ice', value)}
              error={errors['ice']}
              required
            />
            
            <FormInput
              label="N° d&apos;affiliation à la CNSS"
              placeholder="Numéro CNSS"
              value={establishmentInfo.numeroCNSS}
              onChange={(value) => updateEstablishmentInfo('numeroCNSS', value)}
            />
            
            <FormInput
              label="Téléphone"
              placeholder="Téléphone de l&apos;établissement"
              value={establishmentInfo.telephone}
              onChange={(value) => updateEstablishmentInfo('telephone', value)}
              error={errors['telephone']}
              required
            />
            
            <FormInput
              label="Email"
              type="email"
              placeholder="Email de l&apos;établissement"
              value={establishmentInfo.email}
              onChange={(value) => updateEstablishmentInfo('email', value)}
              error={errors['email']}
              required
            />
            
            <FormInput
              label="Site web (optionnel)"
              type="url"
              placeholder="https://www.exemple.com"
              value={establishmentInfo.siteWeb || ''}
              onChange={(value) => updateEstablishmentInfo('siteWeb', value)}
            />
            
            <FormSelect
              label="Région"
              value={establishmentInfo.region}
              onChange={(value) => updateEstablishmentInfo('region', value)}
              options={regionOptions}
              error={errors['region']}
              required
            />
            
            <FormInput
              label="Province/Préfecture"
              placeholder="Province ou préfecture"
              value={establishmentInfo.province}
              onChange={(value) => updateEstablishmentInfo('province', value)}
              error={errors['province']}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};
