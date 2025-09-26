'use client';

import Link from 'next/link';
import Image from 'next/image';
import Footer from './components/sections/Footer';
import PartnersCarousel from './components/PartnersCarousel';
import Navigation from './components/Navigation';
import StructuredData from './components/StructuredData';
import OptimizedImage from './components/OptimizedImage';
import FAQ from './components/FAQ';
import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { animateHeroSection, animateKeywordsBanner, animateHowItWorks, animateServices, animateWhyChooseUs, animateBlog, animateFAQ, animateCTA, animateFooter } from '@/app/utils/gsap';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  publishedAt: string | null;
  author: {
    name: string | null;
  };
}

export default function Home() {
  const t = useTranslations('Home');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchBlogPosts();
    
    // Initialize animations
    const timer = setTimeout(() => {
      animateHeroSection();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Separate useEffect for scroll-triggered animations
  useEffect(() => {
    animateKeywordsBanner();
    animateHowItWorks();
    animateServices();
    animateWhyChooseUs();
    animateBlog();
    animateFAQ();
    animateCTA();
    animateFooter();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch(`${API}/blog/published?limit=3`);
      const data = await response.json();
      setBlogPosts(data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-white pointer-events-auto">
      <StructuredData type="organization" />
      <StructuredData type="faq" />
      {/* Navigation Header */}
      <Navigation />

      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden pointer-events-auto min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/herobg2.jpg"
            alt="Hero background"
            fill
            priority
            className="object-cover"
            style={{ transform: 'scaleX(-1)' }}
            sizes="100vw"
            quality={90}
          />
        </div>
        
        {/* Dark Gradient Overlay from Left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00171f]/90 via-[#00171f]/70 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-22 z-10">
          <div className="text-center lg:text-left max-w-4xl relative z-20">
            <h1 
              className="hero-title text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight"
              style={{ fontFamily: '"Gascogne Serial", serif' }}
            >
              {t('hero.titleLine1')}
              <span className="block text-[#007ea7]">{t('hero.titleEmphasis')}</span>
              {t('hero.titleLine2')}
            </h1>
            
            {/* Key Benefits Words */}
            <div className="hero-chips flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-6 mb-8">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <div className="w-2 h-2 bg-[#007ea7] rounded-full"></div>
                <span className="text-white font-semibold text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  {t('hero.chips.simple')}
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <div className="w-2 h-2 bg-[#007ea7] rounded-full"></div>
                <span className="text-white font-semibold text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  {t('hero.chips.fast')}
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <div className="w-2 h-2 bg-[#007ea7] rounded-full"></div>
                <span className="text-white font-semibold text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  {t('hero.chips.affordable')}
                </span>
              </div>
            </div>

            <p className="hero-subtitle text-xl lg:text-2xl text-white/90 mb-12 max-w-2xl font-light" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              {t('hero.subtitle')}
            </p>
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start relative z-10">
              <Link 
                href="/register" 
                className="bg-[#007ea7] text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-[#00a8e8] transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 relative z-20 cursor-pointer pointer-events-auto"
                style={{ fontFamily: 'Satoshi, sans-serif', pointerEvents: 'auto' }}
                onClick={() => console.log('Button clicked!')}
              >
                {t('hero.ctaPrimary')}
              </Link>
              <Link 
                href="#services" 
                className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 relative z-20 cursor-pointer"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {t('hero.ctaSecondary')}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Partners Carousel - Full Width */}
        <div className="relative z-10">
          <PartnersCarousel />
        </div>
        
        {/* Subtle Decorative Elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-[#007ea7]/5 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/3 rounded-full blur-3xl z-0"></div>
      </section>

      {/* Keywords Banner */}
      <section className="keywords-banner py-8 bg-gradient-to-r from-[#007ea7] via-[#00a8e8] to-[#007ea7] relative overflow-hidden">
        {/* Bright Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '80px 80px'
          }}></div>
        </div>
        
        {/* Bright Floating Elements */}
        <div className="absolute top-0 left-1/4 w-40 h-40 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-white/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-6">
            {[
              t('keywords.k1'),
              t('keywords.k2'),
              t('keywords.k3'),
              t('keywords.k4'),
              t('keywords.k5')
            ].map((keyword, index) => (
              <div key={index} className="group">
                <div className="bg-white/25 backdrop-blur-sm rounded-full px-6 py-3 border border-white/40 hover:bg-white/35 hover:border-white/60 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl">
                  <span 
                    className="text-white font-bold text-lg tracking-wide drop-shadow-lg"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {keyword}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#007ea7]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00171f]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00171f]/3 rounded-full blur-2xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 
              className="section-title text-4xl lg:text-5xl font-bold text-[#00171f] mb-6"
              style={{ fontFamily: '"Gascogne Serial", serif' }}
            >
              {t('how.title')}
            </h2>
            <p 
              className="section-subtitle text-xl text-gray-600 max-w-3xl mx-auto"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {t('how.subtitleLine1')}<br />
              {t('how.subtitleLine2')}
            </p>
          </div>

          {/* Steps Grid */}
          <div className="steps-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                step: "01",
                title: t('how.steps.s1.title'),
                description: t('how.steps.s1.description'),
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ),
                gradient: "from-[#007ea7] to-[#00a8e8]",
                bgGradient: "from-white to-gray-50"
              },
              {
                step: "02", 
                title: t('how.steps.s2.title'),
                description: t('how.steps.s2.description'),
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                ),
                gradient: "from-[#00171f] to-[#003459]",
                bgGradient: "from-[#00171f] to-[#003459]"
              },
              {
                step: "03",
                title: t('how.steps.s3.title'),
                description: t('how.steps.s3.description'),
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                gradient: "from-[#007ea7] to-[#00a8e8]",
                bgGradient: "from-white to-gray-50"
              },
              {
                step: "04",
                title: t('how.steps.s4.title'),
                description: t('how.steps.s4.description'),
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                gradient: "from-[#00171f] to-[#003459]",
                bgGradient: "from-[#00171f] to-[#003459]"
              }
            ].map((step, index) => (
              <div key={index} className="step-card group relative">
                <div className={`bg-gradient-to-br ${step.bgGradient} backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-[#007ea7]/20 relative overflow-hidden h-full`}>
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#007ea7]/10 rounded-full blur-lg"></div>
                  
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Step Number */}
                    <div className="relative">
                      <div className={`w-12 h-12  text-[#007ea7] rounded-2xl flex items-center justify-center font-bold text-lg  group-hover:scale-110 transition-transform duration-300`}>
                        {step.step}
                      </div>
                    </div>
                    
                    {/* Icon */}
                    <div className={`w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mb-6 mt-3 shadow-lg group-hover:scale-110 transition-all duration-300`}>
                      <div className="text-white">
                        {step.icon}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 
                      className={`text-xl font-bold mb-4 group-hover:text-[#007ea7] transition-colors ${
                        step.bgGradient.includes('[#00171f]') ? 'text-white' : 'text-[#00171f]'
                      }`}
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      {step.title}
                    </h3>
                    <p 
                      className={`leading-relaxed flex-grow ${
                        step.bgGradient.includes('[#00171f]') ? 'text-white/90' : 'text-gray-600'
                      }`}
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      {step.description}
                    </p>
                    
                    {/* Progress Indicator */}
                    <div className="mt-6 flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {[...Array(4)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              i <= index ? `bg-[#007ea7] ${step.gradient}` : 'bg-gray-300'
                            }`}
                          ></div>
                        ))}
                      </div>
                      <span className={`text-sm font-medium ${
                        step.bgGradient.includes('[#00171f]') ? 'text-white/80' : 'text-gray-500'
                      }`} style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        {t('how.stepLabel', { current: index + 1 })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        

          {/* Call to Action */}
          <div className="cta-section text-center mt-16">
            <p 
              className="text-lg text-gray-600 mb-8"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {t('how.ready')}
            </p>
          <Link 
            href="/register"
            className="cta-button inline-block bg-gradient-to-r from-[#007ea7] to-[#00a8e8] text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:from-[#00a8e8] hover:to-[#007ea7] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            {t('how.cta')}
          </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="section-title text-4xl lg:text-5xl font-bold text-[#00171f] mb-6"
              style={{ fontFamily: '"Gascogne Serial", serif' }}
            >
              {t('services.title')}
            </h2>
            <p 
              className="section-subtitle text-xl text-gray-600 max-w-3xl mx-auto"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {t('services.subtitle')}
            </p>
          </div>
          
          <div className="services-grid grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            
            {/* Company Creation Service - Enhanced */}
            <div className="service-card group relative">
              <div className="bg-gradient-to-br from-[#007ea7] to-[#00a8e8] rounded-3xl p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden h-full">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  {/* Header with Icon */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="text-right">
                    <div className="text-3xl font-bold text-white" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('services.company.price')}</div>
                    <div className="text-sm text-white/80" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('services.company.priceEuro')}</div>
                    </div>
                  </div>
                  
                  <h3 
                    className="text-3xl font-bold text-white mb-4"
                    style={{ fontFamily: '"Gascogne Serial", serif' }}
                  >
                    {t('services.company.title')}
                  </h3>
                  <p 
                    className="text-white/90 text-lg mb-8 leading-relaxed flex-grow"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('services.company.desc')}
                  </p>
                  
                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {[
                      t('services.company.features.f1'),
                      t('services.company.features.f2'),
                      t('services.company.features.f3'),
                      t('services.company.features.f4'),
                      t('services.company.features.f5')
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span className="text-white/90" style={{ fontFamily: 'Satoshi, sans-serif' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <div className="mt-auto">
                    <Link 
                      href="/dashboard"
                      className="inline-flex items-center justify-center w-full bg-white text-[#007ea7] px-6 py-4 rounded-2xl font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      {t('services.company.cta')}
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Tourism Regulation Service - Enhanced */}
            <div className="service-card group relative">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-[#007ea7]/20 relative overflow-hidden h-full">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#007ea7]/0 to-[#007ea7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  {/* Header with Icon */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#007ea7] to-[#00a8e8] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div className="text-right">
                    <div className="text-3xl font-bold text-[#007ea7]" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('services.tourism.price')}</div>
                    <div className="text-sm text-[#007ea7]/80" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('services.tourism.priceEuro')}</div>
                    </div>
                  </div>
                  
                  <h3 
                    className="text-3xl font-bold text-[#00171f] mb-4 group-hover:text-[#007ea7] transition-colors"
                    style={{ fontFamily: '"Gascogne Serial", serif' }}
                  >
                    {t('services.tourism.title')}
                  </h3>
                  <p 
                    className="text-gray-600 text-lg mb-8 leading-relaxed flex-grow"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('services.tourism.desc')}
                  </p>
                  
                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {[
                      t('services.tourism.features.f1'),
                      t('services.tourism.features.f2'),
                      t('services.tourism.features.f3'),
                      t('services.tourism.features.f4'),
                      t('services.tourism.features.f5')
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#007ea7] rounded-full"></div>
                        <span className="text-gray-700" style={{ fontFamily: 'Satoshi, sans-serif' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <div className="mt-auto">
                    <Link 
                      href="/dashboard"
                      className="inline-flex items-center justify-center w-full bg-[#007ea7] text-white px-6 py-4 rounded-2xl font-semibold hover:bg-[#00a8e8] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      {t('services.tourism.cta')}
                      
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="why-choose-us-section py-24 bg-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 
              className="section-title text-4xl lg:text-5xl font-bold text-[#00171f] mb-6"
              style={{ fontFamily: '"Gascogne Serial", serif' }}
            >
              {t('benefits.title')}
            </h2>
            <p 
              className="section-subtitle text-xl text-gray-600 max-w-3xl mx-auto"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {t('benefits.subtitle')}
            </p>
          </div>

          {/* Bento Grid */}
          <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            
            {/* Large Feature Card - Rapidité & simplicité */}
            <div className="feature-card group relative lg:col-span-2 lg:row-span-1">
              <div className="bg-gradient-to-br from-[#007ea7] to-[#00a8e8] rounded-3xl p-8 h-full shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    
                    <h3 
                      className="text-3xl font-bold text-white mb-4 group-hover:text-white/90 transition-colors"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      {t('benefits.rapid.title')}
                    </h3>
                    <p 
                      className="text-white/90 text-lg leading-relaxed"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      {t('benefits.rapid.desc')}
                    </p>
                  </div>
                  
                  <div className="mt-8">
                    <div className="inline-flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      <span style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('benefits.rapid.badge')}</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Medium Card - Transparence des coûts */}
            <div className="feature-card group relative">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 h-full shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-[#007ea7]/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#007ea7]/0 to-[#007ea7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#007ea7] to-[#00a8e8] rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  
                  <h3 
                    className="text-xl font-bold text-[#00171f] mb-3 group-hover:text-[#007ea7] transition-colors"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('benefits.costs.title')}
                  </h3>
                  <p 
                    className="text-gray-600 text-sm leading-relaxed flex-grow"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('benefits.costs.desc')}
                  </p>
                  
                  <div className="mt-4">
                    <div className="inline-flex items-center text-[#007ea7] font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                      <span style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('benefits.costs.badge')}</span>
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Medium Card - Sécurité des paiements */}
            <div className="feature-card group relative">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 h-full shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-[#007ea7]/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#007ea7]/0 to-[#007ea7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#007ea7] to-[#00a8e8] rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  
                  <h3 
                    className="text-xl font-bold text-[#00171f] mb-3 group-hover:text-[#007ea7] transition-colors"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('benefits.security.title')}
                  </h3>
                  <p 
                    className="text-gray-600 text-sm leading-relaxed flex-grow"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('benefits.security.desc')}
                  </p>
                  
                  <div className="mt-4">
                    <div className="inline-flex items-center text-[#007ea7] font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                      <span style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('benefits.security.badge')}</span>
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Wide Card - Accompagnement expert */}
            <div className="feature-card group relative lg:col-span-3">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 h-full shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-[#007ea7]/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#007ea7]/0 to-[#007ea7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                <div className="relative z-10 h-full flex md:flex-row flex-col md:items-center items-start ">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#007ea7] to-[#00a8e8] rounded-2xl flex items-center justify-center mr-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 
                      className="text-2xl font-bold text-[#00171f] mb-2 group-hover:text-[#007ea7] transition-colors"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                    {t('benefits.expert.title')}
                    </h3>
                    <p 
                      className="text-gray-600 leading-relaxed"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      {t('benefits.expert.desc')}
                    </p>
                  </div>
                  
                  <div>
                    <div className="inline-flex items-center text-[#007ea7] font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      <span style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('benefits.expert.badge')}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Card - Expérience reconnue */}
            <div className="feature-card group relative">
              <div className="bg-gradient-to-br from-[#00171f] to-[#003459] rounded-3xl p-6 h-full shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                
                <div className="relative z-10 h-full flex flex-col justify-center text-left">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  
                  <h3 
                    className="text-xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('benefits.experience.title')}
                  </h3>
                  <p 
                    className="text-white/80 text-sm leading-relaxed mb-4"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('benefits.experience.desc')}
                  </p>
                  
                  <div className="inline-flex items-center text-white font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                    <span style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('benefits.experience.badge')}</span>
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#007ea7] to-[#00a8e8] text-white px-8 py-3 rounded-full font-semibold shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('benefits.bottomCtaBadge')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="blog-section py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="section-title text-4xl lg:text-5xl font-bold text-[#00171f] mb-6"
              style={{ fontFamily: '"Gascogne Serial", serif' }}
            >
              {t('blog.title')}
            </h2>
            <p 
              className="section-subtitle text-xl text-gray-600 max-w-3xl mx-auto"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {t('blog.subtitle')}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007ea7] mx-auto"></div>
              <p className="mt-4 text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('blog.loading')}</p>
            </div>
          ) : blogPosts.length > 0 ? (
            <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogPosts.map((post, index) => {
                const gradients = [
                  'from-[#007ea7] to-[#00a8e8]',
                  'from-[#00171f] to-[#00171f]',
                  'from-[#003459] to-[#007ea7]'
                ];
                const gradient = gradients[index % gradients.length];
                
                return (
                  <article key={post.id} className="blog-card bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group">
                    <div className={`relative h-48 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                      {post.featuredImage ? (
                        <OptimizedImage
                          src={post.featuredImage}
                          alt={t('blog.alt', { title: post.title })}
                          width={400}
                          height={192}
                          className="w-full h-full object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      )}
                    </div>
                    <div className="p-8">
                      <div className="flex items-center space-x-4 mb-4">
                        <span 
                          className="text-sm text-[#007ea7] font-medium"
                          style={{ fontFamily: 'Satoshi, sans-serif' }}
                        >
                          {post.publishedAt ? formatDate(post.publishedAt) : t('blog.soon')}
                        </span>
                        <span 
                          className="text-sm text-gray-500"
                          style={{ fontFamily: 'Satoshi, sans-serif' }}
                        >
                          {t('blog.by', { author: post.author.name || 'Formalitys' })}
                        </span>
                      </div>
                      <h3 
                        className="text-xl font-bold text-[#00171f] mb-4 group-hover:text-[#007ea7] transition-colors line-clamp-2"
                        style={{ fontFamily: '"Gascogne Serial", serif' }}
                      >
                        {post.title}
                      </h3>
                      <p 
                        className="text-gray-600 mb-6 line-clamp-3"
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                      >
                        {post.excerpt || ''}
                      </p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-[#007ea7] font-semibold hover:text-[#00a8e8] transition-colors group"
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                      >
                        {t('blog.readMore')}
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 
                className="text-2xl font-bold text-[#00171f] mb-4"
                style={{ fontFamily: '"Gascogne Serial", serif' }}
              >
                {t('blog.emptyTitle')}
              </h3>
              <p 
                className="text-gray-600"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {t('blog.emptySubtitle')}
              </p>
            </div>
          )}

          <div className="blog-cta text-center">
            <Link
              href="/blog"
              className="blog-cta-button inline-flex items-center bg-[#007ea7] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#00a8e8] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {t('blog.explore')}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="cta-section py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#007ea7]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00171f]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#007ea7]/3 rounded-full blur-2xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-4xl">
            {/* Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#007ea7] via-[#00a8e8] to-[#007ea7] p-[2px] rounded-4xl">
              <div className="w-full h-full bg-gradient-to-br from-[#00171f] via-[#003459] to-[#00171f] rounded-4xl"></div>
            </div>
            
            {/* Main Content */}
            <div className="relative px-6 lg:px-16 py-16 lg:py-20 text-center">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#007ea7]/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#007ea7]/5 to-transparent rounded-full blur-3xl"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
                  <div className="w-2 h-2 bg-[#007ea7] rounded-full animate-pulse"></div>
                  <span className="text-white/90 font-semibold" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {t('ctaSection.badge')}
                  </span>
                </div>
                
                <h2 
                  className="section-title text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight"
                  style={{ fontFamily: '"Gascogne Serial", serif' }}
                >
                  {t('ctaSection.titleLine1')}
                  <span className="block text-[#007ea7]">{t('ctaSection.titleLine2')}</span>
                </h2>
                
                <p 
                  className="section-subtitle text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {t('ctaSection.subtitle')}
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                  <Link
                    href="/register"
                    className="group relative bg-gradient-to-r from-[#007ea7] to-[#00a8e8] text-white px-10 py-5 rounded-2xl font-bold text-xl hover:from-[#00a8e8] hover:to-[#007ea7] transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 overflow-hidden"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <span className="relative flex items-center space-x-3">
                      <span>{t('ctaSection.join')}</span>
                      <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                  
                  <Link
                    href="#services"
                    className="group flex items-center space-x-3 text-white/90 hover:text-white transition-colors duration-300"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    <span className="text-lg font-semibold">{t('ctaSection.discover')}</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                </div>
                
                {/* Trust Indicators */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  <div className="flex items-center justify-center space-x-3 text-white/80">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#007ea7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-white" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('ctaSection.t1Title')}</div>
                      <div className="text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('ctaSection.t1Sub')}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-3 text-white/80">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#007ea7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-white" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('ctaSection.t2Title')}</div>
                      <div className="text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('ctaSection.t2Sub')}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-3 text-white/80">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#007ea7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-white" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('ctaSection.t3Title')}</div>
                      <div className="text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('ctaSection.t3Sub')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
