import React from 'react';
import { useTranslations } from 'next-intl';
import { CompanyData, StepErrors, Associate } from '../../types';
import FileUpload from '../../../../components/FileUpload';

interface Step5RemainingDocumentsProps {
  companyData: CompanyData;
  onFileUpload: (files: File[], documentType: string) => Promise<void>;
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
  stepErrors: StepErrors;
}

export const Step5RemainingDocuments: React.FC<Step5RemainingDocumentsProps> = ({
  companyData,
  onFileUpload,
  associates,
  uploadedFiles = [],
  stepErrors
}) => {
  const t = useTranslations('Dossiers.Company.Form');

  return (
    <div className="space-y-8">
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p 
              className="text-green-800 font-medium mb-2"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Paiement confirmé! Votre dossier est complet et sera traité immédiatement.
            </p>
            <p 
              className="text-green-700 text-sm"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Après paiement, téléchargement des justificatifs. Vous pouvez maintenant uploader les documents restants pour finaliser votre dossier.
            </p>
          </div>
        </div>
      </div>

      {/* Step 5 Warning Card */}
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
              Documents restants
            </h3>
            <p 
              className="text-[#00171f]/80"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Vous devez uploader tous les documents restants (justificatif de domicile, autres documents) pour finaliser votre dossier.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 
            className="text-2xl font-bold text-[#00171f] mb-4"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Documents restants
          </h2>
          <p 
            className="text-gray-600"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Uploadez les documents restants pour finaliser votre dossier
          </p>
        </div>
        
        {/* Step 5 Error Display */}
        {stepErrors[5] && stepErrors[5].length > 0 && (
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
                  Veuillez uploader tous les documents requis :
                </h3>
                <ul className="space-y-1">
                  {stepErrors[5].map((error, index) => (
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

        {/* Siège social */}
        <div className="space-y-4">
          <h4 
            className="text-md font-medium text-gray-700"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            {t('files.siegeSocial')}
          </h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-600 mb-2">
              {companyData.headquarters === 'domicile' && t('files.justifDomicile')}
              {companyData.headquarters === 'contrat_domiciliation' && t('files.contratDomiciliation')}
              {companyData.headquarters === 'location_local' && t('files.contratLocation')}
            </p>
            <FileUpload
              key="headquarters"
              title=""
              description={t('files.uploadJustif')}
              onUpload={(files) => onFileUpload(files, companyData.headquarters === 'domicile' ? 'justificatif_domicile_gerant' : companyData.headquarters === 'contrat_domiciliation' ? 'contrat_domiciliation' : 'location_local')}
              acceptedTypes={['.pdf']}
              maxFiles={1}
              maxSize={5}
              currentFiles={uploadedFiles.filter(file => 
                file.documentType === 'justificatif_domicile_gerant' || 
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
            {t('files.justifDomicileAssocies')}
          </h4>
          {associates.map((associate, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-600 mb-2">
                {associate.prenom} {associate.nom} {associate.isGerant ? t('files.manager') : ''}
              </p>
              <FileUpload
                key={`domicile-${index}`}
                title=""
                description={t('files.uploadJustifDomicile')}
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
            {t('files.otherDocs')}
          </h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-600 mb-2">
              {t('files.otherDocsDesc')}
            </p>
            <FileUpload
              key="autres"
              title=""
              description={t('files.uploadOtherDocs')}
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
  );
};
