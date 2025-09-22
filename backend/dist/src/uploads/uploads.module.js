"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const prisma_module_1 = require("../prisma/prisma.module");
const s3_module_1 = require("../s3/s3.module");
const uploads_controller_1 = require("./uploads.controller");
let UploadsModule = class UploadsModule {
};
exports.UploadsModule = UploadsModule;
exports.UploadsModule = UploadsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            s3_module_1.S3Module,
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.memoryStorage)(),
                limits: { fileSize: 10 * 1024 * 1024 },
                fileFilter: (req, file, cb) => {
                    const allowedTypes = [
                        'application/pdf',
                        'image/jpeg',
                        'image/jpg',
                        'image/png',
                        'image/gif',
                        'image/webp'
                    ];
                    const allowedExts = ['.pdf', '.jpg', '.jpeg', '.png', '.gif', '.webp'];
                    const isValidMime = allowedTypes.includes(file.mimetype);
                    const isValidExt = allowedExts.includes((0, path_1.extname)(file.originalname).toLowerCase());
                    if (!isValidMime || !isValidExt) {
                        return cb(new Error('Only PDF and image files are allowed'), false);
                    }
                    cb(null, true);
                },
            }),
        ],
        controllers: [uploads_controller_1.UploadsController],
    })
], UploadsModule);
//# sourceMappingURL=uploads.module.js.map