import React from 'react';
import { QuestionnaireAnswers, StepErrors, FormErrors } from '../../types';
import { FormInput } from '../FormInput';

interface Step5QuestionnaireProps {
  questionnaireAnswers: QuestionnaireAnswers;
  setQuestionnaireAnswers: (answers: QuestionnaireAnswers) => void;
  errors: FormErrors;
  stepErrors: StepErrors;
  clearFieldError: (field: string) => void;
}

export const Step5Questionnaire: React.FC<Step5QuestionnaireProps> = ({
  questionnaireAnswers,
  setQuestionnaireAnswers,
  errors,
  stepErrors,
  clearFieldError
}) => {
  const updateAnswer = (key: string, value: any) => {
    setQuestionnaireAnswers(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      clearFieldError(key);
    }
  };

  const QuestionItem: React.FC<{ question: string; questionKey: string }> = ({ question, questionKey }) => (
    <div className="p-3 sm:p-4 bg-gray-50 rounded-2xl">
      <div className="mb-3 sm:mb-0">
        <p 
          className="text-xs sm:text-sm font-medium text-gray-900 leading-relaxed"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          {question}
        </p>
      </div>
      <div className="flex space-x-4 sm:space-x-6 justify-center sm:justify-start">
        <label className="flex items-center cursor-pointer">
          <input 
            type="radio" 
            name={questionKey} 
            value="yes" 
            checked={questionnaireAnswers[questionKey] === 'yes'}
            onChange={(e) => updateAnswer(questionKey, e.target.value)}
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-[#007ea7]"
            style={{ accentColor: '#007ea7' }} 
          />
          <span 
            className="ml-2 text-xs sm:text-sm font-medium text-gray-700"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Oui
          </span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input 
            type="radio" 
            name={questionKey} 
            value="no" 
            checked={questionnaireAnswers[questionKey] === 'no'}
            onChange={(e) => updateAnswer(questionKey, e.target.value)}
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-[#007ea7]"
            style={{ accentColor: '#007ea7' }} 
          />
          <span 
            className="ml-2 text-xs sm:text-sm font-medium text-gray-700"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Non
          </span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="text-center mb-6 sm:mb-8">
        <h2 
          className="text-xl sm:text-2xl font-bold text-[#00171f] mb-3 sm:mb-4"
          style={{ fontFamily: '"Gascogne Serial", serif' }}
        >
          Questionnaire de conformité
        </h2>
        <p 
          className="text-sm sm:text-base text-gray-600 px-4 sm:px-0"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          Remplissez ce questionnaire pour finaliser votre dossier
        </p>
      </div>

      {/* Step 5 Error Display */}
      {stepErrors[5] && stepErrors[5].length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <h3 
                className="text-lg font-semibold text-red-800 mb-2"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Veuillez répondre à toutes les questions :
              </h3>
              <ul className="space-y-1">
                {stepErrors[5].map((error, index) => (
                  <li 
                    key={index} 
                    className="text-red-700 text-sm"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    • {error}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Original Questions */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#007ea7]/10 rounded-full blur-xl"></div>
        <div className="relative z-10">
          <h3 
            className="text-lg sm:text-xl font-bold text-[#00171f] mb-4 sm:mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Questions de conformité de base
          </h3>
          <div className="space-y-6">
            {[
              { key: 'securite_incendie', question: 'La propriété dispose-t-elle d\'un système de sécurité incendie?' },
              { key: 'installations_electriques', question: 'Les installations électriques sont-elles aux normes?' },
              { key: 'evacuation_eaux_usees', question: 'Y a-t-il un système d\'évacuation des eaux usées conforme?' },
              { key: 'normes_hygiene', question: 'La propriété respecte-t-elle les normes d\'hygiène?' },
              { key: 'fenetres_lumiere_naturelle', question: 'Les chambres disposent-elles de fenêtres avec lumière naturelle?' },
              { key: 'acces_handicapes', question: 'Y a-t-il un accès pour personnes à mobilité réduite?' }
            ].map((item, index) => (
              <QuestionItem key={index} question={item.question} questionKey={item.key} />
            ))}
          </div>
        </div>
      </div>

      {/* New Questions - Espaces et équipements */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#00171f]/10 rounded-full blur-xl"></div>
        <div className="relative z-10">
          <h3 
            className="text-lg sm:text-xl font-bold text-[#00171f] mb-4 sm:mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Espaces et équipements
          </h3>
          <div className="space-y-6">
            {[
              { key: 'espace_detente', question: 'Présence d\'espace détente et de repos (hammam traditionnel, sauna, jacuzzi, salle individuelle de massage...)' },
              { key: 'espace_cure', question: 'Présence d\'un espace de cure' },
              { key: 'equipements_animation', question: 'Présence des équipements d\'animation (discothèque et/ou night-club et/ou salle de spectacle)' },
              { key: 'jardin_enfants', question: 'Présence de jardin d\'enfants ou club d\'enfants' },
              { key: 'salle_sport', question: 'Présence d\'une salle de sport' },
              { key: 'structures_sportives', question: 'Présence de structures dédiées aux activités sportives (terrains : tennis, volley-ball, basket-ball, etc.)' },
              { key: 'parcours_golf', question: 'Présence d\'un parcours de golf' }
            ].map((item, index) => (
              <QuestionItem key={index} question={item.question} questionKey={item.key} />
            ))}
          </div>
        </div>
      </div>

      {/* Restauration */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#007ea7]/10 rounded-full blur-xl"></div>
        <div className="relative z-10">
          <h3 
            className="text-lg sm:text-xl font-bold text-[#00171f] mb-4 sm:mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Espaces de restauration
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <FormInput
              label="Nombre des espaces de restauration"
              type="number"
              value={questionnaireAnswers.nombre_espaces_restauration || ''}
              onChange={(value) => updateAnswer('nombre_espaces_restauration', value)}
            />
            <FormInput
              label="Superficie des espaces de restauration (m²)"
              type="number"
              value={questionnaireAnswers.superficie_espaces_restauration || ''}
              onChange={(value) => updateAnswer('superficie_espaces_restauration', value)}
            />
            <FormInput
              label="Capacité d&apos;accueil des espaces de restauration (en nombre de personnes)"
              type="number"
              value={questionnaireAnswers.capacite_espaces_restauration || ''}
              onChange={(value) => updateAnswer('capacite_espaces_restauration', value)}
            />
          </div>
        </div>
      </div>

      {/* Salles polyvalentes */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#00171f]/10 rounded-full blur-xl"></div>
        <div className="relative z-10">
          <h3 
            className="text-lg sm:text-xl font-bold text-[#00171f] mb-4 sm:mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Salles polyvalentes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FormInput
              label="Nombre des salles polyvalentes pouvant accueillir des conférences, banquets ou séminaires"
              type="number"
              value={questionnaireAnswers.nombre_salles_polyvalentes || ''}
              onChange={(value) => updateAnswer('nombre_salles_polyvalentes', value)}
            />
            <FormInput
              label="Capacité d&apos;accueil des salles polyvalentes (en nombre de personnes)"
              type="number"
              value={questionnaireAnswers.capacite_salles_polyvalentes || ''}
              onChange={(value) => updateAnswer('capacite_salles_polyvalentes', value)}
            />
          </div>
        </div>
      </div>

      {/* Piscines */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#007ea7]/10 rounded-full blur-xl"></div>
        <div className="relative z-10">
          <h3 
            className="text-lg sm:text-xl font-bold text-[#00171f] mb-4 sm:mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Piscines
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <FormInput
              label="Nombre des piscines intérieures et/ou extérieures"
              type="number"
              value={questionnaireAnswers.nombre_piscines || ''}
              onChange={(value) => updateAnswer('nombre_piscines', value)}
            />
          </div>
        </div>
      </div>

      {/* Gestion */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#00171f]/10 rounded-full blur-xl"></div>
        <div className="relative z-10">
          <h3 
            className="text-lg sm:text-xl font-bold text-[#00171f] mb-4 sm:mb-6"
            style={{ fontFamily: '"Gascogne Serial", serif' }}
          >
            Gestion de l<span style={{ fontFamily: 'Times New Roman, serif' }}>'</span>établissement
          </h3>
          <div className="space-y-6">
            {/* Gestion par le propriétaire */}
            <div className="p-4 bg-gray-50 rounded-2xl">
              <p 
                className="text-sm font-medium text-gray-900 mb-4"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Gestion par le propriétaire
              </p>
              <div className="flex space-x-6">
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="gestion_proprietaire" 
                    value="yes" 
                    checked={questionnaireAnswers.gestion_proprietaire === 'yes'}
                    onChange={(e) => updateAnswer('gestion_proprietaire', e.target.value)}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-[#007ea7]"
            style={{ accentColor: '#007ea7' }} 
                  />
                  <span 
                    className="ml-2 text-sm font-medium"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Oui
                  </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="gestion_proprietaire" 
                    value="no" 
                    checked={questionnaireAnswers.gestion_proprietaire === 'no'}
                    onChange={(e) => updateAnswer('gestion_proprietaire', e.target.value)}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-[#007ea7]"
            style={{ accentColor: '#007ea7' }} 
                  />
                  <span 
                    className="ml-2 text-sm font-medium"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Non
                  </span>
                </label>
              </div>
            </div>

            {/* Gestion par une société de gestion */}
            <div className="p-4 bg-gray-50 rounded-2xl">
              <p 
                className="text-sm font-medium text-gray-900 mb-4"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Gestion par une société de gestion
              </p>
              <div className="flex space-x-6 mb-4">
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="gestion_societe" 
                    value="yes" 
                    checked={questionnaireAnswers.gestion_societe === 'yes'}
                    onChange={(e) => updateAnswer('gestion_societe', e.target.value)}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-[#007ea7]"
            style={{ accentColor: '#007ea7' }} 
                  />
                  <span 
                    className="ml-2 text-sm font-medium"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Oui
                  </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="gestion_societe" 
                    value="no" 
                    checked={questionnaireAnswers.gestion_societe === 'no'}
                    onChange={(e) => updateAnswer('gestion_societe', e.target.value)}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-[#007ea7]"
            style={{ accentColor: '#007ea7' }} 
                  />
                  <span 
                    className="ml-2 text-sm font-medium"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Non
                  </span>
                </label>
              </div>
              {questionnaireAnswers.gestion_societe === 'yes' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput
                    label="Raison sociale de la société de gestion"
                    value={questionnaireAnswers.raison_sociale_societe || ''}
                    onChange={(value) => updateAnswer('raison_sociale_societe', value)}
                  />
                  <FormInput
                    label="Adresse de la société de gestion"
                    value={questionnaireAnswers.adresse_societe || ''}
                    onChange={(value) => updateAnswer('adresse_societe', value)}
                  />
                  <FormInput
                    label="Type de contractualisation"
                    value={questionnaireAnswers.type_contractualisation || ''}
                    onChange={(value) => updateAnswer('type_contractualisation', value)}
                  />
                  <FormInput
                    label="N° de Téléphone"
                    type="tel"
                    value={questionnaireAnswers.telephone_societe || ''}
                    onChange={(value) => updateAnswer('telephone_societe', value)}
                  />
                  <div className="md:col-span-2">
                    <FormInput
                      label="Email"
                      type="email"
                      value={questionnaireAnswers.email_societe || ''}
                      onChange={(value) => updateAnswer('email_societe', value)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Chaine hôtelière */}
            <div className="p-4 bg-gray-50 rounded-2xl">
              <p 
                className="text-sm font-medium text-gray-900 mb-4"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Appartenant à une chaine hôtelière
              </p>
              <div className="flex space-x-6 mb-4">
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="chaine_hoteliere" 
                    value="yes" 
                    checked={questionnaireAnswers.chaine_hoteliere === 'yes'}
                    onChange={(e) => updateAnswer('chaine_hoteliere', e.target.value)}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-[#007ea7]"
            style={{ accentColor: '#007ea7' }} 
                  />
                  <span 
                    className="ml-2 text-sm font-medium"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Oui
                  </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="chaine_hoteliere" 
                    value="no" 
                    checked={questionnaireAnswers.chaine_hoteliere === 'no'}
                    onChange={(e) => updateAnswer('chaine_hoteliere', e.target.value)}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-[#007ea7]"
            style={{ accentColor: '#007ea7' }} 
                  />
                  <span 
                    className="ml-2 text-sm font-medium"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Non
                  </span>
                </label>
              </div>
              {questionnaireAnswers.chaine_hoteliere === 'yes' && (
                <FormInput
                  label="Raison sociale de la chaine hôtelière"
                  value={questionnaireAnswers.raison_sociale_chaine || ''}
                  onChange={(value) => updateAnswer('raison_sociale_chaine', value)}
                />
              )}
            </div>

            {/* Gestion par une personne physique */}
            <div className="p-4 bg-gray-50 rounded-2xl">
              <p 
                className="text-sm font-medium text-gray-900 mb-4"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Gestion par une personne physique
              </p>
              <div className="flex space-x-6 mb-4">
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="gestion_personne_physique" 
                    value="yes" 
                    checked={questionnaireAnswers.gestion_personne_physique === 'yes'}
                    onChange={(e) => updateAnswer('gestion_personne_physique', e.target.value)}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-[#007ea7]"
            style={{ accentColor: '#007ea7' }} 
                  />
                  <span 
                    className="ml-2 text-sm font-medium"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Oui
                  </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="gestion_personne_physique" 
                    value="no" 
                    checked={questionnaireAnswers.gestion_personne_physique === 'no'}
                    onChange={(e) => updateAnswer('gestion_personne_physique', e.target.value)}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-[#007ea7]"
            style={{ accentColor: '#007ea7' }} 
                  />
                  <span 
                    className="ml-2 text-sm font-medium"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Non
                  </span>
                </label>
              </div>
              {questionnaireAnswers.gestion_personne_physique === 'yes' && (
                <FormInput
                  label="Nom"
                  value={questionnaireAnswers.nom_personne_physique || ''}
                  onChange={(value) => updateAnswer('nom_personne_physique', value)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};