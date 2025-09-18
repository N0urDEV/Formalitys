import { PrismaService } from '../prisma/prisma.service';
export declare class UploadsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private detectDocumentType;
    uploadFile(file: Express.Multer.File, req: any): Promise<{
        id: string;
        filename: string;
        originalName: string;
        documentType: string;
        size: number;
        mimetype: string;
        url: string;
        uploadedBy: any;
        uploadedByName: string;
        uploadedAt: string;
    }>;
    uploadMultipleFiles(files: Express.Multer.File[], req: any): Promise<{
        files: {
            id: string;
            filename: string;
            originalName: string;
            documentType: string;
            size: number;
            mimetype: string;
            url: string;
            uploadedBy: any;
            uploadedByName: string;
            uploadedAt: string;
        }[];
    }>;
}
