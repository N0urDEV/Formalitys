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

            
          </div>
        </div>
      </div>
    </nav>
  );
}
