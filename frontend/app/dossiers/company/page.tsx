'use client';
import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useCompanyDossier } from './hooks/useCompanyDossier';
import { useValidation } from './hooks/useValidation';
import { ProgressBar } from './components/ProgressBar';
import { Navigation } from './components/Navigation';
import { Step1Associates } from './components/steps/Step1Associates';
import { Step2Headquarters } from './components/steps/Step2Headquarters';
import { Step3Payment } from './components/steps/Step3Payment';
import { Step2CompanyDetails } from './components/steps/Step2CompanyDetails';
import { Step4Final } from './components/steps/Step4Final';

function CompanyDossierContent() {
  const router = useRouter();
  const {
    dossier,
    currentStep,
    setCurrentStep,
    loading,
    associates,
    setAssociates,
    companyData,
    setCompanyData,
    uploadedFiles,
    saveStep,
    handleFileUpload,
    downloadPdf,
    calculateTotalPrice
  } = useCompanyDossier();

  const {
    errors,
    stepErrors,
    validateCurrentStep,
    clearFieldError
  } = useValidation();

  const nextStep = async () => {
    const validationData = {
      associates,
      companyData,
      uploadedFiles
    };

    if (!validateCurrentStep(currentStep, validationData)) {
      return;
    }

    if (currentStep === 1) {
      await saveStep({ associates, currentStep: 2 });
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Save headquarters selection and go to payment
      await saveStep({ ...companyData, currentStep: 3 });
      router.push(`/payment/company/${dossier?.id}`);
    } else if (currentStep === 3) {
      // After payment, go to company details
      await saveStep({ ...companyData, currentStep: 4 });
      setCurrentStep(4);
    } else if (currentStep === 4) {
      // Final step
      await saveStep({ ...companyData, currentStep: 5 });
      setCurrentStep(5);
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
          <Step1Associates
            associates={associates}
            setAssociates={setAssociates}
            errors={errors}
            stepErrors={stepErrors}
            clearFieldError={clearFieldError}
          />
        );
      case 2:
        return (
          <Step2Headquarters
            companyData={companyData}
            setCompanyData={setCompanyData}
            stepErrors={stepErrors}
            calculateTotalPrice={calculateTotalPrice}
          />
        );
      case 3:
        return <Step3Payment totalPrice={calculateTotalPrice()} />;
      case 4:
        return (
          <Step2CompanyDetails
            companyData={companyData}
            setCompanyData={setCompanyData}
            stepErrors={stepErrors}
            onFileUpload={handleFileUpload}
            calculateTotalPrice={calculateTotalPrice}
            associates={associates}
          />
        );
      case 5:
        return <Step4Final onDownloadPdf={downloadPdf} />;
      default:
        return <Step4Final onDownloadPdf={downloadPdf} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-[#071B1E]" style={{ fontFamily: '"Gascogne Serial", serif' }}>
              Création de société
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
        <ProgressBar currentStep={currentStep} totalSteps={5} />
        
        {renderCurrentStep()}

        <Navigation
          currentStep={currentStep}
          onPrevious={previousStep}
          onNext={nextStep}
          loading={loading}
          canGoBack={currentStep > 1 && currentStep < 5}
          totalPrice={calculateTotalPrice()}
        />
      </main>
    </div>
  );
}

export default function CompanyDossierPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompanyDossierContent />
    </Suspense>
  );
}