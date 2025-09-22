'use client';

import React, { useState, useRef } from 'react';

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
  currentImage?: string;
  className?: string;
  placeholder?: string;
}

export function ImageUpload({ onImageUpload, currentImage, className = '', placeholder = 'Cliquez pour télécharger une image' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner un fichier image valide');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('L\'image ne doit pas dépasser 5MB');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentType', 'blog_image');

      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001'}/uploads/file`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erreur lors du téléchargement');
      }

      const result = await response.json();
      onImageUpload(result.url);
    } catch (error) {
      console.error('Upload error:', error);
      setError('Erreur lors du téléchargement de l\'image');
    } finally {
      setUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div
        onClick={handleClick}
        className={`
          border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300
          ${currentImage 
            ? 'border-[#F66B4C] bg-[#F66B4C]/5' 
            : 'border-gray-300 hover:border-[#F66B4C] hover:bg-[#F66B4C]/5'
          }
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        style={{ fontFamily: 'Satoshi, sans-serif' }}
      >
        {currentImage ? (
          <div className="space-y-4">
            <img
              src={currentImage}
              alt="Image sélectionnée"
              className="w-full h-48 object-cover rounded-xl mx-auto"
            />
            <div className="text-[#F66B4C] font-semibold">
              ✓ Image sélectionnée
            </div>
            <div className="text-sm text-gray-600">
              Cliquez pour changer l'image
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              {uploading ? (
                <div className="w-8 h-8 border-4 border-[#F66B4C]/30 border-t-[#F66B4C] rounded-full animate-spin"></div>
              ) : (
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )}
            </div>
            <div className="text-lg font-semibold text-gray-700">
              {uploading ? 'Téléchargement...' : placeholder}
            </div>
            <div className="text-sm text-gray-500">
              PNG, JPG, JPEG jusqu'à 5MB
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
}
