'use client';

import Link from 'next/link';
import Footer from './components/sections/Footer';
import PartnersCarousel from './components/PartnersCarousel';
import Navigation from './components/Navigation';
import StructuredData from './components/StructuredData';
import OptimizedImage from './components/OptimizedImage';
import { useState, useEffect } from 'react';

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
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
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
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-[#062A2F] pointer-events-auto">
      <StructuredData type="organization" />
      <StructuredData type="faq" />
      {/* Navigation Header */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden pointer-events-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-[#062A2F] via-[#0a3b42] to-[#062A2F]"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-32 z-10">
          <div className="text-center lg:text-left max-w-4xl relative z-20">
            <h1 
              className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight"
              style={{ fontFamily: '"Gascogne Serial", serif' }}
            >
              Simplifiez vos
              <span className="block text-[#F66B4C]">démarches juridiques</span>
              au Maroc
            </h1>
            
            {/* Key Benefits Words */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-6 mb-8">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <div className="w-2 h-2 bg-[#F66B4C] rounded-full"></div>
                <span className="text-white font-semibold text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  Simple
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <div className="w-2 h-2 bg-[#F66B4C] rounded-full"></div>
                <span className="text-white font-semibold text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  Rapide
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <div className="w-2 h-2 bg-[#F66B4C] rounded-full"></div>
                <span className="text-white font-semibold text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  Économique
                </span>
              </div>
            </div>
            
               <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-2xl font-light" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                 <span>
                   <span className="font-semibold text-[#F66B4C]">Création de société SARL</span> au Maroc ou <span className="font-semibold text-[#F66B4C]">Formalités légales pour locations d'hébergements touristiques 100% en ligne</span>.<br />
                   <span className="font-semibold text-[#F66B4C]">Rapide</span>, <span className="font-semibold text-[#F66B4C]">sécurisé</span> avec accompagnement <span className="font-semibold text-[#F66B4C]">expert</span>.
                 </span>
               </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start relative z-10">
              <Link 
                href="/register" 
                className="bg-[#F66B4C] text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-[#e55a43] transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 relative z-20 cursor-pointer pointer-events-auto"
                style={{ fontFamily: 'Satoshi, sans-serif', pointerEvents: 'auto' }}
                onClick={() => console.log('Button clicked!')}
              >
                Lancer mon projet
              </Link>
              <Link 
                href="#services" 
                className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 relative z-20 cursor-pointer"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Explorer nos solutions
              </Link>
            </div>
          </div>
        </div>
        
        {/* Partners Carousel - Full Width */}
        <div className="relative z-10">
          <PartnersCarousel />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-[#F66B4C]/10 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl z-0"></div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#F66B4C]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#062A2F]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#062A2F]/3 rounded-full blur-2xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 
              className="text-4xl lg:text-5xl font-bold text-[#071B1E] mb-6"
              style={{ fontFamily: '"Gascogne Serial", serif' }}
            >
              Comment ça marche ?
            </h2>
            <p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Un processus simple et transparent<br />
              en 4 étapes pour vos démarches juridiques
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                step: "01",
                title: "Remplissez vos informations",
                description: "Complétez le formulaire en ligne avec vos informations personnelles et professionnelles.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ),
                gradient: "from-[#F66B4C] to-[#e55a43]",
                bgGradient: "from-white to-gray-50"
              },
              {
                step: "02", 
                title: "Payez en toute sécurité",
                description: "Effectuez votre paiement via notre plateforme sécurisée avec Stripe.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                ),
                gradient: "from-[#062A2F] to-[#0a3b42]",
                bgGradient: "from-[#062A2F] to-[#0a3b42]"
              },
              {
                step: "03",
                title: "Nous gérons les formalités",
                description: "Nos experts s'occupent de toutes les démarches administratives et juridiques.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                gradient: "from-[#F66B4C] to-[#e55a43]",
                bgGradient: "from-white to-gray-50"
              },
              {
                step: "04",
                title: "Recevez vos documents validés en quelques jours",
                description: "Téléchargez vos documents officiels directement depuis votre espace client.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                gradient: "from-[#062A2F] to-[#0a3b42]",
                bgGradient: "from-[#062A2F] to-[#0a3b42]"
              }
            ].map((step, index) => (
              <div key={index} className="group relative">
                <div className={`bg-gradient-to-br ${step.bgGradient} backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-[#F66B4C]/20 relative overflow-hidden h-full`}>
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#F66B4C]/10 rounded-full blur-lg"></div>
                  
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Step Number */}
                    <div className="relative">
                      <div className={`w-12 h-12  text-[#F66B4C] rounded-2xl flex items-center justify-center font-bold text-lg  group-hover:scale-110 transition-transform duration-300`}>
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
                      className={`text-xl font-bold mb-4 group-hover:text-[#F66B4C] transition-colors ${
                        step.bgGradient.includes('[#062A2F]') ? 'text-white' : 'text-[#071B1E]'
                      }`}
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      {step.title}
                    </h3>
                    <p 
                      className={`leading-relaxed flex-grow ${
                        step.bgGradient.includes('[#062A2F]') ? 'text-white/90' : 'text-gray-600'
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
                              i <= index ? `bg-[#F66B4C] ${step.gradient}` : 'bg-gray-300'
                            }`}
                          ></div>
                        ))}
                      </div>
                      <span className={`text-sm font-medium ${
                        step.bgGradient.includes('[#062A2F]') ? 'text-white/80' : 'text-gray-500'
                      }`} style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        Étape {index + 1}/4
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p 
              className="text-lg text-gray-600 mb-8"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Prêt à simplifier vos démarches ?
            </p>
          <Link 
            href="/register"
            className="inline-block bg-gradient-to-r from-[#F66B4C] to-[#e55a43] text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:from-[#e55a43] hover:to-[#F66B4C] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            C&apos;est parti !
          </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl lg:text-5xl font-bold text-[#071B1E] mb-6"
              style={{ fontFamily: '"Gascogne Serial", serif' }}
            >
              Nos Services
            </h2>
            <p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Deux solutions complètes pour accompagner votre développement au Maroc
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            
            {/* Company Creation Service - Enhanced */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-[#F66B4C] to-[#e55a43] rounded-3xl p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden h-full">
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
                      <div className="text-3xl font-bold text-white" style={{ fontFamily: 'Satoshi, sans-serif' }}>3 600 DH</div>
                    </div>
                  </div>
                  
                  <h3 
                    className="text-3xl font-bold text-white mb-4"
                    style={{ fontFamily: '"Gascogne Serial", serif' }}
                  >
                    Création de société SARL
                  </h3>
                  <p 
                    className="text-white/90 text-lg mb-8 leading-relaxed flex-grow"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Créez votre société en ligne au Maroc avec un accompagnement complet. 
                    De la constitution des dossiers à l'obtention de tous les documents officiels.
                  </p>
                  
                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {[
                      'Constitution complète de votre SARL',
                      'Obtention certificat négatif OMPIC',
                      'Immatriculation au registre du commerce, Patente/TP, impôts et CNSS',
                      'Accompagnement juridique expert',
                      'Introduction compte bancaire'
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
                      className="inline-flex items-center justify-center w-full bg-white text-[#F66B4C] px-6 py-4 rounded-2xl font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      Créer ma société
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Tourism Regulation Service - Enhanced */}
            <div className="group relative">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-[#F66B4C]/20 relative overflow-hidden h-full">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F66B4C]/0 to-[#F66B4C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  {/* Header with Icon */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#F66B4C] to-[#e55a43] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-[#F66B4C]" style={{ fontFamily: 'Satoshi, sans-serif' }}>1 600 DH</div>
                    </div>
                  </div>
                  
                  <h3 
                    className="text-3xl font-bold text-[#071B1E] mb-4 group-hover:text-[#F66B4C] transition-colors"
                    style={{ fontFamily: '"Gascogne Serial", serif' }}
                  >
                    Formalités pour hébergements touristiques
                  </h3>
                  <p 
                    className="text-gray-600 text-lg mb-8 leading-relaxed flex-grow"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Régularisez votre Airbnb, Riad ou location touristique. 
                    <strong> Obtenez toutes les autorisations nécessaires pour louer en toute légalité.</strong>
                  </p>
                  
                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {[
                      'Validation complète des documents',
                      'Autorisations administratives',
                      'Classement touristique',
                      'Conformité réglementaire',
                      'Déclaration nuitées / registre de Police / Taxes de séjour / Impôts'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#F66B4C] rounded-full"></div>
                        <span className="text-gray-700" style={{ fontFamily: 'Satoshi, sans-serif' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <div className="mt-auto">
                    <Link 
                      href="/dashboard"
                      className="inline-flex items-center justify-center w-full bg-[#F66B4C] text-white px-6 py-4 rounded-2xl font-semibold hover:bg-[#e55a43] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      Régulariser mes locations
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
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 
              className="text-4xl lg:text-5xl font-bold text-[#071B1E] mb-6"
              style={{ fontFamily: '"Gascogne Serial", serif' }}
            >
              Pourquoi nous choisir ?
            </h2>
            <p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Une expertise reconnue et un service d'exception pour vos démarches juridiques
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            
            {/* Large Feature Card - Rapidité & simplicité */}
            <div className="group relative lg:col-span-2 lg:row-span-1">
              <div className="bg-gradient-to-br from-[#F66B4C] to-[#e55a43] rounded-3xl p-8 h-full shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
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
                      Rapidité & simplicité
                    </h3>
                    <p 
                      className="text-white/90 text-lg leading-relaxed"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      100% en ligne, sans déplacement. Complétez vos démarches en quelques clics depuis chez vous.
                    </p>
                  </div>
                  
                  <div className="mt-8">
                    <div className="inline-flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      <span style={{ fontFamily: 'Satoshi, sans-serif' }}>100% digital</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Medium Card - Transparence des coûts */}
            <div className="group relative">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 h-full shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-[#F66B4C]/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F66B4C]/0 to-[#F66B4C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#F66B4C] to-[#e55a43] rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  
                  <h3 
                    className="text-xl font-bold text-[#071B1E] mb-3 group-hover:text-[#F66B4C] transition-colors"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Transparence des coûts
                  </h3>
                  <p 
                    className="text-gray-600 text-sm leading-relaxed flex-grow"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Prix clairs et fixes, sans surprise.
                  </p>
                  
                  <div className="mt-4">
                    <div className="inline-flex items-center text-[#F66B4C] font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                      <span style={{ fontFamily: 'Satoshi, sans-serif' }}>Sans frais cachés</span>
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Medium Card - Sécurité des paiements */}
            <div className="group relative">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 h-full shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-[#F66B4C]/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F66B4C]/0 to-[#F66B4C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#F66B4C] to-[#e55a43] rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  
                  <h3 
                    className="text-xl font-bold text-[#071B1E] mb-3 group-hover:text-[#F66B4C] transition-colors"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Sécurité des paiements
                  </h3>
                  <p 
                    className="text-gray-600 text-sm leading-relaxed flex-grow"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Chiffrement SSL et conformité bancaire.
                  </p>
                  
                  <div className="mt-4">
                    <div className="inline-flex items-center text-[#F66B4C] font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                      <span style={{ fontFamily: 'Satoshi, sans-serif' }}>SSL & 3D Secure</span>
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Wide Card - Accompagnement expert */}
            <div className="group relative lg:col-span-3">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 h-full shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-[#F66B4C]/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F66B4C]/0 to-[#F66B4C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                <div className="relative z-10 h-full flex md:flex-row flex-col md:items-center items-start ">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#F66B4C] to-[#e55a43] rounded-2xl flex items-center justify-center mr-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 
                      className="text-2xl font-bold text-[#071B1E] mb-2 group-hover:text-[#F66B4C] transition-colors"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      Accompagnement expert
                    </h3>
                    <p 
                      className="text-gray-600 leading-relaxed"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      Nos experts juridiques et administratifs vous accompagnent à chaque étape de vos démarches.
                    </p>
                  </div>
                  
                  <div>
                    <div className="inline-flex items-center text-[#F66B4C] font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      <span style={{ fontFamily: 'Satoshi, sans-serif' }}>Support dédié</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Card - Expérience reconnue */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-[#062A2F] to-[#0a3b42] rounded-3xl p-6 h-full shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
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
                    Expérience reconnue
                  </h3>
                  <p 
                    className="text-white/80 text-sm leading-relaxed mb-4"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    +210 clients nous ont déjà fait confiance.
                  </p>
                  
                  <div className="inline-flex items-center text-white font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                    <span style={{ fontFamily: 'Satoshi, sans-serif' }}>Reconnu au Maroc</span>
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
            <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#F66B4C] to-[#e55a43] text-white px-8 py-3 rounded-full font-semibold shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span style={{ fontFamily: 'Satoshi, sans-serif' }}>Satisfaction client garantie</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl lg:text-5xl font-bold text-[#071B1E] mb-6"
              style={{ fontFamily: '"Gascogne Serial", serif' }}
            >
              Actualités & Blog
            </h2>
            <p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Découvrez nos derniers articles, conseils et actualités sur les démarches juridiques au Maroc
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F66B4C] mx-auto"></div>
              <p className="mt-4 text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                Chargement des articles...
              </p>
            </div>
          ) : blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogPosts.map((post, index) => {
                const gradients = [
                  'from-[#F66B4C] to-[#e55a43]',
                  'from-[#062A2F] to-[#071B1E]',
                  'from-[#0a3b42] to-[#F66B4C]'
                ];
                const gradient = gradients[index % gradients.length];
                
                return (
                  <article key={post.id} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group">
                    <div className={`relative h-48 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                      {post.featuredImage ? (
                        <OptimizedImage
                          src={post.featuredImage}
                          alt={`Image d'illustration - ${post.title} | Formalitys Blog`}
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
                          className="text-sm text-[#F66B4C] font-medium"
                          style={{ fontFamily: 'Satoshi, sans-serif' }}
                        >
                          {post.publishedAt ? formatDate(post.publishedAt) : 'Bientôt'}
                        </span>
                        <span 
                          className="text-sm text-gray-500"
                          style={{ fontFamily: 'Satoshi, sans-serif' }}
                        >
                          par {post.author.name || 'Formalitys'}
                        </span>
                      </div>
                      <h3 
                        className="text-xl font-bold text-[#071B1E] mb-4 group-hover:text-[#F66B4C] transition-colors line-clamp-2"
                        style={{ fontFamily: '"Gascogne Serial", serif' }}
                      >
                        {post.title}
                      </h3>
                      <p 
                        className="text-gray-600 mb-6 line-clamp-3"
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                      >
                        {post.excerpt || 'Découvrez cet article sur notre blog...'}
                      </p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-[#F66B4C] font-semibold hover:text-[#e55a43] transition-colors group"
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                      >
                        Lire l'article
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
                className="text-2xl font-bold text-[#071B1E] mb-4"
                style={{ fontFamily: '"Gascogne Serial", serif' }}
              >
                Aucun article pour le moment
              </h3>
              <p 
                className="text-gray-600"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Nos articles de blog seront bientôt disponibles.
              </p>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center bg-[#F66B4C] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#e55a43] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Explorer le blog
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-[#062A2F] relative overflow-hidden rounded-4xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#062A2F] via-[#0a3b42] to-[#062A2F]"></div>
            <div className="relative px-6 lg:px-12 py-10 lg:py-14 text-center">
          <h2 
            className="text-4xl lg:text-5xl font-bold text-white mb-8"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Prêt à commencer ?
          </h2>
          <p 
            className="text-xl text-white/90 mb-12 max-w-2xl mx-auto"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Rejoignez des centaines d'entrepreneurs qui nous font confiance 
            pour leurs démarches juridiques au Maroc.
          </p>
          <Link
            href="/register"
            className="inline-block bg-[#F66B4C] text-white px-12 py-4 rounded-2xl font-bold text-xl hover:bg-[#e55a43] transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Rejoindre Formalitys
          </Link>
          
          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#F66B4C]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
