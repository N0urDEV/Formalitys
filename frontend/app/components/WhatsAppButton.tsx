'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  showOnPages?: string[];
  hideOnPages?: string[];
  showAfterDelay?: number;
}

export default function WhatsAppButton({
  phoneNumber = '+212620269000',
  message = 'Bonjour! Je souhaite obtenir des informations sur vos services Formalitys.',
  position = 'bottom-right',
  showOnPages = [],
  hideOnPages = ['/admin'],
  showAfterDelay = 3000
}: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check if button should be shown on current page
    const shouldShow = () => {
      if (hideOnPages.some(page => pathname.startsWith(page))) return false;
      if (showOnPages.length > 0 && !showOnPages.some(page => pathname.startsWith(page))) return false;
      return true;
    };

    if (shouldShow()) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, showAfterDelay);

      return () => clearTimeout(timer);
    }
  }, [pathname, showOnPages, hideOnPages, showAfterDelay]);

  const handleWhatsAppClick = (customMessage?: string) => {
    const encodedMessage = encodeURIComponent(customMessage || message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\s/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const quickMessages = [
    {
      text: 'Création de société',
      message: 'Bonjour! Je souhaite créer une société au Maroc. Pouvez-vous m\'aider?'
    },
    {
      text: 'Régularisation touristique',
      message: 'Bonjour! J\'ai besoin d\'aide pour régulariser ma location touristique.'
    },
    {
      text: 'Prix et tarifs',
      message: 'Bonjour! Pouvez-vous me donner des informations sur vos tarifs?'
    },
    {
      text: 'Support technique',
      message: 'Bonjour! J\'ai un problème technique avec mon dossier.'
    }
  ];

  if (!isVisible) return null;

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {/* Quick Messages */}
      {isExpanded && (
        <div className="mb-4 space-y-2">
          {quickMessages.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-4 max-w-xs animate-in slide-in-from-right-2 duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => handleWhatsAppClick(item.message)}
                className="text-left w-full text-sm text-gray-700 hover:text-[#F66B4C] transition-colors"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {item.text}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main WhatsApp Button */}
      <div className="relative">
        <button
          onClick={() => handleWhatsAppClick()}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          className="group relative bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 animate-in fade-in-0 slide-in-from-bottom-2"
        >
          {/* WhatsApp Icon */}
          <svg
            className="w-8 h-8"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>

          {/* Pulse Animation */}
          <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Chat avec nous sur WhatsApp
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </button>

        {/* Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -top-2 -right-2 w-6 h-6 bg-[#F66B4C] text-white rounded-full flex items-center justify-center text-xs font-bold hover:bg-[#e55a43] transition-colors duration-200"
        >
          {isExpanded ? '×' : '+'}
        </button>
      </div>
    </div>
  );
}
