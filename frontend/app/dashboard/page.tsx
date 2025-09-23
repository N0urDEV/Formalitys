'use client';
import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useDashboard } from './hooks/useDashboard';
import { DashboardLayout } from './components/DashboardLayout';
import { DashboardNavigation } from './components/DashboardNavigation';
import { DashboardHeader } from './components/DashboardHeader';
import { ServicesGrid } from './components/ServicesGrid';
import { DossiersSection } from './components/DossiersSection';
import { DiscountStatus } from './components/DiscountStatus';

export default function DashboardPage() {
  const t = useTranslations('Dashboard');
  const {
    user,
    dossiers,
    loading,
    dossiersLoading,
    activeTab,
    setActiveTab,
    refreshDossiers,
    deleteDossier,
    handleLogout,
    getStats,
    discountStatus,
    downloadPdf,
  } = useDashboard({ t });

  // Refresh dossiers when user returns to dashboard (e.g., after payment)
  useEffect(() => {
    const handleFocus = () => {
      console.log('Window focused, refreshing dossiers...');
      refreshDossiers();
    };

    window.addEventListener('focus', handleFocus);
    
    // Also refresh when component mounts (in case user navigated back)
    refreshDossiers();

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [refreshDossiers]);

  return (
    <DashboardLayout loading={loading}>
      <DashboardNavigation user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <DashboardHeader 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          dossiersCount={dossiers.length} 
        />

        {discountStatus && (
          <DiscountStatus discountStatus={discountStatus} />
        )}

        {activeTab === 'services' && <ServicesGrid discountStatus={discountStatus} />}
        
        {activeTab === 'dossiers' && (
          <DossiersSection 
            dossiers={dossiers}
            loading={dossiersLoading}
            onDelete={deleteDossier}
            onDownloadPdf={downloadPdf}
            stats={getStats()}
          />
        )}
      </main>
    </DashboardLayout>
  );
}
