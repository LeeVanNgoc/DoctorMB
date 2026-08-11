import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  DoctorExperience,
  DoctorExperienceSchema,
} from './schemas/doctor-experience.schema';

import { DoctorExperiencesController } from './experience.controller';
import { DoctorExperiencesService } from './experience.service';

import { Doctor, DoctorSchema } from '../doctors/schemas/doctor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DoctorExperience.name,
        schema: DoctorExperienceSchema,
      },
      {
        name: Doctor.name,
        schema: DoctorSchema,
      },
    ]),
  ],
  controllers: [DoctorExperiencesController],
  providers: [DoctorExperiencesService],
  exports: [DoctorExperiencesService],
})
export class DoctorExperiencesModule {}
