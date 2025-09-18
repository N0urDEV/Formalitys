import React from 'react';

interface Step3PaymentProps {
  totalPrice: number;
}

export const Step3Payment: React.FC<Step3PaymentProps> = ({ totalPrice }) => {
  return (
    <div className="text-center space-y-6">
      <h2 
        className="text-xl font-semibold text-[#071B1E]"
        style={{ fontFamily: '"Gascogne Serial", serif' }}
      >
        Paiement requis
      </h2>
      <p 
        className="text-gray-600"
        style={{ fontFamily: 'Satoshi, sans-serif' }}
      >
        Pour continuer, vous devez effectuer le paiement de {totalPrice} MAD.
      </p>
      
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
        <h3 
          className="font-medium mb-4 text-[#071B1E]"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          Récapitulatif de votre commande:
        </h3>
        <div className="space-y-2 text-sm text-left">
          <div className="flex justify-between">
            <span 
              className="text-gray-700"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Création de société
            </span>
            <span 
              className="font-medium"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              3600 MAD
            </span>
          </div>
          {totalPrice > 3600 && (
            <div className="flex justify-between">
              <span 
                className="text-gray-700"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Domiciliation (6 mois)
              </span>
              <span 
                className="font-medium"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                +2100 MAD
              </span>
            </div>
          )}
          <div className="border-t pt-2 flex justify-between font-bold text-lg">
            <span 
              className="text-gray-900"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Total
            </span>
            <span 
              className="text-[#F66B4C]"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {totalPrice} MAD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
