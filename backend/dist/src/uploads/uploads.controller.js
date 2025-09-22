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
const s3_service_1 = require("../s3/s3.service");
let UploadsController = class UploadsController {
    prisma;
    s3Service;
    constructor(prisma, s3Service) {
        this.prisma = prisma;
        this.s3Service = s3Service;
    }
    async uploadFile(file, req, body) {
        console.log('Upload request received:', {
            fileName: file?.originalname,
            fileSize: file?.size,
            mimeType: file?.mimetype,
            documentType: body?.documentType,
            userId: req.user?.userId
        });
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        const documentType = (body?.documentType || 'autre').toString();
        if (documentType === 'blog_image') {
            const allowedImageTypes = [
                'image/jpeg',
                'image/jpg',
                'image/png',
                'image/gif',
                'image/webp'
            ];
            if (!allowedImageTypes.includes(file.mimetype)) {
                throw new common_1.BadRequestException('Seuls les fichiers image (JPG, PNG, GIF, WebP) sont acceptés pour les images de blog');
            }
        }
        else {
            const allowedTypes = [
                'application/pdf'
            ];
            if (!allowedTypes.includes(file.mimetype)) {
                throw new common_1.BadRequestException('Seuls les fichiers PDF sont acceptés');
            }
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
        const key = this.s3Service.generateKey(userName, documentType, file.originalname);
        try {
            console.log('Attempting S3 upload:', { key, documentType, userName });
            const uploadResult = await this.s3Service.uploadFile(file, key);
            console.log('S3 upload successful:', { url: uploadResult.url });
            return {
                id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                filename: key.split('/').pop(),
                originalName: file.originalname,
                documentType: documentType,
                size: file.size,
                mimetype: file.mimetype,
                url: uploadResult.url,
                key: uploadResult.key,
                uploadedBy: req.user.userId,
                uploadedByName: user.name || user.email,
                uploadedAt: new Date().toISOString(),
            };
        }
        catch (error) {
            console.error('S3 upload failed:', error);
            throw new common_1.BadRequestException(`Upload failed: ${error.message}`);
        }
    }
    async uploadMultipleFiles(files, req, body) {
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
        const documentType = body.documentType || 'autre';
        const results = await Promise.all(files.map(async (file) => {
            if (documentType === 'blog_image') {
                const allowedImageTypes = [
                    'image/jpeg',
                    'image/jpg',
                    'image/png',
                    'image/gif',
                    'image/webp'
                ];
                if (!allowedImageTypes.includes(file.mimetype)) {
                    throw new common_1.BadRequestException(`Seuls les fichiers image (JPG, PNG, GIF, WebP) sont acceptés: ${file.originalname}`);
                }
            }
            else {
                const allowedTypes = [
                    'application/pdf'
                ];
                if (!allowedTypes.includes(file.mimetype)) {
                    throw new common_1.BadRequestException(`Seuls les fichiers PDF sont acceptés: ${file.originalname}`);
                }
            }
            if (file.size > 10 * 1024 * 1024) {
                throw new common_1.BadRequestException(`File too large: ${file.originalname} (max 10MB)`);
            }
            const key = this.s3Service.generateKey(userName, documentType, file.originalname);
            const uploadResult = await this.s3Service.uploadFile(file, key);
            return {
                id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                filename: key.split('/').pop(),
                originalName: file.originalname,
                documentType: documentType,
                size: file.size,
                mimetype: file.mimetype,
                url: uploadResult.url,
                key: uploadResult.key,
                uploadedBy: req.user.userId,
                uploadedByName: user.name || user.email,
                uploadedAt: new Date().toISOString(),
            };
        }));
        return { files: results };
    }
    async getFile(key) {
        try {
            const signedUrl = await this.s3Service.getSignedUrl(key);
            return { url: signedUrl };
        }
        catch (error) {
            throw new common_1.BadRequestException('File not found');
        }
    }
    async deleteFile(key) {
        try {
            await this.s3Service.deleteFile(key);
            return { message: 'File deleted successfully' };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to delete file');
        }
    }
};
exports.UploadsController = UploadsController;
__decorate([
    (0, common_1.Post)('file'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('multiple'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, Object]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "uploadMultipleFiles", null);
__decorate([
    (0, common_1.Get)('file/:key'),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "getFile", null);
__decorate([
    (0, common_1.Delete)('file/:key'),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "deleteFile", null);
exports.UploadsController = UploadsController = __decorate([
    (0, common_1.Controller)('uploads'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        s3_service_1.S3Service])
], UploadsController);
//# sourceMappingURL=uploads.controller.js.map