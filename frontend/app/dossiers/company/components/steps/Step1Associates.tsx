import React from 'react';
import { Associate, FormErrors, StepErrors } from '../../types';
import { FormInput } from '../FormInput';
import { FormSelect } from '../FormSelect';

interface Step1AssociatesProps {
  associates: Associate[];
  setAssociates: (associates: Associate[]) => void;
  errors: FormErrors;
  stepErrors: StepErrors;
  clearFieldError: (field: string) => void;
}

export const Step1Associates: React.FC<Step1AssociatesProps> = ({
  associates,
  setAssociates,
  errors,
  stepErrors,
  clearFieldError
}) => {
  const addAssociate = () => {
    if (associates.length < 5) {
      setAssociates([...associates, {
        nom: '', prenom: '', typePiece: 'CNI', numero: '', genre: 'M',
        nationalite: 'Marocaine', adresse: '', telephone: '', email: '', isGerant: false
      }]);
    }
  };

  const updateAssociate = (index: number, field: string, value: any) => {
    const updated = [...associates];
    updated[index] = { ...updated[index], [field]: value };
    setAssociates(updated);
  };

  const removeAssociate = (index: number) => {
    if (associates.length > 1) {
      setAssociates(associates.filter((_, i) => i !== index));
    }
  };

  const typePieceOptions = [
    { value: 'CNI', label: 'CNI' },
    { value: 'Passeport', label: 'Passeport' },
    { value: 'Carte de résident', label: 'Carte de résident' }
  ];

  const genreOptions = [
    { value: 'M', label: 'M' },
    { value: 'Mme', label: 'Mme' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 
          className="text-2xl font-bold text-[#071B1E] mb-4"
          style={{ fontFamily: '"Gascogne Serial", serif' }}
        >
          Informations des associés
        </h2>
        <p 
          className="text-gray-600"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          Renseignez les informations de tous les associés de votre société
        </p>
      </div>

      {/* Step 1 Error Display */}
      {stepErrors[1] && stepErrors[1].length > 0 && (
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
                Veuillez corriger les erreurs suivantes :
              </h3>
              <ul className="space-y-1">
                {stepErrors[1].map((error, index) => (
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
      
      {associates.map((associate, index) => (
        <div key={index} className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#F66B4C]/10 rounded-full blur-xl"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <h3 
                className="text-lg font-bold text-[#071B1E]"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Associé {index + 1}
              </h3>
              {associates.length > 1 && (
                <button 
                  onClick={() => removeAssociate(index)} 
                  className="text-red-500 hover:text-red-700 transition-colors text-sm font-medium"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Supprimer
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Nom"
                name={`associate_${index}_nom`}
                placeholder="Nom de famille"
                value={associate.nom}
                onChange={(value) => {
                  updateAssociate(index, 'nom', value);
                  if (errors[`associate_${index}_nom`]) {
                    clearFieldError(`associate_${index}_nom`);
                  }
                }}
                error={errors[`associate_${index}_nom`]}
                required
              />
              
              <FormInput
                label="Prénom"
                name={`associate_${index}_prenom`}
                placeholder="Prénom"
                value={associate.prenom}
                onChange={(value) => {
                  updateAssociate(index, 'prenom', value);
                  if (errors[`associate_${index}_prenom`]) {
                    clearFieldError(`associate_${index}_prenom`);
                  }
                }}
                error={errors[`associate_${index}_prenom`]}
                required
              />
              
              <FormSelect
                label="Type de pièce"
                name={`associate_${index}_typePiece`}
                value={associate.typePiece}
                onChange={(value) => updateAssociate(index, 'typePiece', value)}
                options={typePieceOptions}
              />
              
              <FormInput
                label="Numéro de pièce"
                name={`associate_${index}_numero`}
                placeholder="Numéro de pièce"
                value={associate.numero}
                onChange={(value) => updateAssociate(index, 'numero', value)}
                required
              />
              
              <FormSelect
                label="Genre"
                name={`associate_${index}_genre`}
                value={associate.genre}
                onChange={(value) => updateAssociate(index, 'genre', value)}
                options={genreOptions}
              />
              
              <FormInput
                label="Nationalité"
                name={`associate_${index}_nationalite`}
                placeholder="Nationalité"
                value={associate.nationalite}
                onChange={(value) => updateAssociate(index, 'nationalite', value)}
              />
              
              <div className="md:col-span-2">
                <FormInput
                  label="Adresse"
                  name={`associate_${index}_adresse`}
                  placeholder="Adresse complète"
                  value={associate.adresse}
                  onChange={(value) => updateAssociate(index, 'adresse', value)}
                  required
                />
              </div>
              
              <FormInput
                label="Téléphone"
                name={`associate_${index}_telephone`}
                type="tel"
                placeholder="+212 6 12 34 56 78"
                value={associate.telephone}
                onChange={(value) => {
                  updateAssociate(index, 'telephone', value);
                  if (errors[`associate_${index}_telephone`]) {
                    clearFieldError(`associate_${index}_telephone`);
                  }
                }}
                error={errors[`associate_${index}_telephone`]}
                required
              />
              
              <FormInput
                label="Email"
                name={`associate_${index}_email`}
                type="email"
                placeholder="email@exemple.com"
                value={associate.email}
                onChange={(value) => {
                  updateAssociate(index, 'email', value);
                  if (errors[`associate_${index}_email`]) {
                    clearFieldError(`associate_${index}_email`);
                  }
                }}
                error={errors[`associate_${index}_email`]}
                required
              />
            </div>
            
            <div className="mt-6">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={associate.isGerant}
                  onChange={(e) => updateAssociate(index, 'isGerant', e.target.checked)}
                  className="w-5 h-5 text-[#F66B4C] border-gray-300 rounded focus:ring-[#F66B4C] focus:ring-2"
                />
                <span 
                  className="text-gray-700 font-medium"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Gérant de la société
                </span>
              </label>
            </div>
          </div>
        </div>
      ))}
      
      {associates.length < 5 && (
        <div className="text-center">
          <button
            onClick={addAssociate}
            className="inline-flex items-center px-6 py-3 border-2 border-[#F66B4C] text-[#F66B4C] rounded-2xl font-semibold hover:bg-[#F66B4C] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Ajouter un associé
          </button>
        </div>
      )}
    </div>
  );
};
