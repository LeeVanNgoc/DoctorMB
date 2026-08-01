import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Appointment,
  AppointmentSchema,
} from '../appointments/schemas/appointment.schema';
import { Doctor, DoctorSchema } from '../doctors/schemas/doctor.schema';
import { Patient, PatientSchema } from '../patient/schemas/patient.schema';
import {
  Prescription,
  PrescriptionSchema,
} from '../prescriptions/schemas/prescription.schema';

import { MedicalRecordsController } from './medical-records.controller';
import { MedicalRecordsService } from './medical-records.service';
import {
  MedicalRecord,
  MedicalRecordSchema,
} from './schemas/medical-record.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MedicalRecord.name,
        schema: MedicalRecordSchema,
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
      {
        name: Prescription.name,
        schema: PrescriptionSchema,
      },
    ]),
  ],
  controllers: [MedicalRecordsController],
  providers: [MedicalRecordsService],
  exports: [MedicalRecordsService],
})
export class MedicalRecordsModule {}
