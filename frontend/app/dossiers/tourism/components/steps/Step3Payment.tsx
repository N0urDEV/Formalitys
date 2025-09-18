import React from 'react';

export const Step3Payment: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 
          className="text-2xl font-bold text-[#071B1E] mb-4"
          style={{ fontFamily: '"Gascogne Serial", serif' }}
        >
          Paiement requis
        </h2>
        <p 
          className="text-gray-600"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          Pour continuer, vous devez effectuer le paiement de 1600 MAD
        </p>
      </div>
      
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#F66B4C]/10 rounded-full blur-xl"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#F66B4C] to-[#e55a43] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 
              className="text-xl font-bold text-[#071B1E] mb-2"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Aperçu de l'étape suivante
            </h3>
            <p 
              className="text-gray-600"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Après le paiement, vous pourrez compléter votre dossier
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 
                className="font-semibold text-[#071B1E]"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Documents requis
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#F66B4C] rounded-full mr-3"></div>
                  <span style={{ fontFamily: 'Satoshi, sans-serif' }}>CNI du propriétaire</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#F66B4C] rounded-full mr-3"></div>
                  <span style={{ fontFamily: 'Satoshi, sans-serif' }}>Titre foncier</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#F66B4C] rounded-full mr-3"></div>
                  <span style={{ fontFamily: 'Satoshi, sans-serif' }}>Assurance habitation</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#F66B4C] rounded-full mr-3"></div>
                  <span style={{ fontFamily: 'Satoshi, sans-serif' }}>Permis d'habiter</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 
                className="font-semibold text-[#071B1E]"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Photos requises
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#F66B4C] rounded-full mr-3"></div>
                  <span style={{ fontFamily: 'Satoshi, sans-serif' }}>Façade de la propriété</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#F66B4C] rounded-full mr-3"></div>
                  <span style={{ fontFamily: 'Satoshi, sans-serif' }}>Chambres</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#F66B4C] rounded-full mr-3"></div>
                  <span style={{ fontFamily: 'Satoshi, sans-serif' }}>Cuisine</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#F66B4C] rounded-full mr-3"></div>
                  <span style={{ fontFamily: 'Satoshi, sans-serif' }}>Salle de bains</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
