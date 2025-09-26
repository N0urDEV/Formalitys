import { Injectable } from '@nestjs/common';
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

@Injectable()
export class DiscountService {
  private readonly DISCOUNT_TIERS: DiscountTier[] = [
    { tier: 1, minDossiers: 0, discountPercentage: 0, description: 'Premier dossier' },
    { tier: 2, minDossiers: 1, discountPercentage: 15, description: 'Deuxième dossier - 15% de réduction' },
    { tier: 3, minDossiers: 2, discountPercentage: 25, description: 'Troisième dossier et plus - 25% de réduction' }
  ];

  private readonly BASE_PRICES = {
    company: 330000, // 3300 DH in cents
    tourism: 160000  // 1600 DH in cents
  };

  constructor(private prisma: PrismaService) {}

  /**
   * Calculate discount for a user based on their dossier history
   */
  async calculateDiscount(userId: number, dossierType: 'company' | 'tourism'): Promise<DiscountCalculation> {
    const basePrice = this.BASE_PRICES[dossierType];
    
    // Only apply discounts to tourism dossiers
    if (dossierType === 'company') {
      return {
        originalPrice: basePrice,
        discountPercentage: 0,
        discountAmount: 0,
        finalPrice: basePrice,
        reason: 'no_discount_company',
        tier: 1
      };
    }
    
    // For tourism dossiers, count completed dossiers
    const [companyCount, tourismCount] = await Promise.all([
      this.prisma.companyDossier.count({
        where: { 
          userId, 
          status: { in: ['COMPLETED', 'PAID'] }
        }
      }),
      this.prisma.tourismDossier.count({
        where: { 
          userId, 
          status: { in: ['COMPLETED', 'PAID'] }
        }
      })
    ]);

    const completedDossiers = companyCount + tourismCount;
    
    console.log(`Discount calculation for user ${userId}:`, {
      companyCount,
      tourismCount,
      completedDossiers,
      dossierType,
      basePrice
    });
    
    // Find the appropriate discount tier
    const tier = this.getDiscountTier(completedDossiers);
    const discountPercentage = tier.discountPercentage;
    const discountAmount = Math.round((basePrice * discountPercentage) / 100);
    const finalPrice = basePrice - discountAmount;
    
    console.log(`Discount tier:`, {
      tier: tier.tier,
      discountPercentage,
      discountAmount,
      finalPrice
    });

    return {
      originalPrice: basePrice,
      discountPercentage,
      discountAmount,
      finalPrice,
      reason: `loyalty_tier_${tier.tier}`,
      tier: tier.tier
    };
  }

  /**
   * Get the discount tier based on completed dossiers count
   */
  private getDiscountTier(completedDossiers: number): DiscountTier {
    // Find the highest tier the user qualifies for
    const applicableTiers = this.DISCOUNT_TIERS.filter(tier => completedDossiers >= tier.minDossiers);
    return applicableTiers[applicableTiers.length - 1] || this.DISCOUNT_TIERS[0];
  }

  /**
   * Get discount information for display purposes
   */
  getDiscountInfo(completedDossiers: number): {
    currentTier: DiscountTier;
    nextTier?: DiscountTier;
    dossiersToNextTier: number;
  } {
    const currentTier = this.getDiscountTier(completedDossiers);
    const nextTier = this.DISCOUNT_TIERS.find(tier => tier.minDossiers > completedDossiers);
    const dossiersToNextTier = nextTier ? nextTier.minDossiers - completedDossiers : 0;

    return {
      currentTier,
      nextTier,
      dossiersToNextTier
    };
  }

  /**
   * Apply discount to a dossier
   */
  async applyDiscountToDossier(
    userId: number, 
    dossierId: number, 
    dossierType: 'company' | 'tourism'
  ): Promise<void> {
    const discount = await this.calculateDiscount(userId, dossierType);
    
    // Update the dossier with discount information
    const updateData = {
      originalPrice: discount.originalPrice,
      discountApplied: discount.discountAmount,
      finalPrice: discount.finalPrice,
      discountReason: discount.reason
    };

    if (dossierType === 'company') {
      await this.prisma.companyDossier.update({
        where: { id: dossierId },
        data: updateData
      });
    } else {
      await this.prisma.tourismDossier.update({
        where: { id: dossierId },
        data: updateData
      });
    }

    // Record in discount history
    await this.prisma.discountHistory.create({
      data: {
        userId,
        dossierId,
        dossierType,
        discountPercentage: discount.discountPercentage,
        discountAmount: discount.discountAmount,
        originalPrice: discount.originalPrice,
        finalPrice: discount.finalPrice,
        reason: discount.reason
      }
    });
  }

  /**
   * Update user's dossier counters after successful payment
   */
  async updateUserDossierCounters(userId: number): Promise<void> {
    // Count completed dossiers
    const [companyCount, tourismCount] = await Promise.all([
      this.prisma.companyDossier.count({
        where: { 
          userId, 
          status: { in: ['COMPLETED', 'PAID'] }
        }
      }),
      this.prisma.tourismDossier.count({
        where: { 
          userId, 
          status: { in: ['COMPLETED', 'PAID'] }
        }
      })
    ]);

    const totalCompleted = companyCount + tourismCount;
    const loyaltyTier = this.getDiscountTier(totalCompleted).tier;

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        totalDossiersCompleted: totalCompleted,
        loyaltyTier
      }
    });
  }

  /**
   * Get user's discount status for frontend display
   */
  async getUserDiscountStatus(userId: number): Promise<{
    completedDossiers: number;
    currentTier: DiscountTier;
    nextTier?: DiscountTier;
    dossiersToNextTier: number;
    availableDiscounts: {
      company: DiscountCalculation;
      tourism: DiscountCalculation;
    };
  }> {
    // Count completed dossiers directly from database
    const [companyCount, tourismCount] = await Promise.all([
      this.prisma.companyDossier.count({
        where: { 
          userId, 
          status: { in: ['COMPLETED', 'PAID'] }
        }
      }),
      this.prisma.tourismDossier.count({
        where: { 
          userId, 
          status: { in: ['COMPLETED', 'PAID'] }
        }
      })
    ]);

    const completedDossiers = companyCount + tourismCount;
    const discountInfo = this.getDiscountInfo(completedDossiers);
    
    const [companyDiscount, tourismDiscount] = await Promise.all([
      this.calculateDiscount(userId, 'company'),
      this.calculateDiscount(userId, 'tourism')
    ]);

    return {
      completedDossiers,
      currentTier: discountInfo.currentTier,
      nextTier: discountInfo.nextTier,
      dossiersToNextTier: discountInfo.dossiersToNextTier,
      availableDiscounts: {
        company: companyDiscount,
        tourism: tourismDiscount
      }
    };
  }
}
