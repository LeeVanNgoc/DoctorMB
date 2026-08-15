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

import { ExperiencesService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

import { JwtAuthGuard } from '../common/guards/jwt_auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('experiences')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Post()
  @Roles(Role.ADMIN, Role.DOCTOR)
  create(
    @Body()
    createExperienceDto: CreateExperienceDto,
  ) {
    return this.experiencesService.create(createExperienceDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.DOCTOR)
  findAll() {
    return this.experiencesService.findAll();
  }

  @Get('doctor/:doctorId')
  @Roles(Role.ADMIN, Role.DOCTOR)
  findByDoctor(@Param('doctorId') doctorId: string) {
    return this.experiencesService.findByDoctor(doctorId);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.DOCTOR)
  findOne(@Param('id') id: string) {
    return this.experiencesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.DOCTOR)
  update(
    @Param('id') id: string,
    @Body()
    updateExperienceDto: UpdateExperienceDto,
  ) {
    return this.experiencesService.update(id, updateExperienceDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.DOCTOR)
  remove(@Param('id') id: string) {
    return this.experiencesService.remove(id);
  }
}
