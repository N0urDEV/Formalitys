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
exports.PdfController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const pdf_service_1 = require("./pdf.service");
const dossiers_service_1 = require("../dossiers/dossiers.service");
const users_service_1 = require("../users/users.service");
let PdfController = class PdfController {
    pdfService;
    dossiersService;
    usersService;
    constructor(pdfService, dossiersService, usersService) {
        this.pdfService = pdfService;
        this.dossiersService = dossiersService;
        this.usersService = usersService;
    }
    async generateCompanyDossierPdf(id, req, res) {
        try {
            const dossierId = parseInt(id);
            const userId = req.user.userId;
            const dossier = await this.dossiersService.getCompanyDossier(dossierId, userId);
            const user = await this.usersService.findById(userId);
            if (!dossier || !user) {
                return res.status(404).json({ message: 'Dossier ou utilisateur non trouvé' });
            }
            const pdfBuffer = await this.pdfService.generateCompanyDossierPdf({
                user,
                dossier,
            });
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="dossier-creation-societe-${dossierId}.pdf"`,
                'Content-Length': pdfBuffer.length,
            });
            res.send(pdfBuffer);
        }
        catch (error) {
            console.error('Error generating company dossier PDF:', error);
            res.status(500).json({ message: 'Erreur lors de la génération du PDF' });
        }
    }
    async generateTourismDossierPdf(id, req, res) {
        try {
            const dossierId = parseInt(id);
            const userId = req.user.userId;
            const dossier = await this.dossiersService.getTourismDossier(dossierId, userId);
            const user = await this.usersService.findById(userId);
            if (!dossier || !user) {
                return res.status(404).json({ message: 'Dossier ou utilisateur non trouvé' });
            }
            const pdfBuffer = await this.pdfService.generateTourismDossierPdf({
                user,
                dossier,
            });
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="dossier-tourisme-${dossierId}.pdf"`,
                'Content-Length': pdfBuffer.length,
            });
            res.send(pdfBuffer);
        }
        catch (error) {
            console.error('Error generating tourism dossier PDF:', error);
            res.status(500).json({ message: 'Erreur lors de la génération du PDF' });
        }
    }
};
exports.PdfController = PdfController;
__decorate([
    (0, common_1.Get)('company/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PdfController.prototype, "generateCompanyDossierPdf", null);
__decorate([
    (0, common_1.Get)('tourism/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PdfController.prototype, "generateTourismDossierPdf", null);
exports.PdfController = PdfController = __decorate([
    (0, common_1.Controller)('pdf'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [pdf_service_1.PdfService,
        dossiers_service_1.DossiersService,
        users_service_1.UsersService])
], PdfController);
//# sourceMappingURL=pdf.controller.js.map