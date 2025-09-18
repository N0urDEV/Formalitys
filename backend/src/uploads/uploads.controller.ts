import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors, UseGuards, BadRequestException, Req } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { rename } from 'fs';
import { join } from 'path';
import { promisify } from 'util';

const renameAsync = promisify(rename);

@Controller('uploads')
@UseGuards(AuthGuard('jwt'))
export class UploadsController {
  constructor(private readonly prisma: PrismaService) {}

  private detectDocumentType(originalName: string): string {
    const name = originalName.toLowerCase();
    
    // Common document type patterns
    const patterns = {
      'cni': ['cni', 'carte_identite', 'carte identite', 'identite', 'id_card', 'identity'],
      'passport': ['passport', 'passeport'],
      'attestation': ['attestation', 'certificate', 'certificat'],
      'contrat': ['contrat', 'contract', 'convention'],
      'facture': ['facture', 'invoice', 'bill'],
      'justificatif': ['justificatif', 'proof', 'evidence', 'justification'],
      'photo': ['photo', 'image', 'picture', 'img'],
      'rib': ['rib', 'releve', 'bank_statement', 'extrait_compte'],
      'kbis': ['kbis', 'extrait_kbis', 'extrait kbis'],
      'statut': ['statut', 'statutes', 'reglement'],
      'acte': ['acte', 'deed', 'acte_notarie'],
      'procuration': ['procuration', 'power_of_attorney', 'mandat'],
      'declaration': ['declaration', 'declaration_fiscale', 'tax_declaration'],
      'avis': ['avis', 'notice', 'notification'],
      'releve': ['releve', 'statement', 'extrait'],
      'quittance': ['quittance', 'receipt', 'quittances'],
      'bail': ['bail', 'lease', 'rental_agreement'],
      'plan': ['plan', 'blueprint', 'schema', 'drawing'],
      'autorisation': ['autorisation', 'authorization', 'permit', 'license'],
      'certificat': ['certificat', 'certificate', 'cert'],
      'diplome': ['diplome', 'diploma', 'degree'],
      'cv': ['cv', 'resume', 'curriculum'],
      'lettre': ['lettre', 'letter', 'correspondance'],
      'rapport': ['rapport', 'report'],
      'proces_verbal': ['proces_verbal', 'minutes', 'pv'],
      'decision': ['decision', 'judgment', 'ruling'],
      'jugement': ['jugement', 'judgment', 'court_order'],
      'arrete': ['arrete', 'decree', 'order'],
      'arrete_prefectoral': ['arrete_prefectoral', 'prefectoral_order'],
      'arrete_municipal': ['arrete_municipal', 'municipal_order'],
      'permis': ['permis', 'permit', 'license'],
      'autorisation_exploitation': ['autorisation_exploitation', 'operating_permit'],
      'carte_professionnelle': ['carte_professionnelle', 'professional_card'],
      'registre_commerce': ['registre_commerce', 'trade_register'],
      'patente': ['patente', 'patent', 'tax_license'],
      'cnss': ['cnss', 'social_security'],
      'ice': ['ice', 'identifiant_commun_entreprise'],
      'rc': ['rc', 'registre_commerce'],
      'if': ['if', 'identifiant_fiscal'],
      'tp': ['tp', 'taxe_professionnelle'],
      'tsc': ['tsc', 'taxe_services_communaux'],
      'autre': ['autre', 'other', 'divers', 'misc']
    };

    // Check for exact matches first
    for (const [type, keywords] of Object.entries(patterns)) {
      for (const keyword of keywords) {
        if (name.includes(keyword)) {
          return type;
        }
      }
    }

    // If no pattern matches, return 'document'
    return 'document';
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    
    // Validate file type
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('File type not allowed');
    }
    
    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      throw new BadRequestException('File too large (max 10MB)');
    }

    // Get user information
    const user = await this.prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { name: true, email: true }
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Create user-friendly filename with document type detection
    const userName = user.name || user.email.split('@')[0];
    const sanitizedUserName = userName.replace(/[^a-zA-Z0-9]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split('.').pop();
    
    // Detect document type based on filename patterns
    const documentType = this.detectDocumentType(file.originalname);
    const newFilename = `${sanitizedUserName}-${documentType}-${uniqueSuffix}.${fileExtension}`;

    // Rename the file
    const oldPath = join('./uploads', file.filename);
    const newPath = join('./uploads', newFilename);
    
    try {
      await renameAsync(oldPath, newPath);
    } catch (error) {
      console.error('Error renaming file:', error);
      // Continue with original filename if rename fails
    }

    const finalFilename = newFilename;
    
    return {
      id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      filename: finalFilename,
      originalName: file.originalname,
      documentType: documentType,
      size: file.size,
      mimetype: file.mimetype,
      url: `/uploads/${finalFilename}`,
      uploadedBy: req.user.userId,
      uploadedByName: user.name || user.email,
      uploadedAt: new Date().toISOString(),
    };
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[], @Req() req: any) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    // Get user information once
    const user = await this.prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { name: true, email: true }
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const userName = user.name || user.email.split('@')[0];
    const sanitizedUserName = userName.replace(/[^a-zA-Z0-9]/g, '_');
    
    const results = await Promise.all(files.map(async (file) => {
      // Same validation as single file
      const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.mimetype)) {
        throw new BadRequestException(`File type not allowed: ${file.originalname}`);
      }
      
      if (file.size > 10 * 1024 * 1024) {
        throw new BadRequestException(`File too large: ${file.originalname} (max 10MB)`);
      }

      // Create user-friendly filename with document type detection
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileExtension = file.originalname.split('.').pop();
      const documentType = this.detectDocumentType(file.originalname);
      const newFilename = `${sanitizedUserName}-${documentType}-${uniqueSuffix}.${fileExtension}`;

      // Rename the file
      const oldPath = join('./uploads', file.filename);
      const newPath = join('./uploads', newFilename);
      
      try {
        await renameAsync(oldPath, newPath);
      } catch (error) {
        console.error('Error renaming file:', error);
        // Continue with original filename if rename fails
      }

      const finalFilename = newFilename;
      
      return {
        id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        filename: finalFilename,
        originalName: file.originalname,
        documentType: documentType,
        size: file.size,
        mimetype: file.mimetype,
        url: `/uploads/${finalFilename}`,
        uploadedBy: req.user.userId,
        uploadedByName: user.name || user.email,
        uploadedAt: new Date().toISOString(),
      };
    }));
    
    return { files: results };
  }
}