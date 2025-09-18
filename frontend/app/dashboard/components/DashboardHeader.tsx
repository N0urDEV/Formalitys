import React from 'react';
import { ActiveTab } from '../types';

interface DashboardHeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  dossiersCount: number;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  activeTab, 
  onTabChange, 
  dossiersCount 
}) => {
  return (
    <div className="text-center mb-12">
      <h1 
        className="text-4xl lg:text-5xl font-bold text-[#071B1E] mb-6"
        style={{ fontFamily: '"Gascogne Serial", serif' }}
      >
        Tableau de bord
      </h1>
      <p 
        className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
        style={{ fontFamily: 'Satoshi, sans-serif' }}
      >
        Gérez vos dossiers et choisissez de nouveaux services
      </p>

      {/* Tab Navigation */}
      <div className="flex justify-center space-x-2 bg-white/50 backdrop-blur-sm rounded-2xl p-2 max-w-md mx-auto">
        <button
          onClick={() => onTabChange('services')}
          className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
            activeTab === 'services'
              ? 'bg-[#F66B4C] text-white shadow-lg'
              : 'text-gray-600 hover:text-[#F66B4C] hover:bg-[#F66B4C]/10'
          }`}
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          Nouveaux services
        </button>
        <button
          onClick={() => onTabChange('dossiers')}
          className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
            activeTab === 'dossiers'
              ? 'bg-[#F66B4C] text-white shadow-lg'
              : 'text-gray-600 hover:text-[#F66B4C] hover:bg-[#F66B4C]/10'
          }`}
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          Mes dossiers ({dossiersCount})
        </button>
      </div>
    </div>
  );
};
