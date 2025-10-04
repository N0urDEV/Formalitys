'use client';

export default function DiscountSection() {
  return (
    <section className="discount-section py-24 bg-gradient-to-br from-[#00171f] via-[#003459] to-[#007ea7] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#007ea7]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00a8e8]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          
          <h2 
            className="discount-title text-4xl lg:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Programme de Fidélité
          </h2>
          <p 
            className="discount-subtitle text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Bénéficiez de réductions sur vos formalités et de prix dégressifs à partir du 2ème dossier réalisé!
          </p>
        </div>

        {/* Discount Tiers */}
        <div className="discount-tiers grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Tier 1 - 2ème dossier */}
          <div className="tier-card group relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-[#007ea7]/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden h-full">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#007ea7]/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
              
              <div className="relative z-10 text-center">
                {/* Badge */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#007ea7] to-[#00a8e8] rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                
                {/* Discount Percentage */}
                <div className="text-5xl font-bold text-[#00a8e8] mb-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  15%
                </div>
                
                {/* Tier Title */}
                <h3 
                  className="text-2xl font-bold text-white mb-4"
                  style={{ fontFamily: '"Gascogne Serial", serif' }}
                >
                  2ème Dossier
                </h3>
                
                {/* Description */}
                <p 
                  className="text-white/80 text-lg mb-6 leading-relaxed"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Créer votre 2nde société ou obtenez la licence d'exploitation de votre 2ème hébergement touristique et bénéficiez automatiquement de 15% de réduction!
                </p>
                
                {/* Savings Example */}
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <div className="text-sm text-white/70 mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>Création de votre société pour:</div>
                  <div className="text-lg font-semibold text-[#00a8e8]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    2805 MAD TTC
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tier 2 - 3ème dossier */}
          <div className="tier-card group relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-[#007ea7]/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden h-full">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#007ea7]/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
              
              <div className="relative z-10 text-center">
                {/* Badge */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#007ea7] to-[#00a8e8] rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                
                {/* Discount Percentage */}
                <div className="text-5xl font-bold text-[#00a8e8] mb-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  20%
                </div>
                
                {/* Tier Title */}
                <h3 
                  className="text-2xl font-bold text-white mb-4"
                  style={{ fontFamily: '"Gascogne Serial", serif' }}
                >
                  3ème Dossier
                </h3>
                
                {/* Description */}
                <p 
                  className="text-white/80 text-lg mb-6 leading-relaxed"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Continuez à développer vos investissements en bénéficiant d'une remise de 20%
                </p>
                
                {/* Savings Example */}
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <div className="text-sm text-white/70 mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>Économies sur société:</div>
                  <div className="text-lg font-semibold text-[#00a8e8]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    -660 MAD
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tier 3 - 4ème+ dossier */}
          <div className="tier-card group relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-[#007ea7]/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden h-full">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#007ea7]/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
              
              <div className="relative z-10 text-center">
                {/* Badge */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#007ea7] to-[#00a8e8] rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                
                {/* Discount Percentage */}
                <div className="text-5xl font-bold text-[#00a8e8] mb-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  25%
                </div>
                
                {/* Tier Title */}
                <h3 
                  className="text-2xl font-bold text-white mb-4"
                  style={{ fontFamily: '"Gascogne Serial", serif' }}
                >
                  4ème+ Dossier
                </h3>
                
                {/* Description */}
                <p 
                  className="text-white/80 text-lg mb-6 leading-relaxed"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Le plein d'économies avec un seul partenaire pour vos formalités de création de sociétés et autorisation commerciale d'exploiter un hébergement touristique.
                </p>
                
                {/* Savings Example */}
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <div className="text-sm text-white/70 mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>Votre société SARL clés en main à:</div>
                  <div className="text-lg font-semibold text-[#00a8e8]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    2475 MAD TTC
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="discount-bottom-info text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#00a8e8] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 
                className="text-xl font-bold text-white"
                style={{ fontFamily: '"Gascogne Serial", serif' }}
              >
                Comment ça fonctionne ?
              </h3>
            </div>
            <p 
              className="text-white/80 text-lg leading-relaxed mb-6"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Les réductions s'appliquent automatiquement lors de vos prochains dossiers. 
              Pas besoin de codes promo ou d'inscription spéciale !
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#007ea7] rounded-full flex items-center justify-center mb-3">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <div className="text-white/90 font-semibold mb-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>Créez votre premier dossier</div>
                <div className="text-white/70 text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>Prix normal</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#007ea7] rounded-full flex items-center justify-center mb-3">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <div className="text-white/90 font-semibold mb-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>Créez votre deuxième dossier</div>
                <div className="text-white/70 text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>15% de réduction automatique</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#00a8e8] rounded-full flex items-center justify-center mb-3">
                  <span className="text-white font-bold text-lg">3+</span>
                </div>
                <div className="text-white/90 font-semibold mb-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>Continuez à créer</div>
                <div className="text-white/70 text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>Jusqu'à 25% de réduction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
