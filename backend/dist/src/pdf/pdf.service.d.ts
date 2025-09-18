export declare class PdfService {
    generateCompanyDossierPdf(dossierData: any): Promise<Uint8Array>;
    generateTourismDossierPdf(dossierData: any): Promise<Uint8Array>;
    private generateCompanyDossierHtml;
    private generateTourismDossierHtml;
}
