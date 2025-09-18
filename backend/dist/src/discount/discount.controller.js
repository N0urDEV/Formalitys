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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const discount_service_1 = require("./discount.service");
let DiscountController = class DiscountController {
    discountService;
    constructor(discountService) {
        this.discountService = discountService;
    }
    async getDiscountStatus(req) {
        const userId = req.user.userId;
        return await this.discountService.getUserDiscountStatus(userId);
    }
    async calculateDiscount(req, body) {
        const userId = req.user.userId;
        const { dossierType } = body;
        return await this.discountService.calculateDiscount(userId, dossierType);
    }
    getDiscountTiers() {
        return {
            tiers: [
                { tier: 1, minDossiers: 0, discountPercentage: 0, description: 'Premier dossier' },
                { tier: 2, minDossiers: 1, discountPercentage: 15, description: 'Deuxième dossier - 15% de réduction' },
                { tier: 3, minDossiers: 2, discountPercentage: 25, description: 'Troisième dossier et plus - 25% de réduction' }
            ],
            basePrices: {
                company: 360000,
                tourism: 160000
            }
        };
    }
};
exports.DiscountController = DiscountController;
__decorate([
    (0, common_1.Get)('status'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DiscountController.prototype, "getDiscountStatus", null);
__decorate([
    (0, common_1.Post)('calculate'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DiscountController.prototype, "calculateDiscount", null);
__decorate([
    (0, common_1.Get)('tiers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DiscountController.prototype, "getDiscountTiers", null);
exports.DiscountController = DiscountController = __decorate([
    (0, common_1.Controller)('discount'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [discount_service_1.DiscountService])
], DiscountController);
//# sourceMappingURL=discount.controller.js.map