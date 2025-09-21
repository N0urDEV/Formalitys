import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { CompanyDossierPDF } from '../components/pdf/CompanyDossierPDF';
import { TourismDossierPDF } from '../components/pdf/TourismDossierPDF';

export interface UserData {
  name: string;
  email: string;
  phone: string;
}

export interface CompanyDossierData {
  id: number;
  companyName: string;
  headquarters: string;
  capital: number;
  selectedBank: string;
  activities: string[];
  proposedNames: string[];
  associates: any[];
  // Additional company information
  raisonSociale?: string;
  formeJuridique?: string;
  nationalite?: string;
  adresseSiege?: string;
  villeSiege?: string;
  professionActivite?: string;
  telephone?: string;
  fax?: string;
  email?: string;
  numeroArticleTaxeProfessionnelle?: string;
  numeroArticleTaxeServicesCommunaux?: string;
  numeroAffiliationCNSS?: string;
  numeroRegistreCommerce?: string;
  villeRegistreCommerce?: string;
  referenceDepotDeclaration?: string;
  dateDepotDeclaration?: string;
  // Payment information
  amountPaid?: number;
  originalPrice?: number;
  discountApplied?: number;
  finalPrice?: number;
  discountReason?: string;
  createdAt: string;
  status: string;
}

export interface TourismDossierData {
  id: number;
  establishmentName: string;
  establishmentType: string;
  address: string;
  city: string;
  capacity: number;
  ownerInfo: any;
  establishmentInfo?: any;
  complianceAnswers?: any;
  // Payment information
  amountPaid?: number;
  originalPrice?: number;
  discountApplied?: number;
  finalPrice?: number;
  discountReason?: string;
  createdAt: string;
  status: string;
}

export class PDFService {
  static async generateCompanyDossierPDF(user: UserData, dossier: CompanyDossierData): Promise<Blob> {
    const doc = <CompanyDossierPDF user={user} dossier={dossier} />;
    const asPdf = pdf(doc);
    const blob = await asPdf.toBlob();
    return blob;
  }

  static async generateTourismDossierPDF(user: UserData, dossier: TourismDossierData): Promise<Blob> {
    const doc = <TourismDossierPDF user={user} dossier={dossier} />;
    const asPdf = pdf(doc);
    const blob = await asPdf.toBlob();
    return blob;
  }

  static downloadPDF(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  static async generateAndDownloadCompanyDossier(user: UserData, dossier: CompanyDossierData): Promise<void> {
    try {
      console.log('Generating company dossier PDF...', { user, dossier });
      const blob = await this.generateCompanyDossierPDF(user, dossier);
      console.log('PDF blob generated:', blob);
      const filename = `dossier-creation-societe-${dossier.id}.pdf`;
      this.downloadPDF(blob, filename);
      console.log('PDF download initiated');
    } catch (error) {
      console.error('Error generating company dossier PDF:', error);
      throw new Error('Erreur lors de la génération du PDF');
    }
  }

  static async generateAndDownloadTourismDossier(user: UserData, dossier: TourismDossierData): Promise<void> {
    try {
      const blob = await this.generateTourismDossierPDF(user, dossier);
      const filename = `dossier-tourisme-${dossier.id}.pdf`;
      this.downloadPDF(blob, filename);
    } catch (error) {
      console.error('Error generating tourism dossier PDF:', error);
      throw new Error('Erreur lors de la génération du PDF');
    }
  }
}
