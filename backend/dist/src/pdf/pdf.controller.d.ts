import { PdfService } from './pdf.service';
import { DossiersService } from '../dossiers/dossiers.service';
import { UsersService } from '../users/users.service';
import type { Response } from 'express';
export declare class PdfController {
    private readonly pdfService;
    private readonly dossiersService;
    private readonly usersService;
    constructor(pdfService: PdfService, dossiersService: DossiersService, usersService: UsersService);
    generateCompanyDossierPdf(id: string, req: any, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    generateTourismDossierPdf(id: string, req: any, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
