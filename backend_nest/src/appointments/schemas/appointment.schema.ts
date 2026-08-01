import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Doctor } from '../../doctors/schemas/doctor.schema';
import { Patient } from '../../patient/schemas/patient.schema';
import { AppointmentStatus } from '../enums/appointment-status.enum';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema({
  timestamps: true,
})
export class Appointment {
  @Prop({
    type: Types.ObjectId,
    ref: Doctor.name,
    required: true,
  })
  doctorId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Patient.name,
    required: true,
  })
  patientId: Types.ObjectId;

  @Prop({
    required: true,
  })
  appointmentDate: Date;

  @Prop({
    required: true,
    trim: true,
  })
  appointmentTime: string;

  @Prop({
    enum: AppointmentStatus,
    default: AppointmentStatus.Scheduled,
  })
  status: AppointmentStatus;

  @Prop({
    trim: true,
    maxlength: 500,
  })
  reason?: string;

  @Prop({
    trim: true,
    maxlength: 1000,
  })
  note?: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
