import { PrismaService } from '../prisma/prisma.service';
export interface DiscountTier {
    tier: number;
    minDossiers: number;
    discountPercentage: number;
    description: string;
}
export interface DiscountCalculation {
    originalPrice: number;
    discountPercentage: number;
    discountAmount: number;
    finalPrice: number;
    reason: string;
    tier: number;
}
export declare class DiscountService {
    private prisma;
    private readonly DISCOUNT_TIERS;
    private readonly BASE_PRICES;
    constructor(prisma: PrismaService);
    calculateDiscount(userId: number, dossierType: 'company' | 'tourism', basePriceOverride?: number): Promise<DiscountCalculation>;
    private getDiscountTier;
    getDiscountInfo(completedDossiers: number): {
        currentTier: DiscountTier;
        nextTier?: DiscountTier;
        dossiersToNextTier: number;
    };
    applyDiscountToDossier(userId: number, dossierId: number, dossierType: 'company' | 'tourism'): Promise<void>;
    updateUserDossierCounters(userId: number): Promise<void>;
    getUserDiscountStatus(userId: number): Promise<{
        completedDossiers: number;
        currentTier: DiscountTier;
        nextTier?: DiscountTier;
        dossiersToNextTier: number;
        availableDiscounts: {
            company: DiscountCalculation;
            tourism: DiscountCalculation;
        };
    }>;
}
