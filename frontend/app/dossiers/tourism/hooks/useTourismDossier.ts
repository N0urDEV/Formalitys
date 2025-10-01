import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TourismDossier, OwnerInfo, EstablishmentInfo, UploadedFiles, QuestionnaireAnswers } from '../types';
import { PDFService } from '../../../services/pdfService';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

export const useTourismDossier = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dossier, setDossier] = useState<TourismDossier | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const initializedRef = useRef(false);
  
  const [ownerInfo, setOwnerInfo] = useState<OwnerInfo>({
    nom: '', prenom: '', typePiece: 'CNI', numero: '', telephone: '', email: '', adresse: '', 
    qualite: 'Propriétaire', registreCommerce: ''
  });
  
  const [establishmentInfo, setEstablishmentInfo] = useState<EstablishmentInfo>({
    type: '', categorie: '2etoiles', enseigneCommerciale: '', dateOuverturePrevue: '', 
    registreCommerce: '', ice: '', numeroCNSS: '', telephone: '', email: '', 
    siteWeb: '', region: '', province: ''
  });
  
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({
    cni: [],
    titreFoncier: [],
    permisHabiter: [],
    assurance: [],
    photos: []
  });
  
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<QuestionnaireAnswers>({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { 
      router.replace('/login'); 
      return; 
    }
    
    // Prevent multiple initialization calls
    if (initializedRef.current) return;
    
    // Create or load existing tourism dossier
    (async () => {
      try {
        const res = await fetch(`${API}/dossiers/tourism`, {
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
            
            // If user just completed payment (URL parameter) and is on step 3, advance to step 4
            if (paymentSuccess && specificDossier.currentStep === 3) {
              // Update dossier to step 4 after successful payment
              await fetch(`${API}/dossiers/tourism/${specificDossier.id}`, {
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
              await fetch(`${API}/dossiers/tourism/${specificDossier.id}`, {
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
            
            if (specificDossier.ownerInfo) {
              setOwnerInfo(specificDossier.ownerInfo);
            }
            
            if (specificDossier.establishmentInfo) {
              setEstablishmentInfo(specificDossier.establishmentInfo);
            }
          }
        } else {
          // No edit parameter - check if user has existing dossiers
          if (dossiers.length > 0) {
            // Find the most recent incomplete dossier
            const incompleteDossier = dossiers.find((d: any) => d.status !== 'COMPLETED');
            
            if (incompleteDossier) {
              const dossierToLoad = incompleteDossier;
              console.log('useTourismDossier: Loading existing incomplete dossier:', dossierToLoad.id);
              setDossier(dossierToLoad);
            
              // Check if payment was successful and update step
              const paymentSuccess = searchParams.get('payment') === 'success';
              
              // If user just completed payment (URL parameter) and is on step 3, advance to step 4
              if (paymentSuccess && dossierToLoad.currentStep === 3) {
                // Update dossier to step 4 after successful payment
                await fetch(`${API}/dossiers/tourism/${dossierToLoad.id}`, {
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
                await fetch(`${API}/dossiers/tourism/${dossierToLoad.id}`, {
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
              if (dossierToLoad.ownerInfo) {
                setOwnerInfo(dossierToLoad.ownerInfo);
              }
              
              if (dossierToLoad.establishmentInfo) {
                setEstablishmentInfo(dossierToLoad.establishmentInfo);
              }
            } else {
              // All dossiers are completed -> create a new dossier
              console.log('useTourismDossier: All dossiers completed, creating a new dossier');
              const createRes = await fetch(`${API}/dossiers/tourism`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` }
              });
              const newDossier = await createRes.json();
              console.log('useTourismDossier: Created new dossier:', newDossier.id);
              setDossier(newDossier);
              setCurrentStep(1);
            }
          } else {
            // No existing dossiers - create new one
            console.log('useTourismDossier: Creating new dossier');
            const createRes = await fetch(`${API}/dossiers/tourism`, {
              method: 'POST',
              headers: { Authorization: `Bearer ${token}` }
            });
            const newDossier = await createRes.json();
            console.log('useTourismDossier: Created new dossier:', newDossier.id);
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

  const saveStep = async (stepData: any, skipLoading: boolean = false) => {
    if (!dossier) return;
    
    const token = localStorage.getItem('token');
    if (!skipLoading) {
      setLoading(true);
    }
    
    try {
      await fetch(`${API}/dossiers/tourism/${dossier.id}`, {
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
      if (!skipLoading) {
        setLoading(false);
      }
    }
  };

  const handleFileUpload = async (files: File[]) => {
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
    
    // Update dossier with uploaded files
    const currentFiles = dossier?.uploadedFiles || [];
    const currentPhotos = dossier?.uploadedPhotos || [];
    
    // Separate documents and photos
    const documents = result.files.filter((f: any) => f.mimetype.startsWith('application/'));
    const photos = result.files.filter((f: any) => f.mimetype.startsWith('image/'));
    
    const newFiles = [...currentFiles, ...documents];
    const newPhotos = [...currentPhotos, ...photos];
    
    // Update local state immediately
    setDossier(prev => prev ? { 
      ...prev, 
      uploadedFiles: newFiles,
      uploadedPhotos: newPhotos 
    } : null);
    
    // Save to backend
    await saveStep({
      uploadedFiles: newFiles,
      uploadedPhotos: newPhotos,
    });
  };

  const handleDocumentUpload = async (files: File[], documentType: string) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    
    files.forEach(file => {
      formData.append('files', file);
    });
    
    // Add document type to the request
    formData.append('documentType', documentType);

    try {
      // Don't set loading to true for file uploads to prevent multiple re-renders
      // setLoading(true);
      
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
      
      // Convert uploaded files to the correct format
      const uploadedFiles = result.files.map((file: any) => ({
        id: file.id || file.filename,
        filename: file.filename,
        originalName: file.originalName || file.filename,
        documentType: documentType,
        size: file.size,
        mimetype: file.mimetype,
        url: file.url,
        uploadedAt: file.uploadedAt || new Date().toISOString()
      }));

      // Update the uploaded files state
      setUploadedFiles(prev => ({
        ...prev,
        [documentType]: [...(prev[documentType] || []), ...uploadedFiles]
      }));

      // Update dossier with uploaded files
      const currentFiles = dossier?.uploadedFiles || [];
      const currentPhotos = dossier?.uploadedPhotos || [];
      
      // Separate documents and photos
      const documents = result.files.filter((f: any) => f.mimetype.startsWith('application/'));
      const photos = result.files.filter((f: any) => f.mimetype.startsWith('image/'));
      
      const newFiles = [...currentFiles, ...documents];
      const newPhotos = [...currentPhotos, ...photos];
      
      // Update local state immediately
      setDossier(prev => prev ? { 
        ...prev, 
        uploadedFiles: newFiles,
        uploadedPhotos: newPhotos 
      } : null);
      
      // Save to backend without setting loading state
      await saveStep({
        uploadedFiles: newFiles,
        uploadedPhotos: newPhotos,
      }, true);

      console.log(`${documentType} uploaded successfully:`, result);
    } catch (error) {
      console.error(`Upload error for ${documentType}:`, error);
    }
  };

  const downloadPdf = async () => {
    if (!dossier) return;
    
    try {
      // Get user data from localStorage or API
      const userData = {
        name: localStorage.getItem('userName') || 'Utilisateur',
        email: localStorage.getItem('userEmail') || '',
        phone: localStorage.getItem('userPhone') || '',
      };

      // Prepare dossier data for PDF with all user-entered information
      const dossierData = {
        id: dossier.id,
        // Owner Information
        ownerInfo: {
          nom: ownerInfo.nom,
          prenom: ownerInfo.prenom,
          typePiece: ownerInfo.typePiece,
          numero: ownerInfo.numero,
          telephone: ownerInfo.telephone,
          email: ownerInfo.email,
          adresse: ownerInfo.adresse,
          qualite: ownerInfo.qualite,
          registreCommerce: ownerInfo.registreCommerce
        },
        // Establishment Information
        establishmentInfo: {
          type: establishmentInfo.type,
          categorie: establishmentInfo.categorie,
          enseigneCommerciale: establishmentInfo.enseigneCommerciale,
          dateOuverturePrevue: establishmentInfo.dateOuverturePrevue,
          registreCommerce: establishmentInfo.registreCommerce,
          ice: establishmentInfo.ice,
          numeroCNSS: establishmentInfo.numeroCNSS,
          telephone: establishmentInfo.telephone,
          email: establishmentInfo.email,
          siteWeb: establishmentInfo.siteWeb,
          region: establishmentInfo.region,
          province: establishmentInfo.province
        },
        // Uploaded Files
        uploadedFiles: uploadedFiles,
        // Questionnaire Answers
        questionnaireAnswers: questionnaireAnswers,
        // Dossier metadata
        createdAt: dossier.createdAt,
        status: dossier.status,
        currentStep: currentStep
      };

      // Generate and download PDF using React PDF
      await PDFService.generateAndDownloadTourismDossier(userData, dossierData);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Erreur lors de la génération du PDF');
    }
  };

  return {
    dossier,
    currentStep,
    setCurrentStep,
    loading,
    ownerInfo,
    setOwnerInfo,
    establishmentInfo,
    setEstablishmentInfo,
    uploadedFiles,
    setUploadedFiles,
    questionnaireAnswers,
    setQuestionnaireAnswers,
    saveStep,
    handleFileUpload,
    handleDocumentUpload,
    downloadPdf
  };
};
