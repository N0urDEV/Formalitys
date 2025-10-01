import React from 'react';
import { useTranslations } from 'next-intl';
import { CompanyData, StepErrors, Associate } from '../../types';
import { FormInput } from '../FormInput';
import { FormSelect } from '../FormSelect';
import FileUpload from '../../../../components/FileUpload';

interface Step2CompanyDetailsProps {
  companyData: CompanyData;
  setCompanyData: (data: CompanyData) => void;
  stepErrors: StepErrors;
  onFileUpload: (files: File[], documentType: string) => Promise<void>;
  calculateTotalPrice: () => number;
  associates: Associate[];
  uploadedFiles?: Array<{
    id: string;
    filename: string;
    originalName: string;
    documentType: string;
    size: number;
    mimetype: string;
    url: string;
    uploadedAt: string;
  }>;
}

export const Step2CompanyDetails: React.FC<Step2CompanyDetailsProps> = ({
  companyData,
  setCompanyData,
  stepErrors,
  onFileUpload,
  calculateTotalPrice,
  associates,
  uploadedFiles = []
}) => {
  const t = useTranslations('Dossiers.Company.Form');

  const capitalOptions = [
    { value: '10000', label: t('capital.option10k') },
    { value: '100000', label: t('capital.option100k') }
  ];

  const activityOptions = [
    t('activities.commerce'), t('activities.services'), t('activities.importExport'), t('activities.consulting'), 
    t('activities.it'), t('activities.construction'), t('activities.transport'), t('activities.restaurant'),
    'Autres'
  ];

  const handleActivityChange = (activity: string, checked: boolean) => {
    if (checked && companyData.activities.length < 3) {
      setCompanyData({
        ...companyData,
        activities: [...companyData.activities, activity]
      });
    } else if (!checked) {
      setCompanyData({
        ...companyData,
        activities: companyData.activities.filter(a => a !== activity)
      });
    }
  };

  const handleProposedNameChange = (index: number, value: string) => {
    const newNames = [...companyData.proposedNames];
    newNames[index] = value;
    setCompanyData({ ...companyData, proposedNames: newNames });
  };

  const handleShareChange = (index: number, value: string) => {
    const num = Math.max(0, Math.min(100, parseFloat(value) || 0));
    const shares = [...(companyData.shares || Array(associates.length).fill(0))];
    shares[index] = num;
    setCompanyData({ ...companyData, shares });
  };

  return (
    <div className="space-y-8">
      {/* Step 4 Error Display */}
      {stepErrors[4] && stepErrors[4].length > 0 && (
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
                {t('errors.fixFollowing')}
              </h3>
              <ul className="space-y-1">
                {stepErrors[4]?.map((error, index) => (
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

      {/* Step 3 Warning Card */}
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
              Informations requises
            </h3>
            <p 
              className="text-[#00171f]/80"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Vous devez remplir tous les détails de l'entreprise (3 noms proposés, activités, forme juridique, adresse, etc.) et uploader les CNI de tous les associés avant de pouvoir procéder au paiement.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 
          className="text-xl font-semibold text-[#00171f]"
          style={{ fontFamily: '"Gascogne Serial", serif' }}
        >
          {t('sections.companyDetails')}
        </h2>
        

        {/* Proposed Names */}
        <div>
          <label 
            className="block text-sm font-medium text-gray-700 mb-2"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            {t('labels.proposedNames')}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="space-y-3">
            {companyData.proposedNames.map((name, index) => {
              const placeholders = [
                'Nom idéal pour vous',
                'Nom apprécié', 
                'Nom par défaut'
              ];
              return (
                <FormInput
                  key={index}
                  label={t('labels.proposedNameN', { n: index + 1 })}
                  name={`proposedName_${index}`}
                  placeholder={placeholders[index]}
                  value={name}
                  onChange={(value) => handleProposedNameChange(index, value)}
                  required
                />
              );
            })}
          </div>
        </div>

        {/* Activities */}
        <div>
          <label 
            className="block text-sm font-medium text-gray-700 mb-2"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            {t('labels.activities')}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {activityOptions.map(activity => (
              <label key={activity} className="flex items-center space-x-2 p-3 border rounded-2xl hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={companyData.activities.includes(activity)}
                  onChange={(e) => handleActivityChange(activity, e.target.checked)}
                  disabled={!companyData.activities.includes(activity) && companyData.activities.length >= 3}
                  className="w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-[#007ea7]"
                  style={{ accentColor: '#007ea7' }}
                />
                <span 
                  className="text-sm text-gray-700"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {activity}
                </span>
              </label>
            ))}
          </div>
          
          {/* Custom activity input - shows when "Autres" is selected */}
          {companyData.activities.includes('Autres') && (
            <div className="mt-4">
              <FormInput
                label="Précisez votre activité"
                name="autresActivite"
                placeholder="Décrivez votre activité spécifique"
                value={companyData.autresActivite}
                onChange={(value) => setCompanyData({...companyData, autresActivite: value})}
                required
              />
            </div>
          )}
        </div>


        {/* Capital */}
        <FormSelect
          label={t('labels.capital')}
          name="capital"
          value={companyData.capital.toString()}
          onChange={(value) => setCompanyData({...companyData, capital: parseInt(value)})}
          options={capitalOptions}
        />


        {/* Additional Company Information Section */}
        <div className="border-t pt-8 mt-8">
          <h3 
            className="text-lg font-semibold text-[#00171f] mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            {t('sections.additionalInfo')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Forme juridique */}
            <FormSelect
              label={t('labels.formeJuridique')}
              name="formeJuridique"
              value={companyData.formeJuridique}
              onChange={(value) => setCompanyData({...companyData, formeJuridique: value})}
              options={[
                { value: 'SARL AU', label: 'SARL AU (1 associé)' },
                { value: 'SARL', label: 'SARL (+2 associés)' }
              ]}
              placeholder={t('placeholders.formeJuridique')}
              required
            />

            {/* Share distribution for associates */}
            <div className="md:col-span-2">
              {companyData.formeJuridique === 'SARL' && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    Répartition des parts sociales
                  </label>
                  <div className="space-y-2">
                    {associates.map((a, idx) => (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                        <div className="md:col-span-2 text-sm text-gray-700" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                          Associé {idx + 1} — {a.prenom} {a.nom}
                        </div>
                        <div>
                          <FormInput
                            label="% du capital social"
                            name={`share_${idx}`}
                            type="number"
                            placeholder="0"
                            value={(companyData.shares?.[idx] ?? '').toString()}
                            onChange={(val) => handleShareChange(idx, val)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    La somme doit être égale à 100%.
                  </p>
                </div>
              )}
              {companyData.formeJuridique === 'SARL AU' && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    Répartition des parts sociales
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                    <div className="md:col-span-2 text-sm text-gray-700" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      Associé 1 — {associates[0]?.prenom} {associates[0]?.nom}
                    </div>
                    <div>
                      <FormInput
                        label="% du capital social"
                        name={`share_0`}
                        type="number"
                        value={'100'}
                        onChange={() => {}}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>


            {/* Adresse du siège social */}
            <div className="md:col-span-2">
              <FormInput
                label={t('labels.adresseSiege')}
                name="adresseSiege"
                placeholder={t('placeholders.adresseSiege')}
                value={companyData.adresseSiege}
                onChange={(value) => setCompanyData({...companyData, adresseSiege: value})}
                required
              />
            </div>

            {/* Ville du siège */}
            <FormInput
              label={t('labels.villeSiege')}
              name="villeSiege"
              placeholder={t('placeholders.villeSiege')}
              value={companyData.villeSiege}
              onChange={(value) => setCompanyData({...companyData, villeSiege: value})}
              required
            />

            {/* Profession ou activité principale */}
            <FormInput
              label={t('labels.professionActivite')}
              name="professionActivite"
              placeholder={t('placeholders.professionActivite')}
              value={companyData.professionActivite}
              onChange={(value) => setCompanyData({...companyData, professionActivite: value})}
              required
            />

            {/* Téléphone */}
            <FormInput
              label={t('labels.telephone')}
              name="telephone"
              type="tel"
              placeholder={t('placeholders.telephone')}
              value={companyData.telephone}
              onChange={(value) => setCompanyData({...companyData, telephone: value})}
              required
            />

            {/* Fax */}
            <FormInput
              label={t('labels.fax')}
              name="fax"
              type="tel"
              placeholder={t('placeholders.fax')}
              value={companyData.fax}
              onChange={(value) => setCompanyData({...companyData, fax: value})}
            />

            {/* Email */}
            <FormInput
              label={t('labels.email')}
              name="email"
              type="email"
              placeholder={t('placeholders.email')}
              value={companyData.email}
              onChange={(value) => setCompanyData({...companyData, email: value})}
              required
            />
          </div>
        </div>

        {/* Tax and Registration Information Section */}
        <div className="border-t pt-8 mt-8">
          <h3 
            className="text-lg font-semibold text-[#00171f] mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            {t('sections.taxInfo')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chiffre d'affaires mensuel prévu (HT) */}
            <FormInput
              label="Chiffre d'affaires mensuel prévu (HT)"
              name="chiffreAffairesMensuelHt"
              type="number"
              placeholder="Ex: 50 000"
              value={companyData.chiffreAffairesMensuelHt?.toString() || ''}
              onChange={(value) => setCompanyData({ ...companyData, chiffreAffairesMensuelHt: value === '' ? undefined : parseFloat(value) })}
              required
            />
            {/* N° Taxe professionnelle */}
            <FormInput
              label={t('labels.numeroArticleTaxeProfessionnelle')}
              name="numeroArticleTaxeProfessionnelle"
              placeholder={t('placeholders.numeroArticleTaxeProfessionnelle')}
              value={companyData.numeroArticleTaxeProfessionnelle}
              onChange={(value) => setCompanyData({...companyData, numeroArticleTaxeProfessionnelle: value})}
            />

            {/* N° Taxe de Services Communaux */}
            <FormInput
              label={t('labels.numeroArticleTaxeServicesCommunaux')}
              name="numeroArticleTaxeServicesCommunaux"
              placeholder={t('placeholders.numeroArticleTaxeServicesCommunaux')}
              value={companyData.numeroArticleTaxeServicesCommunaux}
              onChange={(value) => setCompanyData({...companyData, numeroArticleTaxeServicesCommunaux: value})}
            />

            {/* N° affiliation CNSS */}
            <FormInput
              label={t('labels.numeroAffiliationCNSS')}
              name="numeroAffiliationCNSS"
              placeholder={t('placeholders.numeroAffiliationCNSS')}
              value={companyData.numeroAffiliationCNSS}
              onChange={(value) => setCompanyData({...companyData, numeroAffiliationCNSS: value})}
            />

            {/* N° Registre de Commerce */}
            <FormInput
              label={t('labels.numeroRegistreCommerce')}
              name="numeroRegistreCommerce"
              placeholder={t('placeholders.numeroRegistreCommerce')}
              value={companyData.numeroRegistreCommerce}
              onChange={(value) => setCompanyData({...companyData, numeroRegistreCommerce: value})}
            />

            {/* Ville du registre de commerce */}
            <FormInput
              label={t('labels.villeRegistreCommerce')}
              name="villeRegistreCommerce"
              placeholder={t('placeholders.villeRegistreCommerce')}
              value={companyData.villeRegistreCommerce}
              onChange={(value) => setCompanyData({...companyData, villeRegistreCommerce: value})}
            />

            {/* Références de dépôt de la déclaration */}
            <FormInput
              label={t('labels.referenceDepotDeclaration')}
              name="referenceDepotDeclaration"
              placeholder={t('placeholders.referenceDepotDeclaration')}
              value={companyData.referenceDepotDeclaration}
              onChange={(value) => setCompanyData({...companyData, referenceDepotDeclaration: value})}
            />

            {/* Date de dépôt */}
            <FormInput
              label={t('labels.dateDepotDeclaration')}
              name="dateDepotDeclaration"
              type="date"
              value={companyData.dateDepotDeclaration}
              onChange={(value) => setCompanyData({...companyData, dateDepotDeclaration: value})}
            />
          </div>

          {/* Embauche dès la création - own space below */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-6">
              <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                Avez-vous prévu d'embaucher des salariés dès la création ?
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="embauchePrevue"
                  value="oui"
                  checked={companyData.embauchePrevue === true}
                  onChange={() => setCompanyData({ ...companyData, embauchePrevue: true })}
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-[#007ea7]"
                  style={{ accentColor: '#007ea7' }}
                />
                <span className="text-sm text-gray-700" style={{ fontFamily: 'Satoshi, sans-serif' }}>Oui</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="embauchePrevue"
                  value="non"
                  checked={companyData.embauchePrevue === false}
                  onChange={() => setCompanyData({ ...companyData, embauchePrevue: false, nbSalaries: undefined })}
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-[#007ea7]"
                  style={{ accentColor: '#007ea7' }}
                />
                <span className="text-sm text-gray-700" style={{ fontFamily: 'Satoshi, sans-serif' }}>Non</span>
              </label>
            </div>

            {companyData.embauchePrevue === true && (
              <div className="max-w-xs">
                <FormInput
                  label="Combien ?"
                  name="nbSalaries"
                  type="number"
                  placeholder="Ex: 2"
                  value={companyData.nbSalaries?.toString() || ''}
                  onChange={(value) => setCompanyData({ ...companyData, nbSalaries: value === '' ? undefined : parseInt(value) })}
                  required
                />
              </div>
            )}
          </div>
        </div>

        {/* CNI Upload - Required before payment */}
        <div className="space-y-8">
          <h3 
            className="text-lg font-semibold text-[#00171f]"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Documents d'identité requis
          </h3>

          {/* CNI des associés */}
          <div className="space-y-4">
            <h4 
              className="text-md font-medium text-gray-700"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {t('files.cniAssocies')}
              <span className="text-red-500 ml-1">*</span>
            </h4>
            {associates.map((associate, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  {associate.prenom} {associate.nom} {associate.isGerant ? t('files.manager') : ''}
                </p>
                <FileUpload
                  key={`cni-${index}`}
                  title=""
                  description={t('files.uploadCNI')}
                  onUpload={(files) => onFileUpload(files, `cni-associe-${index}`)}
                  acceptedTypes={['.pdf']}
                  maxFiles={1}
                  maxSize={5}
                  currentFiles={uploadedFiles.filter(file => file.documentType === `cni-associe-${index}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
