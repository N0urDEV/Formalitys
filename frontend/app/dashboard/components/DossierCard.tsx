import React from 'react';
import { useRouter } from 'next/navigation';
import { Dossier } from '../types';

interface DossierCardProps {
  dossier: Dossier;
  onDelete: (dossierId: number, type: 'company' | 'tourism') => void;
  onDownloadPdf?: (dossierId: number, type: 'company' | 'tourism') => void;
}

export const DossierCard: React.FC<DossierCardProps> = ({ dossier, onDelete, onDownloadPdf }) => {
  const router = useRouter();

  const getStatusInfo = (status: string) => {
    console.log('DossierCard - Status received:', status, 'for dossier:', dossier.id);
    switch (status) {
      case 'COMPLETED':
        return { text: 'Terminé', class: 'bg-green-100 text-green-800' };
      case 'PAID':
        return { text: 'Payé', class: 'bg-blue-100 text-blue-800' };
      case 'DRAFT':
      default:
        return { text: 'Brouillon', class: 'bg-gray-100 text-gray-800' };
    }
  };

  const statusInfo = getStatusInfo(dossier.status);
  
  // Check if dossier is completed (all steps done and paid)
  const isCompleted = dossier.status === 'COMPLETED' || 
    (dossier.status === 'PAID' && (
      (dossier.type === 'company' && dossier.currentStep >= 5) ||
      (dossier.type === 'tourism' && dossier.currentStep >= 6)
    )) ||
    // Also consider completed if all steps are done regardless of status
    ((dossier.type === 'company' && dossier.currentStep >= 5) ||
     (dossier.type === 'tourism' && dossier.currentStep >= 6));

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
      {/* Decorative Elements */}
      <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-xl group-hover:scale-110 transition-transform duration-300 ${
        dossier.type === 'company' 
          ? 'bg-[#F66B4C]/10' 
          : 'bg-[#062A2F]/10'
      }`}></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
              dossier.type === 'company' 
                ? 'bg-gradient-to-br from-[#F66B4C] to-[#e55a43]' 
                : 'bg-gradient-to-br from-[#062A2F] to-[#0a3b42]'
            }`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {dossier.type === 'company' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                )}
              </svg>
            </div>
            <div>
              <h3 
                className="font-bold text-[#071B1E] text-lg"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {dossier.type === 'company' ? 'Création société' : 'Régularisation touristique'}
              </h3>
              <p 
                className="text-sm text-gray-500"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Dossier #{dossier.id}
              </p>
            </div>
          </div>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusInfo.class}`} style={{ fontFamily: 'Satoshi, sans-serif' }}>
            {statusInfo.text}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span 
              className="text-sm font-medium text-gray-600"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Progression
            </span>
            <span 
              className="text-sm font-medium text-[#F66B4C]"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {dossier.currentStep}/{dossier.type === 'company' ? 5 : 6}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#F66B4C] to-[#e55a43] h-2 rounded-full transition-all duration-500"
              style={{ width: `${(dossier.currentStep / (dossier.type === 'company' ? 5 : 6)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4 mb-6">
          {dossier.type === 'company' && dossier.companyName && (
            <div className="bg-gray-50 rounded-xl p-3">
              <p 
                className="text-xs text-gray-500 mb-1"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Nom de la société
              </p>
              <p 
                className="font-semibold text-[#071B1E]"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {dossier.companyName}
              </p>
            </div>
          )}
          
          {dossier.type === 'tourism' && dossier.ownerInfo && (
            <div className="bg-gray-50 rounded-xl p-3">
              <p 
                className="text-xs text-gray-500 mb-1"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Propriétaire
              </p>
              <p 
                className="font-semibold text-[#071B1E]"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {dossier.ownerInfo.nom} {dossier.ownerInfo.prenom}
              </p>
            </div>
          )}

          <div className="flex justify-between items-center">
            <div>
              <p 
                className="text-xs text-gray-500"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Créé le
              </p>
              <p 
                className="font-medium text-[#071B1E]"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {new Date(dossier.createdAt).toLocaleDateString('fr-FR')}
              </p>
            </div>
            
            {dossier.amountPaid && (
              <div className="text-right">
                <p 
                  className="text-xs text-gray-500"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Montant payé
                </p>
                <p 
                  className="font-bold text-[#F66B4C]"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {dossier.amountPaid / 100} MAD
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          {isCompleted ? (
            <button
              onClick={() => onDownloadPdf?.(dossier.id, dossier.type)}
              className="flex-1 bg-gradient-to-r from-[#062A2F] to-[#071B1E] text-white px-4 py-3 rounded-xl font-semibold text-sm hover:from-[#071B1E] hover:to-[#062A2F] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Télécharger PDF</span>
            </button>
          ) : (
            <button
              onClick={() => router.push(`/dossiers/${dossier.type}?edit=${dossier.id}`)}
              className="flex-1 bg-gradient-to-r from-[#F66B4C] to-[#e55a43] text-white px-4 py-3 rounded-xl font-semibold text-sm hover:from-[#e55a43] hover:to-[#F66B4C] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Continuer</span>
            </button>
          )}
          
          <button
            onClick={() => onDelete(dossier.id, dossier.type)}
            className="px-4 py-3 bg-red-50 text-red-600 rounded-xl font-semibold text-sm hover:bg-red-100 transition-all duration-300 flex items-center justify-center"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
