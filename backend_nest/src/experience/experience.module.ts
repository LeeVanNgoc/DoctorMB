import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Experience,
  ExperienceSchema,
} from './schemas/doctor-experience.schema';

import { ExperiencesController } from './experience.controller';
import { ExperiencesService } from './experience.service';

import { Doctor, DoctorSchema } from '../doctors/schemas/doctor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Experience.name,
        schema: ExperienceSchema,
      },
      {
        name: Doctor.name,
        schema: DoctorSchema,
      },
    ]),
  ],
  controllers: [ExperiencesController],
  providers: [ExperiencesService],
  exports: [ExperiencesService],
})
export class ExperiencesModule {}
