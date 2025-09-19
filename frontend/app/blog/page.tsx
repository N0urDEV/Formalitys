'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '../components/sections/Footer';
import Navigation from '../components/Navigation';
import StructuredData from '../components/StructuredData';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';
import OptimizedImage from '../components/OptimizedImage';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string | null;
    email: string;
  };
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch(`${API}/blog/published`);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#062A2F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F66B4C] mx-auto"></div>
            <p className="mt-4 text-white/80" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              Chargement des articles...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#062A2F]">
      <StructuredData type="breadcrumb" data={[
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": "https://formalitys.vercel.app"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://formalitys.vercel.app/blog"
        }
      ]} />
      {/* Navigation Header */}
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#062A2F] to-[#071B1E] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 
            className="text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Actualités & Blog
          </h1>
          <p 
            className="text-xl text-white/90 max-w-3xl mx-auto"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Découvrez nos dernières actualités, conseils et informations sur les démarches juridiques au Maroc
          </p>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {blogPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="text-gray-600 max-w-md mx-auto"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Revenez bientôt pour découvrir nos derniers articles et actualités.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
                >
                  {/* Featured Image */}
                  {post.featuredImage ? (
                    <div className="relative h-48 overflow-hidden">
                      <OptimizedImage
                        src={post.featuredImage}
                        alt={`Image d'illustration - ${post.title} | Formalitys Blog`}
                        width={400}
                        height={192}
                        className="object-cover group-hover:scale-105 transition-transform duration-300 w-full h-full"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-[#F66B4C] to-[#e55a43] flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  )}
                  
                  <div className="p-6">
                    {/* Meta Information */}
                    <div className="flex items-center space-x-4 mb-3">
                      <span 
                        className="text-sm text-[#F66B4C] font-medium"
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                      >
                        {formatDate(post.publishedAt || post.createdAt)}
                      </span>
                      <span 
                        className="text-sm text-gray-500"
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                      >
                        par {post.author.name || post.author.email}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h2 
                      className="text-xl font-bold text-[#071B1E] mb-3 group-hover:text-[#F66B4C] transition-colors line-clamp-2"
                      style={{ fontFamily: '"Gascogne Serial", serif' }}
                    >
                      {post.title}
                    </h2>
                    
                    {/* Excerpt */}
                    {post.excerpt && (
                      <p 
                        className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed"
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                      >
                        {post.excerpt}
                      </p>
                    )}
                    
                    {/* Read More Link */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-[#F66B4C] font-medium hover:text-[#e55a43] transition-colors group text-sm"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      Lire la suite
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 
            className="text-3xl lg:text-4xl font-bold text-[#071B1E] mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Prêt à simplifier vos démarches ?
          </h2>
          <p 
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Découvrez nos services de création de société et régularisation touristique
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dossiers/company"
              className="bg-[#F66B4C] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#e55a43] transition-colors"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Créer une société SARL
            </Link>
            <Link
              href="/dossiers/tourism"
              className="border-2 border-[#F66B4C] text-[#F66B4C] px-8 py-3 rounded-xl font-semibold hover:bg-[#F66B4C] hover:text-white transition-colors"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Formalités touristiques
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
