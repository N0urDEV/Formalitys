import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { DossiersModule } from '../dossiers/dossiers.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DossiersModule, UsersModule],
  providers: [PdfService],
  controllers: [PdfController],
  exports: [PdfService],
})
export class PdfModule {}
