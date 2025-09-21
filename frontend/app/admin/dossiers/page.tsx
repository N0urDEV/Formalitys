'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '../components/AdminLayout';

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
  // Company dossier fields (stored in JSON)
  companyName?: string;
  headquarters?: string;
  capital?: number;
  selectedBank?: string;
  activities?: any[];
  proposedNames?: any[];
  associates?: any[];
  raisonSociale?: string;
  formeJuridique?: string;
  nationalite?: string;
  adresseSiege?: string;
  villeSiege?: string;
  professionActivite?: string;
  telephone?: string;
  fax?: string;
  email?: string;
  numeroArticleTaxeProfessionnelle?: string;
  numeroArticleTaxeServicesCommunaux?: string;
  numeroAffiliationCNSS?: string;
  numeroRegistreCommerce?: string;
  villeRegistreCommerce?: string;
  // Tourism dossier fields (stored in JSON)
  establishmentName?: string;
  establishmentType?: string;
  category?: string;
  businessInfo?: any;
  ownerInfo?: any;
  establishmentInfo?: any;
  propertyDetails?: any;
  complianceAnswers?: any;
  // JSON fields that contain the actual data
  ownerInfoJson?: any;
  establishmentInfoJson?: any;
  propertyDetailsJson?: any;
  complianceAnswersJson?: any;
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
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        router.replace('/admin/login');
        return;
      }
      
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
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          router.replace('/admin/login');
          return;
        }
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

  const formatAmount = (amount: any) => {
    if (!amount) return '0 DH';
    
    let numericAmount = 0;
    
    // Handle different amount formats
    if (typeof amount === 'number') {
      numericAmount = amount;
    } else if (typeof amount === 'string') {
      // Remove any dollar signs and clean up the string
      const cleanAmount = amount.replace(/\$/g, '').replace(/[^\d.,]/g, '');
      numericAmount = parseFloat(cleanAmount.replace(',', '.'));
    } else if (Array.isArray(amount)) {
      // If it's an array, try to extract the first numeric value
      const firstAmount = amount.find(item => typeof item === 'number' || !isNaN(parseFloat(item)));
      if (firstAmount) {
        numericAmount = parseFloat(firstAmount);
      }
    }
    
    if (isNaN(numericAmount)) {
      return '0 DH';
    }
    
    // Convert from cents to main currency unit (divide by 100)
    const amountInDH = numericAmount / 100;
    
    // Format with French locale (spaces as thousands separators)
    return `${amountInDH.toLocaleString('fr-FR')} DH`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800';
      case 'PAID': return 'bg-gradient-to-r from-[#F66B4C]/10 to-[#e55a43]/10 text-[#F66B4C] border border-[#F66B4C]/20';
      case 'IN_PROGRESS': return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800';
      case 'COMPLETED': return 'bg-gradient-to-r from-green-100 to-green-200 text-green-800';
      case 'CANCELLED': return 'bg-gradient-to-r from-red-100 to-red-200 text-red-800';
      default: return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800';
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
    // Create a temporary link to download the file
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.originalName || file.filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadDossierPDF = async (dossier: Dossier) => {
    try {
      // Show loading state
      const loadingToast = document.createElement('div');
      loadingToast.className = 'fixed top-4 right-4 bg-[#F66B4C] text-white px-6 py-3 rounded-lg shadow-lg z-50';
      loadingToast.innerHTML = `
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Génération du PDF en cours...</span>
        </div>
      `;
      document.body.appendChild(loadingToast);

      // Import PDF service
      const { PDFService } = await import('../../services/pdfService');
      
      // Prepare user data
      const userData = {
        name: dossier.user.name || 'Utilisateur',
        email: dossier.user.email || '',
        phone: dossier.user.phone || '',
      };

      if (dossier.type === 'company') {
        // Prepare company dossier data - use same structure as dashboard
        const dossierData = {
          id: dossier.id,
          companyName: dossier.companyName || '',
          headquarters: dossier.headquarters || '',
          capital: dossier.capital || 0,
          selectedBank: dossier.selectedBank || '',
          activities: dossier.activities || [],
          proposedNames: dossier.proposedNames || [],
          associates: dossier.associates || [],
          createdAt: dossier.createdAt,
          status: dossier.status,
        };

        await PDFService.generateAndDownloadCompanyDossier(userData, dossierData);
      } else {
        // Prepare tourism dossier data - use same structure as dashboard
        const dossierData = {
          id: dossier.id,
          establishmentName: dossier.establishmentName || '',
          establishmentType: dossier.establishmentType || '',
          address: (dossier.propertyDetailsJson?.address || dossier.propertyDetails?.address || ''),
          city: (dossier.propertyDetailsJson?.city || dossier.propertyDetails?.city || ''),
          capacity: (dossier.propertyDetailsJson?.capacity || dossier.propertyDetails?.capacity || 0),
          ownerInfo: dossier.ownerInfo || dossier.ownerInfoJson || {},
          createdAt: dossier.createdAt,
          status: dossier.status,
        };

        await PDFService.generateAndDownloadTourismDossier(userData, dossierData);
      }

      // Remove loading toast
      document.body.removeChild(loadingToast);

      // Show success toast
      const successToast = document.createElement('div');
      successToast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      successToast.innerHTML = `
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>PDF téléchargé avec succès!</span>
        </div>
      `;
      document.body.appendChild(successToast);
      setTimeout(() => document.body.removeChild(successToast), 3000);

    } catch (error) {
      console.error('Error generating PDF:', error);
      
      // Remove loading toast if it exists
      const loadingToast = document.querySelector('.fixed.top-4.right-4');
      if (loadingToast) {
        document.body.removeChild(loadingToast);
      }

      // Show error toast
      const errorToast = document.createElement('div');
      errorToast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      errorToast.innerHTML = `
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <span>Erreur lors de la génération du PDF</span>
        </div>
      `;
      document.body.appendChild(errorToast);
      setTimeout(() => document.body.removeChild(errorToast), 5000);
    }
  };

  const handleDownloadAllFiles = async (dossier: Dossier) => {
    if (dossier.uploadedFiles.length === 0) {
      alert('Aucun fichier à télécharger pour ce dossier');
      return;
    }

    try {
      // Show loading state
      const loadingToast = document.createElement('div');
      loadingToast.className = 'fixed top-4 right-4 bg-[#F66B4C] text-white px-6 py-3 rounded-lg shadow-lg z-50';
      loadingToast.innerHTML = `
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Téléchargement des fichiers...</span>
        </div>
      `;
      document.body.appendChild(loadingToast);

      // Download each file
      for (let i = 0; i < dossier.uploadedFiles.length; i++) {
        const file = dossier.uploadedFiles[i];
        const link = document.createElement('a');
        link.href = file.url;
        link.download = file.originalName || file.filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Add a small delay between downloads to avoid overwhelming the browser
        if (i < dossier.uploadedFiles.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      // Remove loading toast
      document.body.removeChild(loadingToast);

      // Show success toast
      const successToast = document.createElement('div');
      successToast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      successToast.innerHTML = `
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>${dossier.uploadedFiles.length} fichier(s) téléchargé(s)!</span>
        </div>
      `;
      document.body.appendChild(successToast);
      setTimeout(() => document.body.removeChild(successToast), 3000);

    } catch (error) {
      console.error('Error downloading files:', error);
      
      // Remove loading toast if it exists
      const loadingToast = document.querySelector('.fixed.top-4.right-4');
      if (loadingToast) {
        document.body.removeChild(loadingToast);
      }

      // Show error toast
      const errorToast = document.createElement('div');
      errorToast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      errorToast.innerHTML = `
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <span>Erreur lors du téléchargement</span>
        </div>
      `;
      document.body.appendChild(errorToast);
      setTimeout(() => document.body.removeChild(errorToast), 5000);
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
      

      {/* Search and filters */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F66B4C]/10 to-[#e55a43]/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#071B1E] mb-3" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#F66B4C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Type de dossier</span>
                </div>
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as 'all' | 'company' | 'tourism')}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#F66B4C] focus:border-transparent bg-gray-50/50 transition-all duration-300 hover:bg-white"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                <option value="all">Tous les dossiers</option>
                <option value="company">Création SARL</option>
                <option value="tourism">Hébergement touristique</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#071B1E] mb-3" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#F66B4C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Statut</span>
                </div>
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#F66B4C] focus:border-transparent bg-gray-50/50 transition-all duration-300 hover:bg-white"
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
                className="w-full bg-gradient-to-r from-[#F66B4C] to-[#e55a43] text-white px-6 py-3 rounded-2xl hover:from-[#e55a43] hover:to-[#d14a3a] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                  </svg>
                  <span>Filtrer</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#F66B4C]/10 to-[#e55a43]/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F66B4C] to-[#e55a43] rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>Total dossiers</p>
                <p className="text-3xl font-bold text-[#071B1E]" style={{ fontFamily: '"Gascogne Serial", serif' }}>{total}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#062A2F]/10 to-[#0a3b42]/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-[#062A2F] to-[#0a3b42] rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>Terminés</p>
                <p className="text-3xl font-bold text-[#071B1E]" style={{ fontFamily: '"Gascogne Serial", serif' }}>
                  {dossiers.filter(d => d.status === 'COMPLETED').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#F66B4C]/20 to-[#e55a43]/20 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F66B4C] to-[#e55a43] rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>En cours</p>
                <p className="text-3xl font-bold text-[#071B1E]" style={{ fontFamily: '"Gascogne Serial", serif' }}>
                  {dossiers.filter(d => d.status === 'IN_PROGRESS').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dossiers Table */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-center justify-between">
            <h3 
              className="text-lg font-semibold text-[#071B1E] flex items-center space-x-2"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              <svg className="w-5 h-5 text-[#F66B4C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Liste des Dossiers</span>
            </h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#F66B4C]/5 to-[#e55a43]/5">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#071B1E] uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Utilisateur</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#071B1E] uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Type</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#071B1E] uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Statut</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#071B1E] uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span>Montant</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#071B1E] uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span>Fichiers</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#071B1E] uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h6m-6 0l-3 3m3-3l3 3m-3-3v10a2 2 0 002 2h4a2 2 0 002-2V7" />
                    </svg>
                    <span>Date</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#071B1E] uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Actions</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dossiers.map((dossier, index) => (
                <tr key={`${dossier.type}-${dossier.id}`} className={`hover:bg-gradient-to-r hover:from-[#F66B4C]/5 hover:to-[#e55a43]/5 transition-all duration-300 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#F66B4C] to-[#e55a43] rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                            {dossier.user.name ? dossier.user.name.charAt(0).toUpperCase() : dossier.user.email.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                          {dossier.user.name || 'Non renseigné'}
                        </div>
                        <div className="text-sm text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                          {dossier.user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#062A2F]/10 to-[#0a3b42]/10 text-[#062A2F] border border-[#062A2F]/20" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {dossier.type === 'company' ? 'Création SARL' : 'Hébergement touristique'}
                    </span>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(dossier.status)}`} style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {getStatusText(dossier.status)}
                    </span>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <span className="text-[#071B1E] font-semibold" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        {formatAmount(dossier.amountPaid)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="text-[#071B1E] font-semibold" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        {dossier.uploadedFiles.length} fichier{dossier.uploadedFiles.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h6m-6 0l-3 3m3-3l3 3m-3-3v10a2 2 0 002 2h4a2 2 0 002-2V7" />
                      </svg>
                      <span className="text-[#071B1E] font-semibold" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        {new Date(dossier.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewFiles(dossier)}
                        className="p-2 text-[#F66B4C] hover:text-white hover:bg-[#F66B4C] rounded-xl transition-all duration-300 hover:scale-110"
                        title="Voir les fichiers"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      
                      {dossier.status === 'COMPLETED' && (
                        <button
                          onClick={() => handleDownloadDossierPDF(dossier)}
                          className="p-2 text-green-600 hover:text-white hover:bg-green-600 rounded-xl transition-all duration-300 hover:scale-110"
                          title="Télécharger le PDF du dossier"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </button>
                      )}
                      
                      {dossier.uploadedFiles.length > 0 && (
                        <button
                          onClick={() => handleDownloadAllFiles(dossier)}
                          className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-xl transition-all duration-300 hover:scale-110"
                          title="Télécharger tous les fichiers"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 flex items-center justify-between border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                <span className="font-semibold text-[#071B1E]">Page {currentPage}</span> sur <span className="font-semibold">{totalPages}</span>
              </div>
              <div className="text-sm text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {total} dossiers au total
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm border border-gray-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:border-[#F66B4C] hover:text-[#F66B4C] transition-all duration-300 flex items-center space-x-2"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
                <span>Première</span>
              </button>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm border border-gray-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:border-[#F66B4C] hover:text-[#F66B4C] transition-all duration-300 flex items-center space-x-2"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Précédent</span>
              </button>
              
              {/* Page numbers */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-4 py-2 text-sm rounded-xl transition-all duration-300 font-semibold ${
                        currentPage === pageNum
                          ? 'bg-gradient-to-r from-[#F66B4C] to-[#e55a43] text-white shadow-lg'
                          : 'border border-gray-300 hover:bg-white hover:border-[#F66B4C] hover:text-[#F66B4C]'
                      }`}
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm border border-gray-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:border-[#F66B4C] hover:text-[#F66B4C] transition-all duration-300 flex items-center space-x-2"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                <span>Suivant</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm border border-gray-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:border-[#F66B4C] hover:text-[#F66B4C] transition-all duration-300 flex items-center space-x-2"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                <span>Dernière</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
        </div>

      {/* Files Modal */}
      {showFilesModal && selectedDossier && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 
                  className="text-2xl font-bold text-[#071B1E]"
                  style={{ fontFamily: '"Gascogne Serial", serif' }}
                >
                  Fichiers du dossier - {selectedDossier.user.name}
                </h3>
                <button
                  onClick={() => setShowFilesModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {selectedDossier.uploadedFiles.length > 0 && (
                <div className="mb-6 flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-semibold text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {selectedDossier.uploadedFiles.length} fichier{selectedDossier.uploadedFiles.length > 1 ? 's' : ''} disponible{selectedDossier.uploadedFiles.length > 1 ? 's' : ''}
                    </h4>
                    <p className="text-sm text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      Documents uploadés par {selectedDossier.user.name}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    {selectedDossier.status === 'COMPLETED' && (
                      <button
                        onClick={() => handleDownloadDossierPDF(selectedDossier)}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform"
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        PDF Dossier
                      </button>
                    )}
                    <button
                      onClick={() => handleDownloadAllFiles(selectedDossier)}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                      Tous les fichiers
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {selectedDossier.uploadedFiles.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      Aucun fichier uploadé pour ce dossier
                    </p>
                  </div>
                ) : (
                  selectedDossier.uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#F66B4C] to-[#e55a43] rounded-2xl flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-lg font-semibold text-[#071B1E] truncate" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                            {file.originalName}
                          </p>
                          <p className="text-sm text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                            {file.documentType} • {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownloadFile(file)}
                        className="ml-4 inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#F66B4C] to-[#e55a43] text-white rounded-2xl hover:from-[#e55a43] hover:to-[#d14a3a] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform"
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Télécharger
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setShowFilesModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors duration-200 font-semibold"
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