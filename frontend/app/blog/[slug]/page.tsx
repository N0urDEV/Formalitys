'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

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

export default function BlogPostPage() {
  const t = useTranslations('BlogPost');
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();

  useEffect(() => {
    if (params.slug) {
      fetchBlogPost(params.slug as string);
    }
  }, [params.slug]);

  const fetchBlogPost = async (slug: string) => {
    try {
      const response = await fetch(`${API}/blog/slug/${slug}`);
      if (!response.ok) {
        throw new Error('Article non trouvé');
      }
      const data = await response.json();
      setBlogPost(data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
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
      <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] via-white to-[#E8F4F8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F66B4C] mx-auto"></div>
            <p className="mt-4 text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] via-white to-[#E8F4F8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 
              className="text-3xl font-bold text-[#071B1E] mb-4"
              style={{ fontFamily: '"Gascogne Serial", serif' }}
            >
              {t('notFoundTitle')}
            </h1>
            <p 
              className="text-gray-600 mb-8"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {t('notFoundSubtitle')}
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center bg-[#F66B4C] text-white px-6 py-3 rounded-2xl font-semibold hover:bg-[#e55a43] transition-colors"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('back')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] via-white to-[#E8F4F8]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#062A2F] to-[#071B1E] text-white py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour au blog
          </Link>
          
          <h1 
            className="text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            {blogPost.title}
          </h1>
          
          <div className="flex items-center space-x-6 text-white/80">
            <span style={{ fontFamily: 'Satoshi, sans-serif' }}>
              {formatDate(blogPost.publishedAt || blogPost.createdAt)}
            </span>
            <span style={{ fontFamily: 'Satoshi, sans-serif' }}>
              {t('by', { author: blogPost.author.name || blogPost.author.email })}
            </span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {blogPost.featuredImage && (
        <div className="max-w-4xl mx-auto px-6 lg:px-8 -mt-10 relative z-10">
          <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={blogPost.featuredImage}
              alt={blogPost.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {blogPost.excerpt && (
            <div className="mb-8 p-6 bg-gradient-to-r from-[#F66B4C]/10 to-[#e55a43]/10 rounded-2xl border-l-4 border-[#F66B4C]">
              <p 
                className="text-lg text-[#071B1E]/70 italic"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {blogPost.excerpt}
              </p>
            </div>
          )}
          
          <div 
            className="prose prose-lg max-w-none text-[#071B1E]"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#F66B4C] to-[#e55a43] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            {t('ctaTitle')}
          </h2>
          <p 
            className="text-xl text-white/90 mb-8 max-w-3xl mx-auto"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            {t('ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dossiers/company"
              className="bg-white text-[#F66B4C] px-8 py-4 rounded-2xl font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {t('ctaCompany')}
            </Link>
            <Link
              href="/dossiers/tourism"
              className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-[#F66B4C] transition-all duration-300"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {t('ctaTourism')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
