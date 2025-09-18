import { PrismaService } from '../prisma/prisma.service';
import { DiscountService } from '../discount/discount.service';
import Stripe from 'stripe';
export declare class PaymentsService {
    private readonly prisma;
    private readonly discountService;
    private stripe;
    constructor(prisma: PrismaService, discountService: DiscountService);
    createPaymentIntent(dossierId: number, dossierType: 'company' | 'tourism', userId: number): Promise<{
        id: string;
        client_secret: string | null;
        amount: number;
        currency: string;
        status: Stripe.PaymentIntent.Status;
    }>;
    confirmPayment(paymentIntentId: string): Promise<{
        success: boolean;
    }>;
    handleWebhook(signature: string, payload: Buffer): Promise<{
        received: boolean;
    }>;
}
