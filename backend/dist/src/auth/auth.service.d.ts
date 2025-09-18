import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    private readonly emailService;
    constructor(prisma: PrismaService, jwt: JwtService, emailService: EmailService);
    register(params: {
        name?: string;
        email: string;
        phone?: string;
        password: string;
    }): Promise<{
        token: string;
        user: any;
    }>;
    login(params: {
        emailOrPhone: string;
        password: string;
    }): Promise<{
        token: string;
        user: any;
    }>;
    profile(userId: number): Promise<any>;
    forgotPassword(email: string): Promise<{
        message: string;
        resetUrl?: undefined;
    } | {
        message: string;
        resetUrl: string | undefined;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
    verifyResetToken(token: string): Promise<{
        valid: boolean;
        email: string;
    }>;
    checkEmail(email: string): Promise<{
        message: string;
        email: string;
    }>;
    resetPasswordDirect(email: string, password: string): Promise<{
        message: string;
    }>;
    private sanitize;
}
