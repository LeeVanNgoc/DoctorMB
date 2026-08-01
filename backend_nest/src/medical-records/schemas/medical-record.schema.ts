import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Appointment } from '../../appointments/schemas/appointment.schema';
import { Doctor } from '../../doctors/schemas/doctor.schema';
import { Patient } from '../../patient/schemas/patient.schema';
import { Prescription } from '../../prescriptions/schemas/prescription.schema';

export type MedicalRecordDocument = HydratedDocument<MedicalRecord>;

@Schema({
  timestamps: true,
})
export class MedicalRecord {
  @Prop({
    type: Types.ObjectId,
    ref: Patient.name,
    required: true,
  })
  patientId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Doctor.name,
    required: true,
  })
  doctorId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Appointment.name,
    required: true,
  })
  appointmentId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Prescription.name,
    default: null,
  })
  prescriptionId?: Types.ObjectId | null;

  @Prop({
    type: [String],
    default: [],
  })
  symptoms: string[];

  @Prop({
    required: true,
    trim: true,
  })
  diagnosis: string;

  @Prop({
    default: '',
    trim: true,
  })
  examination: string;

  @Prop({
    default: '',
    trim: true,
  })
  notes: string;
}

export const MedicalRecordSchema = SchemaFactory.createForClass(MedicalRecord);

MedicalRecordSchema.index({ appointmentId: 1 }, { unique: true });
MedicalRecordSchema.index({ patientId: 1 });
MedicalRecordSchema.index({ doctorId: 1 });
