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
exports.UploadsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const passport_1 = require("@nestjs/passport");
const prisma_service_1 = require("../prisma/prisma.service");
const fs_1 = require("fs");
const path_1 = require("path");
const util_1 = require("util");
const renameAsync = (0, util_1.promisify)(fs_1.rename);
let UploadsController = class UploadsController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    detectDocumentType(originalName) {
        const name = originalName.toLowerCase();
        const patterns = {
            'cni': ['cni', 'carte_identite', 'carte identite', 'identite', 'id_card', 'identity'],
            'passport': ['passport', 'passeport'],
            'attestation': ['attestation', 'certificate', 'certificat'],
            'contrat': ['contrat', 'contract', 'convention'],
            'facture': ['facture', 'invoice', 'bill'],
            'justificatif': ['justificatif', 'proof', 'evidence', 'justification'],
            'photo': ['photo', 'image', 'picture', 'img'],
            'rib': ['rib', 'releve', 'bank_statement', 'extrait_compte'],
            'kbis': ['kbis', 'extrait_kbis', 'extrait kbis'],
            'statut': ['statut', 'statutes', 'reglement'],
            'acte': ['acte', 'deed', 'acte_notarie'],
            'procuration': ['procuration', 'power_of_attorney', 'mandat'],
            'declaration': ['declaration', 'declaration_fiscale', 'tax_declaration'],
            'avis': ['avis', 'notice', 'notification'],
            'releve': ['releve', 'statement', 'extrait'],
            'quittance': ['quittance', 'receipt', 'quittances'],
            'bail': ['bail', 'lease', 'rental_agreement'],
            'plan': ['plan', 'blueprint', 'schema', 'drawing'],
            'autorisation': ['autorisation', 'authorization', 'permit', 'license'],
            'certificat': ['certificat', 'certificate', 'cert'],
            'diplome': ['diplome', 'diploma', 'degree'],
            'cv': ['cv', 'resume', 'curriculum'],
            'lettre': ['lettre', 'letter', 'correspondance'],
            'rapport': ['rapport', 'report'],
            'proces_verbal': ['proces_verbal', 'minutes', 'pv'],
            'decision': ['decision', 'judgment', 'ruling'],
            'jugement': ['jugement', 'judgment', 'court_order'],
            'arrete': ['arrete', 'decree', 'order'],
            'arrete_prefectoral': ['arrete_prefectoral', 'prefectoral_order'],
            'arrete_municipal': ['arrete_municipal', 'municipal_order'],
            'permis': ['permis', 'permit', 'license'],
            'autorisation_exploitation': ['autorisation_exploitation', 'operating_permit'],
            'carte_professionnelle': ['carte_professionnelle', 'professional_card'],
            'registre_commerce': ['registre_commerce', 'trade_register'],
            'patente': ['patente', 'patent', 'tax_license'],
            'cnss': ['cnss', 'social_security'],
            'ice': ['ice', 'identifiant_commun_entreprise'],
            'rc': ['rc', 'registre_commerce'],
            'if': ['if', 'identifiant_fiscal'],
            'tp': ['tp', 'taxe_professionnelle'],
            'tsc': ['tsc', 'taxe_services_communaux'],
            'autre': ['autre', 'other', 'divers', 'misc']
        };
        for (const [type, keywords] of Object.entries(patterns)) {
            for (const keyword of keywords) {
                if (name.includes(keyword)) {
                    return type;
                }
            }
        }
        return 'document';
    }
    async uploadFile(file, req) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        const allowedTypes = [
            'image/jpeg', 'image/png', 'image/gif', 'image/webp',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        if (!allowedTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException('File type not allowed');
        }
        if (file.size > 10 * 1024 * 1024) {
            throw new common_1.BadRequestException('File too large (max 10MB)');
        }
        const user = await this.prisma.user.findUnique({
            where: { id: req.user.userId },
            select: { name: true, email: true }
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const userName = user.name || user.email.split('@')[0];
        const sanitizedUserName = userName.replace(/[^a-zA-Z0-9]/g, '_');
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExtension = file.originalname.split('.').pop();
        const documentType = this.detectDocumentType(file.originalname);
        const newFilename = `${sanitizedUserName}-${documentType}-${uniqueSuffix}.${fileExtension}`;
        const oldPath = (0, path_1.join)('./uploads', file.filename);
        const newPath = (0, path_1.join)('./uploads', newFilename);
        try {
            await renameAsync(oldPath, newPath);
        }
        catch (error) {
            console.error('Error renaming file:', error);
        }
        const finalFilename = newFilename;
        return {
            id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            filename: finalFilename,
            originalName: file.originalname,
            documentType: documentType,
            size: file.size,
            mimetype: file.mimetype,
            url: `/uploads/${finalFilename}`,
            uploadedBy: req.user.userId,
            uploadedByName: user.name || user.email,
            uploadedAt: new Date().toISOString(),
        };
    }
    async uploadMultipleFiles(files, req) {
        if (!files || files.length === 0) {
            throw new common_1.BadRequestException('No files uploaded');
        }
        const user = await this.prisma.user.findUnique({
            where: { id: req.user.userId },
            select: { name: true, email: true }
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const userName = user.name || user.email.split('@')[0];
        const sanitizedUserName = userName.replace(/[^a-zA-Z0-9]/g, '_');
        const results = await Promise.all(files.map(async (file) => {
            const allowedTypes = [
                'image/jpeg', 'image/png', 'image/gif', 'image/webp',
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ];
            if (!allowedTypes.includes(file.mimetype)) {
                throw new common_1.BadRequestException(`File type not allowed: ${file.originalname}`);
            }
            if (file.size > 10 * 1024 * 1024) {
                throw new common_1.BadRequestException(`File too large: ${file.originalname} (max 10MB)`);
            }
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const fileExtension = file.originalname.split('.').pop();
            const documentType = this.detectDocumentType(file.originalname);
            const newFilename = `${sanitizedUserName}-${documentType}-${uniqueSuffix}.${fileExtension}`;
            const oldPath = (0, path_1.join)('./uploads', file.filename);
            const newPath = (0, path_1.join)('./uploads', newFilename);
            try {
                await renameAsync(oldPath, newPath);
            }
            catch (error) {
                console.error('Error renaming file:', error);
            }
            const finalFilename = newFilename;
            return {
                id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                filename: finalFilename,
                originalName: file.originalname,
                documentType: documentType,
                size: file.size,
                mimetype: file.mimetype,
                url: `/uploads/${finalFilename}`,
                uploadedBy: req.user.userId,
                uploadedByName: user.name || user.email,
                uploadedAt: new Date().toISOString(),
            };
        }));
        return { files: results };
    }
};
exports.UploadsController = UploadsController;
__decorate([
    (0, common_1.Post)('file'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('multiple'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "uploadMultipleFiles", null);
exports.UploadsController = UploadsController = __decorate([
    (0, common_1.Controller)('uploads'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UploadsController);
//# sourceMappingURL=uploads.controller.js.map