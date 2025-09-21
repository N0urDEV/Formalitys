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
    type: '', categorie: '', enseigneCommerciale: '', dateOuverturePrevue: '', 
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
            } else {
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
          // Create new dossier (no edit parameter, so create new one)
          console.log('useTourismDossier: Creating new dossier');
          const createRes = await fetch(`${API}/dossiers/tourism`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` }
          });
          const newDossier = await createRes.json();
          console.log('useTourismDossier: Created new dossier:', newDossier.id);
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
      setLoading(false);
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
      
      // Save to backend
      await saveStep({
        uploadedFiles: newFiles,
        uploadedPhotos: newPhotos,
      });

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

      // Prepare dossier data for PDF
      const dossierData = {
        id: dossier.id,
        establishmentName: establishmentInfo.name,
        establishmentType: establishmentInfo.type,
        address: establishmentInfo.address,
        city: establishmentInfo.city,
        capacity: establishmentInfo.capacity,
        ownerInfo: ownerInfo,
        establishmentInfo: establishmentInfo,
        questionnaireAnswers: questionnaireAnswers,
        createdAt: dossier.createdAt,
        status: dossier.status,
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
