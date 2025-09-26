import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { User } from '../types';

interface DashboardNavigationProps {
  user: User | null;
  onLogout: () => void;
}

export const DashboardNavigation: React.FC<DashboardNavigationProps> = ({ 
  user, 
  onLogout 
}) => {
  const t = useTranslations('Dashboard.Navigation');
  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="flex items-center"
          >
            <img 
              src="/SVG/Asset 1.svg" 
              alt="Formalitys" 
              className="h-10 w-auto"
            />
          </Link>
          <div className="flex items-center space-x-4">
            
            <button
              onClick={onLogout}
              className="text-gray-500 hover:text-[#007ea7] transition-colors"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
{t('logout')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
