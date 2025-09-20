'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface DossierFile {
  id: string;
  filename: string;
  originalName: string;
  documentType: string;
  size: number;
  mimetype: string;
  url: string;
  uploadedAt: string;
}

interface Dossier {
  id: number;
  type: 'company' | 'tourism';
  status: string;
  currentStep: number;
  amountPaid: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  uploadedFiles: DossierFile[];
}

interface DossiersResponse {
  dossiers: Dossier[];
  total: number;
  pages: number;
  companyTotal: number;
  tourismTotal: number;
}

export default function AdminDossiersPage() {
  const router = useRouter();
  const [dossiers, setDossiers] = useState<Dossier[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedType, setSelectedType] = useState<'all' | 'company' | 'tourism'>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDossier, setSelectedDossier] = useState<Dossier | null>(null);
  const [showFilesModal, setShowFilesModal] = useState(false);

  useEffect(() => {
    fetchDossiers();
  }, [currentPage, selectedType, selectedStatus]);

  const fetchDossiers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
      });
      
      if (selectedType !== 'all') {
        params.append('type', selectedType);
      }
      
      if (selectedStatus !== 'all') {
        params.append('status', selectedStatus);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/dossiers?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dossiers');
      }

      const data: DossiersResponse = await response.json();
      setDossiers(data.dossiers);
      setTotalPages(data.pages);
      setTotal(data.total);
    } catch (error) {
      console.error('Error fetching dossiers:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'PAID': return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS': return 'bg-purple-100 text-purple-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return 'En attente';
      case 'PAID': return 'Payé';
      case 'IN_PROGRESS': return 'En cours';
      case 'COMPLETED': return 'Terminé';
      case 'CANCELLED': return 'Annulé';
      default: return status;
    }
  };

  const handleViewFiles = (dossier: Dossier) => {
    setSelectedDossier(dossier);
    setShowFilesModal(true);
  };

  const handleDownloadFile = (file: DossierFile) => {
    window.open(file.url, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#F66B4C]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Gascogne Serial, serif' }}>
            Gestion des Dossiers
          </h1>
          <p className="text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            Consultez et gérez tous les dossiers des utilisateurs avec leurs fichiers
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                Type de dossier
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as 'all' | 'company' | 'tourism')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F66B4C] focus:border-transparent"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                <option value="all">Tous les dossiers</option>
                <option value="company">Création SARL</option>
                <option value="tourism">Hébergement touristique</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                Statut
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F66B4C] focus:border-transparent"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                <option value="all">Tous les statuts</option>
                <option value="PENDING">En attente</option>
                <option value="PAID">Payé</option>
                <option value="IN_PROGRESS">En cours</option>
                <option value="COMPLETED">Terminé</option>
                <option value="CANCELLED">Annulé</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={fetchDossiers}
                className="w-full bg-[#F66B4C] text-white px-4 py-2 rounded-md hover:bg-[#e55a43] transition-colors duration-200 font-medium"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Filtrer
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>Total dossiers</p>
                <p className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Gascogne Serial, serif' }}>{total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>Terminés</p>
                <p className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Gascogne Serial, serif' }}>
                  {dossiers.filter(d => d.status === 'COMPLETED').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>En cours</p>
                <p className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Gascogne Serial, serif' }}>
                  {dossiers.filter(d => d.status === 'IN_PROGRESS').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dossiers Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    Utilisateur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    Montant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    Fichiers
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dossiers.map((dossier) => (
                  <tr key={`${dossier.type}-${dossier.id}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                          {dossier.user.name}
                        </div>
                        <div className="text-sm text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                          {dossier.user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        {dossier.type === 'company' ? 'Création SARL' : 'Hébergement touristique'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(dossier.status)}`} style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        {getStatusText(dossier.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {dossier.amountPaid} DH
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {dossier.uploadedFiles.length} fichier{dossier.uploadedFiles.length > 1 ? 's' : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {new Date(dossier.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewFiles(dossier)}
                        className="text-[#F66B4C] hover:text-[#e55a43] transition-colors duration-200"
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                      >
                        Voir les fichiers
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Précédent
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    Affichage de <span className="font-medium">{(currentPage - 1) * 20 + 1}</span> à{' '}
                    <span className="font-medium">{Math.min(currentPage * 20, total)}</span> sur{' '}
                    <span className="font-medium">{total}</span> résultats
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === currentPage
                            ? 'z-10 bg-[#F66B4C] border-[#F66B4C] text-white'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                      >
                        {page}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Files Modal */}
        {showFilesModal && selectedDossier && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900" style={{ fontFamily: 'Gascogne Serial, serif' }}>
                    Fichiers du dossier - {selectedDossier.user.name}
                  </h3>
                  <button
                    onClick={() => setShowFilesModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  {selectedDossier.uploadedFiles.length === 0 ? (
                    <p className="text-gray-500 text-center py-8" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      Aucun fichier uploadé pour ce dossier
                    </p>
                  ) : (
                    selectedDossier.uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-[#F66B4C] rounded-lg flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                              {file.originalName}
                            </p>
                            <p className="text-sm text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                              {file.documentType} • {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownloadFile(file)}
                          className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-[#F66B4C] hover:bg-[#e55a43] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F66B4C] transition-colors duration-200"
                          style={{ fontFamily: 'Satoshi, sans-serif' }}
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Télécharger
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowFilesModal(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}