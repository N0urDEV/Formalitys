'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'tourism' | 'company' | 'general';
}

const faqData: FAQItem[] = [
  {
    id: 'tourism-1',
    question: "Au Maroc, ai-je le droit de louer mon riad sans avoir d'autorisation ?",
    answer: "Non, c'est illégal et la législation marocaine est très claire à ce sujet : <strong>vous n'avez pas le droit de louer votre riad (ou tout autre bien immobilier) pour de la location touristique de courte durée sans avoir obtenu d'autorisation préalable</strong>. La location de courte durée, notamment via des plateformes comme Airbnb ou Booking, est régie par la loi marocaine n° 80.14 et le décret n° 2.23.441. Ces textes imposent l'obtention d'une licence d'exploitation pour toute activité d'hébergement touristique.",
    category: 'tourism'
  },
  {
    id: 'tourism-2',
    question: "Quels sont les risques si je loue mon riad sans licence d'exploitation ?",
    answer: "Louer votre riad sans l'autorisation nécessaire est illégal et peut vous exposer à des sanctions sévères :<br/><br/><strong>• Amendes :</strong> des amendes importantes peuvent être infligées. (Un cas de propriétaire à Marrakech a été condamné à une amende de 50 000 MAD pour avoir loué son riad sans autorisation).<br/><br/><strong>• Fermeture :</strong> Les autorités peuvent ordonner la fermeture immédiate de votre bien.<br/><br/><strong>• Redressement fiscal :</strong> Les revenus de location de courte durée sont soumis à l'impôt. En cas de non-déclaration, les autorités fiscales procèdent généralement à un recouvrement rétroactif sur plusieurs années.",
    category: 'tourism'
  },
  {
    id: 'tourism-3',
    question: "Est-ce préférable de créer une société d'exploitation pour gérer la location d'un riad ou d'une maison d'hôtes ?",
    answer: "Oui, généralement, c'est la meilleure solution fiscale plutôt que louer directement en tant que propriétaire physique et d'être assujetti à l'impôt sur le revenu. D'autant plus que la création de société octroie des avantages et réductions d'impôts pendant plusieurs années.",
    category: 'tourism'
  },
  {
    id: 'tourism-4',
    question: "Dois-je tenir un registre de Police pour chaque locataire ?",
    answer: "Oui, c'est obligatoire avec les coordonnées de chaque locataire, justificatifs d'identité (passeport, carte de résident...). Vous devez enregistrer chaque locataire et communiquer leurs informations aux autorités (police ou gendarmerie). Pour les occupants de nationalité étrangère, il est nécessaire de leur faire remplir une fiche individuelle de police.<br/><br/>Cette fiche ou ce registre doit contenir des informations précises sur le locataire, notamment <strong>Nom et prénom, date et lieu de naissance, nationalité, domicile habituel, numéro de téléphone et adresse électronique, dates d'arrivée et de départ prévues</strong>.<br/><br/>Le propriétaire (via le gestionnaire) doit archiver ces registres de Police lui-même. Les agents de sécurité ou syndic de copropriété ou agent immobilier ne sont pas responsables de cet archivage.",
    category: 'tourism'
  },
  {
    id: 'tourism-5',
    question: "Suis-je responsable du paiement de la taxe de séjour pour chaque locataire ?",
    answer: "Oui, si vous louez votre riad au Maroc en tant qu'établissement d'hébergement touristique (comme une maison d'hôtes ou un hôtel), vous êtes tenu de percevoir une taxe de séjour auprès de chaque locataire et la reverser.<br/><br/><strong>Il y a souvent deux taxes distinctes à collecter :</strong><br/>• La Taxe de Promotion Touristique (TPT)<br/>• La Taxe Communale (ou Taxe de Séjour)<br/><br/><strong>Taux variables :</strong> Les montants de ces taxes varient en fonction de la catégorie de l'établissement (par exemple, riad de luxe, maison d'hôtes, etc.) et de la municipalité dans laquelle il se trouve. Les tarifs peuvent être de quelques dirhams à plus de 30 dirhams par personne et par nuit.<br/><br/><strong>Exonération :</strong> Les enfants de moins de 12 ans sont souvent exemptés de cette taxe.<br/><br/><strong>Obligations du propriétaire :</strong> En tant que propriétaire ou exploitant, vous êtes responsable de :<br/>• Collecter ces taxes auprès de vos clients.<br/>• Les reverser trimestriellement à la commune et à l'Office National Marocain du Tourisme.<br/>• Tenir des registres précis des clients et des nuitées pour la déclaration<br/><br/><strong>FORMALITYS vous donne accès à la télédéclaration pour le paiement de ces taxes auprès des organismes directement grâce à vos identifiants.</strong>",
    category: 'tourism'
  },
  {
    id: 'company-1',
    question: "Pour créer ma SARL, puis-je avoir plusieurs associés ?",
    answer: "Oui, il suffit d'ajouter les noms et prénoms de chaque associé et de fournir les justificatifs demandés avec la répartition du capital social.",
    category: 'company'
  },
  {
    id: 'company-2',
    question: "Quel est le type de société proposée à la création ?",
    answer: "S.A.R.L (Société à Responsabilité Limitée) ; c'est le modèle de société le plus courant au Maroc et le moins risqué (limitation aux apports) avec un fonctionnement comptable souple. Dans les prochaines semaines, la Société par Actions Simplifiée (S.A.S) sera proposée.",
    category: 'company'
  },
  {
    id: 'company-3',
    question: "Est-ce que je peux domicilier ma société dans un centre d'affaires ?",
    answer: "Oui, en option, le formulaire vous donne accès direct à une domiciliation possible dans plusieurs villes du Maroc. Le contrat est joint aux statuts de la société qui vous sont transmis.",
    category: 'company'
  },
  {
    id: 'company-4',
    question: "Est-ce que je peux avoir un accompagnement dans ma création d'entreprise ?",
    answer: "Lors de la création, un échange téléphonique de 30 minutes est inclus pour toute question juridique, sociale ou fiscale. FORMALITYS vous met également sur demande gratuitement en relation avec nos partenaires (banques, assurances, téléphonie, comptables...).",
    category: 'company'
  },
  {
    id: 'company-5',
    question: "Les statuts de ma société sont-ils personnalisés ?",
    answer: "Oui, toute la démarche est spécifique à votre statut, votre situation, votre activité. Il ne s'agit pas de statuts-types mais personnalisés en fonction de nos échanges.",
    category: 'company'
  },
  {
    id: 'company-6',
    question: "Le dépôt du capital social dans une banque est-il obligatoire ?",
    answer: "Non. Au Maroc, la loi sur les SARL ne fixe plus de capital social minimum. Cependant, si le capital social de votre SARL <strong>dépasse 100 000 dirhams</strong>, vous devez déposer les apports en numéraire sur un compte bancaire bloqué au nom de la société en cours de formation. FORMALITYS assure une introduction bancaire auprès d'un des principales banques marocaine.",
    category: 'company'
  },
  {
    id: 'general-1',
    question: "Faut-il se déplacer pour signer les documents ?",
    answer: "Non, toutes les formalités sont signées numériquement et télétransmises directement aux administrations. Les identifiants personnels vous sont ensuite transmis par mail.",
    category: 'general'
  }
];

const categoryLabels = (t: (key: string) => string) => ({
  tourism: t('tourism'),
  company: t('company'),
  general: t('general')
});

const categoryIcons = {
  tourism: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  company: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  general: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

const categoryColors = {
  tourism: 'from-[#F66B4C] to-[#e55a43]',
  company: 'from-[#062A2F] to-[#0a3b42]',
  general: 'from-[#0a3b42] to-[#F66B4C]'
};

export default function FAQ() {
  const t = useTranslations('FAQ');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const filteredFAQs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory);

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const categories = [
    { id: 'all', label: t('all'), icon: '📋', count: faqData.length },
    { id: 'tourism', label: t('tourism'), icon: '🏨', count: faqData.filter(f => f.category === 'tourism').length },
    { id: 'company', label: t('company'), icon: '🏢', count: faqData.filter(f => f.category === 'company').length },
    { id: 'general', label: t('general'), icon: '❓', count: faqData.filter(f => f.category === 'general').length }
  ];

  return (
    <section id="faq" className="py-24 bg-gradient-to-br from-[#F66B4C] via-[#e55a43] to-[#F66B4C] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/8 rounded-full blur-2xl"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-white/3 rounded-full blur-2xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            {t('title')}
          </h2>
          <p 
            className="text-xl text-white/90 max-w-3xl mx-auto"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-white text-[#F66B4C] shadow-lg'
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 hover:shadow-lg border border-white/30'
              }`}
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              <span className="flex items-center space-x-2">
                <span>{category.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  activeCategory === category.id 
                    ? 'bg-[#F66B4C]/10 text-[#F66B4C]' 
                    : 'bg-white/20 text-white'
                }`}>
                  {category.count}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => {
              const isOpen = openItems.has(faq.id);
              const categoryColor = categoryColors[faq.category];
              
              return (
                <div
                  key={faq.id}
                  className="group bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/30 hover:border-white/50 overflow-hidden"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationName: 'fadeInUp',
                    animationDuration: '0.6s',
                    animationTimingFunction: 'ease-out',
                    animationFillMode: 'forwards'
                  }}
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-6 lg:p-8 text-left focus:outline-none focus:ring-2 focus:ring-[#F66B4C]/20 focus:ring-inset"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        {/* Category Icon */}
                        <div className={`w-12 h-12 bg-gradient-to-br ${categoryColor} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                          <div className="text-white">
                            {categoryIcons[faq.category]}
                          </div>
                        </div>
                        
                        {/* Question */}
                        <div className="flex-1 min-w-0">
                          <h3 
                            className={`text-lg lg:text-xl font-bold mb-2 group-hover:text-[#F66B4C] transition-colors ${
                              isOpen ? 'text-[#F66B4C]' : 'text-[#071B1E]'
                            }`}
                            style={{ fontFamily: 'Satoshi, sans-serif' }}
                          >
                            {faq.question}
                          </h3>
                          
                          {/* Category Badge */}
                          <div className="inline-flex items-center space-x-2">
                            <span 
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                faq.category === 'tourism' 
                                  ? 'bg-[#F66B4C]/10 text-[#F66B4C]' 
                                  : faq.category === 'company'
                                  ? 'bg-[#062A2F]/10 text-[#062A2F]'
                                  : 'bg-[#0a3b42]/10 text-[#0a3b42]'
                              }`}
                              style={{ fontFamily: 'Satoshi, sans-serif' }}
                            >
                              {categoryLabels(t)[faq.category]}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Toggle Icon */}
                      <div className="ml-4 flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isOpen 
                            ? 'bg-[#F66B4C] text-white rotate-180' 
                            : 'bg-gray-100 text-gray-600 group-hover:bg-[#F66B4C] group-hover:text-white'
                        }`}>
                          <svg 
                            className="w-5 h-5 transition-transform duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                  
                  {/* Answer */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                      <div className="ml-16">
                        <div className="h-px bg-gradient-to-r from-[#F66B4C]/20 to-transparent mb-4"></div>
                        <p 
                          className="text-gray-700 leading-relaxed"
                          style={{ fontFamily: 'Satoshi, sans-serif' }}
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="rounded-3xl p-[1px] bg-gradient-to-r from-[#F66B4C] via-[#e55a43] to-transparent relative overflow-hidden">
            <div className="bg-gradient-to-r from-[#062A2F] to-[#0a3b42] rounded-3xl p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10"></div>
              <div className="absolute -top-10 -left-10 w-56 h-56 bg-[#F66B4C]/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(600px at 0% 0%, rgba(255,255,255,0.25), transparent 40%)' }}></div>
              <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(600px at 100% 100%, rgba(246,107,76,0.25), transparent 40%)' }}></div>
            <div className="relative z-10">
              <h3 
                className="text-2xl lg:text-3xl font-bold text-white mb-4"
                style={{ fontFamily: '"Gascogne Serial", serif' }}
              >
                {t('notFoundTitle')}
              </h3>
              <p 
                className="text-white/90 text-lg mb-8 max-w-2xl mx-auto"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {t('notFoundSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/212620269000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-[#F66B4C] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#e55a43] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  {t('contactWhatsApp')}
                </a>
                <a
                  href="tel:+212620269000"
                  className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-[#062A2F] transition-all duration-300"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {t('callNow')}
                </a>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
