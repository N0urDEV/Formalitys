import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors, UseGuards, BadRequestException, Req, Get, Param, Delete, Body } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../s3/s3.service';

@Controller('uploads')
@UseGuards(AuthGuard('jwt'))
export class UploadsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}


  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: any, @Body() body: any) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    
          // Validate file type - only PDF files allowed
          const allowedTypes = [
            'application/pdf'
          ];
    
          if (!allowedTypes.includes(file.mimetype)) {
            throw new BadRequestException('Seuls les fichiers PDF sont acceptés');
          }
    
    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      throw new BadRequestException('File too large (max 10MB)');
    }

    // Get user information
    const user = await this.prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { name: true, email: true }
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const userName = user.name || user.email.split('@')[0];
    const documentType = (body?.documentType || 'autre').toString();
    const key = this.s3Service.generateKey(userName, documentType, file.originalname);
    
    const uploadResult = await this.s3Service.uploadFile(file, key);
    
    return {
      id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      filename: key.split('/').pop(),
      originalName: file.originalname,
      documentType: documentType,
      size: file.size,
      mimetype: file.mimetype,
      url: uploadResult.url,
      key: uploadResult.key,
      uploadedBy: req.user.userId,
      uploadedByName: user.name || user.email,
      uploadedAt: new Date().toISOString(),
    };
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[], @Req() req: any, @Body() body: any) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    // Get user information once
    const user = await this.prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { name: true, email: true }
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const userName = user.name || user.email.split('@')[0];
    const documentType = body.documentType || 'autre'; // Use provided document type or default to 'autre'
    
    const results = await Promise.all(files.map(async (file) => {
          // Validate file type - only PDF files allowed
          const allowedTypes = [
            'application/pdf'
          ];
      
            if (!allowedTypes.includes(file.mimetype)) {
              throw new BadRequestException(`Seuls les fichiers PDF sont acceptés: ${file.originalname}`);
            }
      
      if (file.size > 10 * 1024 * 1024) {
        throw new BadRequestException(`File too large: ${file.originalname} (max 10MB)`);
      }

      const key = this.s3Service.generateKey(userName, documentType, file.originalname);
      
      const uploadResult = await this.s3Service.uploadFile(file, key);
      
      return {
        id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        filename: key.split('/').pop(),
        originalName: file.originalname,
        documentType: documentType,
        size: file.size,
        mimetype: file.mimetype,
        url: uploadResult.url,
        key: uploadResult.key,
        uploadedBy: req.user.userId,
        uploadedByName: user.name || user.email,
        uploadedAt: new Date().toISOString(),
      };
    }));
    
    return { files: results };
  }

  @Get('file/:key')
  async getFile(@Param('key') key: string) {
    try {
      const signedUrl = await this.s3Service.getSignedUrl(key);
      return { url: signedUrl };
    } catch (error) {
      throw new BadRequestException('File not found');
    }
  }

  @Delete('file/:key')
  async deleteFile(@Param('key') key: string) {
    try {
      await this.s3Service.deleteFile(key);
      return { message: 'File deleted successfully' };
    } catch (error) {
      throw new BadRequestException('Failed to delete file');
    }
  }
}