'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const t = useTranslations('Auth.Forgot');
  const tCommon = useTranslations('Auth.common');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      // Check if email exists
      const res = await fetch(`${API}/auth/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || t('errors.emailNotFound'));
      }
      
      // Redirect to reset page with email
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#062A2F] to-[#0a3b42] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#F66B4C]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#F66B4C]/5 rounded-full blur-2xl"></div>
      
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
          {/* Forgot Password Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F66B4C]/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#062A2F]/5 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#F66B4C] to-[#e55a43] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h1 
                  className="text-3xl font-bold text-[#071B1E] mb-2"
                  style={{ fontFamily: '"Gascogne Serial", serif' }}
                >
                  {t('title')}
                </h1>
                <p 
                  className="text-gray-600"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {t('subtitle')}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label 
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {tCommon('email')}
                  </label>
                  <input 
                    className="w-full px-4 py-3 text-black rounded-2xl border border-gray-200 focus:border-[#F66B4C] focus:ring-2 focus:ring-[#F66B4C]/20 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    placeholder={tCommon('emailPlaceholder')}
                    type="email"
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                    <p className="text-red-600 text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {error}
                    </p>
                  </div>
                )}

                {message && (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                    <p className="text-green-600 text-sm whitespace-pre-line" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {message}
                    </p>
                  </div>
                )}

                <button 
                  disabled={loading} 
                  className="w-full bg-gradient-to-r from-[#F66B4C] to-[#e55a43] text-white px-6 py-4 rounded-2xl font-semibold text-lg hover:from-[#e55a43] hover:to-[#F66B4C] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      {t('sending')}
                    </div>
                  ) : (
                    t('sendLink')
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
                    className="text-[#F66B4C] hover:text-[#e55a43] font-semibold transition-colors"
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
