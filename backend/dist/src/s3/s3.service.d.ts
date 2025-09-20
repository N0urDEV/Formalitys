import { ConfigService } from '@nestjs/config';
export declare class S3Service {
    private configService;
    private s3Client;
    private bucketName;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File, key: string, contentType?: string): Promise<{
        url: string;
        key: string;
    }>;
    deleteFile(key: string): Promise<void>;
    getSignedUrl(key: string, expiresIn?: number): Promise<string>;
    generateKey(userName: string, documentType: string, originalName: string): string;
    detectDocumentType(filename: string): string;
}
