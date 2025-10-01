"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const discount_service_1 = require("../discount/discount.service");
const stripe_1 = __importDefault(require("stripe"));
let PaymentsService = class PaymentsService {
    prisma;
    discountService;
    stripe;
    constructor(prisma, discountService) {
        this.prisma = prisma;
        this.discountService = discountService;
        const stripeKey = process.env.STRIPE_SECRET_KEY;
        if (!stripeKey) {
            throw new Error('STRIPE_SECRET_KEY is required. Please set your Stripe secret key in the environment variables.');
        }
        this.stripe = new stripe_1.default(stripeKey, {
            apiVersion: '2025-02-24.acacia'
        });
    }
    async calculatePrice(dossierId, dossierType, userId) {
        let baseAmount = 0;
        if (dossierType === 'company') {
            const companyDossier = await this.prisma.companyDossier.findUnique({
                where: { id: dossierId }
            });
            baseAmount = 330000;
            const discount = await this.discountService.calculateDiscount(userId, dossierType, baseAmount);
            let amount = discount.finalPrice;
            if (companyDossier?.headquarters === 'contrat_domiciliation') {
                amount += 90000;
            }
            return {
                basePrice: baseAmount / 100,
                domiciliationFee: companyDossier?.headquarters === 'contrat_domiciliation' ? 900 : 0,
                discountApplied: discount.discountAmount / 100,
                discountPercentage: discount.discountPercentage,
                total: amount / 100,
                domiciliationSelected: companyDossier?.headquarters === 'contrat_domiciliation'
            };
        }
        else if (dossierType === 'tourism') {
            baseAmount = 160000;
            const discount = await this.discountService.calculateDiscount(userId, dossierType, baseAmount);
            return {
                basePrice: baseAmount / 100,
                domiciliationFee: 0,
                discountApplied: discount.discountAmount / 100,
                discountPercentage: discount.discountPercentage,
                total: discount.finalPrice / 100,
                domiciliationSelected: false
            };
        }
    }
    async createPaymentIntent(dossierId, dossierType, userId) {
        let baseAmount = 0;
        let amount = 0;
        let discount = null;
        if (dossierType === 'company') {
            const companyDossier = await this.prisma.companyDossier.findUnique({
                where: { id: dossierId }
            });
            console.log('Payment calculation - Company dossier:', {
                id: dossierId,
                headquarters: companyDossier?.headquarters,
                currentStep: companyDossier?.currentStep
            });
            baseAmount = 330000;
            discount = await this.discountService.calculateDiscount(userId, dossierType, baseAmount);
            amount = discount.finalPrice;
            if (companyDossier?.headquarters === 'contrat_domiciliation') {
                console.log('Adding domiciliation fee: +900 MAD');
                amount += 90000;
            }
            else {
                console.log('No domiciliation fee - headquarters:', companyDossier?.headquarters);
            }
            console.log('Final amount after discount and domiciliation:', amount, 'MAD');
        }
        else if (dossierType === 'tourism') {
            baseAmount = 160000;
            discount = await this.discountService.calculateDiscount(userId, dossierType, baseAmount);
            amount = discount.finalPrice;
        }
        const stripeKey = process.env.STRIPE_SECRET_KEY;
        if (!stripeKey) {
            throw new Error('STRIPE_SECRET_KEY is not configured. Please set your Stripe secret key in the environment variables.');
        }
        try {
            const paymentIntent = await this.stripe.paymentIntents.create({
                amount,
                currency: 'mad',
                metadata: {
                    dossierId: dossierId.toString(),
                    dossierType,
                    userId: userId.toString(),
                    originalPrice: baseAmount.toString(),
                    discountApplied: discount.discountAmount.toString(),
                    discountPercentage: discount.discountPercentage.toString(),
                    finalPrice: amount.toString(),
                    discountReason: discount.reason,
                },
            });
            await this.discountService.applyDiscountToDossier(userId, dossierId, dossierType);
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
            }
            else {
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
                metadata: paymentIntent.metadata,
            };
        }
        catch (error) {
            console.error('Stripe error:', error);
            if (error instanceof Error) {
                if (error.message.includes('Invalid API Key')) {
                    throw new Error('Stripe API key is invalid. Please check your STRIPE_SECRET_KEY configuration.');
                }
                else if (error.message.includes('No such customer')) {
                    throw new Error('Customer not found in Stripe.');
                }
                else if (error.message.includes('Your account cannot currently make live charges')) {
                    throw new Error('Stripe account is not configured for live payments.');
                }
            }
            throw new Error(`Failed to create payment intent: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async confirmPayment(paymentIntentId) {
        try {
            const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
            if (paymentIntent.status !== 'succeeded') {
                throw new Error('Payment not completed');
            }
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
                        currentStep: 4,
                    },
                });
                await this.discountService.updateUserDossierCounters(companyDossier.userId);
            }
            if (tourismDossier) {
                await this.prisma.tourismDossier.update({
                    where: { id: tourismDossier.id },
                    data: {
                        paymentStatus: 'succeeded',
                        status: 'PAID',
                        currentStep: 4,
                    },
                });
                await this.discountService.updateUserDossierCounters(tourismDossier.userId);
            }
            return { success: true };
        }
        catch (error) {
            console.error('Payment confirmation error:', error);
            throw new Error('Failed to confirm payment');
        }
    }
    async handleWebhook(signature, payload) {
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!endpointSecret) {
            throw new Error('Stripe webhook secret not configured');
        }
        try {
            const event = this.stripe.webhooks.constructEvent(payload, signature, endpointSecret);
            if (event.type === 'payment_intent.succeeded') {
                const paymentIntent = event.data.object;
                await this.confirmPayment(paymentIntent.id);
            }
            return { received: true };
        }
        catch (error) {
            console.error('Webhook error:', error);
            throw new Error('Webhook signature verification failed');
        }
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        discount_service_1.DiscountService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map