import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PrescriptionsController } from './prescriptions.controller';
import { PrescriptionsService } from './prescriptions.service';

import {
  Prescription,
  PrescriptionSchema,
} from './schemas/prescription.schema';

import {
  Appointment,
  AppointmentSchema,
} from '../appointments/schemas/appointment.schema';

import { Doctor, DoctorSchema } from '../doctors/schemas/doctor.schema';

import { Patient, PatientSchema } from '../patient/schemas/patient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Prescription.name,
        schema: PrescriptionSchema,
      },
      {
        name: Appointment.name,
        schema: AppointmentSchema,
      },
      {
        name: Doctor.name,
        schema: DoctorSchema,
      },
      {
        name: Patient.name,
        schema: PatientSchema,
      },
    ]),
  ],
  controllers: [PrescriptionsController],
  providers: [PrescriptionsService],
  exports: [PrescriptionsService],
})
export class PrescriptionsModule {}
