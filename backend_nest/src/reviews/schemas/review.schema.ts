import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Patient } from '../../patient/schemas/patient.schema';

import { Doctor } from '../../doctors/schemas/doctor.schema';
import { Appointment } from '../../appointments/schemas/appointment.schema';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({
  timestamps: true,
})
export class Review {
  @Prop({
    type: Types.ObjectId,
    ref: Patient.name,
    required: true,
  })
  patientId!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Doctor.name,
    required: true,
  })
  doctorId!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Appointment.name,
    required: true,
    unique: true,
  })
  appointmentId!: Types.ObjectId;

  @Prop({
    type: Number,
    required: true,
    min: 1,
    max: 5,
  })
  rating!: number;

  @Prop({
    type: String,
    default: '',
    trim: true,
  })
  comment!: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
