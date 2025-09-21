"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const s3_service_1 = require("../s3/s3.service");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcryptjs"));
let AdminService = class AdminService {
    prisma;
    s3;
    constructor(prisma, s3) {
        this.prisma = prisma;
        this.s3 = s3;
    }
    async getAllDossiersWithFiles(page = 1, limit = 20, type, status) {
        console.log('Admin service - getAllDossiersWithFiles called with:', { page, limit, type, status });
        const skip = (page - 1) * limit;
        if (!type) {
            const [companyDossiers, tourismDossiers, companyTotal, tourismTotal] = await Promise.all([
                this.prisma.companyDossier.findMany({
                    where: status ? { status } : {},
                    orderBy: { createdAt: 'desc' },
                    include: {
                        user: { select: { id: true, name: true, email: true, phone: true } },
                    },
                }),
                this.prisma.tourismDossier.findMany({
                    where: status ? { status } : {},
                    orderBy: { createdAt: 'desc' },
                    include: {
                        user: { select: { id: true, name: true, email: true, phone: true } },
                    },
                }),
                this.prisma.companyDossier.count({ where: status ? { status } : {} }),
                this.prisma.tourismDossier.count({ where: status ? { status } : {} }),
            ]);
            const processedCompanyDossiers = await Promise.all(companyDossiers.map(async (dossier) => {
                console.log('Processing company dossier:', dossier.id, 'uploadedFiles:', dossier.uploadedFiles);
                let filesToProcess = [];
                if (Array.isArray(dossier.uploadedFiles)) {
                    console.log(`Dossier ${dossier.id} - Array format, files count:`, dossier.uploadedFiles.length);
                    filesToProcess = dossier.uploadedFiles;
                }
                else if (dossier.uploadedFiles && typeof dossier.uploadedFiles === 'object') {
                    const objectValues = Object.values(dossier.uploadedFiles);
                    console.log(`Dossier ${dossier.id} - Object format, object values:`, objectValues);
                    filesToProcess = objectValues.flat();
                    console.log(`Dossier ${dossier.id} - Flattened files count:`, filesToProcess.length);
                }
                else {
                    console.log(`Dossier ${dossier.id} - No files or invalid format:`, dossier.uploadedFiles);
                }
                return {
                    ...dossier,
                    type: 'company',
                    uploadedFiles: await Promise.all(filesToProcess.map(async (file) => {
                        console.log('Processing company file:', file.originalName, 'key:', file.key, 'url:', file.url);
                        const fileKey = file.key ?? file.url?.split(`${process.env.S3_BUCKET_NAME}/`)[1] ?? file.url;
                        console.log('Extracted file key:', fileKey);
                        const signedUrl = await this.s3.getSignedUrl(fileKey, 60 * 15);
                        console.log('Generated signed URL for company file:', file.originalName, 'URL:', signedUrl);
                        return {
                            id: file.id,
                            filename: file.filename,
                            originalName: file.originalName,
                            documentType: file.documentType,
                            size: file.size,
                            mimetype: file.mimetype,
                            url: signedUrl,
                            uploadedAt: file.uploadedAt,
                        };
                    })),
                };
            }));
            const processedTourismDossiers = await Promise.all(tourismDossiers.map(async (dossier) => {
                console.log('Processing tourism dossier:', dossier.id, 'uploadedFiles:', dossier.uploadedFiles);
                let filesToProcess = [];
                if (Array.isArray(dossier.uploadedFiles)) {
                    filesToProcess = dossier.uploadedFiles;
                }
                else if (dossier.uploadedFiles && typeof dossier.uploadedFiles === 'object') {
                    filesToProcess = Object.values(dossier.uploadedFiles).flat();
                }
                return {
                    ...dossier,
                    type: 'tourism',
                    uploadedFiles: await Promise.all(filesToProcess.map(async (file) => {
                        console.log('Processing tourism file:', file.originalName, 'key:', file.key, 'url:', file.url);
                        const fileKey = file.key ?? file.url?.split(`${process.env.S3_BUCKET_NAME}/`)[1] ?? file.url;
                        console.log('Extracted file key:', fileKey);
                        const signedUrl = await this.s3.getSignedUrl(fileKey, 60 * 15);
                        console.log('Generated signed URL for tourism file:', file.originalName, 'URL:', signedUrl);
                        return {
                            id: file.id,
                            filename: file.filename,
                            originalName: file.originalName,
                            documentType: file.documentType,
                            size: file.size,
                            mimetype: file.mimetype,
                            url: signedUrl,
                            uploadedAt: file.uploadedAt,
                        };
                    })),
                };
            }));
            const allDossiers = [...processedCompanyDossiers, ...processedTourismDossiers]
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(skip, skip + limit);
            console.log('Admin service - Final processed dossiers (no type filter):', allDossiers.map(d => ({ id: d.id, uploadedFilesCount: d.uploadedFiles?.length || 0 })));
            const total = companyTotal + tourismTotal;
            const totalPages = Math.ceil(total / limit);
            return {
                dossiers: allDossiers,
                total,
                pages: totalPages,
                companyTotal,
                tourismTotal,
            };
        }
        const [companyDossiers, tourismDossiers, companyTotal, tourismTotal] = await Promise.all([
            type !== 'tourism' ? this.prisma.companyDossier.findMany({
                where: status ? { status } : {},
                skip: type === 'company' ? skip : 0,
                take: type === 'company' ? limit : 0,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: { select: { id: true, name: true, email: true, phone: true } },
                },
            }) : [],
            type !== 'company' ? this.prisma.tourismDossier.findMany({
                where: status ? { status } : {},
                skip: type === 'tourism' ? skip : 0,
                take: type === 'tourism' ? limit : 0,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: { select: { id: true, name: true, email: true, phone: true } },
                },
            }) : [],
            type !== 'tourism' ? this.prisma.companyDossier.count({ where: status ? { status } : {} }) : 0,
            type !== 'company' ? this.prisma.tourismDossier.count({ where: status ? { status } : {} }) : 0,
        ]);
        const processedCompanyDossiers = await Promise.all(companyDossiers.map(async (dossier) => {
            console.log('Processing company dossier (type-specific):', dossier.id, 'uploadedFiles:', dossier.uploadedFiles);
            let filesToProcess = [];
            if (Array.isArray(dossier.uploadedFiles)) {
                console.log(`Dossier ${dossier.id} - Array format (type-specific), files count:`, dossier.uploadedFiles.length);
                filesToProcess = dossier.uploadedFiles;
            }
            else if (dossier.uploadedFiles && typeof dossier.uploadedFiles === 'object') {
                const objectValues = Object.values(dossier.uploadedFiles);
                console.log(`Dossier ${dossier.id} - Object format (type-specific), object values:`, objectValues);
                filesToProcess = objectValues.flat();
                console.log(`Dossier ${dossier.id} - Flattened files count (type-specific):`, filesToProcess.length);
            }
            else {
                console.log(`Dossier ${dossier.id} - No files or invalid format (type-specific):`, dossier.uploadedFiles);
            }
            return {
                ...dossier,
                type: 'company',
                uploadedFiles: await Promise.all(filesToProcess.map(async (file) => ({
                    id: file.id,
                    filename: file.filename,
                    originalName: file.originalName,
                    documentType: file.documentType,
                    size: file.size,
                    mimetype: file.mimetype,
                    url: await this.s3.getSignedUrl(file.key ?? file.url?.split(`${process.env.S3_BUCKET_NAME}/`)[1] ?? file.url, 60 * 15),
                    uploadedAt: file.uploadedAt,
                }))),
            };
        }));
        const processedTourismDossiers = await Promise.all(tourismDossiers.map(async (dossier) => {
            let filesToProcess = [];
            if (Array.isArray(dossier.uploadedFiles)) {
                filesToProcess = dossier.uploadedFiles;
            }
            else if (dossier.uploadedFiles && typeof dossier.uploadedFiles === 'object') {
                filesToProcess = Object.values(dossier.uploadedFiles).flat();
            }
            return {
                ...dossier,
                type: 'tourism',
                uploadedFiles: await Promise.all(filesToProcess.map(async (file) => ({
                    id: file.id,
                    filename: file.filename,
                    originalName: file.originalName,
                    documentType: file.documentType,
                    size: file.size,
                    mimetype: file.mimetype,
                    url: await this.s3.getSignedUrl(file.key ?? file.url?.split(`${process.env.S3_BUCKET_NAME}/`)[1] ?? file.url, 60 * 15),
                    uploadedAt: file.uploadedAt,
                }))),
            };
        }));
        const allDossiers = [...processedCompanyDossiers, ...processedTourismDossiers]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        console.log('Admin service - Final processed dossiers (with type filter):', allDossiers.map(d => ({ id: d.id, uploadedFilesCount: d.uploadedFiles?.length || 0 })));
        const total = companyTotal + tourismTotal;
        const totalPages = Math.ceil(total / limit);
        return {
            dossiers: allDossiers,
            total,
            pages: totalPages,
            companyTotal,
            tourismTotal,
        };
    }
    async getDashboardStats() {
        const [totalUsers, totalCompanyDossiers, totalTourismDossiers, paidCompanyDossiers, paidTourismDossiers, completedCompanyDossiers, completedTourismDossiers, recentDossiers,] = await Promise.all([
            this.prisma.user.count({ where: { role: 'USER' } }),
            this.prisma.companyDossier.count(),
            this.prisma.tourismDossier.count(),
            this.prisma.companyDossier.count({ where: { status: 'PAID' } }),
            this.prisma.tourismDossier.count({ where: { status: 'PAID' } }),
            this.prisma.companyDossier.count({ where: { status: 'COMPLETED' } }),
            this.prisma.tourismDossier.count({ where: { status: 'COMPLETED' } }),
            this.prisma.companyDossier.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: { user: { select: { name: true, email: true } } },
            }),
        ]);
        const paidDossiers = paidCompanyDossiers + paidTourismDossiers;
        const completedDossiers = completedCompanyDossiers + completedTourismDossiers;
        return {
            totalUsers,
            totalCompanyDossiers,
            totalTourismDossiers,
            totalDossiers: totalCompanyDossiers + totalTourismDossiers,
            paidDossiers,
            completedDossiers,
            recentDossiers,
        };
    }
    async getCompanyDossiers(page = 1, limit = 20, status) {
        const skip = (page - 1) * limit;
        const where = status ? { status } : {};
        const [dossiers, total] = await Promise.all([
            this.prisma.companyDossier.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: { select: { id: true, name: true, email: true, phone: true } },
                },
            }),
            this.prisma.companyDossier.count({ where }),
        ]);
        return { dossiers, total, pages: Math.ceil(total / limit) };
    }
    async getCompanyDossier(id) {
        return this.prisma.companyDossier.findUnique({
            where: { id },
            include: {
                user: { select: { id: true, name: true, email: true, phone: true } },
            },
        });
    }
    async getCompanyDossierWithFiles(id) {
        const dossier = await this.prisma.companyDossier.findUnique({
            where: { id },
            include: {
                user: { select: { id: true, name: true, email: true, phone: true } },
            },
        });
        if (!dossier) {
            return null;
        }
        const uploadedFiles = Array.isArray(dossier.uploadedFiles) ? dossier.uploadedFiles : [];
        return {
            ...dossier,
            uploadedFiles: uploadedFiles.map((file) => ({
                id: file.id,
                filename: file.filename,
                originalName: file.originalName,
                documentType: file.documentType,
                size: file.size,
                mimetype: file.mimetype,
                url: file.url,
                uploadedAt: file.uploadedAt,
            })),
        };
    }
    async updateCompanyDossierStatus(id, status, notes) {
        return this.prisma.companyDossier.update({
            where: { id },
            data: { status, updatedAt: new Date() },
        });
    }
    async getTourismDossiers(page = 1, limit = 20, status) {
        const skip = (page - 1) * limit;
        const where = status ? { status } : {};
        const [dossiers, total] = await Promise.all([
            this.prisma.tourismDossier.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: { select: { id: true, name: true, email: true, phone: true } },
                },
            }),
            this.prisma.tourismDossier.count({ where }),
        ]);
        return { dossiers, total, pages: Math.ceil(total / limit) };
    }
    async getTourismDossier(id) {
        return this.prisma.tourismDossier.findUnique({
            where: { id },
            include: {
                user: { select: { id: true, name: true, email: true, phone: true } },
            },
        });
    }
    async getTourismDossierWithFiles(id) {
        const dossier = await this.prisma.tourismDossier.findUnique({
            where: { id },
            include: {
                user: { select: { id: true, name: true, email: true, phone: true } },
            },
        });
        if (!dossier) {
            return null;
        }
        const uploadedFiles = Array.isArray(dossier.uploadedFiles) ? dossier.uploadedFiles : [];
        return {
            ...dossier,
            uploadedFiles: uploadedFiles.map((file) => ({
                id: file.id,
                filename: file.filename,
                originalName: file.originalName,
                documentType: file.documentType,
                size: file.size,
                mimetype: file.mimetype,
                url: file.url,
                uploadedAt: file.uploadedAt,
            })),
        };
    }
    async updateTourismDossierStatus(id, status, notes) {
        return this.prisma.tourismDossier.update({
            where: { id },
            data: { status, updatedAt: new Date() },
        });
    }
    async getUsers(page = 1, limit = 20, search) {
        const skip = (page - 1) * limit;
        const where = {
            role: 'USER',
            ...(search && {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                    { phone: { contains: search, mode: 'insensitive' } },
                ],
            }),
        };
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    createdAt: true,
                    _count: {
                        select: {
                            companyDossiers: true,
                            tourismDossiers: true,
                        },
                    },
                },
            }),
            this.prisma.user.count({ where }),
        ]);
        return { users, total, pages: Math.ceil(total / limit) };
    }
    async getUser(id) {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                createdAt: true,
                companyDossiers: {
                    select: {
                        id: true,
                        status: true,
                        currentStep: true,
                        createdAt: true,
                        amountPaid: true,
                    },
                },
                tourismDossiers: {
                    select: {
                        id: true,
                        status: true,
                        currentStep: true,
                        createdAt: true,
                        amountPaid: true,
                    },
                },
            },
        });
    }
    async createAdmin(data) {
        try {
            const { email, name, phone, password } = data;
            const existingUser = await this.prisma.user.findFirst({
                where: {
                    OR: [
                        { email },
                        ...(phone ? [{ phone }] : [])
                    ]
                },
            });
            if (existingUser) {
                throw new common_1.BadRequestException('Un utilisateur avec cet email ou téléphone existe déjà');
            }
            const passwordHash = await bcrypt.hash(password, 10);
            const admin = await this.prisma.user.create({
                data: {
                    email,
                    name,
                    phone,
                    passwordHash,
                    role: 'ADMIN',
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    phone: true,
                    createdAt: true,
                    role: true,
                },
            });
            return admin;
        }
        catch (error) {
            console.error('Error creating admin:', error);
            throw error;
        }
    }
    async getAdmins() {
        return this.prisma.user.findMany({
            where: { role: 'ADMIN' },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                createdAt: true,
                role: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateUser(id, data) {
        try {
            const { email, name, phone } = data;
            const existingUser = await this.prisma.user.findUnique({
                where: { id },
                select: { id: true, role: true }
            });
            if (!existingUser) {
                throw new common_1.BadRequestException('Utilisateur non trouvé');
            }
            if (email || phone) {
                const duplicateUser = await this.prisma.user.findFirst({
                    where: {
                        AND: [
                            { id: { not: id } },
                            {
                                OR: [
                                    ...(email ? [{ email }] : []),
                                    ...(phone ? [{ phone }] : [])
                                ]
                            }
                        ]
                    }
                });
                if (duplicateUser) {
                    throw new common_1.BadRequestException('Un utilisateur avec cet email ou téléphone existe déjà');
                }
            }
            const updatedUser = await this.prisma.user.update({
                where: { id },
                data: {
                    ...(email && { email }),
                    ...(name && { name }),
                    ...(phone !== undefined && { phone }),
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    phone: true,
                    createdAt: true,
                    _count: {
                        select: {
                            companyDossiers: true,
                            tourismDossiers: true,
                        },
                    },
                },
            });
            return updatedUser;
        }
        catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }
    async deleteUser(id) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: { id },
                select: { id: true, role: true }
            });
            if (!existingUser) {
                throw new common_1.BadRequestException('Utilisateur non trouvé');
            }
            if (existingUser.role === 'ADMIN') {
                throw new common_1.BadRequestException('Impossible de supprimer un administrateur');
            }
            const userDossiers = await this.prisma.user.findUnique({
                where: { id },
                select: {
                    _count: {
                        select: {
                            companyDossiers: true,
                            tourismDossiers: true,
                        },
                    },
                },
            });
            if (userDossiers && (userDossiers._count.companyDossiers > 0 || userDossiers._count.tourismDossiers > 0)) {
                throw new common_1.BadRequestException('Impossible de supprimer un utilisateur avec des dossiers existants');
            }
            await this.prisma.user.delete({
                where: { id }
            });
            return { message: 'Utilisateur supprimé avec succès' };
        }
        catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
    async updateAdmin(id, data) {
        try {
            const { email, name, phone } = data;
            const existingAdmin = await this.prisma.user.findUnique({
                where: { id },
                select: { id: true, role: true }
            });
            if (!existingAdmin || existingAdmin.role !== 'ADMIN') {
                throw new common_1.BadRequestException('Administrateur non trouvé');
            }
            if (email || phone) {
                const duplicateUser = await this.prisma.user.findFirst({
                    where: {
                        AND: [
                            { id: { not: id } },
                            {
                                OR: [
                                    ...(email ? [{ email }] : []),
                                    ...(phone ? [{ phone }] : [])
                                ]
                            }
                        ]
                    }
                });
                if (duplicateUser) {
                    throw new common_1.BadRequestException('Un utilisateur avec cet email ou téléphone existe déjà');
                }
            }
            const updatedAdmin = await this.prisma.user.update({
                where: { id },
                data: {
                    ...(email && { email }),
                    ...(name && { name }),
                    ...(phone !== undefined && { phone }),
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    phone: true,
                    createdAt: true,
                    role: true,
                },
            });
            return updatedAdmin;
        }
        catch (error) {
            console.error('Error updating admin:', error);
            throw error;
        }
    }
    async deleteAdmin(id) {
        try {
            const existingAdmin = await this.prisma.user.findUnique({
                where: { id },
                select: { id: true, role: true }
            });
            if (!existingAdmin || existingAdmin.role !== 'ADMIN') {
                throw new common_1.BadRequestException('Administrateur non trouvé');
            }
            const adminCount = await this.prisma.user.count({
                where: { role: 'ADMIN' }
            });
            if (adminCount <= 1) {
                throw new common_1.BadRequestException('Impossible de supprimer le dernier administrateur');
            }
            await this.prisma.user.delete({
                where: { id }
            });
            return { message: 'Administrateur supprimé avec succès' };
        }
        catch (error) {
            console.error('Error deleting admin:', error);
            throw error;
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, s3_service_1.S3Service])
], AdminService);
//# sourceMappingURL=admin.service.js.map