'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import OptimizedImage from '../OptimizedImage';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  publishedAt?: string;
  author: {
    name?: string;
  };
}

export default function BlogSection() {
  const t = useTranslations('Home');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(`${API}/blog`);
        if (response.ok) {
          const data = await response.json();
          setBlogPosts(data.slice(0, 3)); // Show only first 3 posts
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
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
  );
}
