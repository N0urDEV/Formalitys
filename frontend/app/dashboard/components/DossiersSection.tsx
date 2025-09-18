import React from 'react';
import Link from 'next/link';
import { Dossier } from '../types';
import { DossierStats } from './DossierStats';
import { DossierCard } from './DossierCard';

interface DossiersSectionProps {
  dossiers: Dossier[];
  loading: boolean;
  onDelete: (dossierId: number, type: 'company' | 'tourism') => void;
  onDownloadPdf?: (dossierId: number, type: 'company' | 'tourism') => void;
  stats: {
    totalDossiers: number;
    completedDossiers: number;
    inProgressDossiers: number;
  };
}

export const DossiersSection: React.FC<DossiersSectionProps> = ({ 
  dossiers, 
  loading, 
  onDelete, 
  onDownloadPdf,
  stats 
}) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 border-4 border-[#F66B4C]/30 border-t-[#F66B4C] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          Chargement de vos dossiers...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-8">
        {/* Header with Statistics */}
        <DossierStats stats={stats} />

        {/* Dossiers Content */}
        {dossiers.length === 0 ? (
          <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20">
            <div className="w-24 h-24 bg-gradient-to-br from-[#F66B4C]/20 to-[#e55a43]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-[#F66B4C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 
              className="text-2xl font-bold text-[#071B1E] mb-4"
              style={{ fontFamily: '"Gascogne Serial", serif' }}
            >
              Aucun dossier créé
            </h3>
            <p 
              className="text-gray-600 mb-8 max-w-md mx-auto"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Commencez par créer votre premier dossier. Vous pouvez créer autant de dossiers que nécessaire pour différentes entreprises ou activités.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dossiers/company"
                className="bg-gradient-to-r from-[#F66B4C] to-[#e55a43] text-white px-8 py-4 rounded-2xl font-semibold hover:from-[#e55a43] hover:to-[#F66B4C] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Créer une société
              </Link>
              <Link
                href="/dossiers/tourism"
                className="bg-gradient-to-r from-[#062A2F] to-[#0a3b42] text-white px-8 py-4 rounded-2xl font-semibold hover:from-[#0a3b42] hover:to-[#062A2F] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Régulariser une activité
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Dossiers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {dossiers.map((dossier) => (
                <DossierCard 
                  key={`${dossier.type}-${dossier.id}`} 
                  dossier={dossier} 
                  onDelete={onDelete} 
                  onDownloadPdf={onDownloadPdf}
                />
              ))}
            </div>

            
          </div>
        )}
      </div>
    </div>
  );
};
