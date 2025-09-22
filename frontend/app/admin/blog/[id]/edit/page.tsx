'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ImageUpload } from '../../../../components/ImageUpload';

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

export default function EditBlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    published: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchBlogPost();
    }
  }, [params.id]);

  const fetchBlogPost = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch(`${API}/blog/admin/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors du chargement de l\'article');
      }

      const data = await response.json();
      setBlogPost(data);
      setFormData({
        title: data.title,
        excerpt: data.excerpt || '',
        content: data.content,
        featuredImage: data.featuredImage || '',
        published: data.published,
      });
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch(`${API}/blog/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la mise à jour de l\'article');
      }

      router.push('/admin/blog');
    } catch (error) {
      console.error('Error updating blog post:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] via-white to-[#E8F4F8] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#F66B4C]/30 border-t-[#F66B4C] rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-[#071B1E] text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] via-white to-[#E8F4F8] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#071B1E] mb-4" style={{ fontFamily: '"Gascogne Serial", serif' }}>
            Article non trouvé
          </h1>
          <button
            onClick={() => router.push('/admin/blog')}
            className="bg-[#F66B4C] text-white px-6 py-3 rounded-2xl font-semibold hover:bg-[#e55a43] transition-colors"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Retour aux articles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] via-white to-[#E8F4F8]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#062A2F] to-[#071B1E] text-white py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 
                className="text-4xl lg:text-5xl font-bold mb-4"
                style={{ fontFamily: '"Gascogne Serial", serif' }}
              >
                Modifier l'Article
              </h1>
              <p 
                className="text-xl text-white/90"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {blogPost.title}
              </p>
            </div>
            <button
              onClick={() => router.back()}
              className="bg-white/20 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white/30 transition-colors"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
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

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title */}
            <div>
              <label 
                htmlFor="title"
                className="block text-lg font-semibold text-[#071B1E] mb-3"
                style={{ fontFamily: '"Gascogne Serial", serif' }}
              >
                Titre
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#F66B4C] focus:outline-none transition-colors"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
                placeholder="Entrez le titre de votre article"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label 
                htmlFor="excerpt"
                className="block text-lg font-semibold text-[#071B1E] mb-3"
                style={{ fontFamily: '"Gascogne Serial", serif' }}
              >
                Résumé
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#F66B4C] focus:outline-none transition-colors resize-none"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
                placeholder="Résumé court de l'article (optionnel)"
              />
            </div>

            {/* Featured Image */}
            <div>
              <label 
                className="block text-lg font-semibold text-[#071B1E] mb-3"
                style={{ fontFamily: '"Gascogne Serial", serif' }}
              >
                Image mise en avant
              </label>
              <ImageUpload
                onImageUpload={(url) => setFormData(prev => ({ ...prev, featuredImage: url }))}
                currentImage={formData.featuredImage}
                placeholder="Téléchargez une image pour votre article"
              />
              <p 
                className="text-sm text-gray-500 mt-2"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Vous pouvez également utiliser une URL d'image externe ci-dessous si vous préférez.
              </p>
              <input
                type="url"
                id="featuredImageUrl"
                name="featuredImage"
                value={formData.featuredImage}
                onChange={handleChange}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#F66B4C] focus:outline-none transition-colors mt-3"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
                placeholder="Ou entrez une URL d'image externe"
              />
            </div>

            {/* Content */}
            <div>
              <label 
                htmlFor="content"
                className="block text-lg font-semibold text-[#071B1E] mb-3"
                style={{ fontFamily: '"Gascogne Serial", serif' }}
              >
                Contenu
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={15}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#F66B4C] focus:outline-none transition-colors resize-none"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
                placeholder="Contenu de votre article (HTML autorisé)"
              />
              <p 
                className="text-sm text-gray-500 mt-2"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Vous pouvez utiliser du HTML pour formater votre contenu.
              </p>
            </div>

            {/* Published */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-5 h-5 text-[#F66B4C] border-2 border-gray-300 rounded focus:ring-[#F66B4C] focus:ring-2"
              />
              <label 
                htmlFor="published"
                className="ml-3 text-lg font-semibold text-[#071B1E]"
                style={{ fontFamily: '"Gascogne Serial", serif' }}
              >
                Publier immédiatement
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center space-x-4 pt-8">
              <button
                type="submit"
                disabled={saving}
                className="bg-[#F66B4C] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#e55a43] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {saving ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sauvegarde...
                  </div>
                ) : (
                  'Sauvegarder les modifications'
                )}
              </button>
              
              <button
                type="button"
                onClick={() => router.back()}
                className="bg-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-300 transition-colors"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
