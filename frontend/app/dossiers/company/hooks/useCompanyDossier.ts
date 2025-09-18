import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CompanyDossier, Associate, CompanyData, UploadedFiles } from '../types';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

export const useCompanyDossier = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dossier, setDossier] = useState<CompanyDossier | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const initializedRef = useRef(false);
  
  const [associates, setAssociates] = useState<Associate[]>([{
    nom: '', prenom: '', typePiece: 'CNI', numero: '', genre: 'M',
    nationalite: 'Marocaine', adresse: '', telephone: '', email: '', isGerant: false
  }]);
  
  const [companyData, setCompanyData] = useState<CompanyData>({
    companyName: '',
    activities: [],
    proposedNames: ['', '', ''],
    headquarters: 'domicile',
    capital: 10000,
    selectedBank: '',
    // Additional company information
    raisonSociale: '',
    formeJuridique: '',
    nationalite: '',
    adresseSiege: '',
    villeSiege: '',
    professionActivite: '',
    telephone: '',
    fax: '',
    email: '',
    numeroArticleTaxeProfessionnelle: '',
    numeroArticleTaxeServicesCommunaux: '',
    numeroAffiliationCNSS: '',
    numeroRegistreCommerce: '',
    villeRegistreCommerce: '',
    referenceDepotDeclaration: '',
    dateDepotDeclaration: '',
  });
  
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { 
      router.replace('/login'); 
      return; 
    }
    
    // Prevent multiple initialization calls
    if (initializedRef.current) return;
    
    console.log('useCompanyDossier: Initializing company dossier hook');
    
    // Create or load existing company dossier
    (async () => {
      try {
        console.log('useCompanyDossier: Fetching existing dossiers');
        const res = await fetch(`${API}/dossiers/company`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const dossiers = await res.json();
        
        // Check if user is trying to edit a specific dossier
        const editDossierId = searchParams.get('edit');
        
        if (editDossierId) {
          // Load specific dossier for editing
          const specificDossier = dossiers.find(d => d.id === parseInt(editDossierId));
          if (specificDossier) {
            setDossier(specificDossier);
            
            // Check if payment was successful and update step
            const paymentSuccess = searchParams.get('payment') === 'success';
            if (paymentSuccess && specificDossier.currentStep === 3) {
              // Update dossier to step 4 after successful payment
              await fetch(`${API}/dossiers/company/${specificDossier.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ currentStep: 4, status: 'PAID' })
              });
              setCurrentStep(4);
            } else {
              setCurrentStep(specificDossier.currentStep);
            }
            
            if (specificDossier.associates) {
              setAssociates(specificDossier.associates);
            }
            if (specificDossier.companyName || specificDossier.activities) {
              setCompanyData({
                companyName: specificDossier.companyName || '',
                activities: specificDossier.activities || [],
                proposedNames: specificDossier.proposedNames || ['', '', ''],
                headquarters: specificDossier.headquarters || 'domicile',
                capital: specificDossier.capital || 10000,
                selectedBank: specificDossier.selectedBank || '',
                // Additional company information
                raisonSociale: specificDossier.raisonSociale || '',
                formeJuridique: specificDossier.formeJuridique || '',
                nationalite: specificDossier.nationalite || '',
                adresseSiege: specificDossier.adresseSiege || '',
                villeSiege: specificDossier.villeSiege || '',
                professionActivite: specificDossier.professionActivite || '',
                telephone: specificDossier.telephone || '',
                fax: specificDossier.fax || '',
                email: specificDossier.email || '',
                numeroArticleTaxeProfessionnelle: specificDossier.numeroArticleTaxeProfessionnelle || '',
                numeroArticleTaxeServicesCommunaux: specificDossier.numeroArticleTaxeServicesCommunaux || '',
                numeroAffiliationCNSS: specificDossier.numeroAffiliationCNSS || '',
                numeroRegistreCommerce: specificDossier.numeroRegistreCommerce || '',
                villeRegistreCommerce: specificDossier.villeRegistreCommerce || '',
                referenceDepotDeclaration: specificDossier.referenceDepotDeclaration || '',
                dateDepotDeclaration: specificDossier.dateDepotDeclaration || '',
              });
            }
          }
        } else {
          // Create new dossier (no edit parameter, so create new one)
          console.log('useCompanyDossier: Creating new dossier');
          const createRes = await fetch(`${API}/dossiers/company`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` }
          });
          const newDossier = await createRes.json();
          console.log('useCompanyDossier: Created new dossier:', newDossier.id);
          setDossier(newDossier);
        }
        initializedRef.current = true;
      } catch (err) {
        console.error('Error loading dossier:', err);
        initializedRef.current = true;
      }
    })();
  }, [router, searchParams]);

  const saveStep = async (stepData: any) => {
    if (!dossier) return;
    
    const token = localStorage.getItem('token');
    setLoading(true);
    
    try {
      await fetch(`${API}/dossiers/company/${dossier.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(stepData)
      });
    } catch (err) {
      console.error('Error saving step:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files: File[]) => {
    console.log('handleFileUpload called with files:', files.length, files.map(f => f.name));
    
    const token = localStorage.getItem('token');
    const formData = new FormData();
    
    files.forEach(file => {
      formData.append('files', file);
    });

    const response = await fetch(`${API}/uploads/multiple`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const result = await response.json();
    console.log('Upload result:', result);
    
    // Update dossier with uploaded files
    const currentFiles = dossier?.uploadedFiles || [];
    console.log('Current files before update:', currentFiles.length);
    const newFiles = [...currentFiles, ...result.files];
    console.log('New files after update:', newFiles.length);
    
    // Update local state immediately
    setDossier(prev => prev ? { ...prev, uploadedFiles: newFiles } : null);
    
    // Save to backend
    await saveStep({
      uploadedFiles: newFiles,
    });
  };

  const downloadPdf = async () => {
    if (!dossier) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API}/pdf/company/${dossier.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération du PDF');
      }

      const blob = await response.blob();
      const { saveAs } = await import('file-saver');
      saveAs(blob, `dossier-creation-societe-${dossier.id}.pdf`);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Erreur lors du téléchargement du PDF');
    }
  };

  const calculateTotalPrice = () => {
    let total = 3600; // Base price
    if (companyData.headquarters === 'contrat_domiciliation') {
      total += 2100; // Domiciliation fee
    }
    return total;
  };

  return {
    dossier,
    currentStep,
    setCurrentStep,
    loading,
    associates,
    setAssociates,
    companyData,
    setCompanyData,
    uploadedFiles,
    setUploadedFiles,
    saveStep,
    handleFileUpload,
    downloadPdf,
    calculateTotalPrice
  };
};
