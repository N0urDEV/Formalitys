import { Controller, Get, Param, Req, UseGuards, Res } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PdfService } from './pdf.service';
import { DossiersService } from '../dossiers/dossiers.service';
import { UsersService } from '../users/users.service';
import type { Response } from 'express';

@Controller('pdf')
@UseGuards(JwtAuthGuard)
export class PdfController {
  constructor(
    private readonly pdfService: PdfService,
    private readonly dossiersService: DossiersService,
    private readonly usersService: UsersService,
  ) {}

  @Get('company/:id')
  async generateCompanyDossierPdf(
    @Param('id') id: string,
    @Req() req: any,
    @Res() res: Response,
  ) {
    try {
      const dossierId = parseInt(id);
      const userId = req.user.userId;

      // Get dossier and user data
      const dossier = await this.dossiersService.getCompanyDossier(dossierId, userId);
      const user = await this.usersService.findById(userId);

      if (!dossier || !user) {
        return res.status(404).json({ message: 'Dossier ou utilisateur non trouvé' });
      }

      // Generate PDF
      const pdfBuffer = await this.pdfService.generateCompanyDossierPdf({
        user,
        dossier,
      });

      // Set response headers
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="dossier-creation-societe-${dossierId}.pdf"`,
        'Content-Length': pdfBuffer.length,
      });

      // Send PDF
      res.send(pdfBuffer);
    } catch (error) {
      console.error('Error generating company dossier PDF:', error);
      res.status(500).json({ message: 'Erreur lors de la génération du PDF' });
    }
  }

  @Get('tourism/:id')
  async generateTourismDossierPdf(
    @Param('id') id: string,
    @Req() req: any,
    @Res() res: Response,
  ) {
    try {
      const dossierId = parseInt(id);
      const userId = req.user.userId;

      // Get dossier and user data
      const dossier = await this.dossiersService.getTourismDossier(dossierId, userId);
      const user = await this.usersService.findById(userId);

      if (!dossier || !user) {
        return res.status(404).json({ message: 'Dossier ou utilisateur non trouvé' });
      }

      // Generate PDF
      const pdfBuffer = await this.pdfService.generateTourismDossierPdf({
        user,
        dossier,
      });

      // Set response headers
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="dossier-tourisme-${dossierId}.pdf"`,
        'Content-Length': pdfBuffer.length,
      });

      // Send PDF
      res.send(pdfBuffer);
    } catch (error) {
      console.error('Error generating tourism dossier PDF:', error);
      res.status(500).json({ message: 'Erreur lors de la génération du PDF' });
    }
  }
}
