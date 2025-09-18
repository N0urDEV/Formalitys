import { Body, Controller, Get, Post, Put, Delete, Param, Req, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DossiersService } from './dossiers.service';

@Controller('dossiers')
@UseGuards(AuthGuard('jwt'))
export class DossiersController {
  constructor(private readonly dossiersService: DossiersService) {}

  // Company Dossiers
  @Post('company')
  createCompanyDossier(@Req() req: any) {
    return this.dossiersService.createCompanyDossier(req.user.userId);
  }

  @Get('company')
  getCompanyDossiers(@Req() req: any) {
    return this.dossiersService.getCompanyDossiers(req.user.userId);
  }

  @Get('company/:id')
  getCompanyDossier(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.dossiersService.getCompanyDossier(id, req.user.userId);
  }

  @Put('company/:id')
  updateCompanyDossier(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: any,
    @Req() req: any,
  ) {
    return this.dossiersService.updateCompanyDossier(id, req.user.userId, data);
  }

  @Delete('company/:id')
  deleteCompanyDossier(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ) {
    return this.dossiersService.deleteCompanyDossier(id, req.user.userId);
  }

  // Tourism Dossiers
  @Post('tourism')
  createTourismDossier(@Req() req: any) {
    return this.dossiersService.createTourismDossier(req.user.userId);
  }

  @Get('tourism')
  getTourismDossiers(@Req() req: any) {
    return this.dossiersService.getTourismDossiers(req.user.userId);
  }

  @Get('tourism/:id')
  getTourismDossier(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.dossiersService.getTourismDossier(id, req.user.userId);
  }

  @Put('tourism/:id')
  updateTourismDossier(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: any,
    @Req() req: any,
  ) {
    return this.dossiersService.updateTourismDossier(id, req.user.userId, data);
  }

  @Delete('tourism/:id')
  deleteTourismDossier(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ) {
    return this.dossiersService.deleteTourismDossier(id, req.user.userId);
  }
}
