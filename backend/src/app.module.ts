import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DossiersModule } from './dossiers/dossiers.module';
import { UploadsModule } from './uploads/uploads.module';
import { PaymentsModule } from './payments/payments.module';
import { AdminModule } from './admin/admin.module';
import { BlogModule } from './blog/blog.module';
import { DiscountModule } from './discount/discount.module';
import { EmailModule } from './email/email.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, DossiersModule, UploadsModule, PaymentsModule, AdminModule, BlogModule, DiscountModule, EmailModule, S3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
