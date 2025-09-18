import { Controller, Get, Put, Param, Query, Body, UseGuards, ParseIntPipe, Post, UsePipes, ValidationPipe, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from './admin.guard';
import { AdminService } from './admin.service';
import { DossierStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString, IsEmail, IsNotEmpty } from 'class-validator';

class UpdateDossierStatusDto {
  @IsEnum(DossierStatus)
  status!: DossierStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CreateAdminDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}

class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}

class UpdateAdminDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}

@Controller('admin')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  // Company Dossiers
  @Get('company-dossiers')
  getCompanyDossiers(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('status') status?: DossierStatus,
  ) {
    return this.adminService.getCompanyDossiers(+page, +limit, status);
  }

  @Get('company-dossiers/:id')
  getCompanyDossier(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getCompanyDossier(id);
  }

  @Put('company-dossiers/:id/status')
  updateCompanyDossierStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDossierStatusDto,
  ) {
    return this.adminService.updateCompanyDossierStatus(id, dto.status, dto.notes);
  }

  // Tourism Dossiers
  @Get('tourism-dossiers')
  getTourismDossiers(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('status') status?: DossierStatus,
  ) {
    return this.adminService.getTourismDossiers(+page, +limit, status);
  }

  @Get('tourism-dossiers/:id')
  getTourismDossier(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getTourismDossier(id);
  }

  @Put('tourism-dossiers/:id/status')
  updateTourismDossierStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDossierStatusDto,
  ) {
    return this.adminService.updateTourismDossierStatus(id, dto.status, dto.notes);
  }

  // Users Management
  @Get('users')
  getUsers(
    @Query('page') page = 1, 
    @Query('limit') limit = 20,
    @Query('search') search?: string
  ) {
    return this.adminService.getUsers(+page, +limit, search);
  }

  @Get('users/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getUser(id);
  }

  @Put('users/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.adminService.updateUser(id, dto);
  }

  @Delete('users/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteUser(id);
  }

  // Admin Management
  @Post('create-admin')
  @UsePipes(new ValidationPipe({ transform: true }))
  createAdmin(@Body() dto: CreateAdminDto) {
    return this.adminService.createAdmin(dto);
  }

  @Get('admins')
  getAdmins() {
    return this.adminService.getAdmins();
  }

  @Put('admins/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateAdmin(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAdminDto) {
    return this.adminService.updateAdmin(id, dto);
  }

  @Delete('admins/:id')
  deleteAdmin(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteAdmin(id);
  }
}
