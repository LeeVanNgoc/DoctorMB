import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { QueryDoctorDto } from './dto/query-doctor.dto';

import { JwtAuthGuard } from '../common/guards/jwt_auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { CreateDoctorAccountDto } from './dto/create-doctor-account.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  /**
   * Create doctor profile
   * Admin only
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  /**
   * Get doctors
   *
   * Public API
   *
   * Examples:
   * GET /doctors
   * GET /doctors?page=1&limit=12
   * GET /doctors?search=john
   * GET /doctors?specialty=cardiology
   * GET /doctors?search=john&specialty=cardiology&page=1&limit=12
   */
  @Get()
  findAll(@Query() query: QueryDoctorDto) {
    return this.doctorsService.findAll(query);
  }

  /**
   * Get all doctors for admin
   * Admin only
   */
  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAllForAdmin(@Query() query: QueryDoctorDto) {
    return this.doctorsService.findAllForAdmin(query);
  }

  /**
   * Get doctor detail
   *
   * Public API
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(id);
  }

  /**
   * Update doctor profile
   * Admin only
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(id, updateDoctorDto);
  }

  /**
   * Create doctor account
   * Admin only
   */
  @Post('account')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  createAccount(@Body() createDoctorAccountDto: CreateDoctorAccountDto) {
    return this.doctorsService.createAccount(createDoctorAccountDto);
  }

  /**
   * Activate doctor profile
   * Admin only
   */
  @Patch(':id/activate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  activate(@Param('id') id: string) {
    return this.doctorsService.activate(id);
  }

  /**
   * Delete doctor profile
   * Admin only
   */
  @Patch(':id/deactivate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  deactivate(@Param('id') id: string) {
    return this.doctorsService.deactivate(id);
  }
}
