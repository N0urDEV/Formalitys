'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../../../components/PaymentForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_...');
const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

export default function PaymentPage() {
  const router = useRouter();
  const params = useParams();
  const { dossierType, dossierId } = params;

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntent, setPaymentIntent] = useState<any>(null);
  const [discountInfo, setDiscountInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
      return;
    }

    // Create payment intent and get discount info
    (async () => {
      try {
        // Get discount information first (only for tourism)
        if (dossierType === 'tourism') {
          const discountRes = await fetch(`${API}/discount/calculate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ dossierType }),
          });

          if (discountRes.ok) {
            const discount = await discountRes.json();
            setDiscountInfo(discount);
          }
        }

        // Create payment intent
        const res = await fetch(`${API}/payments/create-intent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            dossierId: parseInt(dossierId as string),
            dossierType,
          }),
        });

        if (!res.ok) {
          throw new Error('Failed to create payment intent');
        }

        const intent = await res.json();
        setPaymentIntent(intent);
        setClientSecret(intent.client_secret);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [router, dossierId, dossierType]);

  const handlePaymentSuccess = async () => {
    // Payment was successful, redirect to dossier with edit parameter
    // The webhook will handle updating the dossier status
    router.push(`/dossiers/${dossierType}?edit=${dossierId}&payment=success`);
  };

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage);
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8 max-w-md mx-auto">
        <div className="text-center">Préparation du paiement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 max-w-md mx-auto">
        <div className="text-center space-y-4">
          <h1 className="text-xl font-bold text-red-600">Erreur</h1>
          <p>{error}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 border rounded"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen p-8 max-w-md mx-auto">
        <div className="text-center">Erreur de configuration du paiement</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Paiement</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">
          {dossierType === 'company' ? 'Création de société' : 'Régularisation location touristique'}
        </h2>
        <p className="text-gray-600">Dossier #{dossierId}</p>
      </div>

      {/* Discount Information */}
      {discountInfo && discountInfo.discountPercentage > 0 && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <span className="font-semibold text-green-800">Réduction appliquée !</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-600">Prix original:</span>
              <span className="line-through text-gray-500">{(discountInfo.originalPrice / 100).toLocaleString()} DH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Réduction ({discountInfo.discountPercentage}%):</span>
              <span className="text-green-600 font-semibold">-{(discountInfo.discountAmount / 100).toLocaleString()} DH</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Prix final:</span>
              <span className="text-green-700">{(discountInfo.finalPrice / 100).toLocaleString()} DH</span>
            </div>
          </div>
        </div>
      )}

      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: 'stripe',
          },
        }}
      >
        <PaymentForm
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
          amount={paymentIntent.amount}
          currency={paymentIntent.currency}
        />
      </Elements>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-700">
          {error}
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={() => router.back()}
          className="text-gray-600 underline"
        >
          Annuler et retour
        </button>
      </div>
    </main>
  );
}
