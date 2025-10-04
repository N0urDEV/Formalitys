'use client';

import Link from 'next/link';
import Image from 'next/image';
import Footer from './components/sections/Footer';
import PromoModal from './components/PromoModal';
import PartnersCarousel from './components/PartnersCarousel';
import Navigation from './components/Navigation';
import StructuredData from './components/StructuredData';
import OptimizedImage from './components/OptimizedImage';
import FAQ from './components/FAQ';
import HeroSection from './components/landingpagecomponents/HeroSection';
import KeywordsBanner from './components/landingpagecomponents/KeywordsBanner';
import HowItWorksSection from './components/landingpagecomponents/HowItWorksSection';
import ServicesSection from './components/landingpagecomponents/ServicesSection';
import TestimonialsSection from './components/landingpagecomponents/TestimonialsSection';
import DiscountSection from './components/landingpagecomponents/DiscountSection';
import BenefitsSection from './components/landingpagecomponents/BenefitsSection';
import BlogSection from './components/landingpagecomponents/BlogSection';
import CTASection from './components/landingpagecomponents/CTASection';
import WhatsAppWidget from './components/WhatsAppWidget';
import TawkToChat from './components/TawkToChat';
import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { animateHeroSection, animateKeywordsBanner, animateHowItWorks, animateServices, animateDiscountSection, animateWhyChooseUs, animateBlog, animateFAQ, animateCTA, animateFooter } from '@/app/utils/gsap';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';


export default function Home() {
  const t = useTranslations('Home');
  useEffect(() => {
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
    animateDiscountSection();
    animateWhyChooseUs();
    animateBlog();
    animateFAQ();
    animateCTA();
    animateFooter();
  }, []);


  return (
    <div className="min-h-screen bg-white pointer-events-auto">
      <PromoModal />
      <StructuredData type="organization" />
      <StructuredData type="faq" />
      {/* Navigation Header */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Keywords Banner */}
      <KeywordsBanner />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Discount Section */}
      <DiscountSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Blog Section */}
      <BlogSection />

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />

      {/* Sticky Components */}
      <WhatsAppWidget />
      <TawkToChat />
    </div>
  );
}
