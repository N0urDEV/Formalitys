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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const email_service_1 = require("../email/email.service");
const bcrypt = __importStar(require("bcryptjs"));
const crypto = __importStar(require("crypto"));
let AuthService = class AuthService {
    prisma;
    jwt;
    emailService;
    constructor(prisma, jwt, emailService) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.emailService = emailService;
    }
    async register(params) {
        const { name, email, phone, password } = params;
        const existing = await this.prisma.user.findFirst({
            where: { OR: [{ email }, ...(phone ? [{ phone }] : [])] },
        });
        if (existing)
            throw new common_1.BadRequestException('Email or phone already in use');
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({ data: { name, email, phone, passwordHash } });
        const token = await this.jwt.signAsync({ sub: user.id, email: user.email });
        return { token, user: this.sanitize(user) };
    }
    async login(params) {
        const { emailOrPhone, password } = params;
        const user = await this.prisma.user.findFirst({
            where: { OR: [{ email: emailOrPhone }, { phone: emailOrPhone }] },
        });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const token = await this.jwt.signAsync({ sub: user.id, email: user.email });
        return { token, user: this.sanitize(user) };
    }
    async profile(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.UnauthorizedException();
        return this.sanitize(user);
    }
    async forgotPassword(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return { message: 'Si cet email existe, vous recevrez un lien de réinitialisation' };
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetExpires = new Date(Date.now() + 3600000);
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                resetPasswordToken: resetToken,
                resetPasswordExpires: resetExpires,
            },
        });
        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
        try {
            await this.emailService.sendPasswordResetEmail(email, resetUrl, user.name || 'Utilisateur');
            console.log(`Password reset email sent to ${email}`);
        }
        catch (error) {
            console.error('Failed to send password reset email:', error);
        }
        return {
            message: 'Si cet email existe, vous recevrez un lien de réinitialisation',
            resetUrl: process.env.NODE_ENV === 'development' ? resetUrl : undefined
        };
    }
    async resetPassword(token, newPassword) {
        const user = await this.prisma.user.findFirst({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { gt: new Date() },
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Token invalide ou expiré');
        }
        const passwordHash = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                passwordHash,
                resetPasswordToken: null,
                resetPasswordExpires: null,
            },
        });
        return { message: 'Mot de passe réinitialisé avec succès' };
    }
    async verifyResetToken(token) {
        const user = await this.prisma.user.findFirst({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { gt: new Date() },
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Token invalide ou expiré');
        }
        return { valid: true, email: user.email };
    }
    async checkEmail(email) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.NotFoundException('Email non trouvé');
        }
        return { message: 'Email trouvé', email: user.email };
    }
    async resetPasswordDirect(email, password) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.NotFoundException('Utilisateur non trouvé');
        }
        const passwordHash = await bcrypt.hash(password, 10);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { passwordHash },
        });
        return { message: 'Mot de passe réinitialisé avec succès' };
    }
    sanitize(user) {
        const { passwordHash, resetPasswordToken, resetPasswordExpires, ...rest } = user;
        return rest;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map