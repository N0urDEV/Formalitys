'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Navigation() {
  const t = useTranslations('Nav');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close services dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isServicesOpen) {
        const target = e.target as Element;
        if (!target.closest('.services-dropdown')) {
          setIsServicesOpen(false);
        }
      }
    };

    if (isServicesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isServicesOpen]);

  return (
    <>
      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={closeMenu}
        />
      )}
      
      <nav className="bg-white/95 backdrop-blur-md relative md:sticky md:top-0 z-50 border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" onClick={closeMenu} className="group">
                <img 
                  src="/SVG/Asset 1.svg" 
                  alt="Formalitys" 
                  className="h-10 w-auto group-hover:scale-105 transition-transform duration-200"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {/* Services Dropdown */}
              <div className="relative services-dropdown">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="text-[#071B1E] hover:text-[#F66B4C] px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-[#F66B4C]/5 flex items-center"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {t('services')}
                  <svg 
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                {isServicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-md border border-gray-100/50 rounded-xl shadow-xl z-50">
                    <div className="py-2">
                      <Link
                        href="/dossiers/company"
                        className="block px-4 py-3 text-[#071B1E] hover:text-[#F66B4C] hover:bg-[#F66B4C]/5 transition-all duration-200"
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                        onClick={closeMenu}
                      >
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <div>
                            <div className="font-semibold">{t('company.title')}</div>
                            <div className="text-sm text-gray-500">{t('company.subtitle')}</div>
                          </div>
                        </div>
                      </Link>
                      <Link
                        href="/dossiers/tourism"
                        className="block px-4 py-3 text-[#071B1E] hover:text-[#F66B4C] hover:bg-[#F66B4C]/5 transition-all duration-200"
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                        onClick={closeMenu}
                      >
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                          </svg>
                          <div>
                            <div className="font-semibold">{t('tourism.title')}</div>
                            <div className="text-sm text-gray-500">{t('tourism.subtitle')}</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link 
                href="/#faq" 
                className="text-[#071B1E] hover:text-[#F66B4C] px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-[#F66B4C]/5"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {t('faq')}
              </Link>
              <Link 
                href="/blog" 
                className="text-[#071B1E] hover:text-[#F66B4C] px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-[#F66B4C]/5"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {t('blog')}
              </Link>
              <Link 
                href="/#contact" 
                className="text-[#071B1E] hover:text-[#F66B4C] px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-[#F66B4C]/5"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {t('contact')}
              </Link>
              <Link 
                href="/login" 
                className="text-[#071B1E] hover:text-[#F66B4C] px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-[#F66B4C]/5"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {t('login')}
              </Link>
              <Link 
                href="/register" 
                className="bg-gradient-to-r from-[#F66B4C] to-[#e55a43] text-white px-6 py-2.5 rounded-xl font-semibold hover:from-[#e55a43] hover:to-[#F66B4C] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {t('register')}
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="relative w-10 h-10 flex items-center justify-center text-[#071B1E] hover:text-[#F66B4C] focus:outline-none focus:ring-2 focus:ring-[#F66B4C] focus:ring-offset-2 rounded-xl transition-all duration-200 hover:bg-[#F66B4C]/5"
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  <span 
                    className={`absolute top-1 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                      isMenuOpen ? 'rotate-45 top-2.5' : 'top-1'
                    }`}
                  />
                  <span 
                    className={`absolute top-2.5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                      isMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span 
                    className={`absolute top-4 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                      isMenuOpen ? '-rotate-45 top-2.5' : 'top-4'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-full opacity-100 translate-y-0' 
              : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'
          }`}>
            <div className="px-2 pt-4 pb-6 mb-4 space-y-2 bg-white/95 backdrop-blur-md border-t border-gray-100/50 shadow-xl rounded-2xl">
              {/* Menu Items */}
              <div className="space-y-1">
                {/* Services Section */}
                <div className="px-4 py-2">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{t('mobile.services')}</div>
                  <div className="space-y-1">
                    <Link
                      href="/dossiers/company"
                      className="group flex items-center px-4 py-3 text-[#071B1E] hover:text-[#F66B4C] hover:bg-gradient-to-r hover:from-[#F66B4C]/5 hover:to-[#F66B4C]/10 rounded-xl font-medium transition-all duration-200"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                      onClick={closeMenu}
                    >
                      <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-[#F66B4C] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <div>
                        <div className="font-semibold">{t('company.title')}</div>
                        <div className="text-sm text-gray-500">{t('company.subtitle')}</div>
                      </div>
                    </Link>
                    <Link
                      href="/dossiers/tourism"
                      className="group flex items-center px-4 py-3 text-[#071B1E] hover:text-[#F66B4C] hover:bg-gradient-to-r hover:from-[#F66B4C]/5 hover:to-[#F66B4C]/10 rounded-xl font-medium transition-all duration-200"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                      onClick={closeMenu}
                    >
                      <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-[#F66B4C] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                      </svg>
                      <div>
                        <div className="font-semibold">{t('tourism.title')}</div>
                        <div className="text-sm text-gray-500">{t('tourism.subtitle')}</div>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Other Links */}
                <div className="px-4 py-2">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{t('mobile.nav')}</div>
                  <div className="space-y-1">
                    <Link
                      href="/#faq"
                      className="group flex items-center px-4 py-3 text-[#071B1E] hover:text-[#F66B4C] hover:bg-gradient-to-r hover:from-[#F66B4C]/5 hover:to-[#F66B4C]/10 rounded-xl font-medium transition-all duration-200"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                      onClick={closeMenu}
                    >
                      <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-[#F66B4C] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {t('faq')}
                    </Link>
                    <Link
                      href="/blog"
                      className="group flex items-center px-4 py-3 text-[#071B1E] hover:text-[#F66B4C] hover:bg-gradient-to-r hover:from-[#F66B4C]/5 hover:to-[#F66B4C]/10 rounded-xl font-medium transition-all duration-200"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                      onClick={closeMenu}
                    >
                      <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-[#F66B4C] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      {t('blog')}
                    </Link>
                    <Link
                      href="/#contact"
                      className="group flex items-center px-4 py-3 text-[#071B1E] hover:text-[#F66B4C] hover:bg-gradient-to-r hover:from-[#F66B4C]/5 hover:to-[#F66B4C]/10 rounded-xl font-medium transition-all duration-200"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                      onClick={closeMenu}
                    >
                      <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-[#F66B4C] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {t('contact')}
                    </Link>
                    <Link
                      href="/login"
                      className="group flex items-center px-4 py-3 text-[#071B1E] hover:text-[#F66B4C] hover:bg-gradient-to-r hover:from-[#F66B4C]/5 hover:to-[#F66B4C]/10 rounded-xl font-medium transition-all duration-200"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                      onClick={closeMenu}
                    >
                      <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-[#F66B4C] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      {t('login')}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 my-4"></div>

              {/* CTA Button */}
              <div className="px-2">
                <Link
                  href="/register"
                  className="group flex items-center justify-center w-full bg-gradient-to-r from-[#F66B4C] to-[#e55a43] text-white px-6 py-4 rounded-xl font-semibold hover:from-[#e55a43] hover:to-[#F66B4C] transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                  onClick={closeMenu}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  {t('register')}
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              
              
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
