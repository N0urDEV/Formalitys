'use client';
import React from 'react';
import { useDashboard } from './hooks/useDashboard';
import { DashboardLayout } from './components/DashboardLayout';
import { DashboardNavigation } from './components/DashboardNavigation';
import { DashboardHeader } from './components/DashboardHeader';
import { ServicesGrid } from './components/ServicesGrid';
import { DossiersSection } from './components/DossiersSection';

export default function DashboardPage() {
  const {
    user,
    dossiers,
    loading,
    dossiersLoading,
    activeTab,
    setActiveTab,
    deleteDossier,
    handleLogout,
    getStats,
  } = useDashboard();

  return (
    <DashboardLayout loading={loading}>
      <DashboardNavigation user={user} onLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <DashboardHeader 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          dossiersCount={dossiers.length} 
        />

        {activeTab === 'services' && <ServicesGrid />}
        
        {activeTab === 'dossiers' && (
          <DossiersSection 
            dossiers={dossiers}
            loading={dossiersLoading}
            onDelete={deleteDossier}
            stats={getStats()}
          />
        )}
      </main>
    </DashboardLayout>
  );
}
