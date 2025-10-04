'use client';

import { useState } from 'react';

interface VideoPlaceholderProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function VideoPlaceholder({ 
  title = "Comment créer votre société en 5 jours",
  description = "Découvrez notre processus simple et rapide",
  className = ""
}: VideoPlaceholderProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`video-placeholder bg-gradient-to-br from-[#00171f] to-[#003459] rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#007ea7] rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative z-10">
        {/* Play Button */}
        <div 
          className="w-20 h-20 bg-[#007ea7] rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer hover:bg-[#00a8e8] transition-all duration-300 hover:scale-110 shadow-2xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <svg 
            className={`w-8 h-8 text-white ml-1 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        
        {/* Title */}
        <h3 
          className="text-2xl lg:text-3xl font-bold text-white mb-4"
          style={{ fontFamily: '"Gascogne Serial", serif' }}
        >
          {title}
        </h3>
        
        {/* Description */}
        <p 
          className="text-white/90 text-lg mb-6 max-w-2xl mx-auto"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          {description}
        </p>
        
        {/* Duration Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-white text-sm font-medium" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            3 minutes
          </span>
        </div>
        
        {/* Placeholder Text */}
        <div className="mt-6 text-white/60 text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          [Vidéo explicative à intégrer]
        </div>
      </div>
    </div>
  );
}
