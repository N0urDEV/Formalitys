'use client';

import React, { useState, useCallback, useEffect, useRef, Suspense } from 'react';
import { useTourismDossier } from './hooks/useTourismDossier';
import { useValidation } from './hooks/useValidation';
import DossierNavigation from '../components/DossierNavigation';
import Footer from '../../components/sections/Footer';
import StructuredData from '../../components/StructuredData';
import { ProgressBar } from './components/ProgressBar';
import { Step1OwnerInfo } from './components/steps/Step1OwnerInfo';
import { Step2EstablishmentInfo } from './components/steps/Step2EstablishmentInfo';
import { Step3Payment } from './components/steps/Step3Payment';
import { Step4Documents } from './components/steps/Step4Documents';
import { Step5Questionnaire } from './components/steps/Step5Questionnaire';
import { Step6Final } from './components/steps/Step6Final';

const serviceData = {
  name: "Régularisation Hébergement Touristique Maroc",
  description: "Service de régularisation d'hébergements touristiques au Maroc 100% en ligne avec accompagnement expert",
  offers: {
    price: "1600 MAD (152€)",
    description: "Régularisation complète avec toutes les autorisations nécessaires"
  }
};

function TourismDossierPageContent() {
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
    setUploadedFiles,
    questionnaireAnswers,
    setQuestionnaireAnswers,
    saveStep,
    handleFileUpload,
    handleDocumentUpload,
    downloadPdf
  } = useTourismDossier();

  const {
    errors,
    stepErrors,
    validateStep,
    clearFieldError,
    clearStepErrors
  } = useValidation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasCompletedStep6 = useRef(false);

  // Handle completion when reaching step 6
  useEffect(() => {
    if (currentStep === 6 && !hasCompletedStep6.current) {
      hasCompletedStep6.current = true;
      const completeStep = async () => {
        console.log('Step6Final onComplete called, currentStep:', currentStep);
        try {
          await saveStep({
            currentStep: 6,
            complianceAnswers: questionnaireAnswers
          });
          console.log('Final step saved successfully with currentStep: 6');
        } catch (error) {
          console.error('Error saving final step:', error);
        }
      };
      completeStep();
    }
  }, [currentStep, saveStep, questionnaireAnswers]);

  const handleNext = async () => {
    console.log('handleNext called, currentStep:', currentStep);
    
    const isValid = await validateStep(currentStep, {
      ownerInfo,
      establishmentInfo,
      uploadedFiles,
      questionnaireAnswers,
      dossier
    });

    if (!isValid) {
      console.log('Validation failed for step:', currentStep);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const nextStep = currentStep + 1;
      console.log('Saving step data, moving from', currentStep, 'to', nextStep);
      
      // Save current step data
      await saveStep({
        currentStep: nextStep,
        ownerInfo: currentStep === 1 ? ownerInfo : undefined,
        establishmentInfo: currentStep === 2 ? establishmentInfo : undefined,
        uploadedFiles: currentStep === 4 ? uploadedFiles : undefined,
        complianceAnswers: currentStep === 5 ? questionnaireAnswers : undefined
      });

      console.log('Step saved successfully, updating currentStep to:', nextStep);
      setCurrentStep(nextStep);
      clearStepErrors(currentStep);
    } catch (error) {
      console.error('Error saving step:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      clearStepErrors(currentStep);
    }
  };

  const renderStep = () => {
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
        return (
          <Step3Payment
            dossier={dossier}
            onPaymentSuccess={async () => {
              // Update dossier status to PAID and advance to step 4
              if (dossier) {
                const token = localStorage.getItem('token');
                await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001'}/dossiers/tourism/${dossier.id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                  },
                  body: JSON.stringify({ currentStep: 4, status: 'PAID' })
                });
              }
              setCurrentStep(4);
            }}
          />
        );
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
            errors={errors}
            stepErrors={stepErrors}
            clearFieldError={clearFieldError}
          />
        );
      case 6:
        return (
          <Step6Final
            onDownloadPdf={downloadPdf}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F66B4C] mx-auto mb-4"></div>
          <p className="text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            Chargement de votre dossier...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData type="service" data={serviceData} />
      <StructuredData type="breadcrumb" data={[
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": "https://formalitys.vercel.app"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Hébergement Touristique",
          "item": "https://formalitys.vercel.app/dossiers/tourism"
        }
      ]} />
      
      <DossierNavigation 
        currentStep={currentStep} 
        totalSteps={6} 
        onFinish={() => window.location.href = '/dashboard'}
        isSubmitting={isSubmitting}
      />
      
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 
              className="text-4xl font-bold text-[#071B1E] mb-4"
              style={{ fontFamily: '"Gascogne Serial", serif' }}
            >
              Régularisation Hébergement Touristique Maroc
            </h1>
            <p 
              className="text-xl text-gray-600 mb-6"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Service de régularisation d'hébergements touristiques au Maroc avec accompagnement expert
            </p>
            <div className="inline-flex items-center bg-[#F66B4C] text-white px-6 py-3 rounded-full font-semibold">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              100% En Ligne
            </div>
          </div>

          {/* Progress Bar */}
          <ProgressBar currentStep={currentStep} totalSteps={6} />

          {/* Step Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          {currentStep < 6 && (
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentStep === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Précédent
              </button>

              <button
                onClick={handleNext}
                disabled={isSubmitting}
                className="bg-[#F66B4C] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#e55a43] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Enregistrement...
                  </>
                ) : (
                  'Suivant'
                )}
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default function TourismDossierPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F66B4C] mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du dossier...</p>
        </div>
      </div>
    }>
      <TourismDossierPageContent />
    </Suspense>
  );
}