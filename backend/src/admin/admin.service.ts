import { Injectable, BadRequestException } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { PrismaService } from '../prisma/prisma.service';
import { DossierStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService, private readonly s3: S3Service) {}

  // Get all dossiers with files for admin dashboard
  async getAllDossiersWithFiles(page = 1, limit = 20, type?: 'company' | 'tourism', status?: DossierStatus) {
    const skip = (page - 1) * limit;
    
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

    // Process dossiers to include file information
    const processedCompanyDossiers = await Promise.all(companyDossiers.map(async dossier => ({
      ...dossier,
      type: 'company' as const,
      uploadedFiles: await Promise.all((Array.isArray(dossier.uploadedFiles) ? dossier.uploadedFiles : []).map(async (file: any) => ({
        id: file.id,
        filename: file.filename,
        originalName: file.originalName,
        documentType: file.documentType,
        size: file.size,
        mimetype: file.mimetype,
        url: await this.s3.getSignedUrl(file.key ?? file.url?.split(`${process.env.S3_BUCKET_NAME}/`)[1] ?? file.url, 60 * 15),
        uploadedAt: file.uploadedAt,
      }))),
    })));

    const processedTourismDossiers = await Promise.all(tourismDossiers.map(async dossier => ({
      ...dossier,
      type: 'tourism' as const,
      uploadedFiles: await Promise.all((Array.isArray(dossier.uploadedFiles) ? dossier.uploadedFiles : []).map(async (file: any) => ({
        id: file.id,
        filename: file.filename,
        originalName: file.originalName,
        documentType: file.documentType,
        size: file.size,
        mimetype: file.mimetype,
        url: await this.s3.getSignedUrl(file.key ?? file.url?.split(`${process.env.S3_BUCKET_NAME}/`)[1] ?? file.url, 60 * 15),
        uploadedAt: file.uploadedAt,
      }))),
    })));

    // Combine and sort all dossiers
    const allDossiers = [...processedCompanyDossiers, ...processedTourismDossiers]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

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

  // Dashboard Statistics
  async getDashboardStats() {
    const [
      totalUsers,
      totalCompanyDossiers,
      totalTourismDossiers,
      paidCompanyDossiers,
      paidTourismDossiers,
      completedCompanyDossiers,
      completedTourismDossiers,
      recentDossiers,
    ] = await Promise.all([
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

  // Company Dossiers Management
  async getCompanyDossiers(page = 1, limit = 20, status?: DossierStatus) {
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

  async getCompanyDossier(id: number) {
    return this.prisma.companyDossier.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
      },
    });
  }

  async getCompanyDossierWithFiles(id: number) {
    const dossier = await this.prisma.companyDossier.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
      },
    });

    if (!dossier) {
      return null;
    }

    // Extract uploaded files from dossier data
    const uploadedFiles = Array.isArray(dossier.uploadedFiles) ? dossier.uploadedFiles : [];
    
    return {
      ...dossier,
      uploadedFiles: uploadedFiles.map((file: any) => ({
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

  async updateCompanyDossierStatus(id: number, status: DossierStatus, notes?: string) {
    return this.prisma.companyDossier.update({
      where: { id },
      data: { status, updatedAt: new Date() },
    });
  }

  // Tourism Dossiers Management
  async getTourismDossiers(page = 1, limit = 20, status?: DossierStatus) {
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

  async getTourismDossier(id: number) {
    return this.prisma.tourismDossier.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
      },
    });
  }

  async getTourismDossierWithFiles(id: number) {
    const dossier = await this.prisma.tourismDossier.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
      },
    });

    if (!dossier) {
      return null;
    }

    // Extract uploaded files from dossier data
    const uploadedFiles = Array.isArray(dossier.uploadedFiles) ? dossier.uploadedFiles : [];
    
    return {
      ...dossier,
      uploadedFiles: uploadedFiles.map((file: any) => ({
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

  async updateTourismDossierStatus(id: number, status: DossierStatus, notes?: string) {
    return this.prisma.tourismDossier.update({
      where: { id },
      data: { status, updatedAt: new Date() },
    });
  }

  // Users Management
  async getUsers(page = 1, limit = 20, search?: string) {
    const skip = (page - 1) * limit;
    
    const where = {
      role: 'USER' as const,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { email: { contains: search, mode: 'insensitive' as const } },
          { phone: { contains: search, mode: 'insensitive' as const } },
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

  async getUser(id: number) {
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

  // Admin Management
  async createAdmin(data: { email: string; name: string; phone?: string; password: string }) {
    try {
      const { email, name, phone, password } = data;

      // Check if user already exists (any role)
      const existingUser = await this.prisma.user.findFirst({
        where: { 
          OR: [
            { email },
            ...(phone ? [{ phone }] : [])
          ]
        },
      });

      if (existingUser) {
        throw new BadRequestException('Un utilisateur avec cet email ou téléphone existe déjà');
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      // Create admin user
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
    } catch (error) {
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

  // User Management
  async updateUser(id: number, data: { email?: string; name?: string; phone?: string }) {
    try {
      const { email, name, phone } = data;

      // Check if user exists
      const existingUser = await this.prisma.user.findUnique({
        where: { id },
        select: { id: true, role: true }
      });

      if (!existingUser) {
        throw new BadRequestException('Utilisateur non trouvé');
      }

      // Check for duplicate email/phone if they're being updated
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
          throw new BadRequestException('Un utilisateur avec cet email ou téléphone existe déjà');
        }
      }

      // Update user
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
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async deleteUser(id: number) {
    try {
      // Check if user exists
      const existingUser = await this.prisma.user.findUnique({
        where: { id },
        select: { id: true, role: true }
      });

      if (!existingUser) {
        throw new BadRequestException('Utilisateur non trouvé');
      }

      // Prevent deletion of admin users
      if (existingUser.role === 'ADMIN') {
        throw new BadRequestException('Impossible de supprimer un administrateur');
      }

      // Check if user has any dossiers
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
        throw new BadRequestException('Impossible de supprimer un utilisateur avec des dossiers existants');
      }

      // Delete user
      await this.prisma.user.delete({
        where: { id }
      });

      return { message: 'Utilisateur supprimé avec succès' };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Admin Management
  async updateAdmin(id: number, data: { email?: string; name?: string; phone?: string }) {
    try {
      const { email, name, phone } = data;

      // Check if admin exists
      const existingAdmin = await this.prisma.user.findUnique({
        where: { id },
        select: { id: true, role: true }
      });

      if (!existingAdmin || existingAdmin.role !== 'ADMIN') {
        throw new BadRequestException('Administrateur non trouvé');
      }

      // Check for duplicate email/phone if they're being updated
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
          throw new BadRequestException('Un utilisateur avec cet email ou téléphone existe déjà');
        }
      }

      // Update admin
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
    } catch (error) {
      console.error('Error updating admin:', error);
      throw error;
    }
  }

  async deleteAdmin(id: number) {
    try {
      // Check if admin exists
      const existingAdmin = await this.prisma.user.findUnique({
        where: { id },
        select: { id: true, role: true }
      });

      if (!existingAdmin || existingAdmin.role !== 'ADMIN') {
        throw new BadRequestException('Administrateur non trouvé');
      }

      // Check if this is the last admin
      const adminCount = await this.prisma.user.count({
        where: { role: 'ADMIN' }
      });

      if (adminCount <= 1) {
        throw new BadRequestException('Impossible de supprimer le dernier administrateur');
      }

      // Delete admin
      await this.prisma.user.delete({
        where: { id }
      });

      return { message: 'Administrateur supprimé avec succès' };
    } catch (error) {
      console.error('Error deleting admin:', error);
      throw error;
    }
  }
}
