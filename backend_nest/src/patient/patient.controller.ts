import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { CreatePatientDto } from './dto/create-patient';
import { UpdatePatientDto } from './dto/update-patient';
import { PatientService } from './patient.service';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @Roles(Role.ADMIN, Role.DOCTOR)
  async create(@Body() createPatientDto: CreatePatientDto) {
    const patient = await this.patientService.create(createPatientDto);

    return {
      message: 'Patient profile created successfully',
      patient,
    };
  }

  @Get()
  @Roles(Role.ADMIN, Role.DOCTOR)
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search?: string,
  ) {
    return this.patientService.findAll(Number(page), Number(limit), search);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.DOCTOR)
  async findOne(@Param('id') id: string) {
    const patient = await this.patientService.findOne(id);

    return {
      patient,
    };
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.DOCTOR)
  async update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    const patient = await this.patientService.update(id, updatePatientDto);

    return {
      message: 'Patient profile updated successfully',
      patient,
    };
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.DOCTOR)
  async remove(@Param('id') id: string) {
    await this.patientService.remove(id);

    return {
      message: 'Patient profile deleted successfully',
    };
  }
}
