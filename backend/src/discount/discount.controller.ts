import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DiscountService } from './discount.service';

@Controller('discount')
@UseGuards(JwtAuthGuard)
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  /**
   * Get user's discount status and available discounts
   */
  @Get('status')
  async getDiscountStatus(@Request() req) {
    const userId = req.user.userId;
    return await this.discountService.getUserDiscountStatus(userId);
  }

  /**
   * Calculate discount for a specific dossier type
   */
  @Post('calculate')
  async calculateDiscount(
    @Request() req,
    @Body() body: { dossierType: 'company' | 'tourism' }
  ) {
    const userId = req.user.userId;
    const { dossierType } = body;
    
    return await this.discountService.calculateDiscount(userId, dossierType);
  }

  /**
   * Get discount tiers information (public endpoint)
   */
  @Get('tiers')
  getDiscountTiers() {
    return {
      tiers: [
        { tier: 1, minDossiers: 0, discountPercentage: 0, description: 'Premier dossier' },
        { tier: 2, minDossiers: 1, discountPercentage: 15, description: 'Deuxième dossier - 15% de réduction' },
        { tier: 3, minDossiers: 2, discountPercentage: 25, description: 'Troisième dossier et plus - 25% de réduction' }
      ],
      basePrices: {
        company: 330000, // 3300 DH in cents
        tourism: 160000  // 1600 DH in cents
      }
    };
  }
}
