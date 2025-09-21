import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CompanyDossier, Associate, CompanyData, UploadedFiles } from '../types';
import { PDFService } from '../../../services/pdfService';

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
          const specificDossier = dossiers.find((d: any) => d.id === parseInt(editDossierId));
          if (specificDossier) {
            setDossier(specificDossier);
            
            // Check if payment was successful and update step
            const paymentSuccess = searchParams.get('payment') === 'success';
            
            // If user just completed payment (URL parameter) and is on step 3, advance to step 4
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
            } 
            // If user already paid but is still on step 3, advance them to step 4
            else if (specificDossier.status === 'PAID' && specificDossier.currentStep === 3) {
              // Update dossier to step 4 since payment is already completed
              await fetch(`${API}/dossiers/company/${specificDossier.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ currentStep: 4 })
              });
              setCurrentStep(4);
            } 
            // Otherwise, use the current step from the dossier
            else {
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
          // No edit parameter - check if user has existing dossiers
          if (dossiers.length > 0) {
            // Find the most recent incomplete dossier
            const incompleteDossier = dossiers.find((d: any) => d.status !== 'COMPLETED');
            const dossierToLoad = incompleteDossier || dossiers[0]; // Use incomplete or most recent
            
            console.log('useCompanyDossier: Loading existing dossier:', dossierToLoad.id);
            setDossier(dossierToLoad);
            
            // Check if payment was successful and update step
            const paymentSuccess = searchParams.get('payment') === 'success';
            
            // If user just completed payment (URL parameter) and is on step 3, advance to step 4
            if (paymentSuccess && dossierToLoad.currentStep === 3) {
              // Update dossier to step 4 after successful payment
              await fetch(`${API}/dossiers/company/${dossierToLoad.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ currentStep: 4, status: 'PAID' })
              });
              setCurrentStep(4);
            } 
            // If user already paid but is still on step 3, advance them to step 4
            else if (dossierToLoad.status === 'PAID' && dossierToLoad.currentStep === 3) {
              // Update dossier to step 4 since payment is already completed
              await fetch(`${API}/dossiers/company/${dossierToLoad.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ currentStep: 4 })
              });
              setCurrentStep(4);
            } 
            // Otherwise, use the current step from the dossier
            else {
              setCurrentStep(dossierToLoad.currentStep);
            }
            
            // Load existing data
            if (dossierToLoad.associates) {
              setAssociates(dossierToLoad.associates);
            }
            if (dossierToLoad.companyName || dossierToLoad.activities) {
              setCompanyData({
                companyName: dossierToLoad.companyName || '',
                activities: dossierToLoad.activities || [],
                proposedNames: dossierToLoad.proposedNames || ['', '', ''],
                headquarters: dossierToLoad.headquarters || 'domicile',
                capital: dossierToLoad.capital || 10000,
                selectedBank: dossierToLoad.selectedBank || '',
                // Additional company information
                raisonSociale: dossierToLoad.raisonSociale || '',
                formeJuridique: dossierToLoad.formeJuridique || '',
                nationalite: dossierToLoad.nationalite || '',
                adresseSiege: dossierToLoad.adresseSiege || '',
                villeSiege: dossierToLoad.villeSiege || '',
                professionActivite: dossierToLoad.professionActivite || '',
                telephone: dossierToLoad.telephone || '',
                fax: dossierToLoad.fax || '',
                email: dossierToLoad.email || '',
                numeroArticleTaxeProfessionnelle: dossierToLoad.numeroArticleTaxeProfessionnelle || '',
                numeroArticleTaxeServicesCommunaux: dossierToLoad.numeroArticleTaxeServicesCommunaux || '',
                numeroAffiliationCNSS: dossierToLoad.numeroAffiliationCNSS || '',
                numeroRegistreCommerce: dossierToLoad.numeroRegistreCommerce || '',
                villeRegistreCommerce: dossierToLoad.villeRegistreCommerce || '',
                referenceDepotDeclaration: dossierToLoad.referenceDepotDeclaration || '',
                dateDepotDeclaration: dossierToLoad.dateDepotDeclaration || '',
              });
            }
          } else {
            // No existing dossiers - create new one
            console.log('useCompanyDossier: Creating new dossier');
            const createRes = await fetch(`${API}/dossiers/company`, {
              method: 'POST',
              headers: { Authorization: `Bearer ${token}` }
            });
            const newDossier = await createRes.json();
            console.log('useCompanyDossier: Created new dossier:', newDossier.id);
            setDossier(newDossier);
          }
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
      console.log('Saving step data:', stepData);
      if (stepData.companyData) {
        console.log('Company data being saved:', stepData.companyData);
        console.log('Headquarters selection:', stepData.companyData.headquarters);
      }
      
      const response = await fetch(`${API}/dossiers/company/${dossier.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(stepData)
      });
      
      if (response.ok) {
        console.log('Step data saved successfully');
      } else {
        console.error('Failed to save step data:', response.status);
      }
    } catch (err) {
      console.error('Error saving step:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files: File[], documentType: string) => {
    console.log('handleFileUpload called with files:', files.length, files.map(f => f.name), 'documentType:', documentType);
    
    const token = localStorage.getItem('token');
    const formData = new FormData();
    
    files.forEach(file => {
      formData.append('files', file);
    });
    
    // Add document type to the request
    formData.append('documentType', documentType);

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
    
    // Convert uploaded files to the correct format for the object structure
    const uploadedFiles = result.files.map((file: any) => ({
      id: file.id || file.filename,
      filename: file.filename,
      originalName: file.originalName || file.filename,
      documentType: documentType, // Use the documentType passed to the function
      size: file.size,
      mimetype: file.mimetype,
      url: file.url,
      uploadedAt: file.uploadedAt || new Date().toISOString()
    }));

    // Update local state with the new files
    setUploadedFiles(prev => {
      const newState = {
        ...prev,
        [documentType]: [...(prev[documentType] || []), ...uploadedFiles]
      };
      
      // Convert object to array for backend storage
      const allFiles = Object.values(newState).flat();
      
      // Update dossier with uploaded files
      setDossier(prevDossier => prevDossier ? { ...prevDossier, uploadedFiles: allFiles } : null);
      
      // Save to backend
      saveStep({
        uploadedFiles: allFiles,
      });
      
      return newState;
    });
  };

  const downloadPdf = async () => {
    console.log('Download PDF clicked!', { dossier, companyData, associates });
    if (!dossier) {
      console.log('No dossier found');
      return;
    }
    
    try {
      // Get user data from localStorage or API
      const userData = {
        name: localStorage.getItem('userName') || 'Utilisateur',
        email: localStorage.getItem('userEmail') || '',
        phone: localStorage.getItem('userPhone') || '',
      };

      // Prepare dossier data for PDF
      const dossierData = {
        id: dossier.id,
        companyName: companyData.companyName,
        headquarters: companyData.headquarters,
        capital: companyData.capital,
        selectedBank: companyData.selectedBank,
        activities: companyData.activities,
        proposedNames: companyData.proposedNames,
        associates: associates,
        createdAt: dossier.createdAt,
        status: dossier.status,
        // Additional company information
        raisonSociale: companyData.raisonSociale,
        formeJuridique: companyData.formeJuridique,
        nationalite: companyData.nationalite,
        adresseSiege: companyData.adresseSiege,
        villeSiege: companyData.villeSiege,
        professionActivite: companyData.professionActivite,
        telephone: companyData.telephone,
        fax: companyData.fax,
        email: companyData.email,
        numeroArticleTaxeProfessionnelle: companyData.numeroArticleTaxeProfessionnelle,
        numeroArticleTaxeServicesCommunaux: companyData.numeroArticleTaxeServicesCommunaux,
        numeroAffiliationCNSS: companyData.numeroAffiliationCNSS,
        numeroRegistreCommerce: companyData.numeroRegistreCommerce,
        villeRegistreCommerce: companyData.villeRegistreCommerce,
        referenceDepotDeclaration: companyData.referenceDepotDeclaration,
        dateDepotDeclaration: companyData.dateDepotDeclaration,
      };

      // Generate and download PDF using React PDF
      await PDFService.generateAndDownloadCompanyDossier(userData, dossierData);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Erreur lors de la génération du PDF');
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
