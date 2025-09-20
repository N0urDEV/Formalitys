import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Dossier, User, DashboardStats, UserDiscountStatus } from '../types';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

export const useDashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [dossiers, setDossiers] = useState<Dossier[]>([]);
  const [loading, setLoading] = useState(true);
  const [dossiersLoading, setDossiersLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'services' | 'dossiers'>('services');
  const [discountStatus, setDiscountStatus] = useState<UserDiscountStatus | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { 
      router.replace('/login'); 
      return; 
    }
    
    loadUserProfile();
  }, [router]);

  const loadUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`${API}/auth/profile`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      
      if (!res.ok) { 
        localStorage.removeItem('token'); 
        router.replace('/login'); 
        return; 
      }
      
      const data = await res.json();
      setUser(data);
      
      // Load user dossiers and discount status
      await Promise.all([
        loadDossiers(),
        loadDiscountStatus()
      ]);
    } catch (error) {
      console.error('Error fetching profile:', error);
      router.replace('/login');
    } finally {
      setLoading(false);
    }
  };

  const loadDossiers = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    setDossiersLoading(true);
    try {
      // Load both company and tourism dossiers
      const [companyRes, tourismRes] = await Promise.all([
        fetch(`${API}/dossiers/company`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API}/dossiers/tourism`, { headers: { Authorization: `Bearer ${token}` } })
      ]);

      const allDossiers = [];
      
      if (companyRes.ok) {
        const companyData = await companyRes.json();
        allDossiers.push(...companyData.map((d: any) => ({ ...d, type: 'company' })));
      }
      
      if (tourismRes.ok) {
        const tourismData = await tourismRes.json();
        allDossiers.push(...tourismData.map((d: any) => ({ ...d, type: 'tourism' })));
      }

      // Sort by creation date (newest first)
      allDossiers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setDossiers(allDossiers);
    } catch (error) {
      console.error('Error loading dossiers:', error);
    } finally {
      setDossiersLoading(false);
    }
  };

  const loadDiscountStatus = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      console.log('Loading discount status...');
      const res = await fetch(`${API}/discount/status`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Discount status loaded:', data);
        setDiscountStatus(data);
      } else {
        console.error('Failed to load discount status:', res.status, res.statusText);
      }
    } catch (error) {
      console.error('Error loading discount status:', error);
    }
  };

  const deleteDossier = async (dossierId: number, type: 'company' | 'tourism') => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce dossier ? Cette action est irréversible.')) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`${API}/dossiers/${type}/${dossierId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        await loadDossiers(); // Reload dossiers
      } else {
        alert('Erreur lors de la suppression du dossier');
      }
    } catch (error) {
      console.error('Error deleting dossier:', error);
      alert('Erreur lors de la suppression du dossier');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.replace('/login');
  };

  const getStats = (): DashboardStats => ({
    totalDossiers: dossiers.length,
    completedDossiers: dossiers.filter(d => d.status === 'COMPLETED').length,
    inProgressDossiers: dossiers.filter(d => d.status === 'IN_PROGRESS').length,
  });

  const downloadPdf = async (dossierId: number, type: 'company' | 'tourism') => {
    try {
      // Find the dossier in the current list
      const dossier = dossiers.find(d => d.id === dossierId && d.type === type);
      if (!dossier) {
        throw new Error('Dossier non trouvé');
      }

      // Get user data
      const userData = {
        name: user?.name || 'Utilisateur',
        email: user?.email || '',
        phone: user?.phone || '',
      };

      if (type === 'company') {
        // Import and use the company PDF service
        const { PDFService } = await import('../../services/pdfService');
        
        // Prepare dossier data for PDF
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
          // Additional company information
          raisonSociale: dossier.raisonSociale || '',
          formeJuridique: dossier.formeJuridique || '',
          nationalite: dossier.nationalite || '',
          adresseSiege: dossier.adresseSiege || '',
          villeSiege: dossier.villeSiege || '',
          professionActivite: dossier.professionActivite || '',
          telephone: dossier.telephone || '',
          fax: dossier.fax || '',
          email: dossier.email || '',
          numeroArticleTaxeProfessionnelle: dossier.numeroArticleTaxeProfessionnelle || '',
          numeroArticleTaxeServicesCommunaux: dossier.numeroArticleTaxeServicesCommunaux || '',
          numeroAffiliationCNSS: dossier.numeroAffiliationCNSS || '',
          numeroRegistreCommerce: dossier.numeroRegistreCommerce || '',
          villeRegistreCommerce: dossier.villeRegistreCommerce || '',
          referenceDepotDeclaration: dossier.referenceDepotDeclaration || '',
          dateDepotDeclaration: dossier.dateDepotDeclaration || '',
        };

        await PDFService.generateAndDownloadCompanyDossier(userData, dossierData);
      } else {
        // Import and use the tourism PDF service
        const { PDFService } = await import('../../services/pdfService');
        
        // Prepare dossier data for PDF
        const dossierData = {
          id: dossier.id,
          establishmentName: dossier.establishmentName || '',
          establishmentType: dossier.establishmentType || '',
          address: dossier.address || '',
          city: dossier.city || '',
          capacity: dossier.capacity || 0,
          ownerInfo: dossier.ownerInfo || {},
          createdAt: dossier.createdAt,
          status: dossier.status,
        };

        await PDFService.generateAndDownloadTourismDossier(userData, dossierData);
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Erreur lors du téléchargement du PDF');
    }
  };

  return {
    user,
    dossiers,
    loading,
    dossiersLoading,
    activeTab,
    setActiveTab,
    loadDossiers,
    deleteDossier,
    handleLogout,
    getStats,
    discountStatus,
    loadDiscountStatus,
    downloadPdf,
  };
};
