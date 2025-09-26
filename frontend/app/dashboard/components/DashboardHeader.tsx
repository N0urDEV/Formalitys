import React from 'react';
import { ActiveTab } from '../types';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('Dashboard');
  return (
    <div className="text-center mb-12">
      <h1 
        className="text-4xl lg:text-5xl font-bold text-[#00171f] mb-6"
        style={{ fontFamily: '"Gascogne Serial", serif' }}
      >
        {t('title')}
      </h1>
      <p 
        className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
        style={{ fontFamily: 'Satoshi, sans-serif' }}
      >
        {t('subtitle')}
      </p>

      {/* Tab Navigation */}
      <div className="flex justify-center space-x-2 bg-white/50 backdrop-blur-sm rounded-2xl p-2 max-w-md mx-auto">
        <button
          onClick={() => onTabChange('services')}
          className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
            activeTab === 'services'
              ? 'bg-[#007ea7] text-white shadow-lg'
              : 'text-gray-600 hover:text-[#007ea7] hover:bg-[#007ea7]/10'
          }`}
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          {t('tabs.services')}
        </button>
        <button
          onClick={() => onTabChange('dossiers')}
          className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
            activeTab === 'dossiers'
              ? 'bg-[#007ea7] text-white shadow-lg'
              : 'text-gray-600 hover:text-[#007ea7] hover:bg-[#007ea7]/10'
          }`}
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          {t('tabs.dossiers', { count: dossiersCount })}
        </button>
      </div>
    </div>
  );
};
