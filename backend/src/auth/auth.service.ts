import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService, 
    private readonly jwt: JwtService,
    private readonly emailService: EmailService
  ) {}

  async register(params: { name?: string; email: string; phone?: string; password: string }) {
    const { name, email, phone, password } = params;

    const existing = await this.prisma.user.findFirst({
      where: { OR: [{ email }, ...(phone ? [{ phone }] : [])] },
    });
    if (existing) throw new BadRequestException('Email or phone already in use');

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({ data: { name, email, phone, passwordHash } });

    // Welcome email disabled by request

    const token = await this.jwt.signAsync({ sub: user.id, email: user.email });
    return { token, user: this.sanitize(user) };
  }

  async login(params: { emailOrPhone: string; password: string }) {
    const { emailOrPhone, password } = params;

    const user = await this.prisma.user.findFirst({
      where: { OR: [{ email: emailOrPhone }, { phone: emailOrPhone }] },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    const token = await this.jwt.signAsync({ sub: user.id, email: user.email });
    return { token, user: this.sanitize(user) };
  }

  async profile(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException();
    return this.sanitize(user);
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Don't reveal if email exists or not for security
      return { message: 'Si cet email existe, vous recevrez un lien de réinitialisation' };
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetExpires,
      },
    });

    // Send password reset email
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    try {
      await this.emailService.sendPasswordResetEmail(email, resetUrl, user.name || 'Utilisateur');
      console.log(`Password reset email sent to ${email}`);
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      // Still return success message for security
    }
    
    return { 
      message: 'Si cet email existe, vous recevrez un lien de réinitialisation',
      // Show URL in development for testing
      resetUrl: process.env.NODE_ENV === 'development' ? resetUrl : undefined
    };
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { gt: new Date() },
      },
    });

    if (!user) {
      throw new BadRequestException('Token invalide ou expiré');
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

  async verifyResetToken(token: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { gt: new Date() },
      },
    });

    if (!user) {
      throw new BadRequestException('Token invalide ou expiré');
    }

    return { valid: true, email: user.email };
  }

  async checkEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      throw new NotFoundException('Email non trouvé');
    }
    
    return { message: 'Email trouvé', email: user.email };
  }

  async resetPasswordDirect(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    
    const passwordHash = await bcrypt.hash(password, 10);
    
    await this.prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    });
    
    return { message: 'Mot de passe réinitialisé avec succès' };
  }

  private sanitize(user: any) {
    const { passwordHash, resetPasswordToken, resetPasswordExpires, ...rest } = user;
    return rest;
  }
}


