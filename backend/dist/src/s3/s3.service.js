"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const config_1 = require("@nestjs/config");
let S3Service = class S3Service {
    configService;
    s3Client;
    bucketName;
    constructor(configService) {
        this.configService = configService;
        this.bucketName = this.configService.get('S3_BUCKET_NAME') || 'formalitys-uploads';
        const endpoint = this.configService.get('S3_ENDPOINT');
        const region = this.configService.get('S3_REGION') || 'us-east-1';
        const accessKeyId = this.configService.get('S3_ACCESS_KEY');
        const secretAccessKey = this.configService.get('S3_SECRET_KEY');
        if (!endpoint || !accessKeyId || !secretAccessKey) {
            throw new Error('Missing required S3 configuration');
        }
        this.s3Client = new client_s3_1.S3Client({
            endpoint,
            region,
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
            forcePathStyle: true,
        });
    }
    async uploadFile(file, key, contentType) {
        const command = new client_s3_1.PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: contentType || file.mimetype,
        });
        await this.s3Client.send(command);
        return {
            url: `${this.configService.get('S3_ENDPOINT')}/${this.bucketName}/${key}`,
            key,
        };
    }
    async deleteFile(key) {
        const command = new client_s3_1.DeleteObjectCommand({
            Bucket: this.bucketName,
            Key: key,
        });
        await this.s3Client.send(command);
    }
    async getSignedUrl(key, expiresIn = 3600) {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: this.bucketName,
            Key: key,
        });
        return await (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn });
    }
    generateKey(userName, documentType, originalName) {
        const timestamp = Date.now();
        const randomSuffix = Math.round(Math.random() * 1e9);
        const fileExtension = originalName.split('.').pop()?.toLowerCase() || 'file';
        const sanitizedUserName = userName.replace(/[^a-zA-Z0-9]/g, '_');
        return `uploads/${sanitizedUserName}/${documentType}/${timestamp}-${randomSuffix}.${fileExtension}`;
    }
    detectDocumentType(filename) {
        const lowerFilename = filename.toLowerCase();
        if (lowerFilename.includes('cni') || lowerFilename.includes('carte_identite'))
            return 'cni';
        if (lowerFilename.includes('passport'))
            return 'passport';
        if (lowerFilename.includes('justificatif_domicile'))
            return 'justificatif_domicile';
        if (lowerFilename.includes('statut') || lowerFilename.includes('statuts'))
            return 'statuts';
        if (lowerFilename.includes('acte') || lowerFilename.includes('acte_constitution'))
            return 'acte_constitution';
        if (lowerFilename.includes('registre') || lowerFilename.includes('registre_commerce'))
            return 'registre_commerce';
        if (lowerFilename.includes('patente') || lowerFilename.includes('tp'))
            return 'patente_tp';
        if (lowerFilename.includes('cnss') || lowerFilename.includes('attestation_cnss'))
            return 'cnss';
        if (lowerFilename.includes('banque') || lowerFilename.includes('rib'))
            return 'rib';
        if (lowerFilename.includes('plan') || lowerFilename.includes('plan_localisation'))
            return 'plan_localisation';
        if (lowerFilename.includes('autorisation') || lowerFilename.includes('autorisation_exploitation'))
            return 'autorisation_exploitation';
        if (lowerFilename.includes('classement') || lowerFilename.includes('classement_touristique'))
            return 'classement_touristique';
        if (lowerFilename.includes('taxe') || lowerFilename.includes('taxe_sejour'))
            return 'taxe_sejour';
        if (lowerFilename.includes('police') || lowerFilename.includes('registre_police'))
            return 'registre_police';
        return 'autre';
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], S3Service);
//# sourceMappingURL=s3.service.js.map