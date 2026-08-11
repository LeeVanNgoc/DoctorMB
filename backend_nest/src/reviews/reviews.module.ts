import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

import { Review, ReviewSchema } from './schemas/review.schema';

import { Patient, PatientSchema } from '../patient/schemas/patient.schema';

import { Doctor, DoctorSchema } from '../doctors/schemas/doctor.schema';

import {
  Appointment,
  AppointmentSchema,
} from '../appointments/schemas/appointment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Review.name,
        schema: ReviewSchema,
      },
      {
        name: Patient.name,
        schema: PatientSchema,
      },
      {
        name: Doctor.name,
        schema: DoctorSchema,
      },
      {
        name: Appointment.name,
        schema: AppointmentSchema,
      },
    ]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
