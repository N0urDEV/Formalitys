import { useState } from 'react';
import { OwnerInfo, EstablishmentInfo, UploadedFiles, QuestionnaireAnswers, FormErrors, StepErrors } from '../types';

export const useValidation = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [stepErrors, setStepErrors] = useState<StepErrors>({});

  const validateStep1 = (ownerInfo: OwnerInfo): boolean => {
    const newErrors: FormErrors = {};
    const stepErrorsList: string[] = [];

    if (!ownerInfo.nom.trim()) {
      newErrors['nom'] = 'Le nom est requis';
      stepErrorsList.push('Le nom est requis');
    }
    
    if (!ownerInfo.prenom.trim()) {
      newErrors['prenom'] = 'Le prénom est requis';
      stepErrorsList.push('Le prénom est requis');
    }
    
    if (!ownerInfo.numero.trim()) {
      newErrors['numero'] = 'Le numéro de pièce est requis';
      stepErrorsList.push('Le numéro de pièce est requis');
    }
    
    if (!ownerInfo.adresse.trim()) {
      newErrors['adresse'] = 'L\'adresse est requise';
      stepErrorsList.push('L\'adresse est requise');
    }
    
    if (!ownerInfo.telephone.trim()) {
      newErrors['telephone'] = 'Le téléphone est requis';
      stepErrorsList.push('Le téléphone est requis');
    } else if (!/^[0-9+\-\s()]+$/.test(ownerInfo.telephone)) {
      newErrors['telephone'] = 'Format de téléphone invalide';
      stepErrorsList.push('Format de téléphone invalide');
    }
    
    if (!ownerInfo.email.trim()) {
      newErrors['email'] = 'L\'email est requis';
      stepErrorsList.push('L\'email est requis');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ownerInfo.email)) {
      newErrors['email'] = 'Format d\'email invalide';
      stepErrorsList.push('Format d\'email invalide');
    }

    if (!ownerInfo.qualite.trim()) {
      newErrors['qualite'] = 'La qualité est requise';
      stepErrorsList.push('La qualité est requise');
    }


    setErrors(newErrors);
    setStepErrors(prev => ({ ...prev, 1: stepErrorsList }));
    
    return stepErrorsList.length === 0;
  };

  const validateStep2 = (establishmentInfo: EstablishmentInfo): boolean => {
    const newErrors: FormErrors = {};
    const stepErrorsList: string[] = [];

    if (!establishmentInfo.type.trim()) {
      newErrors['type'] = 'Le type d\'établissement est requis';
      stepErrorsList.push('Le type d\'établissement est requis');
    }

    if (!establishmentInfo.categorie.trim()) {
      newErrors['categorie'] = 'La catégorie d\'établissement est requise';
      stepErrorsList.push('La catégorie d\'établissement est requise');
    }

    if (!establishmentInfo.enseigneCommerciale.trim()) {
      newErrors['enseigneCommerciale'] = 'L\'enseigne commerciale est requise';
      stepErrorsList.push('L\'enseigne commerciale est requise');
    }

    if (!establishmentInfo.dateOuverturePrevue.trim()) {
      newErrors['dateOuverturePrevue'] = 'La date d\'ouverture prévue est requise';
      stepErrorsList.push('La date d\'ouverture prévue est requise');
    }



    if (!establishmentInfo.telephone.trim()) {
      newErrors['telephone'] = 'Le téléphone est requis';
      stepErrorsList.push('Le téléphone est requis');
    } else if (!/^[0-9+\-\s()]+$/.test(establishmentInfo.telephone)) {
      newErrors['telephone'] = 'Format de téléphone invalide';
      stepErrorsList.push('Format de téléphone invalide');
    }

    if (!establishmentInfo.email.trim()) {
      newErrors['email'] = 'L\'email est requis';
      stepErrorsList.push('L\'email est requis');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(establishmentInfo.email)) {
      newErrors['email'] = 'Format d\'email invalide';
      stepErrorsList.push('Format d\'email invalide');
    }

    if (!establishmentInfo.region.trim()) {
      newErrors['region'] = 'La région est requise';
      stepErrorsList.push('La région est requise');
    }

    if (!establishmentInfo.province.trim()) {
      newErrors['province'] = 'La province/préfecture est requise';
      stepErrorsList.push('La province/préfecture est requise');
    }

    setErrors(newErrors);
    setStepErrors(prev => ({ ...prev, 2: stepErrorsList }));
    
    return stepErrorsList.length === 0;
  };

  const validateStep4 = (uploadedFiles: UploadedFiles): boolean => {
    const stepErrorsList: string[] = [];

    if (uploadedFiles.cni.length === 0) {
      stepErrorsList.push('La CNI est requise');
    }

    if (uploadedFiles.titreFoncier.length === 0) {
      stepErrorsList.push('Le titre foncier est requis');
    }

    if (uploadedFiles.permisHabiter.length === 0) {
      stepErrorsList.push('Le permis d\'habiter ou attestation architecte est requis');
    }

    if (uploadedFiles.assurance.length === 0) {
      stepErrorsList.push('L\'assurance est requise');
    }

    if (uploadedFiles.photos.length === 0) {
      stepErrorsList.push('Au moins une photo de la propriété est requise');
    }

    setStepErrors(prev => ({ ...prev, 4: stepErrorsList }));
    return stepErrorsList.length === 0;
  };

  const validateStep5 = (questionnaireAnswers: QuestionnaireAnswers): boolean => {
    const stepErrorsList: string[] = [];

    // Check if all required questionnaire answers are provided
    const requiredQuestions = [
      'securite_incendie', 'installations_electriques', 'evacuation_eaux_usees',
      'normes_hygiene', 'fenetres_lumiere_naturelle', 'acces_handicapes',
      'espace_detente', 'espace_cure', 'equipements_animation', 'jardin_enfants',
      'salle_sport', 'structures_sportives', 'parcours_golf', 'gestion_proprietaire',
      'gestion_societe', 'chaine_hoteliere', 'gestion_personne_physique'
    ];

    requiredQuestions.forEach(question => {
      if (!questionnaireAnswers[question]) {
        stepErrorsList.push(`La question "${question}" est requise`);
      }
    });

    // Check numeric fields
    const numericFields = ['nombre_espaces_restauration', 'superficie_espaces_restauration', 
                          'capacite_espaces_restauration', 'nombre_salles_polyvalentes',
                          'capacite_salles_polyvalentes', 'nombre_piscines'];
    
    numericFields.forEach(field => {
      if (questionnaireAnswers[field] && isNaN(Number(questionnaireAnswers[field]))) {
        stepErrorsList.push(`Le champ "${field}" doit être un nombre`);
      }
    });

    setStepErrors(prev => ({ ...prev, 5: stepErrorsList }));
    return stepErrorsList.length === 0;
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

  const validateStep = (currentStep: number, data: any): boolean => {
    switch (currentStep) {
      case 1:
        return validateStep1(data.ownerInfo);
      case 2:
        return validateStep2(data.establishmentInfo);
      case 3:
        return validateStep3Payment(data.dossier);
      case 4:
        return validateStep4(data.uploadedFiles);
      case 5:
        return validateStep5(data.questionnaireAnswers);
      case 6:
        return true; // Final step - no validation needed
      default:
        return true;
    }
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
    validateStep3Payment,
    validateStep4,
    validateStep5,
    validateStep,
    clearFieldError,
    clearStepErrors,
    setErrors,
    setStepErrors
  };
};
