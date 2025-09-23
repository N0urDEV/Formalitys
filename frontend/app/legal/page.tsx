'use client';

import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/sections/Footer';

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] via-white to-[#E8F4F8]">
      <Navigation />

      <section className="bg-gradient-to-r from-[#062A2F] to-[#071B1E] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1
            className="text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Mentions légales
          </h1>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-[#F66B4C]/10 to-[#e55a43]/10 border-l-4 border-[#F66B4C]">
              <p className="text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                <strong>Legal :</strong> FORMALITYS est un site marocain édité par Caktus sarl  - Hébergé par Nindohost - Les données personnelles ne sont utilisées que dans le cadre des formalités confiées par le client et ne sont transmises qu'à ce titre. Elles sont en aucun cas conservées ou cédées à des fins commerciales ou publicitaires.
              </p>
            </div>

            <div className="prose max-w-none text-gray-700" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              <h2 className="text-xl font-bold text-[#071B1E]">Éditeur</h2>
              <p>FORMALITYS – Caktus sarl (Maroc)</p>

              <h2 className="text-xl font-bold text-[#071B1E] mt-8">Hébergement</h2>
              <p>Nindohost</p>

              <h2 className="text-xl font-bold text-[#071B1E] mt-8">Contact</h2>
              <p>
                Pour toute demande: <a className="text-[#F66B4C] hover:underline" href="mailto:info@formalitys.com">info@formalitys.com</a>
              </p>
            </div>

            <div className="mt-10">
              <Link href="/" className="inline-flex items-center text-[#F66B4C] font-semibold hover:text-[#e55a43]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                Retour à l'accueil
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


