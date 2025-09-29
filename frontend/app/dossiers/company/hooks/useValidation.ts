import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Associate, CompanyData, UploadedFiles, FormErrors, StepErrors } from '../types';

export const useValidation = () => {
  const t = useTranslations('Dossiers.Company.Validation');
  const [errors, setErrors] = useState<FormErrors>({});
  const [stepErrors, setStepErrors] = useState<StepErrors>({});

  const validateStep1 = (associates: Associate[]): boolean => {
    const newErrors: FormErrors = {};
    const stepErrorsList: string[] = [];

    // Validate each associate
    associates.forEach((associate, index) => {
      const prefix = `associate_${index}`;
      
      if (!associate.nom.trim()) {
        newErrors[`${prefix}_nom`] = t('associate.lastNameRequired');
        stepErrorsList.push(t('associate.lastNameStep', { index: index + 1 }));
      }
      
      if (!associate.prenom.trim()) {
        newErrors[`${prefix}_prenom`] = t('associate.firstNameRequired');
        stepErrorsList.push(t('associate.firstNameStep', { index: index + 1 }));
      }
      
      if (!associate.numero.trim()) {
        newErrors[`${prefix}_numero`] = t('associate.idNumberRequired');
        stepErrorsList.push(t('associate.idNumberStep', { index: index + 1 }));
      }
      
      if (!associate.adresse.trim()) {
        newErrors[`${prefix}_adresse`] = t('associate.addressRequired');
        stepErrorsList.push(t('associate.addressStep', { index: index + 1 }));
      }
      
      if (!associate.telephone.trim()) {
        newErrors[`${prefix}_telephone`] = t('associate.phoneRequired');
        stepErrorsList.push(t('associate.phoneStep', { index: index + 1 }));
      } else if (!/^[0-9+\-\s()]+$/.test(associate.telephone)) {
        newErrors[`${prefix}_telephone`] = t('associate.phoneInvalid');
        stepErrorsList.push(t('associate.phoneInvalidStep', { index: index + 1 }));
      }
      
      if (!associate.email.trim()) {
        newErrors[`${prefix}_email`] = t('associate.emailRequired');
        stepErrorsList.push(t('associate.emailStep', { index: index + 1 }));
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(associate.email)) {
        newErrors[`${prefix}_email`] = t('associate.emailInvalid');
        stepErrorsList.push(t('associate.emailInvalidStep', { index: index + 1 }));
      }
    });

    // Check if at least one associate is marked as manager
    const hasManager = associates.some(associate => associate.isGerant);
    if (!hasManager) {
      stepErrorsList.push(t('associate.managerRequired'));
    }

    setErrors(newErrors);
    setStepErrors(prev => ({ ...prev, 1: stepErrorsList }));
    
    return stepErrorsList.length === 0;
  };

  const validateStep2Headquarters = (companyData: CompanyData): boolean => {
    const stepErrorsList: string[] = [];
    
    if (!companyData.headquarters) {
      stepErrorsList.push(t('step2.selectHeadquarters'));
    }
    
    if (companyData.headquarters === 'contrat_domiciliation' && !companyData.selectedBank) {
      stepErrorsList.push(t('step2.selectBank'));
    }

    setStepErrors(prev => ({ ...prev, 2: stepErrorsList }));
    return stepErrorsList.length === 0;
  };

  const validateStep2 = (companyData: CompanyData): boolean => {
    const stepErrorsList: string[] = [];
    
    if (companyData.activities.length === 0) {
      stepErrorsList.push('Les activités sont requises');
    }
    
    if (companyData.proposedNames.filter(name => name.trim()).length < 3) {
      stepErrorsList.push('Les 3 noms proposés sont requis');
    }

    // Additional company information validation
    if (!companyData.raisonSociale.trim()) {
      stepErrorsList.push('La raison sociale est requise');
    }
    
    if (!companyData.formeJuridique.trim()) {
      stepErrorsList.push('La forme juridique est requise');
    }
    
    if (!companyData.adresseSiege.trim()) {
      stepErrorsList.push('L\'adresse du siège social est requise');
    }
    
    if (!companyData.villeSiege.trim()) {
      stepErrorsList.push('La ville du siège est requise');
    }
    
    if (!companyData.professionActivite.trim()) {
      stepErrorsList.push('La profession/activité est requise');
    }
    
    if (!companyData.telephone.trim()) {
      stepErrorsList.push('Le téléphone est requis');
    } else if (!/^[0-9+\-\s()]+$/.test(companyData.telephone)) {
      stepErrorsList.push('Le format du téléphone est invalide');
    }
    
    if (!companyData.email.trim()) {
      stepErrorsList.push('L\'email est requis');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(companyData.email)) {
      stepErrorsList.push('Le format de l\'email est invalide');
    }

    setStepErrors(prev => ({ ...prev, 3: stepErrorsList }));
    return stepErrorsList.length === 0;
  };

  const validateStep = (currentStep: number, data: any): boolean => {
    switch (currentStep) {
      case 1:
        return validateStep1(data.associates);
      case 2:
        return validateStep2Headquarters(data.companyData);
      case 3:
        return validateStep2(data.companyData) && validateStep3CNI(data.uploadedFiles);
      case 4:
        return validateStep3Payment(data.dossier);
      case 5:
        return validateStep5RemainingDocuments(data.uploadedFiles);
      case 6:
        return true; // Final step - no validation needed
      default:
        return true;
    }
  };

  const validateStep3Payment = (dossier: any): boolean => {
    const stepErrorsList: string[] = [];
    
    if (!dossier) {
      stepErrorsList.push(t('payment.dossierNotFound'));
    } else if (dossier.paymentStatus !== 'succeeded') {
      stepErrorsList.push(t('payment.required'));
    }
    
    setStepErrors(prev => ({ ...prev, 3: stepErrorsList }));
    return stepErrorsList.length === 0;
  };

  const validateStep3CNI = (uploadedFiles: any): boolean => {
    const stepErrorsList: string[] = [];
    
    // Check if CNI files are uploaded
    // Convert uploadedFiles object to array like in components
    const filesArray = uploadedFiles ? Object.values(uploadedFiles).flat() : [];
    const cniFiles = filesArray.filter((file: any) => file.documentType === 'cni');
    
    if (cniFiles.length === 0) {
      stepErrorsList.push('Vous devez uploader les CNI de tous les associés avant de procéder au paiement');
    }
    
    setStepErrors(prev => ({ ...prev, 3: stepErrorsList }));
    return stepErrorsList.length === 0;
  };

  const validateStep5RemainingDocuments = (uploadedFiles: any): boolean => {
    const stepErrorsList: string[] = [];
    
    // Check if remaining documents are uploaded
    // Convert uploadedFiles object to array like in components
    const filesArray = uploadedFiles ? Object.values(uploadedFiles).flat() : [];
    
    if (filesArray.length === 0) {
      stepErrorsList.push('Veuillez uploader les documents restants');
    }
    
    setStepErrors(prev => ({ ...prev, 5: stepErrorsList }));
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
        const docNames: any = {
          'cni': t('docs.cni'),
          'justificatif_domicile': t('docs.justifDomicile'),
          'autre': t('docs.statuts')
        };
        stepErrorsList.push(t('docs.required', { name: docNames[docType] }));
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
    validateStep3CNI,
    validateStep4Documents,
    validateStep5RemainingDocuments,
    validateStep,
    clearFieldError,
    clearStepErrors,
    setErrors,
    setStepErrors
  };
};
