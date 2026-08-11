import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { DoctorExperiencesService } from './experience.service';
import { CreateDoctorExperienceDto } from './dto/create-experience.dto';
import { UpdateDoctorExperienceDto } from './dto/update-experience.dto';

import { JwtAuthGuard } from '../common/guards/jwt_auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('doctor-experiences')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DoctorExperiencesController {
  constructor(
    private readonly doctorExperiencesService: DoctorExperiencesService,
  ) {}

  @Post()
  @Roles(Role.ADMIN, Role.DOCTOR)
  create(
    @Body()
    createDoctorExperienceDto: CreateDoctorExperienceDto,
  ) {
    return this.doctorExperiencesService.create(createDoctorExperienceDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.DOCTOR)
  findAll() {
    return this.doctorExperiencesService.findAll();
  }

  @Get('doctor/:doctorId')
  @Roles(Role.ADMIN, Role.DOCTOR)
  findByDoctor(@Param('doctorId') doctorId: string) {
    return this.doctorExperiencesService.findByDoctor(doctorId);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.DOCTOR)
  findOne(@Param('id') id: string) {
    return this.doctorExperiencesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.DOCTOR)
  update(
    @Param('id') id: string,
    @Body()
    updateDoctorExperienceDto: UpdateDoctorExperienceDto,
  ) {
    return this.doctorExperiencesService.update(id, updateDoctorExperienceDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.DOCTOR)
  remove(@Param('id') id: string) {
    return this.doctorExperiencesService.remove(id);
  }
}
