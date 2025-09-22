import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { extname } from 'path';
import { PrismaModule } from '../prisma/prisma.module';
import { S3Module } from '../s3/s3.module';
import { UploadsController } from './uploads.controller';

@Module({
  imports: [
    PrismaModule,
    S3Module,
    MulterModule.register({
      storage: memoryStorage(), // Use memory storage for S3 uploads
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
      fileFilter: (req, file, cb) => {
        // Get document type from request body
        const documentType = req.body?.documentType || 'autre';
        
        if (documentType === 'blog_image') {
          // Allow images for blog posts
          const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
          const allowedImageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
          
          const isImageMime = allowedImageTypes.includes(file.mimetype);
          const isImageExt = allowedImageExts.includes(extname(file.originalname).toLowerCase());
          
          if (!isImageMime || !isImageExt) {
            return cb(new Error('Only image files (JPG, PNG, GIF, WebP) are allowed for blog images'), false);
          }
        } else {
          // For other document types, only allow PDFs
          const isPdfMime = file.mimetype === 'application/pdf';
          const isPdfExt = extname(file.originalname).toLowerCase() === '.pdf';
          if (!isPdfMime || !isPdfExt) {
            return cb(new Error('Only PDF files are allowed'), false);
          }
        }
        cb(null, true);
      },
    }),
  ],
  controllers: [UploadsController],
})
export class UploadsModule {}