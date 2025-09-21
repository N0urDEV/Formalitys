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
    
    // Start with basic fields (excluding companyData)
    const updateData: any = {
      currentStep: data.currentStep,
      updatedAt: new Date()
    };
    
    // Check if dossier is completed (all 5 steps done)
    if (data.currentStep >= 5) {
      updateData.status = 'COMPLETED';
    }
    
    // If companyData is provided, extract and map the fields
    if (data.companyData) {
      const companyData = data.companyData;
      updateData.companyName = companyData.companyName;
      updateData.activities = companyData.activities;
      updateData.proposedNames = companyData.proposedNames;
      updateData.headquarters = companyData.headquarters;
      updateData.capital = companyData.capital;
      updateData.selectedBank = companyData.selectedBank;
      updateData.raisonSociale = companyData.raisonSociale;
      updateData.formeJuridique = companyData.formeJuridique;
      updateData.nationalite = companyData.nationalite;
      updateData.adresseSiege = companyData.adresseSiege;
      updateData.villeSiege = companyData.villeSiege;
      updateData.professionActivite = companyData.professionActivite;
      updateData.telephone = companyData.telephone;
      updateData.fax = companyData.fax;
      updateData.email = companyData.email;
      updateData.numeroArticleTaxeProfessionnelle = companyData.numeroArticleTaxeProfessionnelle;
      updateData.numeroArticleTaxeServicesCommunaux = companyData.numeroArticleTaxeServicesCommunaux;
      updateData.numeroAffiliationCNSS = companyData.numeroAffiliationCNSS;
      updateData.numeroRegistreCommerce = companyData.numeroRegistreCommerce;
      updateData.villeRegistreCommerce = companyData.villeRegistreCommerce;
      updateData.referenceDepotDeclaration = companyData.referenceDepotDeclaration;
      updateData.dateDepotDeclaration = companyData.dateDepotDeclaration;
    }
    
    // Handle associates if provided
    if (data.associates) {
      updateData.associates = data.associates;
    }
    
    // Preserve uploadedFiles if not being updated
    if (data.uploadedFiles === undefined && dossier.uploadedFiles) {
      updateData.uploadedFiles = dossier.uploadedFiles;
    } else if (data.uploadedFiles) {
      console.log('Updating uploadedFiles for company dossier:', data.uploadedFiles);
      updateData.uploadedFiles = data.uploadedFiles;
    }
    
    console.log('Updating company dossier with data:', updateData);
    console.log('Uploaded files in update data:', updateData.uploadedFiles);
    
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
    } else if (data.uploadedFiles) {
      console.log('Updating uploadedFiles for tourism dossier:', data.uploadedFiles);
      updateData.uploadedFiles = data.uploadedFiles;
    }
    if (data.uploadedPhotos === undefined && dossier.uploadedPhotos) {
      updateData.uploadedPhotos = dossier.uploadedPhotos;
    }
    
    console.log('Updating tourism dossier with data:', updateData);
    console.log('Uploaded files in update data:', updateData.uploadedFiles);
    
    // Check if dossier is completed (all 6 steps done)
    if (data.currentStep >= 6) {
      updateData.status = 'COMPLETED';
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
