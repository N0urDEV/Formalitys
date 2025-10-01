'use client';
import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { formatPrice, formatPriceWithBreakdown } from '../utils/currency';
import { useTranslations } from 'next-intl';

interface PaymentFormProps {
  onSuccess: () => void;
  onError: (error: string) => void;
  amount: number;
  currency: string;
  serviceName?: string;
  showSummary?: boolean;
  costBreakdown?: {
    basePrice: number;
    domiciliationFee?: number;
    discountApplied?: number;
    discountPercentage?: number;
    total: number;
  };
}

export default function PaymentForm({ onSuccess, onError, amount, currency, serviceName, showSummary = true, costBreakdown }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const t = useTranslations('Payment');

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
      {showSummary && (
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          {t('summary')}
        </h3>
        <div className="space-y-2 text-sm">
                 <div className="flex justify-between">
                   <span style={{ fontFamily: 'Satoshi, sans-serif' }}>
                     {serviceName || t('service')}
                   </span>
                   <span className="font-medium" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                     {formatPrice(costBreakdown ? costBreakdown.basePrice : 3300)}
                   </span>
                 </div>
                 {costBreakdown?.domiciliationFee && (
                   <div className="flex justify-between">
                     <span style={{ fontFamily: 'Satoshi, sans-serif' }}>
                       {t('domiciliation')}
                     </span>
                     <span className="font-medium" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                       +{formatPrice(costBreakdown.domiciliationFee)}
                     </span>
                   </div>
                 )}
                 {costBreakdown?.discountApplied && costBreakdown.discountApplied > 0 && (
                   <div className="flex justify-between text-green-600">
                     <span style={{ fontFamily: 'Satoshi, sans-serif' }}>
                       {t('discountApplied')} ({costBreakdown.discountPercentage}%)
                     </span>
                     <span className="font-medium" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                       -{formatPrice(costBreakdown.discountApplied)}
                     </span>
                   </div>
                 )}
                 <div className="border-t pt-2 flex justify-between font-bold text-lg">
                   <span className="text-gray-900" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                     {t('total')}
                   </span>
                   <span className="text-[#007ea7]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                     {formatPrice(costBreakdown?.total || amount / 100)}
                   </span>
                 </div>
        </div>
      </div>
      )}

      <div className="border rounded-lg p-4">
        <PaymentElement />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full px-6 py-3 bg-[#007ea7] text-white rounded-lg hover:bg-[#00a8e8] disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        style={{ fontFamily: 'Satoshi, sans-serif' }}
      >
        {loading ? t('processing') : t('pay', { amount: amount / 100, currency: currency.toUpperCase() })}
      </button>
    </form>
  );
}
