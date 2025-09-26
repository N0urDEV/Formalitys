import React from 'react';

interface Step6FinalProps {
  onDownloadPdf: () => void;
}

export const Step6Final: React.FC<Step6FinalProps> = ({ onDownloadPdf }) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 
          className="text-2xl font-bold text-[#00171f] mb-4"
          style={{ fontFamily: '"Gascogne Serial", serif' }}
        >
          Dossier en cours de traitement
        </h2>
        <p 
          className="text-gray-600"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          Votre dossier est maintenant complet et en cours de traitement par nos équipes
        </p>
      </div>
      
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#007ea7]/10 rounded-full blur-xl"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#007ea7] to-[#00a8e8] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 
              className="text-xl font-bold text-[#00171f] mb-2"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Prochaines étapes
            </h3>
            <p 
              className="text-gray-600"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Nos experts s'occupent de votre régularisation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 
                className="font-semibold text-[#00171f]"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Validation
              </h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#007ea7] rounded-full mr-3"></div>
                  <span style={{ fontFamily: 'Satoshi, sans-serif' }}>Validation des documents et photos</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#007ea7] rounded-full mr-3"></div>
                  <span style={{ fontFamily: 'Satoshi, sans-serif' }}>Vérification de conformité</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#007ea7] rounded-full mr-3"></div>
                  <span style={{ fontFamily: 'Satoshi, sans-serif' }}>Assistance juridique</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 
                className="font-semibold text-[#00171f]"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Finalisation
              </h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#007ea7] rounded-full mr-3"></div>
                  <span style={{ fontFamily: 'Satoshi, sans-serif' }}>Validation des licences</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#007ea7] rounded-full mr-3"></div>
                  <span style={{ fontFamily: 'Satoshi, sans-serif' }}>Obtention des agréments</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#007ea7] rounded-full mr-3"></div>
                  <span style={{ fontFamily: 'Satoshi, sans-serif' }}>Classement officiel</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#007ea7] rounded-full mr-3"></div>
                  <span style={{ fontFamily: 'Satoshi, sans-serif' }}>Réception des autorisations finales</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* PDF Download Button */}
      <div className="text-center mt-8">
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
