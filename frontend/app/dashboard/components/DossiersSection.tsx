import React from 'react';
import Link from 'next/link';
import { Dossier } from '../types';
import { DossierStats } from './DossierStats';
import { DossierCard } from './DossierCard';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('DashboardComponents.DossiersSection');
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 border-4 border-[#007ea7]/30 border-t-[#007ea7] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          {t('loading')}
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
            <div className="w-24 h-24 bg-gradient-to-br from-[#007ea7]/20 to-[#00a8e8]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-[#007ea7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 
              className="text-2xl font-bold text-[#00171f] mb-4"
              style={{ fontFamily: '"Gascogne Serial", serif' }}
            >
              {t('emptyTitle')}
            </h3>
            <p 
              className="text-gray-600 mb-8 max-w-md mx-auto"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {t('emptySubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dossiers/company"
                className="bg-gradient-to-r from-[#007ea7] to-[#00a8e8] text-white px-8 py-4 rounded-2xl font-semibold hover:from-[#00a8e8] hover:to-[#007ea7] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {t('ctaCompany')}
              </Link>
              <Link
                href="/dossiers/tourism"
                className="bg-gradient-to-r from-[#00171f] to-[#003459] text-white px-8 py-4 rounded-2xl font-semibold hover:from-[#003459] hover:to-[#00171f] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {t('ctaTourism')}
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
