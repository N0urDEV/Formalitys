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
      fileFilter: (_req, file, cb) => {
        // Allow only PDFs by MIME and extension as a defense-in-depth
        const isPdfMime = file.mimetype === 'application/pdf';
        const isPdfExt = extname(file.originalname).toLowerCase() === '.pdf';
        if (!isPdfMime || !isPdfExt) {
          return cb(new Error('Only PDF files are allowed'), false);
        }
        cb(null, true);
      },
    }),
  ],
  controllers: [UploadsController],
})
export class UploadsModule {}