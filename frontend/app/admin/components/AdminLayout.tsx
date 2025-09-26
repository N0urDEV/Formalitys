'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';
import { useTranslations } from 'next-intl';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('Admin.Dashboard');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.replace('/admin/login');
      return;
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#007ea7]/30 border-t-[#007ea7] rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-[#00171f] text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('loadingDashboard')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AdminSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        currentPath={pathname}
      />

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <AdminTopBar 
          setSidebarOpen={setSidebarOpen}
          currentPath={pathname}
        />

        {/* Main content area */}
        <main className="p-6 bg-gray-50 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
