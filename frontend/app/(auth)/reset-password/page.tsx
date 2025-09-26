'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const t = useTranslations('Auth.Reset');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!email) {
      setError(t('errors.emailMissing'));
      setVerifying(false);
      return;
    }
    setVerifying(false);
  }, [email]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError(t('errors.passwordsMismatch'));
      return;
    }

    if (password.length < 6) {
      setError(t('errors.passwordMin'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API}/auth/reset-password-direct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || t('errors.errorReset'));
      }
      
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00171f] to-[#003459] relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            {t('verifying')}
          </p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00171f] to-[#003459] relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
          <div className="w-full max-w-md">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 
                className="text-3xl font-bold text-[#00171f] mb-4"
                style={{ fontFamily: '"Gascogne Serial", serif' }}
              >
                {t('successTitle')}
              </h1>
              <p 
                className="text-gray-600 mb-8"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {t('successBody')}
              </p>
              <Link 
                href="/login"
                className="inline-block bg-gradient-to-r from-[#007ea7] to-[#00a8e8] text-white px-8 py-3 rounded-2xl font-semibold hover:from-[#00a8e8] hover:to-[#007ea7] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {t('backToLogin')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00171f] to-[#003459] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#007ea7]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#007ea7]/5 rounded-full blur-2xl"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img 
              src="/SVG/Asset 1.svg" 
              alt="Formalitys" 
              className="h-10 w-auto filter brightness-0 invert"
            />
          </Link>
          <Link 
            href="/login" 
            className="text-white/80 hover:text-white transition-colors"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            {t('backToLogin')}
          </Link>
        </div>
      </nav>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <div className="w-full max-w-md">
          {/* Reset Password Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#007ea7]/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#00171f]/5 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#007ea7] to-[#00a8e8] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h1 
                  className="text-3xl font-bold text-[#00171f] mb-2"
                  style={{ fontFamily: '"Gascogne Serial", serif' }}
                >
                  {t('title')}
                </h1>
                <p 
                  className="text-gray-600"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {email ? t('forEmail', { email }) : t('enterNewPassword')}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label 
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('newPassword')}
                  </label>
                  <input 
                    className="w-full px-4 py-3 text-black rounded-2xl border border-gray-200 focus:border-[#007ea7] focus:ring-2 focus:ring-[#007ea7]/20 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    placeholder="••••••••"
                    type="password"
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <label 
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('confirmPassword')}
                  </label>
                  <input 
                    className="w-full px-4 py-3 text-black rounded-2xl border border-gray-200 focus:border-[#007ea7] focus:ring-2 focus:ring-[#007ea7]/20 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    placeholder="••••••••"
                    type="password"
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)}
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                    required
                    minLength={6}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                    <p className="text-red-600 text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {error}
                    </p>
                  </div>
                )}

                <button 
                  disabled={loading} 
                  className="w-full bg-gradient-to-r from-[#007ea7] to-[#00a8e8] text-white px-6 py-4 rounded-2xl font-semibold text-lg hover:from-[#00a8e8] hover:to-[#007ea7] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      {t('resetting')}
                    </div>
                  ) : (
                    t('resetPassword')
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p 
                  className="text-gray-600"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {t('remember')} 
                  <Link 
                    href="/login" 
                    className="text-[#007ea7] hover:text-[#00a8e8] font-semibold transition-colors"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('backToLogin')}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
