import React from 'react';
import { useTranslations } from 'next-intl';
import { EstablishmentInfo, FormErrors, StepErrors, UploadedFiles } from '../../types';
import { FormInput } from '../FormInput';
import { FormSelect } from '../FormSelect';
import FileUpload from '../../../../components/FileUpload';

interface Step2EstablishmentInfoProps {
  establishmentInfo: EstablishmentInfo;
  setEstablishmentInfo: (info: EstablishmentInfo) => void;
  errors: FormErrors;
  stepErrors: StepErrors;
  clearFieldError: (field: string) => void;
  uploadedFiles: UploadedFiles;
  onDocumentUpload: (files: File[], documentType: string) => void;
}

export const Step2EstablishmentInfo: React.FC<Step2EstablishmentInfoProps> = ({
  establishmentInfo,
  setEstablishmentInfo,
  errors,
  stepErrors,
  clearFieldError,
  uploadedFiles,
  onDocumentUpload
}) => {
  const t = useTranslations('Dossiers.Tourism.Form.Step2');
  const updateEstablishmentInfo = (field: string, value: string) => {
    setEstablishmentInfo({ ...establishmentInfo, [field]: value });
    if (errors[field]) {
      clearFieldError(field);
    }
  };

  const typeOptions = [
    { value: '', label: t('type.select') },
    { value: 'Hotel', label: t('type.hotel') },
    { value: 'HotelClub', label: t('type.hotelClub') },
    { value: 'ResidenceTourisme', label: t('type.residenceTourisme') },
    { value: 'ResidenceImmobiliere', label: t('type.residenceImmobiliere') },
    { value: 'MaisonHotes', label: t('type.maisonHotes') },
    { value: 'Riad', label: t('type.riad') },
    { value: 'Kasbah', label: t('type.kasbah') },
    { value: 'Camping', label: t('type.camping') },
    { value: 'Gite', label: t('type.gite') },
    { value: 'Pension', label: t('type.pension') }
  ];

  const categorieOptions = [
    { value: '', label: t('categorie.select') },
    { value: 'luxe', label: t('categorie.luxe') },
    { value: '5etoiles', label: t('categorie.5') },
    { value: '4etoiles', label: t('categorie.4') },
    { value: '3etoiles', label: t('categorie.3') },
    { value: '2etoiles', label: t('categorie.2') },
    { value: '1etoile', label: t('categorie.1') },
    { value: 'categorieUnique', label: t('categorie.unique') }
  ];

  const regionOptions = [
    { value: '', label: t('region.select') },
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
          className="text-2xl font-bold text-[#00171f] mb-4"
          style={{ fontFamily: '"Gascogne Serial", serif' }}
        >
          {t('title')}
        </h2>
        <p 
          className="text-gray-600"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          {t('subtitle')}
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
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#007ea7]/10 rounded-full blur-xl"></div>
        
        <div className="relative z-10">
          <h3 
            className="text-xl font-bold text-[#00171f] mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            {t('group.typeAndCategorie')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              label={t('labels.type')}
              value={establishmentInfo.type}
              onChange={(value) => updateEstablishmentInfo('type', value)}
              options={typeOptions}
              error={errors['type']}
              required
            />
            
            <FormSelect
              label={t('labels.categorie')}
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
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#00171f]/10 rounded-full blur-xl"></div>
        
        <div className="relative z-10">
          <h3 
            className="text-xl font-bold text-[#00171f] mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            {t('group.generalData')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label={t('labels.enseigne')}
              placeholder={t('placeholders.enseigne')}
              value={establishmentInfo.enseigneCommerciale}
              onChange={(value) => updateEstablishmentInfo('enseigneCommerciale', value)}
              error={errors['enseigneCommerciale']}
              required
            />
            
            <FormInput
              label={t('labels.dateOuverture')}
              type="date"
              value={establishmentInfo.dateOuverturePrevue}
              onChange={(value) => updateEstablishmentInfo('dateOuverturePrevue', value)}
              error={errors['dateOuverturePrevue']}
              required
            />
            
            <FormInput
              label={t('labels.registreCommerce')}
              placeholder={t('placeholders.registreCommerce')}
              value={establishmentInfo.registreCommerce}
              onChange={(value) => updateEstablishmentInfo('registreCommerce', value)}
              error={errors['registreCommerce']}
            />
            
            <FormInput
              label={t('labels.ice')}
              placeholder={t('placeholders.ice')}
              value={establishmentInfo.ice}
              onChange={(value) => updateEstablishmentInfo('ice', value)}
              error={errors['ice']}
            />
            
            <FormInput
              label={t('labels.cnss')}
              placeholder={t('placeholders.cnss')}
              value={establishmentInfo.numeroCNSS}
              onChange={(value) => updateEstablishmentInfo('numeroCNSS', value)}
            />
            
            <FormInput
              label={t('labels.telephone')}
              placeholder={t('placeholders.telephone')}
              value={establishmentInfo.telephone}
              onChange={(value) => updateEstablishmentInfo('telephone', value)}
              error={errors['telephone']}
              required
            />
            
            <FormInput
              label={t('labels.email')}
              type="email"
              placeholder={t('placeholders.email')}
              value={establishmentInfo.email}
              onChange={(value) => updateEstablishmentInfo('email', value)}
              error={errors['email']}
              required
            />
            
            <FormInput
              label={t('labels.siteWeb')}
              type="url"
              placeholder={t('placeholders.siteWeb')}
              value={establishmentInfo.siteWeb || ''}
              onChange={(value) => updateEstablishmentInfo('siteWeb', value)}
            />
            
            <FormSelect
              label={t('labels.region')}
              value={establishmentInfo.region}
              onChange={(value) => updateEstablishmentInfo('region', value)}
              options={regionOptions}
              error={errors['region']}
              required
            />
            
            <FormInput
              label={t('labels.province')}
              placeholder={t('placeholders.province')}
              value={establishmentInfo.province}
              onChange={(value) => updateEstablishmentInfo('province', value)}
              error={errors['province']}
              required
            />
          </div>
        </div>
      </div>

      {/* CNI Upload - Required before payment */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#007ea7]/10 rounded-full blur-xl"></div>
        <div className="relative z-10">
          <h3 
            className="text-xl font-bold text-[#00171f] mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Document d'identité requis
          </h3>
          <p 
            className="text-gray-600 mb-6"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Vous devez uploader votre CNI avant de procéder au paiement
          </p>
          
          <FileUpload
            title="CNI du propriétaire *"
            description="Carte nationale d'identité du propriétaire (PDF uniquement)"
            onUpload={(files) => onDocumentUpload(files, 'cni')}
            acceptedTypes={['.pdf']}
            maxFiles={1}
            maxSize={5}
            currentFiles={uploadedFiles.cni}
          />
          {uploadedFiles.cni.length > 0 && (
            <div className="mt-3 text-green-600 text-sm">
              ✓ {uploadedFiles.cni.length} fichier(s) uploadé(s)
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
