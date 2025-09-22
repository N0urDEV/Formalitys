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
        // Allow both PDFs and images - validation will be done in the controller
        const allowedTypes = [
          'application/pdf',
          'image/jpeg',
          'image/jpg', 
          'image/png',
          'image/gif',
          'image/webp'
        ];
        
        const allowedExts = ['.pdf', '.jpg', '.jpeg', '.png', '.gif', '.webp'];
        
        const isValidMime = allowedTypes.includes(file.mimetype);
        const isValidExt = allowedExts.includes(extname(file.originalname).toLowerCase());
        
        if (!isValidMime || !isValidExt) {
          return cb(new Error('Only PDF and image files are allowed'), false);
        }
        
        cb(null, true);
      },
    }),
  ],
  controllers: [UploadsController],
})
export class UploadsModule {}