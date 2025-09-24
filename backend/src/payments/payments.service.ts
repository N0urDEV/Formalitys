import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DiscountService } from '../discount/discount.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    private readonly prisma: PrismaService,
    private readonly discountService: DiscountService
  ) {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY is required. Please set your Stripe secret key in the environment variables.');
    }
    this.stripe = new Stripe(stripeKey, { 
      apiVersion: '2025-02-24.acacia' 
    });
  }

  async createPaymentIntent(dossierId: number, dossierType: 'company' | 'tourism', userId: number) {
    // Base pricing in MAD cents (1 MAD = 100 cents)
    let baseAmount = 0;
    
    if (dossierType === 'company') {
      // Get company dossier to check for domiciliation option
      const companyDossier = await this.prisma.companyDossier.findUnique({
        where: { id: dossierId }
      });
      
      console.log('Payment calculation - Company dossier:', {
        id: dossierId,
        headquarters: companyDossier?.headquarters,
        currentStep: companyDossier?.currentStep
      });
      
      baseAmount = 360000; // 3600 MAD base price
      
      // Add domiciliation fee if selected
      if (companyDossier?.headquarters === 'contrat_domiciliation') {
        console.log('Adding domiciliation fee: +900 MAD');
        baseAmount += 90000; // +900 MAD for domiciliation
      } else {
        console.log('No domiciliation fee - headquarters:', companyDossier?.headquarters);
      }
      
      console.log('Final base amount:', baseAmount, 'MAD');
    } else if (dossierType === 'tourism') {
      baseAmount = 160000; // 1600 MAD
    }

    // Only apply discounts to tourism dossiers
    let amount = baseAmount;
    if (dossierType === 'tourism') {
      const discount = await this.discountService.calculateDiscount(userId, dossierType);
      amount = discount.finalPrice;
    }

    // Check if Stripe is properly configured
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY is not configured. Please set your Stripe secret key in the environment variables.');
    }

    try {
      // Create real Stripe payment intent
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency: 'mad',
        metadata: {
          dossierId: dossierId.toString(),
          dossierType,
          userId: userId.toString(),
        },
      });

      // Apply discount to dossier (only for tourism)
      if (dossierType === 'tourism') {
        await this.discountService.applyDiscountToDossier(userId, dossierId, dossierType);
      }

      // Update dossier with payment intent
      const updateData = {
        paymentIntentId: paymentIntent.id,
        paymentStatus: 'pending',
        amountPaid: amount,
      };

      if (dossierType === 'company') {
        await this.prisma.companyDossier.update({
          where: { id: dossierId },
          data: updateData,
        });
      } else {
        await this.prisma.tourismDossier.update({
          where: { id: dossierId },
          data: updateData,
        });
      }

      return {
        id: paymentIntent.id,
        client_secret: paymentIntent.client_secret,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
      };
    } catch (error) {
      console.error('Stripe error:', error);
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('Invalid API Key')) {
          throw new Error('Stripe API key is invalid. Please check your STRIPE_SECRET_KEY configuration.');
        } else if (error.message.includes('No such customer')) {
          throw new Error('Customer not found in Stripe.');
        } else if (error.message.includes('Your account cannot currently make live charges')) {
          throw new Error('Stripe account is not configured for live payments.');
        }
      }
      
      throw new Error(`Failed to create payment intent: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async confirmPayment(paymentIntentId: string) {
    try {
      // Retrieve payment intent from Stripe to confirm status
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status !== 'succeeded') {
        throw new Error('Payment not completed');
      }

      // Update dossier status
      const companyDossier = await this.prisma.companyDossier.findFirst({
        where: { paymentIntentId },
      });

      const tourismDossier = await this.prisma.tourismDossier.findFirst({
        where: { paymentIntentId },
      });

      if (companyDossier) {
        await this.prisma.companyDossier.update({
          where: { id: companyDossier.id },
          data: {
            paymentStatus: 'succeeded',
            status: 'PAID',
            currentStep: 4, // Move to step 4 after payment (step 3 is payment)
          },
        });
        
        // Update user's dossier counters
        await this.discountService.updateUserDossierCounters(companyDossier.userId);
      }

      if (tourismDossier) {
        await this.prisma.tourismDossier.update({
          where: { id: tourismDossier.id },
          data: {
            paymentStatus: 'succeeded',
            status: 'PAID',
            currentStep: 4, // Move to step 4 after payment (step 3 is payment)
          },
        });
        
        // Update user's dossier counters
        await this.discountService.updateUserDossierCounters(tourismDossier.userId);
      }

      return { success: true };
    } catch (error) {
      console.error('Payment confirmation error:', error);
      throw new Error('Failed to confirm payment');
    }
  }

  async handleWebhook(signature: string, payload: Buffer) {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!endpointSecret) {
      throw new Error('Stripe webhook secret not configured');
    }

    try {
      const event = this.stripe.webhooks.constructEvent(payload, signature, endpointSecret);

      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await this.confirmPayment(paymentIntent.id);
      }

      return { received: true };
    } catch (error) {
      console.error('Webhook error:', error);
      throw new Error('Webhook signature verification failed');
    }
  }
}
