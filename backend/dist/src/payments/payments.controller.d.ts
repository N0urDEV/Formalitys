import { PaymentsService } from './payments.service';
import type { Request } from 'express';
declare class CreatePaymentIntentDto {
    dossierId: number;
    dossierType: 'company' | 'tourism';
}
declare class ConfirmPaymentDto {
    paymentIntentId: string;
}
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createPaymentIntent(dto: CreatePaymentIntentDto, req: any): Promise<{
        id: string;
        client_secret: string | null;
        amount: number;
        currency: string;
        status: import("stripe").Stripe.PaymentIntent.Status;
    }>;
    confirmPayment(dto: ConfirmPaymentDto): Promise<{
        success: boolean;
    }>;
    handleWebhook(signature: string, req: Request & {
        rawBody?: Buffer;
    }): Promise<{
        received: boolean;
    }>;
}
export {};
