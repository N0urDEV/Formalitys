'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AdminLayout } from '../components/AdminLayout';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

interface Dossier {
  id: number;
  status: string;
  currentStep: number;
  createdAt: string;
  amountPaid?: number;
  user: {
    id: number;
    name?: string;
    email: string;
    phone?: string;
  };
  associates?: any;
  companyName?: string;
  ownerInfo?: any;
}

function AdminDossiersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [companyDossiers, setCompanyDossiers] = useState<Dossier[]>([]);
  const [tourismDossiers, setTourismDossiers] = useState<Dossier[]>([]);
  const [activeTab, setActiveTab] = useState<'company' | 'tourism'>('company');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
  const [loading, setLoading] = useState(true);
  const [selectedDossier, setSelectedDossier] = useState<Dossier | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.replace('/admin/login');
      return;
    }

    loadDossiers();
  }, [router, activeTab, statusFilter]);

  const loadDossiers = async () => {
    const token = localStorage.getItem('adminToken');
    setLoading(true);

    try {
      const endpoint = activeTab === 'company' ? 'company-dossiers' : 'tourism-dossiers';
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);

      const res = await fetch(`${API}/admin/${endpoint}?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Failed to load');

      const data = await res.json();
      
      if (activeTab === 'company') {
        setCompanyDossiers(data.dossiers);
      } else {
        setTourismDossiers(data.dossiers);
      }
    } catch (err) {
      console.error('Error loading dossiers:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateDossierStatus = async (id: number, status: string) => {
    const token = localStorage.getItem('adminToken');
    
    try {
      const endpoint = activeTab === 'company' ? 'company-dossiers' : 'tourism-dossiers';
      await fetch(`${API}/admin/${endpoint}/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      loadDossiers(); // Reload data
      setSelectedDossier(null);
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const currentDossiers = activeTab === 'company' ? companyDossiers : tourismDossiers;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'PAID': return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#F66B4C]/30 border-t-[#F66B4C] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>Chargement des dossiers...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      
      {/* Tabs */}
      <div className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-2 shadow-xl border border-white/20">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('company')}
              className={`flex-1 py-3 px-6 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === 'company'
                  ? 'bg-gradient-to-r from-[#F66B4C] to-[#e55a43] text-white shadow-lg'
                  : 'text-gray-600 hover:text-[#F66B4C] hover:bg-[#F66B4C]/10'
              }`}
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Création de société ({companyDossiers.length})
            </button>
            <button
              onClick={() => setActiveTab('tourism')}
              className={`flex-1 py-3 px-6 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === 'tourism'
                  ? 'bg-gradient-to-r from-[#F66B4C] to-[#e55a43] text-white shadow-lg'
                  : 'text-gray-600 hover:text-[#F66B4C] hover:bg-[#F66B4C]/10'
              }`}
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Régularisation touristique ({tourismDossiers.length})
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#F66B4C] focus:border-transparent"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            <option value="">Tous les statuts</option>
            <option value="DRAFT">Brouillon</option>
            <option value="PENDING_PAYMENT">En attente de paiement</option>
            <option value="PAID">Payé</option>
            <option value="IN_PROGRESS">En cours</option>
            <option value="COMPLETED">Terminé</option>
            <option value="CANCELLED">Annulé</option>
          </select>
        </div>
      </div>

      {/* Dossiers Table */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  Client
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  Détails
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  Étape
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  Montant
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentDossiers.map((dossier) => (
                <tr key={dossier.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    #{dossier.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#071B1E]">
                    <div>
                      <div className="font-medium" style={{ fontFamily: 'Satoshi, sans-serif' }}>{dossier.user.name || 'N/A'}</div>
                      <div className="text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>{dossier.user.email}</div>
                      {dossier.user.phone && (
                        <div className="text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>{dossier.user.phone}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#071B1E]">
                    {activeTab === 'company' ? (
                      <div>
                        {dossier.companyName && (
                          <div className="font-medium" style={{ fontFamily: 'Satoshi, sans-serif' }}>{dossier.companyName}</div>
                        )}
                        {dossier.associates && (
                          <div className="text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                            {dossier.associates.length} associé(s)
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        {dossier.ownerInfo && (
                          <div style={{ fontFamily: 'Satoshi, sans-serif' }}>
                            {dossier.ownerInfo.nom} {dossier.ownerInfo.prenom}
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(dossier.status)}`} style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {dossier.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {dossier.currentStep}/5
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {dossier.amountPaid ? `${dossier.amountPaid / 100} MAD` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {new Date(dossier.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedDossier(dossier)}
                      className="text-[#F66B4C] hover:text-[#e55a43] transition-colors"
                      title="Voir les détails"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dossier Detail Modal */}
      {selectedDossier && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 
                  className="text-2xl font-bold text-[#071B1E]"
                  style={{ fontFamily: '"Gascogne Serial", serif' }}
                >
                  Dossier #{selectedDossier.id}
                </h3>
                <button
                  onClick={() => setSelectedDossier(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    Client
                  </label>
                  <p className="text-lg text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {selectedDossier.user.name || selectedDossier.user.email}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    Statut actuel
                  </label>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedDossier.status)}`} style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {selectedDossier.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    Étape
                  </label>
                  <p className="text-lg text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {selectedDossier.currentStep}/5
                  </p>
                </div>
                {selectedDossier.amountPaid && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      Montant payé
                    </label>
                    <p className="text-lg text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {selectedDossier.amountPaid / 100} MAD
                    </p>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-[#071B1E] mb-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  Changer le statut
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['PAID', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateDossierStatus(selectedDossier.id, status)}
                      className={`px-4 py-2 text-sm rounded-2xl font-semibold transition-colors ${
                        selectedDossier.status === status
                          ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                          : 'bg-gradient-to-r from-[#F66B4C] to-[#e55a43] text-white hover:from-[#e55a43] hover:to-[#d14a3a]'
                      }`}
                      disabled={selectedDossier.status === status}
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedDossier(null)}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-2xl hover:bg-gray-400 transition-colors"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default function AdminDossiersPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminDossiersContent />
    </Suspense>
  );
}
