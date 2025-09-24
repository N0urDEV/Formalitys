import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { OwnerInfo, EstablishmentInfo, UploadedFiles, QuestionnaireAnswers, FormErrors, StepErrors } from '../types';

export const useValidation = () => {
  const t = useTranslations('Dossiers.Tourism.Validation');
  const [errors, setErrors] = useState<FormErrors>({});
  const [stepErrors, setStepErrors] = useState<StepErrors>({});

  const validateStep1 = (ownerInfo: OwnerInfo): boolean => {
    const newErrors: FormErrors = {};
    const stepErrorsList: string[] = [];

    if (!ownerInfo.nom.trim()) {
      newErrors['nom'] = t('owner.lastNameRequired');
      stepErrorsList.push(t('owner.lastNameRequired'));
    }
    
    if (!ownerInfo.prenom.trim()) {
      newErrors['prenom'] = t('owner.firstNameRequired');
      stepErrorsList.push(t('owner.firstNameRequired'));
    }
    
    if (!ownerInfo.numero.trim()) {
      newErrors['numero'] = t('owner.idNumberRequired');
      stepErrorsList.push(t('owner.idNumberRequired'));
    }
    
    if (!ownerInfo.adresse.trim()) {
      newErrors['adresse'] = t('owner.addressRequired');
      stepErrorsList.push(t('owner.addressRequired'));
    }
    
    if (!ownerInfo.telephone.trim()) {
      newErrors['telephone'] = t('owner.phoneRequired');
      stepErrorsList.push(t('owner.phoneRequired'));
    } else if (!/^[0-9+\-\s()]+$/.test(ownerInfo.telephone)) {
      newErrors['telephone'] = t('owner.phoneInvalid');
      stepErrorsList.push(t('owner.phoneInvalid'));
    }
    
    if (!ownerInfo.email.trim()) {
      newErrors['email'] = t('owner.emailRequired');
      stepErrorsList.push(t('owner.emailRequired'));
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ownerInfo.email)) {
      newErrors['email'] = t('owner.emailInvalid');
      stepErrorsList.push(t('owner.emailInvalid'));
    }

    if (!ownerInfo.qualite.trim()) {
      newErrors['qualite'] = t('owner.roleRequired');
      stepErrorsList.push(t('owner.roleRequired'));
    }


    setErrors(newErrors);
    setStepErrors(prev => ({ ...prev, 1: stepErrorsList }));
    
    return stepErrorsList.length === 0;
  };

  const validateStep2 = (establishmentInfo: EstablishmentInfo): boolean => {
    const newErrors: FormErrors = {};
    const stepErrorsList: string[] = [];

    if (!establishmentInfo.type.trim()) {
      newErrors['type'] = t('establishment.typeRequired');
      stepErrorsList.push(t('establishment.typeRequired'));
    }

    if (!establishmentInfo.categorie.trim()) {
      newErrors['categorie'] = t('establishment.categorieRequired');
      stepErrorsList.push(t('establishment.categorieRequired'));
    }

    if (!establishmentInfo.enseigneCommerciale.trim()) {
      newErrors['enseigneCommerciale'] = t('establishment.enseigneRequired');
      stepErrorsList.push(t('establishment.enseigneRequired'));
    }

    if (!establishmentInfo.dateOuverturePrevue.trim()) {
      newErrors['dateOuverturePrevue'] = t('establishment.dateRequired');
      stepErrorsList.push(t('establishment.dateRequired'));
    }



    if (!establishmentInfo.telephone.trim()) {
      newErrors['telephone'] = t('establishment.phoneRequired');
      stepErrorsList.push(t('establishment.phoneRequired'));
    } else if (!/^[0-9+\-\s()]+$/.test(establishmentInfo.telephone)) {
      newErrors['telephone'] = t('establishment.phoneInvalid');
      stepErrorsList.push(t('establishment.phoneInvalid'));
    }

    if (!establishmentInfo.email.trim()) {
      newErrors['email'] = t('establishment.emailRequired');
      stepErrorsList.push(t('establishment.emailRequired'));
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(establishmentInfo.email)) {
      newErrors['email'] = t('establishment.emailInvalid');
      stepErrorsList.push(t('establishment.emailInvalid'));
    }

    if (!establishmentInfo.region.trim()) {
      newErrors['region'] = t('establishment.regionRequired');
      stepErrorsList.push(t('establishment.regionRequired'));
    }

    if (!establishmentInfo.province.trim()) {
      newErrors['province'] = t('establishment.provinceRequired');
      stepErrorsList.push(t('establishment.provinceRequired'));
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
