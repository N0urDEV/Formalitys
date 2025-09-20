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
exports.DossiersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let DossiersService = class DossiersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createCompanyDossier(userId) {
        console.log(`Creating company dossier for user ${userId} at ${new Date().toISOString()}`);
        return this.prisma.companyDossier.create({
            data: { userId, status: client_1.DossierStatus.DRAFT, currentStep: 1 },
        });
    }
    async getCompanyDossiers(userId) {
        return this.prisma.companyDossier.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getCompanyDossier(id, userId) {
        const dossier = await this.prisma.companyDossier.findUnique({ where: { id } });
        if (!dossier)
            throw new common_1.NotFoundException('Dossier not found');
        if (dossier.userId !== userId)
            throw new common_1.ForbiddenException('Access denied');
        return dossier;
    }
    async updateCompanyDossier(id, userId, data) {
        const dossier = await this.getCompanyDossier(id, userId);
        const updateData = {
            currentStep: data.currentStep,
            updatedAt: new Date()
        };
        if (data.currentStep >= 5) {
            updateData.status = 'COMPLETED';
        }
        if (data.companyData) {
            const companyData = data.companyData;
            updateData.companyName = companyData.companyName;
            updateData.activities = companyData.activities;
            updateData.proposedNames = companyData.proposedNames;
            updateData.headquarters = companyData.headquarters;
            updateData.capital = companyData.capital;
            updateData.selectedBank = companyData.selectedBank;
            updateData.raisonSociale = companyData.raisonSociale;
            updateData.formeJuridique = companyData.formeJuridique;
            updateData.nationalite = companyData.nationalite;
            updateData.adresseSiege = companyData.adresseSiege;
            updateData.villeSiege = companyData.villeSiege;
            updateData.professionActivite = companyData.professionActivite;
            updateData.telephone = companyData.telephone;
            updateData.fax = companyData.fax;
            updateData.email = companyData.email;
            updateData.numeroArticleTaxeProfessionnelle = companyData.numeroArticleTaxeProfessionnelle;
            updateData.numeroArticleTaxeServicesCommunaux = companyData.numeroArticleTaxeServicesCommunaux;
            updateData.numeroAffiliationCNSS = companyData.numeroAffiliationCNSS;
            updateData.numeroRegistreCommerce = companyData.numeroRegistreCommerce;
            updateData.villeRegistreCommerce = companyData.villeRegistreCommerce;
            updateData.referenceDepotDeclaration = companyData.referenceDepotDeclaration;
            updateData.dateDepotDeclaration = companyData.dateDepotDeclaration;
        }
        if (data.associates) {
            updateData.associates = data.associates;
        }
        if (data.uploadedFiles === undefined && dossier.uploadedFiles) {
            updateData.uploadedFiles = dossier.uploadedFiles;
        }
        else if (data.uploadedFiles) {
            updateData.uploadedFiles = data.uploadedFiles;
        }
        console.log('Updating company dossier with data:', updateData);
        return this.prisma.companyDossier.update({
            where: { id },
            data: updateData,
        });
    }
    async deleteCompanyDossier(id, userId) {
        const dossier = await this.getCompanyDossier(id, userId);
        return this.prisma.companyDossier.delete({
            where: { id },
        });
    }
    async createTourismDossier(userId) {
        console.log(`Creating tourism dossier for user ${userId} at ${new Date().toISOString()}`);
        return this.prisma.tourismDossier.create({
            data: { userId, status: client_1.DossierStatus.DRAFT, currentStep: 1 },
        });
    }
    async getTourismDossiers(userId) {
        return this.prisma.tourismDossier.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getTourismDossier(id, userId) {
        const dossier = await this.prisma.tourismDossier.findUnique({ where: { id } });
        if (!dossier)
            throw new common_1.NotFoundException('Dossier not found');
        if (dossier.userId !== userId)
            throw new common_1.ForbiddenException('Access denied');
        return dossier;
    }
    async updateTourismDossier(id, userId, data) {
        const dossier = await this.getTourismDossier(id, userId);
        const updateData = { ...data, updatedAt: new Date() };
        if (data.uploadedFiles === undefined && dossier.uploadedFiles) {
            updateData.uploadedFiles = dossier.uploadedFiles;
        }
        if (data.uploadedPhotos === undefined && dossier.uploadedPhotos) {
            updateData.uploadedPhotos = dossier.uploadedPhotos;
        }
        if (data.currentStep >= 6) {
            updateData.status = 'COMPLETED';
        }
        return this.prisma.tourismDossier.update({
            where: { id },
            data: updateData,
        });
    }
    async deleteTourismDossier(id, userId) {
        const dossier = await this.getTourismDossier(id, userId);
        return this.prisma.tourismDossier.delete({
            where: { id },
        });
    }
};
exports.DossiersService = DossiersService;
exports.DossiersService = DossiersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DossiersService);
//# sourceMappingURL=dossiers.service.js.map