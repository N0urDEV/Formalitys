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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DiscountService = class DiscountService {
    prisma;
    DISCOUNT_TIERS = [
        { tier: 1, minDossiers: 0, discountPercentage: 0, description: 'Premier dossier' },
        { tier: 2, minDossiers: 1, discountPercentage: 15, description: 'Deuxième dossier - 15% de réduction' },
        { tier: 3, minDossiers: 2, discountPercentage: 20, description: 'Troisième dossier - 20% de réduction' },
        { tier: 4, minDossiers: 3, discountPercentage: 25, description: 'Quatrième dossier et plus - 25% de réduction' }
    ];
    BASE_PRICES = {
        company: 330000,
        tourism: 160000
    };
    constructor(prisma) {
        this.prisma = prisma;
    }
    async calculateDiscount(userId, dossierType, basePriceOverride) {
        const basePrice = typeof basePriceOverride === 'number' ? basePriceOverride : this.BASE_PRICES[dossierType];
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
        let discountPercentage = 0;
        let tier = this.getDiscountTier(completedDossiers);
        if (dossierType === 'tourism') {
            discountPercentage = completedDossiers >= 1 ? 15 : 0;
            tier = {
                tier: discountPercentage > 0 ? 2 : 1,
                minDossiers: discountPercentage > 0 ? 1 : 0,
                discountPercentage,
                description: discountPercentage > 0 ? 'Dossiers tourisme au-delà du premier - 15% de réduction' : 'Premier dossier'
            };
        }
        else {
            if (completedDossiers >= 3) {
                discountPercentage = 25;
                tier = { tier: 4, minDossiers: 3, discountPercentage, description: 'Quatrième dossier et plus - 25% de réduction' };
            }
            else if (completedDossiers === 2) {
                discountPercentage = 20;
                tier = { tier: 3, minDossiers: 2, discountPercentage, description: 'Troisième dossier - 20% de réduction' };
            }
            else if (completedDossiers === 1) {
                discountPercentage = 15;
                tier = { tier: 2, minDossiers: 1, discountPercentage, description: 'Deuxième dossier - 15% de réduction' };
            }
            else {
                discountPercentage = 0;
                tier = { tier: 1, minDossiers: 0, discountPercentage, description: 'Premier dossier' };
            }
        }
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
    getDiscountTier(completedDossiers) {
        const applicableTiers = this.DISCOUNT_TIERS.filter(tier => completedDossiers >= tier.minDossiers);
        return applicableTiers[applicableTiers.length - 1] || this.DISCOUNT_TIERS[0];
    }
    getDiscountInfo(completedDossiers) {
        const currentTier = this.getDiscountTier(completedDossiers);
        const nextTier = this.DISCOUNT_TIERS.find(tier => tier.minDossiers > completedDossiers);
        const dossiersToNextTier = nextTier ? nextTier.minDossiers - completedDossiers : 0;
        return {
            currentTier,
            nextTier,
            dossiersToNextTier
        };
    }
    async applyDiscountToDossier(userId, dossierId, dossierType) {
        const discount = await this.calculateDiscount(userId, dossierType);
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
        }
        else {
            await this.prisma.tourismDossier.update({
                where: { id: dossierId },
                data: updateData
            });
        }
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
    async updateUserDossierCounters(userId) {
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
    async getUserDiscountStatus(userId) {
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
};
exports.DiscountService = DiscountService;
exports.DiscountService = DiscountService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DiscountService);
//# sourceMappingURL=discount.service.js.map