'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '../components/sections/Footer';
import Navigation from '../components/Navigation';
import StructuredData from '../components/StructuredData';
import { useTranslations } from 'next-intl';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';
import OptimizedImage from '../components/OptimizedImage';
import TawkToChat from '../components/TawkToChat';

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
  const t = useTranslations('BlogList');
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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#00171f]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007ea7] mx-auto"></div>
            <p className="mt-4 text-white/80" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#00171f]">
      <StructuredData type="breadcrumb" data={[
        {
          "@type": "ListItem",
          "position": 1,
          "name": t('breadcrumbHome'),
          "item": "https://formalitys.vercel.app"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": t('breadcrumbBlog'),
          "item": "https://formalitys.vercel.app/blog"
        }
      ]} />
      {/* Navigation Header */}
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#00171f] to-[#00171f] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 
            className="text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            {t('title')}
          </h1>
          <p 
            className="text-xl text-white/90 max-w-3xl mx-auto"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            {t('subtitle')}
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
                className="text-2xl font-bold text-[#00171f] mb-4"
                style={{ fontFamily: '"Gascogne Serial", serif' }}
              >
                {t('emptyTitle')}
              </h3>
              <p 
                className="text-gray-700 md:text-gray-600 max-w-md mx-auto"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {t('emptySubtitle')}
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
                        alt={post.title}
                        width={400}
                        height={192}
                        className="object-cover group-hover:scale-105 transition-transform duration-300 w-full h-full"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-[#007ea7] to-[#00a8e8] flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  )}
                  
                  <div className="p-6">
                    {/* Meta Information */}
                    <div className="flex items-center space-x-4 mb-3">
                      <span 
                        className="text-sm text-[#007ea7] font-medium"
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                      >
                        {formatDate(post.publishedAt || post.createdAt)}
                      </span>
                      <span 
                        className="text-sm text-gray-600 md:text-gray-500"
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                      >
                        {t('by', { author: post.author.name || post.author.email })}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h2 
                      className="text-xl font-bold text-[#00171f] md:text-[#00171f] mb-3 group-hover:text-[#007ea7] transition-colors line-clamp-2"
                      style={{ fontFamily: '"Gascogne Serial", serif' }}
                    >
                      {post.title}
                    </h2>
                    
                    {/* Excerpt */}
                    {post.excerpt && (
                      <p 
                        className="text-gray-700 md:text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed"
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                      >
                        {post.excerpt}
                      </p>
                    )}
                    
                    {/* Read More Link */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-[#007ea7] font-medium hover:text-[#00a8e8] transition-colors group text-sm"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      {t('readMore')}
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
            className="text-3xl lg:text-4xl font-bold text-[#00171f] mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            {t('ctaTitle')}
          </h2>
          <p 
            className="text-lg text-gray-700 md:text-gray-600 mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            {t('ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dossiers/company"
              className="bg-[#007ea7] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#00a8e8] transition-colors"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {t('ctaCompany')}
            </Link>
            <Link
              href="/dossiers/tourism"
              className="border-2 border-[#007ea7] text-[#007ea7] px-8 py-3 rounded-xl font-semibold hover:bg-[#007ea7] hover:text-white transition-colors"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {t('ctaTourism')}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      
      {/* Tawk.to Chat */}
      <TawkToChat />
    </div>
  );
}
