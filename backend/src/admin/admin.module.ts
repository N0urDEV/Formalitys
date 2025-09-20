import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { S3Module } from '../s3/s3.module';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [PrismaModule, S3Module],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
