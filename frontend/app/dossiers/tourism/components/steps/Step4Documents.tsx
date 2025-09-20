import React from 'react';
import FileUpload from '../../../../components/FileUpload';
import { UploadedFiles, StepErrors } from '../../types';

interface Step4DocumentsProps {
  uploadedFiles: UploadedFiles;
  onDocumentUpload: (files: File[], documentType: string) => void;
  stepErrors: StepErrors;
}

export const Step4Documents: React.FC<Step4DocumentsProps> = ({
  uploadedFiles,
  onDocumentUpload,
  stepErrors
}) => {
  return (
    <div className="space-y-8">
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p 
            className="text-green-800 font-medium"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Paiement confirmé! Vous pouvez maintenant uploader vos documents.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 
            className="text-2xl font-bold text-[#071B1E] mb-4"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Documents et photos requis
          </h2>
          <p 
            className="text-gray-600"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Uploadez tous les documents nécessaires pour la régularisation
          </p>
        </div>
        
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
                  Veuillez uploader tous les documents requis :
                </h3>
                <ul className="space-y-1">
                  {stepErrors[4].map((error, index) => (
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

        {/* CNI Upload */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#F66B4C]/10 rounded-full blur-xl"></div>
          <div className="relative z-10">
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

        {/* Titre Foncier Upload */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#062A2F]/10 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <FileUpload
              title="Titre foncier *"
              description="Document de propriété du terrain (PDF uniquement)"
              onUpload={(files) => onDocumentUpload(files, 'titreFoncier')}
              acceptedTypes={['.pdf']}
              maxFiles={1}
              maxSize={5}
              currentFiles={uploadedFiles.titreFoncier}
            />
            {uploadedFiles.titreFoncier.length > 0 && (
              <div className="mt-3 text-green-600 text-sm">
                ✓ {uploadedFiles.titreFoncier.length} fichier(s) uploadé(s)
              </div>
            )}
          </div>
        </div>

        {/* Permis d'habiter Upload */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#F66B4C]/10 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <FileUpload
              title="Permis d'habiter ou attestation architecte *"
              description="Normes de sécurité et hygiène (PDF uniquement)"
              onUpload={(files) => onDocumentUpload(files, 'permisHabiter')}
              acceptedTypes={['.pdf']}
              maxFiles={1}
              maxSize={5}
              currentFiles={uploadedFiles.permisHabiter}
            />
            {uploadedFiles.permisHabiter.length > 0 && (
              <div className="mt-3 text-green-600 text-sm">
                ✓ {uploadedFiles.permisHabiter.length} fichier(s) uploadé(s)
              </div>
            )}
          </div>
        </div>

        {/* Assurance Upload */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#062A2F]/10 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <FileUpload
              title="Assurance habitation *"
              description="Police d'assurance de la propriété (PDF uniquement)"
              onUpload={(files) => onDocumentUpload(files, 'assurance')}
              acceptedTypes={['.pdf']}
              maxFiles={1}
              maxSize={5}
              currentFiles={uploadedFiles.assurance}
            />
            {uploadedFiles.assurance.length > 0 && (
              <div className="mt-3 text-green-600 text-sm">
                ✓ {uploadedFiles.assurance.length} fichier(s) uploadé(s)
              </div>
            )}
          </div>
        </div>

        {/* Photos Upload */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#F66B4C]/10 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <FileUpload
              title="Photos de la propriété *"
              description="Façade, chambres, cuisine, salle de bains, espaces communs, salon, terrasse, jardin (PDF uniquement)"
              onUpload={(files) => onDocumentUpload(files, 'photos')}
              acceptedTypes={['.pdf']}
              maxFiles={15}
              maxSize={5}
              currentFiles={uploadedFiles.photos}
            />
            {uploadedFiles.photos.length > 0 && (
              <div className="mt-3 text-green-600 text-sm">
                ✓ {uploadedFiles.photos.length} photo(s) uploadée(s)
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
