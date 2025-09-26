'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '../components/AdminLayout';
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

export default function AdminBlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const t = useTranslations('Admin.BlogList');

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch(`${API}/blog/admin`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(t('errorLoading'));
      }

      const data = await response.json();
      setBlogPosts(data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setError(error instanceof Error ? error.message : t('errorLoading'));
    } finally {
      setLoading(false);
    }
  };

  const deleteBlogPost = async (id: number) => {
    if (!confirm(t('confirmDelete'))) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API}/blog/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(t('errorDelete'));
      }

      setBlogPosts(blogPosts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert(t('errorDelete'));
    }
  };

  const togglePublish = async (id: number, published: boolean) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API}/blog/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ published: !published }),
      });

      if (!response.ok) {
        throw new Error(t('errorUpdate'));
      }

      const updatedPost = await response.json();
      setBlogPosts(blogPosts.map(post => 
        post.id === id ? updatedPost : post
      ));
    } catch (error) {
      console.error('Error updating blog post:', error);
      alert(t('errorUpdate'));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#007ea7]/30 border-t-[#007ea7] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#00171f]" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('loading')}</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 
            className="text-3xl font-bold text-[#00171f]"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Blogs
          </h1>
          <Link
            href="/admin/blog/new"
            className="bg-gradient-to-r from-[#007ea7] to-[#00a8e8] text-white px-6 py-3 rounded-2xl font-semibold hover:from-[#00a8e8] hover:to-[#d14a3a] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>{t('newPost')}</span>
          </Link>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-red-700" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {error}
              </p>
            </div>
          </div>
        )}

        {blogPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="text-gray-600 mb-8"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {t('emptySubtitle')}
            </p>
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center bg-[#007ea7] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#00a8e8] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {t('createPost')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {post.featuredImage && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          post.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                      >
                        {post.published ? t('published') : t('draft')}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <h3 
                    className="text-xl font-bold text-[#00171f] mb-3 line-clamp-2"
                    style={{ fontFamily: '"Gascogne Serial", serif' }}
                  >
                    {post.title}
                  </h3>
                  
                  {post.excerpt && (
                    <p 
                      className="text-gray-600 mb-4 line-clamp-3"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      {post.excerpt}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {formatDate(post.createdAt)}
                    </span>
                    <span style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {t('byAuthor', { author: post.author.name || post.author.email })}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      className="flex-1 bg-[#00171f] text-white px-4 py-2 rounded-xl font-semibold hover:bg-[#00171f] transition-colors text-center"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      {t('edit')}
                    </Link>
                    
                    <button
                      onClick={() => togglePublish(post.id, post.published)}
                      className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
                        post.published
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      {post.published ? t('unpublish') : t('publish')}
                    </button>
                    
                    <button
                      onClick={() => deleteBlogPost(post.id)}
                      className="bg-red-100 text-red-800 px-4 py-2 rounded-xl font-semibold hover:bg-red-200 transition-colors"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      {t('delete')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
