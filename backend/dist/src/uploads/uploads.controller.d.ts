import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../s3/s3.service';
export declare class UploadsController {
    private readonly prisma;
    private readonly s3Service;
    constructor(prisma: PrismaService, s3Service: S3Service);
    uploadFile(file: Express.Multer.File, req: any, body: any): Promise<{
        id: string;
        filename: string | undefined;
        originalName: string;
        documentType: any;
        size: number;
        mimetype: string;
        url: string;
        key: string;
        uploadedBy: any;
        uploadedByName: string;
        uploadedAt: string;
    }>;
    uploadMultipleFiles(files: Express.Multer.File[], req: any, body: any): Promise<{
        files: {
            id: string;
            filename: string | undefined;
            originalName: string;
            documentType: any;
            size: number;
            mimetype: string;
            url: string;
            key: string;
            uploadedBy: any;
            uploadedByName: string;
            uploadedAt: string;
        }[];
    }>;
    getFile(key: string): Promise<{
        url: string;
    }>;
    deleteFile(key: string): Promise<{
        message: string;
    }>;
}
