import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { DossiersService } from './dossiers.service';
import { DossiersController } from './dossiers.controller';

@Module({
  imports: [PrismaModule],
  providers: [DossiersService],
  controllers: [DossiersController],
  exports: [DossiersService],
})
export class DossiersModule {}
