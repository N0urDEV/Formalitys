'use client';
import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

interface PaymentFormProps {
  onSuccess: () => void;
  onError: (error: string) => void;
  amount: number;
  currency: string;
  serviceName?: string;
  costBreakdown?: {
    basePrice: number;
    domiciliationFee?: number;
    total: number;
  };
}

export default function PaymentForm({ onSuccess, onError, amount, currency, serviceName, costBreakdown }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: 'if_required',
      });

      if (error) {
        onError(error.message || 'Payment failed');
      } else {
        onSuccess();
      }
    } catch (err: any) {
      onError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          Récapitulatif des coûts
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span style={{ fontFamily: 'Satoshi, sans-serif' }}>
              {serviceName || 'Service'}
            </span>
            <span className="font-medium" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              {costBreakdown ? costBreakdown.basePrice : 3600} MAD
            </span>
          </div>
          {costBreakdown?.domiciliationFee && (
            <div className="flex justify-between">
              <span style={{ fontFamily: 'Satoshi, sans-serif' }}>
                Domiciliation (6 mois)
              </span>
              <span className="font-medium" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                +{costBreakdown.domiciliationFee} MAD
              </span>
            </div>
          )}
          <div className="border-t pt-2 flex justify-between font-bold text-lg">
            <span className="text-gray-900" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              Total
            </span>
            <span className="text-[#F66B4C]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              {amount / 100} {currency.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <PaymentElement />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full px-6 py-3 bg-[#F66B4C] text-white rounded-lg hover:bg-[#e55a43] disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        style={{ fontFamily: 'Satoshi, sans-serif' }}
      >
        {loading ? 'Traitement...' : `Payer ${amount / 100} ${currency.toUpperCase()}`}
      </button>
    </form>
  );
}
