
'use client';

import React, { useEffect, useState } from 'react';

interface PromoModalProps {
  showDelayMs?: number;
}

const PromoModal: React.FC<PromoModalProps> = ({ showDelayMs = 1200 }) => {
  const [open, setOpen] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setOpen(true);
      // trigger animation after mount
      requestAnimationFrame(() => setAnimateIn(true));
    }, showDelayMs);
    return () => clearTimeout(t);
  }, [showDelayMs]);

  const dismiss = () => {
    // animate out then unmount
    setAnimateIn(false);
    setTimeout(() => setOpen(false), 220);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-[#00171f]/60 transition-opacity duration-500 ${animateIn ? 'opacity-100' : 'opacity-0'}`}
        onClick={dismiss}
      ></div>

      {/* Modal Card */}
      <div className={`relative mx-4 w-full max-w-lg bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 overflow-hidden transition-all duration-500 ease-out ${animateIn ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}`}>
        {/* Top banner */}
        <div className="bg-gradient-to-r from-[#007ea7] to-[#00a8e8] px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-white animate-pulse"></span>
              <span className="font-semibold" style={{ fontFamily: 'Satoshi, sans-serif' }}>Offres spéciales</span>
            </div>
            <button onClick={dismiss} aria-label="Fermer" className="text-white/90 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Domiciliation Offer */}
          <div className="rounded-2xl border border-[#007ea7]/30 bg-[#007ea7]/5 p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#007ea7] text-white flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-[#00171f] font-bold mb-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  Domiciliation professionnelle
                </h3>
                <p className="text-[#00171f]/80 text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  12 mois pour le prix de 6: payez 900 MAD pour 6 mois et <span className="font-semibold">6 mois offerts</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Second company / hébergement reduction */}
          <div className="rounded-2xl border border-[#00171f]/20 bg-[#00171f]/5 p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#00171f] text-white flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-[#00171f] font-bold mb-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  Avantage fidélité
                </h3>
                <p className="text-[#00171f]/80 text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  Réduction dégressive dès la <span className="font-semibold">2ème création de société</span> ou la <span className="font-semibold">2ème hébergement touristique</span>. Contactez-nous pour en profiter.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <a
              href="/register"
              className="flex-1 inline-flex items-center justify-center bg-[#007ea7] text-white px-4 py-3 rounded-xl font-semibold hover:bg-[#00a8e8] transition-colors"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Commencer maintenant
            </a>
            <button
              onClick={dismiss}
              className="flex-1 inline-flex items-center justify-center border border-gray-300 text-[#00171f] px-4 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Plus tard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoModal;


