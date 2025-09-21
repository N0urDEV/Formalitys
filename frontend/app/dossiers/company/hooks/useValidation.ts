import { useState } from 'react';
import { Associate, CompanyData, UploadedFiles, FormErrors, StepErrors } from '../types';

export const useValidation = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [stepErrors, setStepErrors] = useState<StepErrors>({});

  const validateStep1 = (associates: Associate[]): boolean => {
    const newErrors: FormErrors = {};
    const stepErrorsList: string[] = [];

    // Validate each associate
    associates.forEach((associate, index) => {
      const prefix = `associate_${index}`;
      
      if (!associate.nom.trim()) {
        newErrors[`${prefix}_nom`] = 'Le nom est requis';
        stepErrorsList.push(`Associé ${index + 1}: Le nom est requis`);
      }
      
      if (!associate.prenom.trim()) {
        newErrors[`${prefix}_prenom`] = 'Le prénom est requis';
        stepErrorsList.push(`Associé ${index + 1}: Le prénom est requis`);
      }
      
      if (!associate.numero.trim()) {
        newErrors[`${prefix}_numero`] = 'Le numéro de pièce est requis';
        stepErrorsList.push(`Associé ${index + 1}: Le numéro de pièce est requis`);
      }
      
      if (!associate.adresse.trim()) {
        newErrors[`${prefix}_adresse`] = 'L\'adresse est requise';
        stepErrorsList.push(`Associé ${index + 1}: L'adresse est requise`);
      }
      
      if (!associate.telephone.trim()) {
        newErrors[`${prefix}_telephone`] = 'Le téléphone est requis';
        stepErrorsList.push(`Associé ${index + 1}: Le téléphone est requis`);
      } else if (!/^[0-9+\-\s()]+$/.test(associate.telephone)) {
        newErrors[`${prefix}_telephone`] = 'Format de téléphone invalide';
        stepErrorsList.push(`Associé ${index + 1}: Format de téléphone invalide`);
      }
      
      if (!associate.email.trim()) {
        newErrors[`${prefix}_email`] = 'L\'email est requis';
        stepErrorsList.push(`Associé ${index + 1}: L'email est requis`);
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(associate.email)) {
        newErrors[`${prefix}_email`] = 'Format d\'email invalide';
        stepErrorsList.push(`Associé ${index + 1}: Format d'email invalide`);
      }
    });

    // Check if at least one associate is marked as manager
    const hasManager = associates.some(associate => associate.isGerant);
    if (!hasManager) {
      stepErrorsList.push('Au moins un associé doit être désigné comme gérant');
    }

    setErrors(newErrors);
    setStepErrors(prev => ({ ...prev, 1: stepErrorsList }));
    
    return stepErrorsList.length === 0;
  };

  const validateStep2Headquarters = (companyData: CompanyData): boolean => {
    const stepErrorsList: string[] = [];
    
    if (!companyData.headquarters) {
      stepErrorsList.push('Veuillez sélectionner un type de siège social');
    }
    
    if (companyData.headquarters === 'contrat_domiciliation' && !companyData.selectedBank) {
      stepErrorsList.push('Veuillez sélectionner une banque pour la domiciliation');
    }

    setStepErrors(prev => ({ ...prev, 2: stepErrorsList }));
    return stepErrorsList.length === 0;
  };

  const validateStep2 = (companyData: CompanyData): boolean => {
    const stepErrorsList: string[] = [];
    
    if (!companyData.companyName.trim()) {
      stepErrorsList.push('Le nom de la société est requis');
    }
    
    if (companyData.activities.length === 0) {
      stepErrorsList.push('Au moins une activité doit être sélectionnée');
    }
    
    if (companyData.proposedNames.filter(name => name.trim()).length < 3) {
      stepErrorsList.push('Trois noms proposés sont requis');
    }

    // Additional company information validation
    if (!companyData.raisonSociale.trim()) {
      stepErrorsList.push('La raison sociale est requise');
    }
    
    if (!companyData.formeJuridique.trim()) {
      stepErrorsList.push('La forme juridique est requise');
    }
    
    if (!companyData.nationalite.trim()) {
      stepErrorsList.push('La nationalité est requise');
    }
    
    if (!companyData.adresseSiege.trim()) {
      stepErrorsList.push('L\'adresse du siège social est requise');
    }
    
    if (!companyData.villeSiege.trim()) {
      stepErrorsList.push('La ville du siège social est requise');
    }
    
    if (!companyData.professionActivite.trim()) {
      stepErrorsList.push('La profession ou activité principale est requise');
    }
    
    if (!companyData.telephone.trim()) {
      stepErrorsList.push('Le téléphone est requis');
    } else if (!/^[0-9+\-\s()]+$/.test(companyData.telephone)) {
      stepErrorsList.push('Format de téléphone invalide');
    }
    
    if (!companyData.email.trim()) {
      stepErrorsList.push('L\'email est requis');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(companyData.email)) {
      stepErrorsList.push('Format d\'email invalide');
    }

    setStepErrors(prev => ({ ...prev, 4: stepErrorsList }));
    return stepErrorsList.length === 0;
  };

  const validateStep = (currentStep: number, data: any): boolean => {
    switch (currentStep) {
      case 1:
        return validateStep1(data.associates);
      case 2:
        return validateStep2Headquarters(data.companyData);
      case 3:
        return validateStep3Payment(data.dossier);
      case 4:
        return validateStep4Documents(data.companyData, data.uploadedFiles);
      case 5:
        return true; // Final step - no validation needed
      default:
        return true;
    }
  };

  const validateStep3Payment = (dossier: any): boolean => {
    const stepErrorsList: string[] = [];
    
    if (!dossier) {
      stepErrorsList.push('Dossier non trouvé');
    } else if (dossier.paymentStatus !== 'succeeded') {
      stepErrorsList.push('Le paiement doit être effectué pour continuer');
    }
    
    setStepErrors(prev => ({ ...prev, 3: stepErrorsList }));
    return stepErrorsList.length === 0;
  };

  const validateStep4Documents = (companyData: CompanyData, uploadedFiles: any): boolean => {
    const stepErrorsList: string[] = [];
    
    // Validate company data first
    const companyValid = validateStep2(companyData);
    if (!companyValid) {
      return false;
    }
    
    // Check required document uploads
    const requiredDocuments = ['cni', 'justificatif_domicile', 'autre'];
    
    // Handle both array and object formats for uploadedFiles
    let uploadedTypes: string[] = [];
    
    if (Array.isArray(uploadedFiles)) {
      // If it's already an array, use it directly
      uploadedTypes = uploadedFiles.map(file => file.documentType);
    } else if (uploadedFiles && typeof uploadedFiles === 'object') {
      // If it's an object, flatten it to get all document types
      uploadedTypes = Object.values(uploadedFiles).flat().map(file => file.documentType);
    }
    
    requiredDocuments.forEach(docType => {
      if (!uploadedTypes.includes(docType)) {
        const docNames = {
          'cni': 'CNI',
          'justificatif_domicile': 'Justificatif de domicile',
          'autre': 'Statuts'
        };
        stepErrorsList.push(`${docNames[docType as keyof typeof docNames]} est requis`);
      }
    });
    
    setStepErrors(prev => ({ ...prev, 4: stepErrorsList }));
    return stepErrorsList.length === 0;
  };

  const clearFieldError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const clearStepErrors = (step: number) => {
    setStepErrors(prev => {
      const newStepErrors = { ...prev };
      delete newStepErrors[step];
      return newStepErrors;
    });
  };

  return {
    errors,
    stepErrors,
    validateStep1,
    validateStep2,
    validateStep2Headquarters,
    validateStep3Payment,
    validateStep4Documents,
    validateStep,
    clearFieldError,
    clearStepErrors,
    setErrors,
    setStepErrors
  };
};
