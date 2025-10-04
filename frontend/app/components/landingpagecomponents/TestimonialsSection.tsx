'use client';

import { useTranslations } from 'next-intl';

export default function TestimonialsSection() {
  const t = useTranslations('Home');

  return (
    <section className="testimonials-section py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#007ea7]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00171f]/5 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            className="section-title text-4xl lg:text-5xl font-bold text-[#00171f] mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Ils nous font confiance
          </h2>
          <p 
            className="section-subtitle text-xl text-gray-600 max-w-3xl mx-auto"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Plus de 210 entrepreneurs nous ont fait confiance pour créer leur société au Maroc
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              name: "Ahmed Benali",
              company: "SARL TechMaroc",
              location: "Casablanca",
              rating: 5,
              text: "Service exceptionnel ! Ma SARL créée en 4 jours seulement. L'équipe est très professionnelle et réactive.",
              avatar: "AB"
            },
            {
              name: "Fatima Zahra",
              company: "SARL RiadDreams",
              location: "Marrakech", 
              rating: 5,
              text: "Grâce à Formalitys, j'ai pu régulariser mon riad rapidement. Plus de stress avec les autorisations !",
              avatar: "FZ"
            },
            {
              name: "Youssef Alami",
              company: "SARL ConsultingPro",
              location: "Rabat",
              rating: 5,
              text: "Processus 100% en ligne, très pratique. L'accompagnement juridique inclus est un vrai plus.",
              avatar: "YA"
            }
          ].map((testimonial, index) => (
            <div key={index} className="testimonial-card bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p 
                className="text-gray-700 mb-6 leading-relaxed"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                "{testimonial.text}"
              </p>
              
              {/* Author Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#007ea7] to-[#00a8e8] rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 
                    className="font-bold text-[#00171f]"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {testimonial.name}
                  </h4>
                  <p 
                    className="text-sm text-gray-600"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {testimonial.company} • {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Trust Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="stat-item">
            <div className="text-4xl font-bold text-[#007ea7] mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              210+
            </div>
            <div className="text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              Sociétés créées
            </div>
          </div>
          <div className="stat-item">
            <div className="text-4xl font-bold text-[#007ea7] mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              98%
            </div>
            <div className="text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              Taux de satisfaction
            </div>
          </div>
          <div className="stat-item">
            <div className="text-4xl font-bold text-[#007ea7] mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              5 jours
            </div>
            <div className="text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              Délai moyen
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
