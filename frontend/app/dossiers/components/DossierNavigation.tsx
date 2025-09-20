'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DossierNavigationProps {
  currentStep: number;
  totalSteps: number;
  onFinish?: () => void;
  isSubmitting?: boolean;
}

export default function DossierNavigation({ 
  currentStep, 
  totalSteps, 
  onFinish, 
  isSubmitting = false 
}: DossierNavigationProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-3">
              <img 
                src="/SVG/Asset 1.svg" 
                alt="Formalitys" 
                className="h-8 w-auto"
              />
              
              
            </Link>
          </div>

          {/* Progress Indicator */}
          <div className="hidden md:flex items-center space-x-4">
            <span 
              className="text-sm text-gray-600"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Étape {currentStep} sur {totalSteps}
            </span>
            <div className="flex space-x-1">
              {[...Array(totalSteps)].map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index < currentStep 
                      ? 'bg-[#F66B4C]' 
                      : index === currentStep - 1 
                        ? 'bg-[#F66B4C] animate-pulse' 
                        : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Back to Dashboard */}
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 text-gray-600 hover:text-[#F66B4C] transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span 
                className="text-sm font-medium"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Retour au tableau de bord
              </span>
            </Link>

            {/* Finish Button - Only show on last step */}
            {currentStep === totalSteps && onFinish && (
              <button
                onClick={onFinish}
                disabled={isSubmitting}
                className="bg-[#F66B4C] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#e55a43] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Finalisation...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Terminer</span>
                  </>
                )}
              </button>
            )}

            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-[#F66B4C] transition-colors duration-300">
                <div className="w-8 h-8 bg-[#F66B4C] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    </svg>
                    <span>Tableau de bord</span>
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Mon profil</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Se déconnecter</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
