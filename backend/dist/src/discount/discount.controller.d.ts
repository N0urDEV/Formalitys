import { DiscountService } from './discount.service';
export declare class DiscountController {
    private readonly discountService;
    constructor(discountService: DiscountService);
    getDiscountStatus(req: any): Promise<{
        completedDossiers: number;
        currentTier: import("./discount.service").DiscountTier;
        nextTier?: import("./discount.service").DiscountTier;
        dossiersToNextTier: number;
        availableDiscounts: {
            company: import("./discount.service").DiscountCalculation;
            tourism: import("./discount.service").DiscountCalculation;
        };
    }>;
    calculateDiscount(req: any, body: {
        dossierType: 'company' | 'tourism';
    }): Promise<import("./discount.service").DiscountCalculation>;
    getDiscountTiers(): {
        tiers: {
            tier: number;
            minDossiers: number;
            discountPercentage: number;
            description: string;
        }[];
        basePrices: {
            company: number;
            tourism: number;
        };
    };
}
