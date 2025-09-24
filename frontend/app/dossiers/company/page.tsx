'use client';

import React, { useState, Suspense } from 'react';
import { useCompanyDossier } from './hooks/useCompanyDossier';
import { useValidation } from './hooks/useValidation';
import DossierNavigation from '../components/DossierNavigation';
import Footer from '../../components/sections/Footer';
import StructuredData from '../../components/StructuredData';
import { ProgressBar } from './components/ProgressBar';
import { Step1Associates } from './components/steps/Step1Associates';
import { Step2CompanyDetails } from './components/steps/Step2CompanyDetails';
import { Step2Headquarters } from './components/steps/Step2Headquarters';
import { Step3Payment } from './components/steps/Step3Payment';
import { Step4Final } from './components/steps/Step4Final';
import { useTranslations } from 'next-intl';

// Removed custom hook usage during render to avoid changing hook order between renders

function CompanyDossierPageContent() {
  const t = useTranslations('Dossiers.Company');
  const serviceData = {
    name: t('serviceName'),
    description: t('serviceDescription'),
    offers: {
      price: t('offerPrice'),
      description: t('offerDescription')
    }
  };
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
    setUploadedFiles,
    saveStep,
    handleFileUpload,
    downloadPdf
  } = useCompanyDossier();

  // Calculate total price function
  const calculateTotalPrice = () => {
    let total = 3600; // Base price for company creation
    
    // Add domiciliation fee if selected
    if (companyData.headquarters === 'contrat_domiciliation') {
      total += 900; // +900 MAD for domiciliation
    }
    
    return total;
  };

  const {
    errors,
    stepErrors,
    validateStep,
    clearFieldError,
    clearStepErrors
  } = useValidation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = async () => {
    const isValid = await validateStep(currentStep, {
      associates,
      companyData,
      uploadedFiles,
      dossier
    });

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Save current step data
      await saveStep({
        currentStep: currentStep + 1,
        associates: currentStep === 1 ? associates : undefined,
        companyData: (currentStep === 2 || currentStep === 4) ? companyData : undefined, // Step 2: Headquarters, Step 4: Company Details
        uploadedFiles: currentStep === 4 ? uploadedFiles : undefined // Step 4: Company Details (file uploads)
      });

      setCurrentStep(currentStep + 1);
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
        return (
          <Step3Payment
            dossier={dossier}
            onPaymentSuccess={async () => {
              // Update dossier status to PAID and advance to step 4
              if (dossier) {
                const token = localStorage.getItem('token');
                await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001'}/dossiers/company/${dossier.id}`, {
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
          <Step2CompanyDetails
            companyData={companyData}
            setCompanyData={setCompanyData}
            stepErrors={stepErrors}
            onFileUpload={handleFileUpload}
            calculateTotalPrice={calculateTotalPrice}
            associates={associates}
            uploadedFiles={Object.values(uploadedFiles).flat()}
          />
        );
      case 5:
        return (
          <Step4Final
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
          <p className="text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('loading')}</p>
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
          "name": t('breadcrumbHome'),
          "item": "https://formalitys.vercel.app"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": t('breadcrumbThis'),
          "item": "https://formalitys.vercel.app/dossiers/company"
        }
      ]} />
      
      <DossierNavigation 
        currentStep={currentStep} 
        totalSteps={5} 
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
            {t('title')}
            </h1>
            <p 
              className="text-xl text-gray-600 mb-6"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
            {t('subtitle')}
            </p>
            <div className="inline-flex items-center bg-[#F66B4C] text-white px-6 py-3 rounded-full font-semibold">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            {t('badgeOnline')}
            </div>
          </div>

          {/* Progress Bar */}
          <ProgressBar currentStep={currentStep} totalSteps={5} />

          {/* Step Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          {currentStep < 5 && (
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
                {t('prev')}
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
                    {t('saving')}
                  </>
                ) : (
                  t('next')
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

export default function CompanyDossierPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F66B4C] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dossier...</p>
        </div>
      </div>
    }>
      <CompanyDossierPageContent />
    </Suspense>
  );
}