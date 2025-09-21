import React from 'react';
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

  const capitalOptions = [
    { value: '10000', label: '10,000 MAD' },
    { value: '100000', label: '100,000 MAD' }
  ];

  const activityOptions = [
    'Commerce', 'Services', 'Import/Export', 'Consulting', 
    'IT', 'Construction', 'Transport', 'Restauration'
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
                Veuillez corriger les erreurs suivantes :
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

      <div className="space-y-6">
        <h2 
          className="text-xl font-semibold text-[#071B1E]"
          style={{ fontFamily: '"Gascogne Serial", serif' }}
        >
          Détails de la société
        </h2>
        
        {/* Company Name */}
        <FormInput
          label="Nom de la société"
          name="companyName"
          placeholder="Nom de votre société"
          value={companyData.companyName}
          onChange={(value) => setCompanyData({...companyData, companyName: value})}
          required
        />

        {/* Proposed Names */}
        <div>
          <label 
            className="block text-sm font-medium text-gray-700 mb-2"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            3 noms proposés pour validation OMPIC
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="space-y-3">
            {companyData.proposedNames.map((name, index) => (
              <FormInput
                key={index}
                label={`Nom ${index + 1}`}
                name={`proposedName_${index}`}
                placeholder={`Nom ${index + 1}`}
                value={name}
                onChange={(value) => handleProposedNameChange(index, value)}
                required
              />
            ))}
          </div>
        </div>

        {/* Activities */}
        <div>
          <label 
            className="block text-sm font-medium text-gray-700 mb-2"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Activités (max 3)
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
                  className="w-4 h-4 text-[#F66B4C] border-gray-300 rounded focus:ring-[#F66B4C] focus:ring-2"
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
        </div>


        {/* Capital */}
        <FormSelect
          label="Capital social"
          name="capital"
          value={companyData.capital.toString()}
          onChange={(value) => setCompanyData({...companyData, capital: parseInt(value)})}
          options={capitalOptions}
        />


        {/* Additional Company Information Section */}
        <div className="border-t pt-8 mt-8">
          <h3 
            className="text-lg font-semibold text-[#071B1E] mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Informations complémentaires de la société
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Raison sociale */}
            <FormInput
              label="Raison sociale"
              name="raisonSociale"
              placeholder="Raison sociale de la société"
              value={companyData.raisonSociale}
              onChange={(value) => setCompanyData({...companyData, raisonSociale: value})}
              required
            />

            {/* Forme juridique */}
            <FormSelect
              label="Forme juridique"
              name="formeJuridique"
              value={companyData.formeJuridique}
              onChange={(value) => setCompanyData({...companyData, formeJuridique: value})}
              options={[
                { value: 'SARL', label: 'SARL (Société à Responsabilité Limitée)' },
                { value: 'SA', label: 'SA (Société Anonyme)' },
                { value: 'SNC', label: 'SNC (Société en Nom Collectif)' },
                { value: 'SAS', label: 'SAS (Société par Actions Simplifiée)' },
                { value: 'EURL', label: 'EURL (Entreprise Unipersonnelle à Responsabilité Limitée)' },
                { value: 'Auto-entrepreneur', label: 'Auto-entrepreneur' },
                { value: 'Entreprise individuelle', label: 'Entreprise individuelle' }
              ]}
              placeholder="Sélectionner une forme juridique"
              required
            />

            {/* Nationalité */}
            <FormInput
              label="Nationalité"
              name="nationalite"
              placeholder="Nationalité de la société"
              value={companyData.nationalite}
              onChange={(value) => setCompanyData({...companyData, nationalite: value})}
              required
            />

            {/* Adresse du siège social */}
            <div className="md:col-span-2">
              <FormInput
                label="Adresse du siège social ou du principal établissement"
                name="adresseSiege"
                placeholder="Adresse complète du siège social"
                value={companyData.adresseSiege}
                onChange={(value) => setCompanyData({...companyData, adresseSiege: value})}
                required
              />
            </div>

            {/* Ville du siège */}
            <FormInput
              label="Ville du siège social"
              name="villeSiege"
              placeholder="Ville du siège social"
              value={companyData.villeSiege}
              onChange={(value) => setCompanyData({...companyData, villeSiege: value})}
              required
            />

            {/* Profession ou activité principale */}
            <FormInput
              label="Profession ou activité principale"
              name="professionActivite"
              placeholder="Activité principale de la société"
              value={companyData.professionActivite}
              onChange={(value) => setCompanyData({...companyData, professionActivite: value})}
              required
            />

            {/* Téléphone */}
            <FormInput
              label="Téléphone"
              name="telephone"
              type="tel"
              placeholder="+212 6 12 34 56 78"
              value={companyData.telephone}
              onChange={(value) => setCompanyData({...companyData, telephone: value})}
              required
            />

            {/* Fax */}
            <FormInput
              label="Fax"
              name="fax"
              type="tel"
              placeholder="+212 5 22 33 44 55"
              value={companyData.fax}
              onChange={(value) => setCompanyData({...companyData, fax: value})}
            />

            {/* Email */}
            <FormInput
              label="E-mail"
              name="email"
              type="email"
              placeholder="contact@societe.ma"
              value={companyData.email}
              onChange={(value) => setCompanyData({...companyData, email: value})}
              required
            />
          </div>
        </div>

        {/* Tax and Registration Information Section */}
        <div className="border-t pt-8 mt-8">
          <h3 
            className="text-lg font-semibold text-[#071B1E] mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Informations fiscales et administratives
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* N° Taxe professionnelle */}
            <FormInput
              label="N° Taxe professionnelle"
              name="numeroArticleTaxeProfessionnelle"
              placeholder="Numéro taxe professionnelle"
              value={companyData.numeroArticleTaxeProfessionnelle}
              onChange={(value) => setCompanyData({...companyData, numeroArticleTaxeProfessionnelle: value})}
            />

            {/* N° Taxe de Services Communaux */}
            <FormInput
              label="N° Taxe de Services Communaux"
              name="numeroArticleTaxeServicesCommunaux"
              placeholder="Numéro taxe services communaux"
              value={companyData.numeroArticleTaxeServicesCommunaux}
              onChange={(value) => setCompanyData({...companyData, numeroArticleTaxeServicesCommunaux: value})}
            />

            {/* N° affiliation CNSS */}
            <FormInput
              label="N° affiliation CNSS"
              name="numeroAffiliationCNSS"
              placeholder="Numéro d&apos;affiliation CNSS"
              value={companyData.numeroAffiliationCNSS}
              onChange={(value) => setCompanyData({...companyData, numeroAffiliationCNSS: value})}
            />

            {/* N° Registre de Commerce */}
            <FormInput
              label="N° Registre de Commerce"
              name="numeroRegistreCommerce"
              placeholder="Numéro de registre de commerce"
              value={companyData.numeroRegistreCommerce}
              onChange={(value) => setCompanyData({...companyData, numeroRegistreCommerce: value})}
            />

            {/* Ville du registre de commerce */}
            <FormInput
              label="Ville du registre de commerce"
              name="villeRegistreCommerce"
              placeholder="Ville du registre de commerce"
              value={companyData.villeRegistreCommerce}
              onChange={(value) => setCompanyData({...companyData, villeRegistreCommerce: value})}
            />

            {/* Références de dépôt de la déclaration */}
            <FormInput
              label="Références de dépôt de la déclaration"
              name="referenceDepotDeclaration"
              placeholder="Référence de dépôt"
              value={companyData.referenceDepotDeclaration}
              onChange={(value) => setCompanyData({...companyData, referenceDepotDeclaration: value})}
            />

            {/* Date de dépôt */}
            <FormInput
              label="Date de dépôt de la déclaration"
              name="dateDepotDeclaration"
              type="date"
              value={companyData.dateDepotDeclaration}
              onChange={(value) => setCompanyData({...companyData, dateDepotDeclaration: value})}
            />
          </div>
        </div>

        {/* File Uploads */}
        <div className="space-y-8">
          <h3 
            className="text-lg font-semibold text-[#071B1E]"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Justificatifs requis
          </h3>

          {/* CNI des associés */}
          <div className="space-y-4">
            <h4 
              className="text-md font-medium text-gray-700"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              CNI des associés
            </h4>
            {associates.map((associate, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  {associate.prenom} {associate.nom} {associate.isGerant ? '(Gérant)' : ''}
                </p>
                <FileUpload
                  key={`cni-${index}`}
                  title=""
                  description="Téléchargez la CNI de cet associé (PDF uniquement)"
                  onUpload={(files) => onFileUpload(files, 'cni')}
                  acceptedTypes={['.pdf']}
                  maxFiles={1}
                  maxSize={5}
                  currentFiles={uploadedFiles.filter(file => file.documentType === 'cni')}
                />
              </div>
            ))}
          </div>

          {/* Siège social */}
          <div className="space-y-4">
            <h4 
              className="text-md font-medium text-gray-700"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Siège social
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-600 mb-2">
                {companyData.headquarters === 'domicile' && 'Justificatif de domicile du gérant'}
                {companyData.headquarters === 'contrat_domiciliation' && 'Contrat de domiciliation'}
                {companyData.headquarters === 'location_local' && 'Contrat de location du local'}
              </p>
              <FileUpload
                key="headquarters"
                title=""
                description="Téléchargez le document justificatif (PDF uniquement)"
                onUpload={(files) => onFileUpload(files, companyData.headquarters === 'domicile' ? 'justificatif_domicile' : companyData.headquarters === 'contrat_domiciliation' ? 'contrat_domiciliation' : 'location_local')}
                acceptedTypes={['.pdf']}
                maxFiles={1}
                maxSize={5}
                currentFiles={uploadedFiles.filter(file => 
                  file.documentType === 'justificatif_domicile' || 
                  file.documentType === 'contrat_domiciliation' ||
                  file.documentType === 'location_local'
                )}
              />
            </div>
          </div>

          {/* Justificatifs de domicile des associés */}
          <div className="space-y-4">
            <h4 
              className="text-md font-medium text-gray-700"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Justificatifs de domicile des associés
            </h4>
            {associates.map((associate, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  {associate.prenom} {associate.nom} {associate.isGerant ? '(Gérant)' : ''}
                </p>
                <FileUpload
                  key={`domicile-${index}`}
                  title=""
                  description="Téléchargez le justificatif de domicile (PDF uniquement)"
                  onUpload={(files) => onFileUpload(files, 'justificatif_domicile')}
                  acceptedTypes={['.pdf']}
                  maxFiles={1}
                  maxSize={5}
                  currentFiles={uploadedFiles.filter(file => file.documentType === 'justificatif_domicile')}
                />
              </div>
            ))}
          </div>

          {/* Autres documents */}
          <div className="space-y-4">
            <h4 
              className="text-md font-medium text-gray-700"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Autres documents
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-600 mb-2">
                Statuts, procès-verbaux, autres justificatifs
              </p>
              <FileUpload
                key="autres"
                title=""
                description="Téléchargez les autres documents requis (PDF uniquement)"
                onUpload={(files) => onFileUpload(files, 'autre')}
                acceptedTypes={['.pdf']}
                maxFiles={5}
                maxSize={10}
                currentFiles={uploadedFiles.filter(file => 
                  file.documentType === 'statuts' || 
                  file.documentType === 'acte_constitution' ||
                  file.documentType === 'autre'
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
