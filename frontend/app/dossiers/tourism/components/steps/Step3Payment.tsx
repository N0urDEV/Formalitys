import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../../../../components/PaymentForm';
import { formatPrice } from '../../../../utils/currency';

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
            dossierType: 'tourism'
          })
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la création du paiement');
        }

        const data = await response.json();
        console.log('Payment intent response:', data);
        console.log('Payment amount:', data.amount, 'cents =', data.amount / 100, 'MAD');
        console.log('Payment intent metadata:', data.metadata);
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
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[#00171f] mb-2" style={{ fontFamily: '"Gascogne Serial", serif' }}>
            Préparation du paiement
          </h2>
          <p className="text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            Veuillez patienter...
          </p>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[#00171f] mb-2" style={{ fontFamily: '"Gascogne Serial", serif' }}>
            Erreur de paiement
          </h2>
          <p className="text-red-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[#00171f] mb-2" style={{ fontFamily: '"Gascogne Serial", serif' }}>
            Impossible de créer le paiement
          </h2>
          <p className="text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            Veuillez réessayer plus tard
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[#00171f] mb-2" style={{ fontFamily: '"Gascogne Serial", serif' }}>
          Paiement sécurisé
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
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
            serviceName="Régularisation Hébergement Touristique"
            showSummary={true}
            costBreakdown={{
              basePrice: parseInt(paymentIntent?.metadata?.originalPrice || '160000') / 100 || 1600,
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
