'use client';
import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useTourismDossier } from './hooks/useTourismDossier';
import { useValidation } from './hooks/useValidation';
import { ProgressBar } from './components/ProgressBar';
import { Navigation } from './components/Navigation';
import { Step1OwnerInfo } from './components/steps/Step1OwnerInfo';
import { Step2EstablishmentInfo } from './components/steps/Step2EstablishmentInfo';
import { Step3Payment } from './components/steps/Step3Payment';
import { Step4Documents } from './components/steps/Step4Documents';
import { Step5Questionnaire } from './components/steps/Step5Questionnaire';
import { Step6Final } from './components/steps/Step6Final';

function TourismDossierContent() {
  const router = useRouter();
  const {
    dossier,
    currentStep,
    setCurrentStep,
    loading,
    ownerInfo,
    setOwnerInfo,
    establishmentInfo,
    setEstablishmentInfo,
    uploadedFiles,
    questionnaireAnswers,
    setQuestionnaireAnswers,
    saveStep,
    handleDocumentUpload,
    downloadPdf
  } = useTourismDossier();

  const {
    errors,
    stepErrors,
    validateCurrentStep,
    clearFieldError
  } = useValidation();

  const nextStep = async () => {
    const validationData = {
      ownerInfo,
      establishmentInfo,
      uploadedFiles,
      questionnaireAnswers
    };

    if (!validateCurrentStep(currentStep, validationData)) {
      return;
    }

    if (currentStep === 1) {
      await saveStep({ ownerInfo, currentStep: 2 });
      setCurrentStep(2);
    } else if (currentStep === 2) {
      await saveStep({ establishmentInfo, currentStep: 3 });
      setCurrentStep(3);
    } else if (currentStep === 3) {
      router.push(`/payment/tourism/${dossier?.id}`);
    } else if (currentStep === 4) {
      await saveStep({ currentStep: 5 });
      setCurrentStep(5);
    } else if (currentStep === 5) {
      await saveStep({ 
        currentStep: 6,
        complianceAnswers: questionnaireAnswers
      });
      setCurrentStep(6);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!dossier) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#F66B4C]/30 border-t-[#F66B4C] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>Chargement...</p>
        </div>
      </div>
    );
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1OwnerInfo
            ownerInfo={ownerInfo}
            setOwnerInfo={setOwnerInfo}
            errors={errors}
            stepErrors={stepErrors}
            clearFieldError={clearFieldError}
          />
        );
      case 2:
        return (
          <Step2EstablishmentInfo
            establishmentInfo={establishmentInfo}
            setEstablishmentInfo={setEstablishmentInfo}
            errors={errors}
            stepErrors={stepErrors}
            clearFieldError={clearFieldError}
          />
        );
      case 3:
        return <Step3Payment />;
      case 4:
        return (
          <Step4Documents
            uploadedFiles={uploadedFiles}
            onDocumentUpload={handleDocumentUpload}
            stepErrors={stepErrors}
          />
        );
      case 5:
        return (
          <Step5Questionnaire
            questionnaireAnswers={questionnaireAnswers}
            setQuestionnaireAnswers={setQuestionnaireAnswers}
            stepErrors={stepErrors}
          />
        );
      case 6:
        return <Step6Final onDownloadPdf={downloadPdf} />;
      default:
        return <Step6Final onDownloadPdf={downloadPdf} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-[#071B1E]" style={{ fontFamily: '"Gascogne Serial", serif' }}>
              Régularisation location touristique
            </h1>
            <button
              onClick={() => router.push('/dashboard')}
              className="text-gray-500 hover:text-[#F66B4C] transition-colors"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              ← Retour au tableau de bord
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
        <ProgressBar currentStep={currentStep} totalSteps={6} />
        
        {renderCurrentStep()}

        <Navigation
          currentStep={currentStep}
          onPrevious={previousStep}
          onNext={nextStep}
          loading={loading}
          canGoBack={currentStep > 1 && currentStep < 6}
        />
      </main>
    </div>
  );
}

export default function TourismDossierPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TourismDossierContent />
    </Suspense>
  );
}
