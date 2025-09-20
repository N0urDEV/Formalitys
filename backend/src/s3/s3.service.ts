import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.bucketName = this.configService.get<string>('S3_BUCKET_NAME') || 'formalitys-uploads';
    
    const endpoint = this.configService.get<string>('S3_ENDPOINT');
    const region = this.configService.get<string>('S3_REGION') || 'us-east-1';
    const accessKeyId = this.configService.get<string>('S3_ACCESS_KEY');
    const secretAccessKey = this.configService.get<string>('S3_SECRET_KEY');

    if (!endpoint || !accessKeyId || !secretAccessKey) {
      throw new Error('Missing required S3 configuration');
    }
    
    this.s3Client = new S3Client({
      endpoint,
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: true, // Required for S3-compatible services
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    key: string,
    contentType?: string
  ): Promise<{ url: string; key: string }> {
    // Store objects as private (no public ACL). Admins will access via presigned URLs.
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: contentType || file.mimetype,
    });

    await this.s3Client.send(command);

    return {
      // This is the canonical object path; access should use presigned URLs.
      url: `${this.configService.get<string>('S3_ENDPOINT')}/${this.bucketName}/${key}`,
      key,
    };
  }

  async deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    await this.s3Client.send(command);
  }

  async getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    return await getSignedUrl(this.s3Client, command, { expiresIn });
  }

  generateKey(userName: string, documentType: string, originalName: string): string {
    const timestamp = Date.now();
    const randomSuffix = Math.round(Math.random() * 1e9);
    // We only accept PDFs; enforce a safe extension
    const fileExtension = 'pdf';
    const sanitizedUserName = userName.replace(/[^a-zA-Z0-9]/g, '_');
    
    return `uploads/${sanitizedUserName}/${documentType}/${timestamp}-${randomSuffix}.${fileExtension}`;
  }

  detectDocumentType(filename: string): string {
    const lowerFilename = filename.toLowerCase();
    
    if (lowerFilename.includes('cni') || lowerFilename.includes('carte_identite')) return 'cni';
    if (lowerFilename.includes('passport')) return 'passport';
    if (lowerFilename.includes('justificatif_domicile')) return 'justificatif_domicile';
    if (lowerFilename.includes('statut') || lowerFilename.includes('statuts')) return 'statuts';
    if (lowerFilename.includes('acte') || lowerFilename.includes('acte_constitution')) return 'acte_constitution';
    if (lowerFilename.includes('registre') || lowerFilename.includes('registre_commerce')) return 'registre_commerce';
    if (lowerFilename.includes('patente') || lowerFilename.includes('tp')) return 'patente_tp';
    if (lowerFilename.includes('cnss') || lowerFilename.includes('attestation_cnss')) return 'cnss';
    if (lowerFilename.includes('banque') || lowerFilename.includes('rib')) return 'rib';
    if (lowerFilename.includes('plan') || lowerFilename.includes('plan_localisation')) return 'plan_localisation';
    if (lowerFilename.includes('autorisation') || lowerFilename.includes('autorisation_exploitation')) return 'autorisation_exploitation';
    if (lowerFilename.includes('classement') || lowerFilename.includes('classement_touristique')) return 'classement_touristique';
    if (lowerFilename.includes('taxe') || lowerFilename.includes('taxe_sejour')) return 'taxe_sejour';
    if (lowerFilename.includes('police') || lowerFilename.includes('registre_police')) return 'registre_police';
    
    return 'autre';
  }
}
