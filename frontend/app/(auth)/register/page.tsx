'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

export default function RegisterPage() {
  const router = useRouter();
  const t = useTranslations('Auth');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });
      // Safely parse JSON; don't hang if backend returns empty body
      const raw = await res.text();
      let data: any = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {}
      if (!res.ok) throw new Error(data.message || t('common.errorRegister'));
      let token: string | undefined = data.token;
      // If register didn't return a token, perform a login to obtain one
      if (!token) {
        const loginRes = await fetch(`${API}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ emailOrPhone: email || phone, password })
        });
        const loginRaw = await loginRes.text();
        let loginData: any = {};
        try { loginData = loginRaw ? JSON.parse(loginRaw) : {}; } catch {}
        if (!loginRes.ok) {
          throw new Error(loginData.message || t('common.errorRegister'));
        }
        token = loginData.token;
      }
      if (token) {
        localStorage.setItem('token', token);
      }
      router.replace('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
            href="/" 
            className="text-white/80 hover:text-white transition-colors"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            {t('common.backHome')}
          </Link>
        </div>
      </nav>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-6 py-8">
        <div className="w-full max-w-md">
          {/* Register Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#007ea7]/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#00171f]/5 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 
                  className="text-3xl font-bold text-[#00171f] mb-2"
                  style={{ fontFamily: '"Gascogne Serial", serif' }}
                >
                  {t('register.title')}
                </h1>
                <p 
                  className="text-gray-600"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {t('register.subtitle')}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label 
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('register.fullName')}
                  </label>
                  <input 
                    className="w-full px-4 py-3 text-black rounded-2xl border border-gray-200 focus:border-[#007ea7] focus:ring-2 focus:ring-[#007ea7]/20 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    placeholder={t('register.fullNamePlaceholder')}
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                    required
                  />
                </div>

                <div>
                  <label 
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('register.email')}
                  </label>
                  <input 
                    className="w-full px-4 py-3 text-black rounded-2xl border border-gray-200 focus:border-[#007ea7] focus:ring-2 focus:ring-[#007ea7]/20 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    placeholder={t('register.emailPlaceholder')}
                    type="email"
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                    required
                  />
                </div>

                <div>
                  <label 
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('register.phone')}
                  </label>
                  <input 
                    className="w-full px-4 py-3 text-black rounded-2xl border border-gray-200 focus:border-[#007ea7] focus:ring-2 focus:ring-[#007ea7]/20 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    placeholder={t('register.phonePlaceholder')}
                    type="tel"
                    value={phone} 
                    onChange={e => setPhone(e.target.value)}
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                    required
                  />
                </div>

                <div>
                  <label 
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('common.password')}
                  </label>
                  <input 
                    className="w-full px-4 py-3 text-black rounded-2xl border border-gray-200 focus:border-[#007ea7] focus:ring-2 focus:ring-[#007ea7]/20 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    placeholder={t('common.passwordPlaceholder')}
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
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

                <button 
                  disabled={loading} 
                  className="w-full bg-gradient-to-r from-[#007ea7] to-[#00a8e8] text-white px-6 py-4 rounded-2xl font-semibold text-lg hover:from-[#00a8e8] hover:to-[#007ea7] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      {t('register.loading')}
                    </div>
                  ) : (
                    t('register.cta')
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p 
                  className="text-gray-600"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {t('register.haveAccount')}{' '}
                  <Link 
                    href="/login" 
                    className="text-[#007ea7] hover:text-[#00a8e8] font-semibold transition-colors"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('register.login')}
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


