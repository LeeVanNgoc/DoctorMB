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

import { CreatePatientDto } from './dto/create-patient';
import { UpdatePatientDto } from './dto/update-patient';
import { PatientService } from './patient.service';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    const patient = await this.patientService.create(createPatientDto);

    return {
      message: 'Patient created successfully',
      patient,
    };
  }

  @Get()
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search?: string,
  ) {
    return this.patientService.findAll(Number(page), Number(limit), search);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const patient = await this.patientService.findOne(id);

    return {
      patient,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    const patient = await this.patientService.update(id, updatePatientDto);

    return {
      message: 'Patient updated successfully',
      patient,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.patientService.remove(id);

    return {
      message: 'Patient deleted successfully',
    };
  }
}
