'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminLayout } from './components/AdminLayout';
import { useTranslations } from 'next-intl';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

interface DashboardStats {
  totalUsers: number;
  totalDossiers: number;
  totalCompanyDossiers: number;
  totalTourismDossiers: number;
  paidDossiers: number;
  completedDossiers: number;
  recentDossiers: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const t = useTranslations('Admin.Dashboard');
  const tAdmins = useTranslations('Admin.Admins');
  const [adminForm, setAdminForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [creatingAdmin, setCreatingAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    (async () => {
      try {
        const res = await fetch(`${API}/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!res.ok) {
          throw new Error('Unauthorized');
        }
        
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const createAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingAdmin(true);

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API}/admin/create-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(adminForm)
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || tAdmins('errors.create'));
      }

      // Reset form and close modal
      setAdminForm({ name: '', email: '', phone: '', password: '' });
      setShowCreateAdmin(false);
      
      // Show success message (you could add a toast notification here)
      alert(tAdmins('toasts.created'));
    } catch (err) {
      console.error('Error creating admin:', err);
      alert(err instanceof Error ? err.message : tAdmins('errors.create'));
    } finally {
      setCreatingAdmin(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
        <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#F66B4C]/30 border-t-[#F66B4C] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('loadingStats')}</p>
        </div>
      </div>
      </AdminLayout>
    );
  }

  if (!stats) return null;

  const quickActions: Array<{
    name: string;
    href?: string;
    onClick?: () => void;
    icon: React.ReactNode;
    color: string;
  }> = [
    {
      name: t('quickActions.newCompany'),
      href: '/dossiers/company',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: 'from-[#F66B4C] to-[#e55a43]'
    },
    {
      name: t('quickActions.newTourism'),
      href: '/dossiers/tourism',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      color: 'from-[#F66B4C] to-[#e55a43]'
    },
    {
      name: t('quickActions.newBlog'),
      href: '/admin/blog/new',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      color: 'from-[#F66B4C] to-[#e55a43]'
    },
    {
      name: t('quickActions.newAdmin'),
      onClick: () => setShowCreateAdmin(true),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      color: 'from-[#F66B4C] to-[#e55a43]'
    }
  ];

  return (
    <AdminLayout>
          {/* Welcome section */}
      

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 
              className="text-2xl font-bold text-[#071B1E] mb-6"
              style={{ fontFamily: '"Gascogne Serial", serif' }}
            >
              {t('quickActions.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action) => (
            action.href ? (
                <Link
                  key={action.name}
                  href={action.href}
                  className="group bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {action.icon}
                  </div>
                  <h4 
                    className="font-bold text-[#071B1E] text-lg mb-2"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {action.name}
                  </h4>
                  <p 
                    className="text-gray-600 text-sm"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('quickActions.directAccess')}
                  </p>
                </Link>
            ) : (
              <button
                key={action.name}
                onClick={action.onClick}
                className="group bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 text-left w-full"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {action.icon}
                </div>
                <h4 
                  className="font-bold text-[#071B1E] text-lg mb-2"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {action.name}
                </h4>
                <p 
                  className="text-gray-600 text-sm"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {t('quickActions.directAccess')}
                </p>
              </button>
            )
              ))}
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Users */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#062A2F] to-[#0a3b42] rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {stats.totalUsers}
                  </div>
                  <div className="text-sm text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {t('stats.users')}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('stats.usersDesc')}
              </div>
            </div>

            {/* Total Dossiers */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#062A2F] to-[#0a3b42] rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {stats.totalDossiers}
                  </div>
                  <div className="text-sm text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {t('stats.dossiers')}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('stats.dossiersDesc')}
              </div>
            </div>

            {/* Company Dossiers */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#062A2F] to-[#0a3b42] rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {stats.totalCompanyDossiers}
                  </div>
                  <div className="text-sm text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {t('stats.company')}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('stats.companyDesc')}
              </div>
            </div>

            {/* Tourism Dossiers */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#062A2F] to-[#0a3b42] rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {stats.totalTourismDossiers}
                  </div>
                  <div className="text-sm text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {t('stats.tourism')}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('stats.tourismDesc')}
              </div>
            </div>
          </div>

      

      {/* Create Admin Modal */}
      {showCreateAdmin && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
              <h3 
                className="text-2xl font-bold text-[#071B1E]"
                style={{ fontFamily: '"Gascogne Serial", serif' }}
              >
                  {tAdmins('create.title')}
              </h3>
                <button
                  onClick={() => setShowCreateAdmin(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <form onSubmit={createAdmin} className="p-6 space-y-4">
              <div>
                <label 
                  className="block text-sm font-medium text-[#071B1E] mb-2"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                  {tAdmins('create.nameReq')}
                </label>
                <input
                  type="text"
                  required
                  value={adminForm.name}
                  onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#F66B4C] focus:border-transparent"
                  placeholder={tAdmins('create.namePh')}
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
            </div>
            
              <div>
                <label 
                  className="block text-sm font-medium text-[#071B1E] mb-2"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {tAdmins('create.emailReq')}
                </label>
                <input
                  type="email"
                  required
                  value={adminForm.email}
                  onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#F66B4C] focus:border-transparent"
                  placeholder="admin@formalitys.ma"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
                  </div>

              <div>
                <label 
                  className="block text-sm font-medium text-[#071B1E] mb-2"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                  {tAdmins('create.phone')}
                </label>
                <input
                  type="tel"
                  value={adminForm.phone}
                  onChange={(e) => setAdminForm({ ...adminForm, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#F66B4C] focus:border-transparent"
                  placeholder="+212 6XX XXX XXX"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium text-[#071B1E] mb-2"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                  {tAdmins('create.passwordReq')}
                </label>
                <input
                  type="password"
                  required
                  value={adminForm.password}
                  onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#F66B4C] focus:border-transparent"
                  placeholder={tAdmins('create.passwordPh')}
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
                  </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateAdmin(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {tAdmins('create.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={creatingAdmin}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#F66B4C] to-[#e55a43] text-white rounded-2xl hover:from-[#e55a43] hover:to-[#d14a3a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {creatingAdmin ? tAdmins('create.creating') : tAdmins('create.create')}
                </button>
                </div>
            </form>
            </div>
          </div>
      )}
    </AdminLayout>
  );
}