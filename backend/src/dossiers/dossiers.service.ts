import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DossierStatus } from '@prisma/client';

@Injectable()
export class DossiersService {
  constructor(private readonly prisma: PrismaService) {}

  // Company Dossiers
  async createCompanyDossier(userId: number) {
    console.log(`Creating company dossier for user ${userId} at ${new Date().toISOString()}`);
    return this.prisma.companyDossier.create({
      data: { userId, status: DossierStatus.DRAFT, currentStep: 1 },
    });
  }

  async getCompanyDossiers(userId: number) {
    return this.prisma.companyDossier.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCompanyDossier(id: number, userId: number) {
    const dossier = await this.prisma.companyDossier.findUnique({ where: { id } });
    if (!dossier) throw new NotFoundException('Dossier not found');
    if (dossier.userId !== userId) throw new ForbiddenException('Access denied');
    return dossier;
  }

  async updateCompanyDossier(id: number, userId: number, data: any) {
    const dossier = await this.getCompanyDossier(id, userId); // Check ownership
    
    // Preserve uploadedFiles if not being updated
    const updateData = { ...data, updatedAt: new Date() };
    if (data.uploadedFiles === undefined && dossier.uploadedFiles) {
      updateData.uploadedFiles = dossier.uploadedFiles;
    }
    
    return this.prisma.companyDossier.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteCompanyDossier(id: number, userId: number) {
    const dossier = await this.getCompanyDossier(id, userId); // Check ownership
    return this.prisma.companyDossier.delete({
      where: { id },
    });
  }

  // Tourism Dossiers
  async createTourismDossier(userId: number) {
    console.log(`Creating tourism dossier for user ${userId} at ${new Date().toISOString()}`);
    return this.prisma.tourismDossier.create({
      data: { userId, status: DossierStatus.DRAFT, currentStep: 1 },
    });
  }

  async getTourismDossiers(userId: number) {
    return this.prisma.tourismDossier.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTourismDossier(id: number, userId: number) {
    const dossier = await this.prisma.tourismDossier.findUnique({ where: { id } });
    if (!dossier) throw new NotFoundException('Dossier not found');
    if (dossier.userId !== userId) throw new ForbiddenException('Access denied');
    return dossier;
  }

  async updateTourismDossier(id: number, userId: number, data: any) {
    const dossier = await this.getTourismDossier(id, userId); // Check ownership
    
    // Preserve uploadedFiles and uploadedPhotos if not being updated
    const updateData = { ...data, updatedAt: new Date() };
    if (data.uploadedFiles === undefined && dossier.uploadedFiles) {
      updateData.uploadedFiles = dossier.uploadedFiles;
    }
    if (data.uploadedPhotos === undefined && dossier.uploadedPhotos) {
      updateData.uploadedPhotos = dossier.uploadedPhotos;
    }
    
    return this.prisma.tourismDossier.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteTourismDossier(id: number, userId: number) {
    const dossier = await this.getTourismDossier(id, userId); // Check ownership
    return this.prisma.tourismDossier.delete({
      where: { id },
    });
  }
}
