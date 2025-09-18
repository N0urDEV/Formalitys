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
exports.DossiersController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const dossiers_service_1 = require("./dossiers.service");
let DossiersController = class DossiersController {
    dossiersService;
    constructor(dossiersService) {
        this.dossiersService = dossiersService;
    }
    createCompanyDossier(req) {
        return this.dossiersService.createCompanyDossier(req.user.userId);
    }
    getCompanyDossiers(req) {
        return this.dossiersService.getCompanyDossiers(req.user.userId);
    }
    getCompanyDossier(id, req) {
        return this.dossiersService.getCompanyDossier(id, req.user.userId);
    }
    updateCompanyDossier(id, data, req) {
        return this.dossiersService.updateCompanyDossier(id, req.user.userId, data);
    }
    deleteCompanyDossier(id, req) {
        return this.dossiersService.deleteCompanyDossier(id, req.user.userId);
    }
    createTourismDossier(req) {
        return this.dossiersService.createTourismDossier(req.user.userId);
    }
    getTourismDossiers(req) {
        return this.dossiersService.getTourismDossiers(req.user.userId);
    }
    getTourismDossier(id, req) {
        return this.dossiersService.getTourismDossier(id, req.user.userId);
    }
    updateTourismDossier(id, data, req) {
        return this.dossiersService.updateTourismDossier(id, req.user.userId, data);
    }
    deleteTourismDossier(id, req) {
        return this.dossiersService.deleteTourismDossier(id, req.user.userId);
    }
};
exports.DossiersController = DossiersController;
__decorate([
    (0, common_1.Post)('company'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DossiersController.prototype, "createCompanyDossier", null);
__decorate([
    (0, common_1.Get)('company'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DossiersController.prototype, "getCompanyDossiers", null);
__decorate([
    (0, common_1.Get)('company/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], DossiersController.prototype, "getCompanyDossier", null);
__decorate([
    (0, common_1.Put)('company/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", void 0)
], DossiersController.prototype, "updateCompanyDossier", null);
__decorate([
    (0, common_1.Delete)('company/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], DossiersController.prototype, "deleteCompanyDossier", null);
__decorate([
    (0, common_1.Post)('tourism'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DossiersController.prototype, "createTourismDossier", null);
__decorate([
    (0, common_1.Get)('tourism'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DossiersController.prototype, "getTourismDossiers", null);
__decorate([
    (0, common_1.Get)('tourism/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], DossiersController.prototype, "getTourismDossier", null);
__decorate([
    (0, common_1.Put)('tourism/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", void 0)
], DossiersController.prototype, "updateTourismDossier", null);
__decorate([
    (0, common_1.Delete)('tourism/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], DossiersController.prototype, "deleteTourismDossier", null);
exports.DossiersController = DossiersController = __decorate([
    (0, common_1.Controller)('dossiers'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [dossiers_service_1.DossiersService])
], DossiersController);
//# sourceMappingURL=dossiers.controller.js.map