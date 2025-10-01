import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../../../../components/PaymentForm';
import { formatPrice } from '../../../../utils/currency';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_...');
const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

interface Step3PaymentProps {
  dossier: any;
  companyData: any;
  onPaymentSuccess: () => void;
}

export const Step3Payment: React.FC<Step3PaymentProps> = ({ dossier, companyData, onPaymentSuccess }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntent, setPaymentIntent] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!dossier) return;

    const createPaymentIntent = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Vous devez être connecté pour effectuer le paiement');
          setLoading(false);
          return;
        }

        const response = await fetch(`${API}/payments/create-intent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            dossierId: dossier.id,
            dossierType: 'company'
          })
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la création du paiement');
        }

        const data = await response.json();
        console.log('Payment intent response:', data);
        console.log('Payment amount:', data.amount, 'cents =', data.amount / 100, 'MAD');
        console.log('Discount info:', {
          originalPrice: data.metadata?.originalPrice,
          discountApplied: data.metadata?.discountApplied,
          discountPercentage: data.metadata?.discountPercentage,
          finalPrice: data.amount
        });
        setClientSecret(data.client_secret);
        setPaymentIntent(data);
        setLoading(false);
      } catch (err: any) {
        console.error('Payment intent creation error:', err);
        setError(err.message || 'Erreur lors de la création du paiement');
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [dossier]);

  const handlePaymentSuccess = () => {
    onPaymentSuccess();
  };

  const handlePaymentError = (error: string) => {
    setError(error);
  };

  if (loading) {
    return (
      <div className="text-center space-y-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007ea7] mx-auto mb-4"></div>
        <p className="text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          Préparation du paiement...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-red-800 mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            Erreur de paiement
          </h3>
          <p className="text-red-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="text-center space-y-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <h3 className="text-lg font-medium text-yellow-800 mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            Impossible de créer le paiement
          </h3>
          <p className="text-yellow-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            Veuillez réessayer plus tard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 
          className="text-xl font-semibold text-[#00171f] mb-2"
          style={{ fontFamily: '"Gascogne Serial", serif' }}
        >
          Paiement sécurisé
        </h2>
        <p 
          className="text-gray-600"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          Effectuez votre paiement en toute sécurité via Stripe
        </p>
      </div>

      {/* Payment Confirmation Message */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 
              className="text-blue-800 font-medium mb-2"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Après paiement
            </h3>
            <p 
              className="text-blue-700 text-sm"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Téléchargement des justificatifs, votre dossier sera complet et traité immédiatement. Vous pourrez ensuite uploader les documents restants.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            amount={paymentIntent?.amount || 0}
            currency={paymentIntent?.currency || 'mad'}
            serviceName="Création de société"
            showSummary={true}
            domiciliationLabel="Domiciliation (12 mois : 6 payés + 6 offerts)"
            costBreakdown={{
              basePrice: 3300, // Base company creation price
              domiciliationFee: companyData.headquarters === 'contrat_domiciliation' ? 900 : undefined,
              discountApplied: parseInt(paymentIntent?.metadata?.discountApplied || '0') / 100,
              discountPercentage: parseInt(paymentIntent?.metadata?.discountPercentage || '0'),
              total: (paymentIntent?.amount || 0) / 100
            }}
          />
        </Elements>
      </div>
    </div>
  );
};
