import React from 'react';

interface Step5FinalProps {
  onDownloadPdf: () => void;
}

export const Step5Final: React.FC<Step5FinalProps> = ({ onDownloadPdf }) => {
  return (
    <div className="text-center space-y-6">
      <h2 
        className="text-xl font-semibold text-[#00171f]"
        style={{ fontFamily: '"Gascogne Serial", serif' }}
      >
        Dossier en cours de traitement
      </h2>
      <p 
        className="text-gray-600"
        style={{ fontFamily: 'Satoshi, sans-serif' }}
      >
        Votre dossier est maintenant complet et en cours de traitement par nos équipes.
      </p>
      
      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
        <h3 
          className="font-medium mb-4 text-[#00171f]"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          Prochaines étapes:
        </h3>
        <ul className="text-sm text-gray-600 space-y-2 text-left">
          <li 
            className="flex items-center space-x-2"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            <span className="w-2 h-2 bg-[#007ea7] rounded-full"></span>
            <span>Validation des documents</span>
          </li>
          <li 
            className="flex items-center space-x-2"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            <span className="w-2 h-2 bg-[#007ea7] rounded-full"></span>
            <span>Création des statuts</span>
          </li>
          <li 
            className="flex items-center space-x-2"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            <span className="w-2 h-2 bg-[#007ea7] rounded-full"></span>
            <span>Enregistrement au registre de commerce</span>
          </li>
          <li 
            className="flex items-center space-x-2"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            <span className="w-2 h-2 bg-[#007ea7] rounded-full"></span>
            <span>Déclarations CNSS et impôts</span>
          </li>
          <li 
            className="flex items-center space-x-2"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            <span className="w-2 h-2 bg-[#007ea7] rounded-full"></span>
            <span>Réception des documents finaux</span>
          </li>
        </ul>
      </div>
      
      {/* PDF Download Button */}
      <div className="mt-8">
        <button
          onClick={onDownloadPdf}
          className="px-8 py-4 bg-gradient-to-r from-[#00171f] to-[#00171f] text-white rounded-2xl font-semibold text-lg hover:from-[#00171f] hover:to-[#00171f] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-3 mx-auto"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Télécharger le PDF du dossier</span>
        </button>
      </div>
    </div>
  );
};
