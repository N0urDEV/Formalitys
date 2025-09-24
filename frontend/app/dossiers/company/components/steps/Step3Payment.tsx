import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../../../../components/PaymentForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_...');
const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

interface Step3PaymentProps {
  dossier: any;
  onPaymentSuccess: () => void;
}

export const Step3Payment: React.FC<Step3PaymentProps> = ({ dossier, onPaymentSuccess }) => {
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F66B4C] mx-auto mb-4"></div>
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
          className="text-xl font-semibold text-[#071B1E] mb-2"
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
      
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            amount={paymentIntent?.amount || 0}
            currency={paymentIntent?.currency || 'mad'}
            serviceName="Création de société"
            costBreakdown={{
              basePrice: 3600,
              domiciliationFee: (paymentIntent?.amount || 0) > 360000 ? 900 : undefined,
              total: (paymentIntent?.amount || 0) / 100
            }}
          />
        </Elements>
      </div>
    </div>
  );
};
