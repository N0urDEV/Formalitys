import React from 'react';
import { DashboardStats } from '../types';

interface DossierStatsProps {
  stats: DashboardStats;
}

export const DossierStats: React.FC<DossierStatsProps> = ({ stats }) => {
  return (
    <div className="bg-gradient-to-r from-[#F66B4C] to-[#e55a43] rounded-3xl p-8 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h2 
              className="text-3xl font-bold mb-2"
              style={{ fontFamily: '"Gascogne Serial", serif' }}
            >
              Mes Dossiers
            </h2>
            <p 
              className="text-white/90 text-lg"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Gérez tous vos dossiers juridiques en un seul endroit
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="flex space-x-6 mt-4 lg:mt-0">
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {stats.totalDossiers}
              </div>
              <div className="text-white/80 text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                Total
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {stats.completedDossiers}
              </div>
              <div className="text-white/80 text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                Terminés
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {stats.inProgressDossiers}
              </div>
              <div className="text-white/80 text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                En cours
              </div>
            </div>
          </div>
        </div>

        {/* Quick Create Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/dossiers/company"
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center justify-center space-x-2"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Nouvelle société</span>
          </a>
          <a
            href="/dossiers/tourism"
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center justify-center space-x-2"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Nouvelle régularisation</span>
          </a>
        </div>
      </div>
    </div>
  );
};
